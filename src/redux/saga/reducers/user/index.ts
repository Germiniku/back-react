import { stat } from 'fs';
import { loginAction } from '../../actions/user';

const initialState = {
  isLogin: false
};

export default function (state = initialState, action: ActionParams) {
  switch (action.type) {
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
    default:
      return state;
  }
}
