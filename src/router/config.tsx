import React from 'react';
import Loadable from 'react-loadable';
import { DashboardOutlined } from '@ant-design/icons';
import Auth from './Auth';
import Layout from '../layout';
import Product from './product';
import User from './user';
import Components from './components';
import loading from './loading';
export default [
  {
    // 顶级路由 路由鉴权组件
    component: Auth,
    routes: [
      {
        component: Loadable({
          loader: () => import('../pages/login'),
          ...loading
        }),
        path: '/login'
      },
      /**
       * 这里有一个坑 公用的路由一定要放在布局组件上面，否则有优先匹配布局组件
       */
      {
        component: Loadable({
          loader: () => import('../pages/not-found'),
          ...loading
        }),
        path: '/404'
      },
      {
        component: Loadable({
          loader: () => import('../pages/not-authorized'),
          ...loading
        }),
        path: '/403'
      },
      {
        component: Layout,
        path: '/',
        routes: [
          {
            // 一级路由
            component: Loadable({
              loader: () => import('../pages/dashboard'),
              ...loading
            }),
            icon: <DashboardOutlined />,
            path: '/dashboard',
            name: '工作台'
          },
          // 作品管理
          Product,
          // 用户管理
          User,
          // 组件管理
          Components
        ]
      }
    ]
  }
];
