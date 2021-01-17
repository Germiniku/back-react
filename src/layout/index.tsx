import React, { memo, useEffect, useState, useCallback } from 'react';
import { Layout, Spin, Drawer, Form, Radio, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import LeftTopSidebar from './components/left-top';
import TopMenu from './components/top-menu';
import RightMenu from './components/rightmenu';
import useActions from '../hooks/useActions';
import { MenuAction } from '../redux/saga/actions/menu';
import { RouteConfigComponentProps } from 'react-router-config';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Breadcrumb from './components/breadcrumb';

import './index.less';

const { Header, Content } = Layout;

const { Group } = Radio;

interface IProps extends RouteConfigComponentProps {}

const LayoutComp: React.FC<IProps> = props => {
  const {
    route,
    history,
    location: { pathname }
  } = props;
  const [collapsed, setCollapsed] = useState(false);
  const actions = useActions({
    setMenu: MenuAction.setMenu,
    setCurrentMenu: MenuAction.setCurrentMenu
  });
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  // 获取顶部菜单栏数据
  const { topMenu, currentTopMenu, currentSidebar, breadcrumb } = useSelector(
    (state: IState) => state.menu
  );
  // 关闭展示盒子
  const handleDrawerClose = useCallback(() => {}, []);
  // 盒子表单提交事件
  const handleSetting = () => {};
  useEffect(() => {
    actions.setMenu({ routes: route?.routes });
  }, [route, actions]);
  if (topMenu.length === 0) {
    return <Spin className="loading"></Spin>;
  }
  return (
    <Layout className="layout">
      <LeftTopSidebar
        pathname={pathname}
        currentTopMenu={currentTopMenu || ''}
        collapsed={collapsed}
        menuItems={currentSidebar}
        history={history}
      />
      <Layout className="layout-header">
        <Header className="layout-header-background" style={{ padding: 0 }}>
          <div className="layout-header-top">
            {currentSidebar.length !== 0 && (
              <div className="trigger">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: toggle
                })}
              </div>
            )}

            <div className="layout-header-top-navbar">
              <TopMenu
                pathname={pathname}
                currentTopMenu={currentTopMenu}
                history={history}
                menuItems={topMenu}
                setCurrentMenu={actions.setCurrentMenu}
              />
            </div>
            <div className="layout-header-top-settings">
              <RightMenu />
            </div>
            <Drawer width={330} visible onClose={handleDrawerClose}>
              <Form
                onFinish={handleSetting}
                initialValues={{
                  theme: 'dark'
                }}
              >
                <Form.Item label="导航主题" name="theme">
                  <Group>
                    <Radio value="dark">dark-颜色系</Radio>
                    <Radio value="light">light-颜色系</Radio>
                  </Group>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" style={{marginRight: '15px'}}>恢复系统设置</Button>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Form>
            </Drawer>
          </div>
        </Header>
        <Content className="layout-content">
          <Breadcrumb
            data={breadcrumb}
            currentSidebar={currentSidebar}
            pathname={pathname}
            history={history}
          />
          {renderRoutes(route?.routes)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutComp);
