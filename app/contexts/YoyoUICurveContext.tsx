import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
  useMemo,
} from "react";
import { Vector2 } from "three";
import { UICurve } from "~/utils/UICurve/UICurve";

interface YoyoUICurveState {
  curves: UICurve[];
}

export type YoyoUICurveAction =
  | { type: "SET_CURVES"; curves: UICurve[] }
  | { type: "APPEND_CURVE"; curve: UICurve }
  | { type: "UPDATE_CURVE"; curve: UICurve; index: number };

const initialState: YoyoUICurveState = {
  curves: [],
};

const YoyoUICurveStateContext = createContext<YoyoUICurveState>(initialState);
const YoyoUICurveDispatchContext = createContext<
  Dispatch<YoyoUICurveAction> | undefined
>(undefined);

const yoyoUICurveReducer = (
  state: YoyoUICurveState,
  action: YoyoUICurveAction
) => {
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

interface YoyoUICurveProviderProps {
  children: ReactNode;
}

const YoyoUICurveProvider = ({ children }: YoyoUICurveProviderProps) => {
  const [state, dispatch] = useReducer(yoyoUICurveReducer, initialState);

  return (
    <YoyoUICurveStateContext.Provider value={state}>
      <YoyoUICurveDispatchContext.Provider value={dispatch}>
        {children}
      </YoyoUICurveDispatchContext.Provider>
    </YoyoUICurveStateContext.Provider>
  );
};

const useYoyoUICurveState = () => {
  const context = useContext(YoyoUICurveStateContext);
  if (context === undefined) {
    throw new Error(
      "useYoyoUICurveState must be used within a YoyoUICurveProvider"
    );
  }
  return context;
};

const useYoyoUICurveDispatch = () => {
  const context = useContext(YoyoUICurveDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useYoyoUICurveDispatch must be used within a YoyoUICurveProvider"
    );
  }
  return context;
};

const useYoyoPath = () => {
  const { curves } = useYoyoUICurveState();

  const yoyoPath = useMemo(() => {
    return curves.reduce<Vector2[]>((acc, cur) => {
      return [...acc, ...cur.getPath()];
    }, []);
  }, [curves]);

  return { yoyoPath };
};

export {
  YoyoUICurveProvider,
  useYoyoUICurveState,
  useYoyoUICurveDispatch,
  useYoyoPath,
};
