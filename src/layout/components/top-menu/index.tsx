/**
 * 导航菜单
 */

import React, { memo } from 'react';
import { Menu } from 'antd';
import { normalize } from 'path';

interface IProps {}

const { Item } = Menu;

const TopMenu: React.FC<IProps> = props => {
  return (
    <div className="top-menu">
      <Menu mode="horizontal">
        <Item>工作台</Item>
        <Item>产品管理</Item>
        <Item>用户管理</Item>
        <Item>内容管理</Item>
        <Item>社区管理</Item>
      </Menu>
    </div>
  );
};

export default memo(TopMenu);
