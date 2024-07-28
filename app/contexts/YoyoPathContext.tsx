import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
  useMemo,
} from "react";
import { CubicBezierCurve3, Vector2, Vector3 } from "three";
import { CORE_PARAMS } from "~/const/core";

interface YoyoPathState {
  wingPath: Vector2[];
  diameter: number;
  width: number;
  trapezeWidth: number;
}

export type YoyoPathAction =
  | { type: "SET_WING_PATH"; path: Vector2[] }
  | { type: "SET_DIAMETER"; value: number }
  | { type: "SET_WIDTH"; value: number }
  | { type: "SET_TRAPEZE_WIDTH"; value: number };
const initialState: YoyoPathState = {
  wingPath: [],
  diameter: 55,
  width: 45,
  trapezeWidth: 42,
};

const YoyoPathStateContext = createContext<YoyoPathState>(initialState);
const YoyoPathDispatchContext = createContext<
  Dispatch<YoyoPathAction> | undefined
>(undefined);

function initWingPath(diameter: number, width: number, trapezeWidth: number) {
  const wing_width = trapezeWidth / 2;
  const radius = diameter / 2;

  return new CubicBezierCurve3(
    new Vector3(
      -CORE_PARAMS["sizeC"].height,
      CORE_PARAMS["sizeC"].radius + 0.2 // コアを覆う幅が必要なので一旦仮で0.2を設定
    ),
    new Vector3(-CORE_PARAMS["sizeC"].height + wing_width / 2, radius / 2),
    new Vector3(-CORE_PARAMS["sizeC"].height + wing_width / 2, radius),
    new Vector3(-CORE_PARAMS["sizeC"].height + wing_width, radius)
  )
    .getPoints(64)
    .map((v) => new Vector2(v.x, v.y));
}

const yoyoPathReducer = (state: YoyoPathState, action: YoyoPathAction) => {
  const { diameter, width, trapezeWidth } = state;
  switch (action.type) {
    case "SET_WING_PATH":
      return {
        ...state,
        wingPath: action.path,
      };
    case "SET_DIAMETER":
      return {
        ...state,
        diameter: action.value,
        wingPath: initWingPath(diameter, width, trapezeWidth),
      };
    case "SET_WIDTH":
      return {
        ...state,
        width: action.value,
        wingPath: initWingPath(diameter, width, trapezeWidth),
      };
    case "SET_TRAPEZE_WIDTH":
      return {
        ...state,
        trapezeWidth: action.value,
        wingPath: initWingPath(diameter, width, trapezeWidth),
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

  const { wingPath, width } = context;

  const yoyoPath = useMemo(() => {
    const flatEndPoint = new Vector3(width / 2, wingPath.at(-1)?.y ?? 0);

    return [
      ...wingPath,
      new Vector2(flatEndPoint.x, flatEndPoint.y),
      new Vector2(flatEndPoint.x, 0),
    ];
  }, [width, wingPath]);
  return { yoyoPath };
};

export { YoyoPathProvider, useYoyoPathState, useYoyoPathDispatch, useYoyoPath };
