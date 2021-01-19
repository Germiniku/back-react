import { createRoutine } from 'redux-saga-routines';
import NAME_SPACE from '../../../constants/namespace';
import extendRoutine from '../extendRoutines';

export const MenuAction = extendRoutine(createRoutine(`${NAME_SPACE.MENU}`), [
  {
    type: 'SET_MENU',
    action: 'setMenu'
  },
  {
    type: 'SET_CURRENT_MENU',
    action: 'setCurrentMenu'
  },
  {
    type: 'SET_THEME',
    action: 'setTheme'
  },
  {
    type: 'SET_PRIMARY_COLOR',
    action: 'setPrimaryColor'
  },
  {
    type: 'SET_DRAWER',
    action: 'setDrawer'
  }
]);
