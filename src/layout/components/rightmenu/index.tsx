/**
 * 顶部右侧设置组件
 */
import React, { memo } from 'react'
import PickColor from '../../../components/pick-color'
import './index.less';
interface IProps {
 
}

const RightMenu: React.FC<IProps> = (props) => {
  return (
    <div className="right-menu">
      <div className="pick-color">
        <span></span>
      </div>
      <div className="language">
        简体中文
      </div>
      <div className="user">用户相关</div>
    </div>
  )
}

export default memo(RightMenu)