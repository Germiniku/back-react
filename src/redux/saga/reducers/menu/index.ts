import { MenuAction } from '../../actions/menu';
import { recursiveMenu } from './utils';

const initialState: IMenu = {
  breadcrumb: {},
  topMenu: [],
  sideMenu: {},
  currentTopMenu: null,
  currentSidebar: []
};

export default (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case MenuAction.SET_MENU: {
      const { routes } = action.payload;
      const { topMenu, breadcrumb, sideMenu } = recursiveMenu(routes);
      console.log(' 执行到了这里');
      return {
        ...state,
        topMenu,
        breadcrumb,
        sideMenu
      };
    }
    case MenuAction.SET_CURRENT_MENU: {
      const { currentTopMenu } = action.payload;
      return {
        ...state,
        currentTopMenu,
        currentSidebar: state.sideMenu[currentTopMenu] || []
      };
    }
    default:
      return state;
  }
};
