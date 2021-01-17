/**
 * 基于axios二次封装
 */

import AxiosInstance, {
  AxiosStatic,
  AxiosPromise,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import { message } from 'antd';
import { setRetryTip } from '../redux/saga/actions/common';
import store from '../redux';
import isRetryAllowed from './isRetryAllow';
// 定义请求的参数类型声明
type requestFn = (
  url: string,
  params?: Object,
  data?: Object | null
) => AxiosPromise;

class Http {
  // 请求对象
  private axios: AxiosStatic = AxiosInstance;
  // 请求失败时间 重试请求的间隔时间
  private retryDelay: number = 1000;
  // 重试次数
  // 一般生产10次 开发环境4次， 根据需要来调整
  private retry: number = Number(process.env.REACT_APP_RETRY) || 4;
  constructor() {
    const { axios } = this;
    axios.defaults.timeout = 10000;
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    // 去执行请求拦截器和响应拦截器；
    this.useInterceptResponse();
    this.useInterceptRequest();
  }
  // 请求拦截器
  useInterceptRequest() {
    this.axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const newConfig = config;
        // 登陆token
        // const token = LocalStorage.getToken()
        const token = 'widowmaker';
        if (token) newConfig.headers['Authorize'] = token;
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }
  // 响应拦截器
  useInterceptResponse() {
    this.axios.interceptors.response.use(
      res => {
        if (res.data.code === 50001) message.error('服务器错误,请联系管理员');
        // token过期
        else if (res.data.code === 50002) {
          message.error('身份信息已经过期，请重新登录');
          // TODO: 跳转到login页面
        }
        if (res.data.code !== 40000) {
          message.error(res.data.msg || '服务器异常');
          return Promise.reject(res.data.msg);
        }
        return Promise.resolve(res.data);
      },
      (error: AxiosError) => {
        if (!isRetryAllowed(error)) {
          // 请求出错，一般是服务器问题
          const { config } = error;
          let retryCount = config.headers['axios-retry'] || 0;
          if (retryCount >= this.retry) {
            // 通知redux重试次数超过限制，修改状态，组件内自动感应，变为true过后，会提示用户
            store.dispatch(setRetryTip(true));
            return Promise.reject(error);
          }
          retryCount += 1;
          const backoff = new Promise<void>(resolve => {
            setTimeout(() => {
              resolve();
            }, this.retryDelay || 1);
          });
          // 修改重试次数
          config.headers['axios-retry'] = retryCount;

          return backoff.then(() => this.axios(config));
        }

        if (error.response) {
          // http状态码非200的时候
          if (error.response.status >= 500) message.error('服务器错误');
        } else if (error.request) {
          // ...
        } else {
          // 其他错误
          message.error(error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * 封装底层的公用方法
   * @Params
   * types: 请求的方式GET POST
   * url: 请求的路径
   * options: 请求的参数
   * isComplex: 是否平铺参数 一般用于get
   *  eg: [a:1,b:2] isComplex === true 会转化为a=1&b=2
   */
  private fetchData(
    type: string,
    url: string,
    options?: Object,
    isComplex?: boolean
  ) {
    // if (isComplex) {
    //   return this.axios[type](url, null, options);
    // }
    return this.axios[type](url, options);
  }
  /**
   * post put patch delete 逻辑处理都一样
   * 把底层函数封装直接调用
   */
  private commonRequest(
    type: string,
    url: string,
    params?: Object,
    data?: Object | null
  ): AxiosPromise {
    // 合并一下参数
    let options: Object = {
      params,
      data
    };

    if (params && data === undefined) {
      options = {
        data: params
      };
    }
    if (data === null) {
      options = {
        params
      };
    }
    return this.fetchData(type, url, options, true);
  }
  /**
   * get请求方式
   * @Params
   * url 请求地址
   * params 请求参数
   *
   */
  public get(url: string, params?: Object | undefined): requestFn {
    // get可以不传参数
    if (!params) return this.fetchData('get', url);
    // get请求很有可能会被缓存，所以我们需要给他加一个随机参数
    const newParams = Object.assign(params, {
      [`widowmaker${new Date().getTime()}`]: 1
    });
    return this.fetchData('get', url, { params: newParams });
  }
  /**
   * post 请求方式
   * @Params
   * url 请求地址
   * params url params eg: a=1&b=2
   * data 请求体json数据
   */
  public post: requestFn = (url, params, data) => {
    return this.commonRequest('post', url, params, data);
  };
  /**
   * put 请求方式
   * url 请求地址
   * params url params eg: a=1&b=2
   * data 请求体json数据
   */
  public put: requestFn = (url, params, data) => {
    return this.commonRequest('put', url, params, data);
  };
  public patch: requestFn = (url, params, data) => {
    return this.commonRequest('patch', url, params, data);
  };
  public delete: requestFn = (url, params, data) => {
    return this.commonRequest('delete', url, params, data);
  };
}

export default new Http();
