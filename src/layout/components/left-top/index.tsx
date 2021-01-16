/**
 * left-top 布局的菜单Menu组件
 */

import React, { memo } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  GithubOutlined,
  MailOutlined,
  AppstoreOutlined
} from '@ant-design/icons';

interface IProps {
  collapsed: boolean;
}

const { SubMenu } = Menu;
const { Sider } = Layout;

const LeftTopSidebar: React.FC<IProps> = props => {
  const { collapsed } = props;
  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <GithubOutlined className="logo-icon" />
        <span className="logo-title">dva</span>
      </div>
      <Menu theme="dark" mode="inline">
        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
          <Menu.Item key="1">Option 1</Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default memo(LeftTopSidebar);
