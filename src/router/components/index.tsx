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
  path: '/components',
  name: '组件管理',
  routes: [
    {
      // 二级路由
      component: RouteWithSubRoute,
      icon: '',
      path: '/manage',
      name: '组件管理',
      routes: [
        {
          // 三级路由
          component: RouteWithSubRoute,
          icon: '',
          path: '/multpagesMenu',
          name: '多页签菜单',
          routes: [
            {
              // 四级路由
              component: Loadable({
                loader: () => import('../../pages/mult-tab-manage'),
                ...loading
              })
            }
          ]
        }
      ]
    }
  ]
};
