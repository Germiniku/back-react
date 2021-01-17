/**
 * left-top 布局的菜单Menu组件
 */

import React, { memo, useCallback, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { RouteConfigComponentProps } from 'react-router-config';
import { matchPath, RouteComponentProps } from 'react-router-dom';
interface IProps {
  collapsed: boolean;
  menuItems: ISidebar;
  history: RouteConfigComponentProps['history'];
  currentTopMenu: string;
  pathname: RouteComponentProps['location']['pathname'];
}

const { SubMenu } = Menu;
const { Sider } = Layout;

const LeftTopSidebar: React.FC<IProps> = props => {
  const { collapsed, menuItems, history, currentTopMenu, pathname } = props;
  const [keys, setKeys] = useState<{
    currentOpenSubs: string[];
    currentSideMenu: string;
  }>({
    currentOpenSubs: [],
    currentSideMenu: ''
  });
  // 菜单点击事件
  const handleOnMenuClick = useCallback(
    ({ key }: MenuInfo) => {
      setKeys({
        ...keys,
        currentSideMenu: key.toString()
      });
      history.push(key.toString());
    },
    [history, keys]
  );
  // SubMenu 展开/关闭的回调
  const handleSubChange = useCallback(
    openKeys => {
      setKeys({
        ...keys,
        currentOpenSubs: openKeys
      });
    },
    [keys]
  );
  useEffect(() => {
    if (
      !keys.currentSideMenu ||
      (currentTopMenu &&
        !matchPath(pathname, {
          path: keys.currentSideMenu
        }))
    ) {
      let currentSideMenu = '';
      let currentOpenSubs: any[] = [];
      // 当前打开的菜单，默认第一个
      if (menuItems.length !== 0) {
        // 如果当前第0项 有下级路由 当前展开的SubMenu为第0项
        if (menuItems[0].routes) {
          currentOpenSubs = [menuItems[0].path];
          currentSideMenu = menuItems[0].routes?.[0].path;
        } else {
          currentOpenSubs = [];
          currentSideMenu = menuItems[0].path;
        }
      }
      // 优先匹配二级菜单
      const subMenu = menuItems.find(item => {
        const matchRoute = matchPath(pathname, {
          path: item.path
        });
        return !!matchRoute;
      });
      if (subMenu) {
        if (subMenu.routes) {
          const { routes } = subMenu;
          currentSideMenu = routes[0].path;
          currentOpenSubs = [subMenu.path];
          // 匹配三级路由
          const selectedSide: any = routes.find(item => {
            const matchRoute = matchPath(pathname, {
              path: item.path
            });
            return !!matchRoute;
          });
          if (selectedSide) {
            // 判断是否有四级路由
            if (selectedSide.routes) {
              const { routes } = selectedSide;
              currentSideMenu = routes[0].path;
              currentOpenSubs = [selectedSide.path];
              const lastRoute: any = routes.find((item: any) => {
                const matchRoute = matchPath(pathname, {
                  path: item.path
                });
                return !!matchRoute;
              });
              if (lastRoute) {
                currentSideMenu = lastRoute.path;
              }
            } else {
              currentSideMenu = selectedSide.path;
            }
          }
        } else {
          currentOpenSubs = [subMenu.path];
          currentSideMenu = subMenu.path;
        }
      }
      // 匹配出来的路由与当前路径match做匹配
      // 如果匹配失败，则重定向
      if (!matchPath(pathname, { path: currentSideMenu })) history.push(currentSideMenu);

      setKeys({
        currentSideMenu,
        currentOpenSubs
      });
    }
  }, [menuItems, currentTopMenu, keys.currentSideMenu, pathname, history]);

  if (menuItems.length === 0) return null;

  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo">
        <GithubOutlined className="logo-icon" />
        <span className="logo-title">dva</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={handleOnMenuClick}
        selectedKeys={[keys.currentSideMenu]}
        openKeys={keys.currentOpenSubs}
        onOpenChange={handleSubChange}
      >
        {menuItems.map(item => {
          // 判断如果有子路由则渲染SubMenu
          // 否则则直接渲染MenuItem
          if (item.routes) {
            return (
              <SubMenu title={item.name} icon={item.icon} key={item.path}>
                {item.routes?.map(child => (
                  <Menu.Item icon={child.icon} key={child.path}>
                    {child.name}
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item icon={item.icon} key={item.path}>
                {item.name}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </Sider>
  );
};

export default memo(LeftTopSidebar);
