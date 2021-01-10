import { useMemo, DependencyList } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
  ActionCreatorFunction,
  bindPromiseCreators,
  PromiseCreator,
  Routine
} from 'redux-saga-routines';

type actionType = Routine | PromiseCreator | ActionCreatorFunction;

function useActions(
  actions: {
    [key: string]: actionType;
  },
  deps?: DependencyList | undefined
): any {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      const newActions = actions;
      const keys = Object.keys(actions);
      keys.forEach((key: string) => {
        if (newActions[key].length === 2) {
          newActions[key] = bindPromiseCreators(
            actions[key] as PromiseCreator,
            dispatch
          );
        } else {
          newActions[key] = bindActionCreators(
            actions[key] as Routine,
            dispatch
          );
        }
      });
      return newActions;
    },
    deps ? [dispatch, ...deps] : [dispatch]
  );
}

export default useActions;
