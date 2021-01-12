/**
 * 此文件夹只接受两个reducer
 * 1. sagaReducer
 * 2. thunkReducer
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import sagaReducer from './saga/reducers';
import thunkReducer from './thunk/reducers';
import { History } from 'history';
// combineReducers 接收一个对象，对象里面是一个一个小的reducer
const RootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...sagaReducer,
    ...thunkReducer
  });

export default RootReducer;
