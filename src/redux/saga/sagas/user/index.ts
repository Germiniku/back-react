import { takeEvery, put, delay, take, cancel } from 'redux-saga/effects';
import { loginAction, loginActionPromise } from '../../actions/user';

function* authorize(action: ActionParams<ILogin>) {
  // 一进来过后，调用后端的接口
  try {
    const res = setTimeout(() => {}, 1000);
    yield delay(1000);
    yield put(loginAction.success(res)); // call效果上表示同步的执行
  } catch (error) {
    // 错误处理
    yield put(loginAction.failure());
  }
}

export default () =>
  function* () {
    const task = yield takeEvery(loginAction.TRIGGER, authorize);
    // 监听两个type
    const action = yield take([loginAction.LOG_OUT, loginAction.FAILURE]);
    if(action.type === loginAction.LOG_OUT) yield cancel(task)
    
  };
