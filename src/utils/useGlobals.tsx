import { useReducer } from "react";
import {
  GlobalsActionTypes,
  IGlobalsState,
  IGlobalsAction
} from "../interfaces";

const globalsReducer = (state: IGlobalsState, action: IGlobalsAction) => {
  switch (action.type) {
    case GlobalsActionTypes.ToggleNightMode:
      return { isNightMode: !state.isNightMode };
    default:
      throw new Error();
  }
};

const useGlobals = () => {
  const [globalsState, globalsDispatch] = useReducer(globalsReducer, {
    isNightMode: false
  });

  return [globalsState, globalsDispatch];
};

export default useGlobals;
