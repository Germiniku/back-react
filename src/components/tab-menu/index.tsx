import React, { memo } from 'react';
import { Menu } from 'antd';
import {
  ReloadOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CloseSquareOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import './index.less';

interface IProps {}

const TabMenu: React.FC<IProps> = props => {
  return (
    <div className="tab-menu">
      <div className="tab">
        <Menu onClick={(key)=> {console.log(key);}}>
          <Menu.Item key="refresh" icon={<ReloadOutlined />}>刷新</Menu.Item>
          <Menu.Item key="refreshAll" icon={<ReloadOutlined />}>刷新全部</Menu.Item>
          <Menu.Item key="close" icon={<CloseOutlined />}>关闭</Menu.Item>
          <Menu.Item key="closeAll" icon={<CloseCircleOutlined />}>关闭全部</Menu.Item>
          <Menu.Item key="closeOther" icon={<CloseSquareOutlined />}>关闭其他</Menu.Item>
          <Menu.Item key="closeLeft" icon={<LeftOutlined />}>关闭左侧</Menu.Item>
          <Menu.Item key="closeRight" icon={<RightOutlined />}>关闭右侧</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default memo(TabMenu);
