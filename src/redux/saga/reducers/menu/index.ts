import { MenuAction } from '../../actions/menu';
import { recursiveMenu } from './utils';
import LocalStore from '../../../../utils/localStore';
const initialState: IMenu = {
  breadcrumb: {},
  topMenu: [],
  sideMenu: {},
  currentTopMenu: null,
  currentSidebar: [],

  theme: (LocalStore.get('theme') as theme) || 'dark',
  primaryColor: LocalStore.get('primaryColor') || '#9b59b6',
  drawer: false
};

export default (state = initialState, action: ActionParams) => {
  switch (action.type) {
    case MenuAction.SET_MENU: {
      const { routes } = action.payload;
      const { topMenu, breadcrumb, sideMenu } = recursiveMenu(routes);
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
    case MenuAction.SET_DRAWER: {
      return {
        ...state,
        drawer: action.payload
      };
    }
    case MenuAction.SET_THEME: {
      LocalStore.set('theme', action.payload);
      return {
        ...state,
        theme: action.payload
      };
    }
    case MenuAction.SET_PRIMARY_COLOR: {
      LocalStore.set('primaryColor', action.payload);
      return {
        ...state,
        primaryColor: action.payload
      };
    }
    default:
      return state;
  }
};
