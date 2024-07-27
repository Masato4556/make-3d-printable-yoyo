import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";
import { Vector2 } from "three";

interface YoyoPathState {
  path: Vector2[];
}

export type YoyoPathAction = { type: "SET_PATH"; path: Vector2[] };

const initialState: YoyoPathState = {
  path: [],
};

const YoyoPathStateContext = createContext<YoyoPathState>(initialState);
const YoyoPathDispatchContext = createContext<
  Dispatch<YoyoPathAction> | undefined
>(undefined);

const yoyoPathReducer = (state: YoyoPathState, action: YoyoPathAction) => {
  switch (action.type) {
    case "SET_PATH":
      return {
        ...state,
        path: action.path,
      };
    default:
      throw new Error(`Unknown action`);
  }
};

interface YoyoPathProviderProps {
  children: ReactNode;
}

const YoyoPathProvider = ({ children }: YoyoPathProviderProps) => {
  const [state, dispatch] = useReducer(yoyoPathReducer, initialState);

  return (
    <YoyoPathStateContext.Provider value={state}>
      <YoyoPathDispatchContext.Provider value={dispatch}>
        {children}
      </YoyoPathDispatchContext.Provider>
    </YoyoPathStateContext.Provider>
  );
};

const useYoyoPathState = () => {
  const context = useContext(YoyoPathStateContext);
  if (context === undefined) {
    throw new Error("useYoyoPathState must be used within a YoyoPathProvider");
  }
  return context;
};

const useYoyoPathDispatch = () => {
  const context = useContext(YoyoPathDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useYoyoPathDispatch must be used within a YoyoPathProvider"
    );
  }
  return context;
};

export { YoyoPathProvider, useYoyoPathState, useYoyoPathDispatch };
