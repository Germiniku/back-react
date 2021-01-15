import React, { memo, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import TopMenu from './components/top-menu';
import RightMenu from './components/rightmenu';
import './index.less';
const { Header, Sider, Content } = Layout;

const LayoutComp = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="layout">
      <Sider
        className="layout-sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="layout-logo" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
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
      <Layout className="layout-header">
        <Header className="layout-header-background" style={{ padding: 0 }}>
          <div className="layout-header-top">
            <div className="trigger">
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle
                }
              )}
            </div>

            <div className="layout-header-top-navbar">
              <TopMenu />
            </div>
            <div className="layout-header-top-settings">
              <RightMenu />
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutComp);
