import React from 'react';
import Auth from './Auth';
import Dashboard from '../pages/dashboard';
import Tag from '../pages/prod-manage/tag';
import Img from '../pages/prod-manage/img';
import RouteWithSubRoute from './RouteWIthSubRoutes';
import CreateTag from '../pages/prod-manage/tag/createTag';
import UserProfile from '../pages/user-manage/profile';
import Login from '../pages/login';
import Layout from '../layout';

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
            icon: '',
            path: '/dashboard',
            name: '工作台'
          },
          // 作品管理
          {
            component: RouteWithSubRoute,
            icon: '',
            path: '/prod',
            name: '作品管理',
            routes: [
              {
                // 二级路由
                component: RouteWithSubRoute,
                icon: '',
                path: '/tag',
                name: '标签管理',
                routes: [
                  {
                    // 三级路由
                    component: RouteWithSubRoute,
                    icon: '',
                    path: '/list',
                    name: '标签管理列表',
                    routes: [
                      {
                        // 四级路由
                        component: Tag
                      },
                      {
                        path: '/create',
                        icon: '',
                        name: '新建标签',
                        component: CreateTag
                      }
                    ]
                  }
                ]
              },
              {
                component: RouteWithSubRoute,
                icon: '',
                path: '/img',
                name: '图片管理',
                routes: [
                  {
                    component: RouteWithSubRoute,
                    icon: '',
                    path: '/list',
                    name: '图片管理列表',
                    routes: [
                      {
                        component: Img
                      }
                    ]
                  }
                ]
              }
            ]
          },
          // 用户管理
          {
            component: RouteWithSubRoute,
            icon: '',
            name: '用户管理',
            path: '/user',
            routes: [
              {
                component: RouteWithSubRoute,
                icon: '',
                name: '用户资料管理列表',
                path: '/profile',
                routes: [
                  {
                    component: RouteWithSubRoute,
                    icon: '',
                    name: '用户资料',
                    path: '/list',
                    routes: [
                      {
                        component: UserProfile
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
      // TODO:一个404页面
    ]
  }
];
