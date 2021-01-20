/***
 * 作品管理路由配置
 */

import React from 'react';
import { BulbOutlined } from '@ant-design/icons';
import Loadable from 'react-loadable';
import RouteWithSubRoute from '../RouteWIthSubRoutes';
import loading from '../loading';
export default {
  component: RouteWithSubRoute,
  icon: <BulbOutlined />,
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
              component: Loadable({
                loader: () => import('../../pages/prod-manage/tag'),
                ...loading
              })
            },
            {
              path: '/create',
              icon: '',
              name: '新建标签',
              component: Loadable({
                loader: () => import('../../pages/prod-manage/tag/createTag'),
                ...loading
              })
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
              component: Loadable({
                loader: () => import('../../pages/prod-manage/img'),
                ...loading
              })
            }
          ]
        }
      ]
    }
  ]
};
