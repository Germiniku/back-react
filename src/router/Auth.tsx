import React, { memo } from 'react';
import { Alert, Button } from 'antd';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loginUtils from '../utils/loginUtils';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';
/**
 * 路由鉴权要处理几件事情
 * 1: 要处理全局的提示信息，比如:断网、或者服务器崩了， 或者页面崩了
 * 2: 有收集权限码，分发给redux，根据用户信息，来匹配权限，显示他能看到的东西
 * // 注意: 这个是属于路由层面的鉴权，也就是所谓的粗粒度鉴权
 * 3: 判断路由，因为有些情况，可能token过期了，但是可能意外因素导致用户还是能够访问这个页面，
 * 那么在用户对页面进行操作的时候，或者页面进行切换的时候，就需要判断这个用户是否登陆，而决定
 * 是否登陆的因素是token是否有效
 */

interface IProps extends RouteConfigComponentProps {}

const Auth: React.FC<IProps> = props => {
  const { retryTip } = useSelector((state: IState) => state.common);
  const isLogin = loginUtils.getUserState();
  const { route, location } = props;
  /**
   * 如果项目需要登陆过后，在路由鉴权这里请求用户信息
   * useEffect(() => {
   *   // 异步请求数据
   *   //发起action
   * },[isLogin])
   */
  const GlobalTip = retryTip ? (
    <Alert
      className="global-tip"
      type="error"
      message={
        <p>
          请求数据多次超时，可能会影响到之后操作，请检查网络
          <Button type="link" onClick={() => window.location.reload()}>
            刷新页面
          </Button>
        </p>
      }
      showIcon={false}
      banner
      closable
    ></Alert>
  ) : null;

  // 需要处理 判断路由
  // 如果没有登陆，且不在登陆页
  if (!isLogin && location.pathname !== '/login')
    return <Redirect to="/login" />;
  if (isLogin && location.pathname === '/login') return <Redirect to="/" />;
  /*
  重要的来了，在这里，判断权限
  if(permiission.length===0 && isLogin) return (
    <>
      {GlobalTip}
      <Spin className="spin-center"/>
    </>
  )
  */
  return (
    <>
      {GlobalTip}
      {route && route.routes && renderRoutes(route.routes)}
    </>
  );
};

export default memo(Auth);
