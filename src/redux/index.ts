/**
 * reducer , [initialStore],[enhancer]
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';
// saga的middleware
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from './reducer';
import rootSaga from './saga/sagas';
// import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

// 创建一个增强器函数
const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const store = createStore(
  rootReducer(history),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
      // thunk,
      logger
    )
  )
);

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(routinePromiseWatcherSaga);
export default store;
