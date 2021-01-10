/*
 * 此文件是create-react-app 官方推荐的库customize-cra的扩展文件
 * 实际上扩展webpack的配置
 * 所以是基于common规范
 * 项目中是基础es模块化的规范
 */

const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style的选项 'css' 表示引入的css文件 true 表示引入的less
    style: true
  }),
  // 这里设置less
  // 同时定制ant-design主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#c56cf0',
      '@font-size-base': '12px'
    }
  })
);
