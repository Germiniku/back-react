import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import config from './config'
export default () => {
  return (
    <BrowserRouter>
      {
        renderRoutes(config)
      }
    </BrowserRouter>
  );
};
