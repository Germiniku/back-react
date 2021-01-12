/**
 * 返回具体的路由导航
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteConfigComponentProps } from 'react-router-config';

export default function (props: RouteConfigComponentProps) {
  const { route, match } = props;
  if (route && route.routes) {
    return (
      <Switch>
        {route.routes.map((route, index) => {
          return (
            <Route
              key={route.key || index}
              // 路径实际上被拼凑出来的 /a/b/c
              path={`${match.path}${route.path}` || ''}
              exact={route.exact}
              strict={route.strict}
              render={(props: RouteConfigComponentProps) => {
                if (route.render) {
                  return route.render({ ...props, route });
                }
                if (route.component) {
                  return <route.component {...props} route={route} />;
                }
                return null;
              }}
            />
          );
        })}
      </Switch>
    );
  }
  return null;
}
