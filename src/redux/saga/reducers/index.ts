/**
 * saga reducer的集合和导出
 */

import common from './common';
import user from './user';
import menu from './menu';
const sagaReducer = {
  common,
  user,
  menu
};

export default sagaReducer;
