/***
 * 作品管理路由配置
 */

import React from 'react';
import Tag from '../../pages/prod-manage/tag';
import Img from '../../pages/prod-manage/img';
import RouteWithSubRoute from '../RouteWIthSubRoutes';
import CreateTag from '../../pages/prod-manage/tag/createTag';
import { BulbOutlined } from '@ant-design/icons';

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
};
