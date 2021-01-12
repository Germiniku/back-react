/**
 * @returns: 暴露一个对登陆状态操作的对象
 * 1. 登陆过后保存登陆信息和token
 * 2. 退出登录删除用户信息
 * 3. 获取用户是否登陆
 * 4. 获取token和刷新token
 */

import store from '../redux';
import { loginAction } from '../redux/saga/actions/user';
import LocalStore from './localStore';
import { refreshToken } from '../http/user';

let isRefreshing = false;

const TokenKey = 'widowmaker_JWT::token';
const TokenDate = 'widowmaker_JWT::date';
const expireTime = 7200000;
export default {
  // 1. 保存登陆信息和token
  saveLoginState(token: string) {
    LocalStore.set(TokenKey, token);
    // 过期时间: 两小时
    LocalStore.set(TokenDate, new Date().getTime() + expireTime);
  },
  deleteLoginState() {
    // 本地存储中清除数据
    LocalStore.remove(TokenKey);
    LocalStore.remove(TokenDate);
    // 退出登陆
    store.dispatch(loginAction.logOut());
    // 跳转路由页面
    if (window.location.pathname !== '/login') window.location.href = '/login';
  },
  // 3. 获取用户是否登陆
  getUserState() {
    // 判断用户是否登陆
    const storeState = store.getState().user.isLogin;
    if (storeState) return true;
    // 如果没有登陆，验证本地token信息，如果有token说明已经登陆，状态未改变
    const localToken = LocalStore.get(TokenKey);
    if (localToken) {
      store.dispatch(
        loginAction.success({
          token: localToken
        })
      );
      return true;
    }
    return false;
  },
  // 4. 获取token和刷新token
  async getToken() {
    if (isRefreshing) return LocalStore.get(TokenKey);
    // 获取过期时间
    const lifespan = parseInt(LocalStore.get(TokenDate) || '0', 10);
    const now = new Date().getTime();
    // 如果当前时间小于过期时间
    // 并且大于过期时间-约定的过期时间
    // 则刷新token
    try {
      if (now < lifespan && now > lifespan - 1000 * 1800) {
        isRefreshing = true;
        const res: any = await refreshToken(LocalStore.get(TokenKey) || '');
        const token: string = res.payload;
        this.saveLoginState(token);
        isRefreshing = false;
        return token;
      }
    } catch (error) {
      return LocalStore.get(TokenKey);
    }
    return LocalStore.get(TokenKey);
  }
};
