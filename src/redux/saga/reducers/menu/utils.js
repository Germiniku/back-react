const breadcrumb = {};
/**
 * 生成导航所需数据
 * @Params routes ==> 路由导航
 * @Params permissions ==> 后端返回的权限码
 */
export const recursiveMenu = (routes, permissions) => {
  const topMenu = [];
  const sideMenu = {};
  routes.forEach(route => {
    const path = route.path;

    // 处理顶部导航信息
    topMenu.push({
      name: route.name,
      path: route.path || '',
      icon: route.icon
    });
    // 处理面包屑
    if (route.routes) {
      const sidebar = createMenu(path, route.routes);
      sideMenu[path] = sidebar;
      breadcrumb[path] = {
        name: route.name,
        icon: route.icon
      };
    }
  });
  return {
    topMenu,
    breadcrumb,
    sideMenu
  };
};

/**
 * 抽离逻辑层
 * 协助reducerMenu 处理下次路由
 * @Params rootPath ==> 根路径
 * @Params routes
 * @Params permissions
 */
export const createMenu = (rootPath, routes, permissions) => {
  const menu = [];
  routes.forEach(subMenu => {
    const underMenu = [];
    if (subMenu.routes) {
      subMenu.routes.forEach(under => {
        const basePath = rootPath + subMenu.path;
        // if(permissions){ 处理权限 }
        if (under.path) {
          // 处理面包屑
          breadcrumb[basePath + under.path] = {
            icon: under.icon,
            name: under.name
          };
          // 处理underMenu
          underMenu.push({
            icon: under.icon,
            name: under.name,
            path: basePath + under.path
          });
        }
        if (under.routes) {
          under.routes.forEach(lastRoute => {
            if (lastRoute.path) {
              breadcrumb[basePath + under.path + lastRoute.path] = {
                icon: lastRoute.icon,
                name: lastRoute.name
              };
            }
          });
        }
        if (underMenu.length !== 0) {
          menu.push({
            icon: subMenu.icon,
            name: subMenu.name,
            path: `${rootPath}${subMenu.path}`,
            routes: underMenu
          });
        }
        // 处理面包屑
        breadcrumb[`${rootPath}${subMenu.path}`] = {
          name: subMenu.name,
          icon: subMenu.icon
        };
      });
    } else {
      menu.push({
        icon: subMenu.icon,
        name: subMenu.name,
        path: `${rootPath}${subMenu.path}`
      });
      // 处理面包屑
      breadcrumb[`${rootPath}${subMenu.path}`] = {
        name: subMenu.name,
        icon: subMenu.icon
      };
    }
  });
  return menu;
};
