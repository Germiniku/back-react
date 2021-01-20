/**
 * 用户管理路由配置
 */
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import Loadable from 'react-loadable';
import RouteWithSubRoute from '../RouteWIthSubRoutes';
import loading from '../loading';
export default {
  component: RouteWithSubRoute,
  icon: <UserOutlined />,
  name: '用户管理',
  path: '/user',
  routes: [
    {
      component: RouteWithSubRoute,
      icon: '',
      name: '用户资料',
      path: '/profile',
      routes: [
        {
          component: RouteWithSubRoute,
          icon: '',
          name: '资料列表',
          path: '/list',
          routes: [
            {
              component: Loadable({
                loader: () => import('../../pages/user-manage/profile'),
                ...loading
              })
            }
          ]
        }
      ]
    }
  ]
};
