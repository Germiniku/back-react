import { takeEvery, put, delay, take, cancel, call } from 'redux-saga/effects';
import { loginAction } from '../../actions/user';
import { login } from '../../../../http/user';

function* authorize(action: ActionParams<ILogin>) {
  // 一进来过后， 就去调用后端的登录接口
  try {
    // call 表示用同步的方式 做异步的事情
    const res = yield call(login, action.payload);

    // 如果需要延迟
    yield delay(1000);
    yield put(loginAction.success(res));
  } catch (error) {
    // 错误的处理
    yield put(loginAction.failure());
  }
}

export default () =>
  function* () {
    const task = yield takeEvery(loginAction.TRIGGER, authorize);
    // 监听两个type
    const action = yield take([loginAction.LOG_OUT, loginAction.FAILURE]);
    if (action.type === loginAction.LOG_OUT) yield cancel(task);
  };
