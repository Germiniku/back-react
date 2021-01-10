import { SET_MENU } from '../../actions/menu';

const initialState = {};

export default function (state = initialState, action: ActionParams) {
  switch (action.type) {
    case SET_MENU: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
