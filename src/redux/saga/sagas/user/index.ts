import { takeEvery, put, delay, take, cancel, call } from 'redux-saga/effects';
import { loginAction } from '../../actions/user';
import { login } from '../../../../http/user';
import loginUtils from '../../../../utils/loginUtils';

function* authorize(action: ActionParams<ILogin>) {
  // 一进来过后， 就去调用后端的登录接口
  try {
    // call 表示用同步的方式 做异步的事情
    const res = yield call(login, action.payload);
    const {
      data: { token }
    } = res;
    // 如果需要延迟
    yield call(loginUtils.saveLoginState, token);
    yield put(loginAction.success(token));
  } catch (error) {
    // 错误的处理
    yield put(loginAction.failure());
  }
  yield put(loginAction.fulfill());
}

export default () =>
  function* () {
    const task = yield takeEvery(loginAction.TRIGGER, authorize);
    // 监听两个type
    const action = yield take([loginAction.LOG_OUT, loginAction.FAILURE]);
    if (action.type === loginAction.LOG_OUT) yield cancel(task);
  };
