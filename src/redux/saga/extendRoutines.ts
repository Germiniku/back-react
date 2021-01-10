/**
 * 用于扩展redux-saga routines的基础参数
 * redux-saga-routines 默认提供了5个action.type参数: TRIGGER,REQUEST,SUCCESS,FAILURE
 * 也有5个action create trigger、request、success、failure、fullfill
 * 
 * @Example
 * 
 * import {createRoutine} from 'redux-saga-routines'
   import extendRoutines from './extendRoutines'
   const common = extendRoutines(
     createRoutine('common'),
     [
       {
         type: 'SET_TRY_TIP',
         action: 'setTryTip',
       },
     ]
   )
 * 
 */

import { createAction } from 'redux-actions';
import { Routine, ActionCreatorFunction } from 'redux-saga-routines';

type Key = string;

type ExtendRoutineReturn<T extends Key, A extends Key> = Routine &
  { [key in T]: string } &
  { [key in A]: ActionCreatorFunction };

const createActionCreator = ({
  type,
  typePrefix
}: {
  type: string;
  typePrefix: string;
}) => createAction(`${typePrefix}/${type}`);

export default function extendRoutine<T extends Key, A extends Key>(
  routine: any,
  types: {
    type: T;
    action: A;
  }[]
): ExtendRoutineReturn<T, A> {
  const typePrefix = routine.toString().replace(/\/([^/]+)\/?$/, '');
  const newRoutine = routine;
  types.forEach(({ type, action }) => {
    const actionCreator = createActionCreator({ type, typePrefix });
    newRoutine[action] = actionCreator;
    newRoutine[type] = actionCreator.toString();
  });
  return newRoutine;
}
