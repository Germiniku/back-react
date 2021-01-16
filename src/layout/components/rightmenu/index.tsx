/**
 * 顶部右侧设置组件
 */
import React, { memo, useCallback } from 'react';
import UserInfo from './userInfo';
import PickColor from '../../../components/pick-color';
import './index.less';
interface IProps {}

const RightMenu: React.FC<IProps> = props => {
  // 改变主题颜色事件
  const handleColorChange = useCallback((color: string) => {}, []);
  return (
    <div className="right-menu">
      <div className="pick-color">
        <PickColor onChangeComplete={handleColorChange} />
      </div>
      <div className="language">简体中文</div>
      <UserInfo />
    </div>
  );
};

export default memo(RightMenu);
