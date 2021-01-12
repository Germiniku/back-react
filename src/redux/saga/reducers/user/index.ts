import { stat } from 'fs';
import LoginForm from '../../../../pages/login/form';
import { loginAction } from '../../actions/user';

const initialState = {
  isLogin: false,
  loading: false
};

export default function (state = initialState, action: ActionParams) {
  switch (action.type) {
    case loginAction.TRIGGER: {
      return {
        ...state,
        loading: true
      };
    }
    case loginAction.SUCCESS: {
      console.log('登陆成功');
      return {
        ...state,
        isLogin: true
      };
    }
    case loginAction.FAILURE: {
      console.log('登陆出错');
      return {
        ...state
      };
    }
    case loginAction.FULFILL: {
      return {
        ...state,
        loading: false
      };
    }
    default:
      return state;
  }
}
