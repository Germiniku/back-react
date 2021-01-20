import React from 'react';
import Loadable from 'react-loadable';
import { DashboardOutlined } from '@ant-design/icons';
import Auth from './Auth';
import Layout from '../layout';
import Product from './product';
import User from './user';
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
          User
        ]
      },
      // TODO:一个404页面
      {
        component: Loadable({
          loader: () => import('../pages/not-found'),
          ...loading
        }),
        path: '/404'
      }
    ]
  }
];
