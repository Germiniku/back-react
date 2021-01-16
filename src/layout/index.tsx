import React, { memo, useState } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import LeftTopSidebar from './components/left-top';
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
      <LeftTopSidebar collapsed={collapsed} />
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
