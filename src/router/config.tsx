import React from 'react';
import Auth from './Auth';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Layout from '../layout';
import Product from './product';
import User from './user';
import { DashboardOutlined } from '@ant-design/icons';

export default [
  {
    // 顶级路由 路由鉴权组件
    component: Auth,
    routes: [
      {
        component: Login,
        path: '/login'
      },
      {
        component: Layout,
        path: '/',
        routes: [
          {
            // 一级路由
            component: Dashboard,
            icon: <DashboardOutlined />,
            path: '/dashboard',
            name: '工作台'
          },
          // 作品管理
          Product,
          // 用户管理
          User
        ]
      }
      // TODO:一个404页面
    ]
  }
];
