import { Badge, Avatar, Dropdown, Menu, message } from 'antd';
import React, { memo, useCallback } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import useActions from '../../../hooks/useActions';
import { MenuAction } from '../../../redux/saga/actions/menu';
interface IProps {}

const { Item } = Menu;

const UserInfo: React.FC<IProps> = props => {
  const actions = useActions({
    setDrawer: MenuAction.setDrawer
  });
  // handleSystemSettingClick 展示Drawer
  const handleSystemSettingClick = useCallback(() => {
    actions.setDrawer(true);
  }, [actions]);
  const userMenu = (
    <Menu>
      <Item onClick={() => message.info('你点击了个人资料')}>个人资料</Item>
      <Item onClick={handleSystemSettingClick}>系统设置</Item>
      <Item onClick={() => message.info('你点击了清除缓存')}>清除缓存</Item>
      <Item onClick={() => message.info('你点击了修改密码')}>修改密码</Item>
    </Menu>
  );
  return (
    <div className="user">
      <Badge count={99} title="您有99条信息">
        <Avatar size="small"></Avatar>
      </Badge>
      <Dropdown overlay={userMenu} trigger={['hover']}>
        <span className="user-name">
          超级管理员 <CaretDownOutlined />
        </span>
      </Dropdown>
    </div>
  );
};

export default memo(UserInfo);
