/**
 * reducer , [initialStore],[enhancer]
 */

import { createStore, applyMiddleware, compose } from 'redux';

// saga的middleware
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './saga/sagas';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

// 创建一个增强器函数
const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware, thunk, logger))
);

sagaMiddleware.run(rootSaga);

export default store;
