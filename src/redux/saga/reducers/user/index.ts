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
      return {
        ...state,
        isLogin: true,
        ...action.payload
      };
    }
    case loginAction.FAILURE: {
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
