import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import WidowmakerLayout from '../layout';
import Login from '../pages/login';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={WidowmakerLayout}></Route>
        <Route path="/login" exact={true} component={Login}></Route>
      </Switch>
    </BrowserRouter>
  );
};
