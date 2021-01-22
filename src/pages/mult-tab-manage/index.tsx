import React, { memo } from 'react';
import TabMenu from '../../components/tab-menu';

/**
 * 多页签管理组件
 */

interface IProps {}

const MultMenu: React.FC<IProps> = props => {
  return <TabMenu />;
};

export default memo(MultMenu);
