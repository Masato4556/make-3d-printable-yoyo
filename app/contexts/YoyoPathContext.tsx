import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
  useMemo,
} from "react";
import { Vector2 } from "three";

interface YoyoPathState {
  wingPath: Vector2[];
  flatEndPoint: Vector2;
  width: number;
  trapezeWidth: number;
}

export type YoyoPathAction =
  | { type: "SET_WING_PATH"; path: Vector2[] }
  | { type: "SET_FLAT_END_POINT"; value: Vector2 };

const initialState: YoyoPathState = {
  wingPath: [],
  flatEndPoint: new Vector2(0, 0),
  width: 45,
  trapezeWidth: 42,
};

const YoyoPathStateContext = createContext<YoyoPathState>(initialState);
const YoyoPathDispatchContext = createContext<
  Dispatch<YoyoPathAction> | undefined
>(undefined);

const yoyoPathReducer = (state: YoyoPathState, action: YoyoPathAction) => {
  switch (action.type) {
    case "SET_WING_PATH":
      return {
        ...state,
        wingPath: action.path,
      };
    case "SET_FLAT_END_POINT":
      return {
        ...state,
        flatEndPoint: action.value,
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

const useYoyoPath = () => {
  const context = useYoyoPathState();

  const { wingPath, flatEndPoint } = context;

  const yoyoPath = useMemo(() => {
    return [
      ...wingPath,
      new Vector2(flatEndPoint.x, flatEndPoint.y),
      new Vector2(flatEndPoint.x, 0),
    ];
  }, [flatEndPoint, wingPath]);
  return { yoyoPath };
};

export { YoyoPathProvider, useYoyoPathState, useYoyoPathDispatch, useYoyoPath };
