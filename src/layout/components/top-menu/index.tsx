/**
 * 导航菜单
 */

import React, { memo, useCallback, useEffect } from 'react';
import { Menu, message } from 'antd';
import { matchPath, RouteComponentProps } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

interface IProps {
  menuItems: Array<IMenuItem>;
  setCurrentMenu: any;
  pathname: RouteComponentProps['location']['pathname'];
  history: RouteComponentProps['history'];
  currentTopMenu: string | null;
}

const TopMenu: React.FC<IProps> = props => {
  const {
    menuItems,
    setCurrentMenu,
    history,
    currentTopMenu,
    pathname
  } = props;
  const handleOnPathClick = useCallback(
    ({ key }) => {
      message.success('摸了一把');
      setCurrentMenu({
        currentTopMenu: key
      });
      history.push(key);
    },
    [setCurrentMenu, history]
  );
  //  默认选中逻辑
  useEffect(() => {
    if (
      !currentTopMenu ||
      pathname.split('/')[1] !== currentTopMenu.split('/')[1]
    ) {
      // 判断选中是哪一项
      let selectedMenu = menuItems.find(menu => {
        const matchedRoute = matchPath(pathname, {
          path: menu.path
        });
        return !!matchedRoute;
      });
      // 默认选中
      if (pathname === '/') {
        if (menuItems[0]) {
          setCurrentMenu({
            currentTopMenu: menuItems[0].path
          });
        }
      } else {
        const path = selectedMenu?.path;
        path
          ? setCurrentMenu({
              currentTopMenu: path
            })
          : history.push('/404');
      }
    }
  }, [pathname, currentTopMenu, menuItems, setCurrentMenu, history]);
  return (
    <div className="top-menu">
      <Menu
        mode="horizontal"
        onClick={handleOnPathClick}
        selectedKeys={[currentTopMenu ? currentTopMenu : '']}
      >
        {menuItems.map(item => (
          <Menu.Item icon={item.icon} key={item.path}>
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default memo(TopMenu);
