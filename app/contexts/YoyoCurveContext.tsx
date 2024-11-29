import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
  useMemo,
} from "react";
import { Vector2 } from "three";
import { YoyoCurve } from "~/utils/YoyoCurve/YoyoCurve";

interface YoyoCurveState {
  curves: YoyoCurve[];
}

export type YoyoCurveAction =
  | { type: "SET_CURVES"; curves: YoyoCurve[] }
  | { type: "APPEND_CURVE"; curve: YoyoCurve }
  | { type: "UPDATE_CURVE"; curve: YoyoCurve; index: number };

const initialState: YoyoCurveState = {
  curves: [],
};

const YoyoCurveStateContext = createContext<YoyoCurveState>(initialState);
const YoyoCurveDispatchContext = createContext<
  Dispatch<YoyoCurveAction> | undefined
>(undefined);

const yoyoCurveReducer = (state: YoyoCurveState, action: YoyoCurveAction) => {
  switch (action.type) {
    case "SET_CURVES":
      return {
        curves: action.curves,
      };
    case "APPEND_CURVE":
      return {
        curves: [...state.curves, action.curve],
      };
    case "UPDATE_CURVE":
      state.curves[action.index] = action.curve;

      // 全てのカーブの始点・終点を更新
      for (let i = action.index; i - 1 >= 0; i -= 1) {
        state.curves[i - 1].updateLastPoint(state.curves[i].getFirstPoint());
      }
      for (let i = action.index; i + 1 < state.curves.length; i += 1) {
        state.curves[i + 1].updateFirstPoint(state.curves[i].getLastPoint());
      }

      return {
        curves: [...state.curves],
      };
    default:
      throw new Error(`Unknown action`);
  }
};

interface YoyoCurveProviderProps {
  children: ReactNode;
}

const YoyoCurveProvider = ({ children }: YoyoCurveProviderProps) => {
  const [state, dispatch] = useReducer(yoyoCurveReducer, initialState);

  return (
    <YoyoCurveStateContext.Provider value={state}>
      <YoyoCurveDispatchContext.Provider value={dispatch}>
        {children}
      </YoyoCurveDispatchContext.Provider>
    </YoyoCurveStateContext.Provider>
  );
};

const useYoyoCurveState = () => {
  const context = useContext(YoyoCurveStateContext);
  if (context === undefined) {
    throw new Error(
      "useYoyoCurveState must be used within a YoyoCurveProvider"
    );
  }
  return context;
};

const useYoyoCurveDispatch = () => {
  const context = useContext(YoyoCurveDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useYoyoCurveDispatch must be used within a YoyoCurveProvider"
    );
  }
  return context;
};

const useYoyoPath = () => {
  const { curves } = useYoyoCurveState();

  const yoyoPath = useMemo(() => {
    return curves.reduce<Vector2[]>((acc, cur) => {
      return [...acc, ...cur.getPath()];
    }, []);
  }, [curves]);

  return { yoyoPath };
};

export {
  YoyoCurveProvider,
  useYoyoCurveState,
  useYoyoCurveDispatch,
  useYoyoPath,
};
