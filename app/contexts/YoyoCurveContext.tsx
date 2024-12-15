import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
  useMemo,
} from "react";
import { Vector2 } from "three";
import { YoyoCurve } from "~/components/Curve/YoyoCurve";

interface YoyoCurveState {
  curves: YoyoCurve[];
}

// TODO: YoyoCurve[]だとステートの更新が検知されない実装を生み出しやすいので、YoyoCurveの配列のラッパークラスを作成し、そのクラスをステートとして持つようにする
// そのクラスで変更処理を行う際は、必ず新たなインスタンスを生成して返すようにすることで、再レンダリングを検知させる

export type YoyoCurveAction =
  | { type: "SET_CURVES"; curves: YoyoCurve[] }
  | { type: "APPEND_CURVE"; curve: YoyoCurve }
  | { type: "UPDATE_CURVE"; curve: YoyoCurve; index: number }
  | { type: "DIVIDE_CURVE"; curves: YoyoCurve[]; index: number };

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
      action.curves.forEach((curve, index) => {
        curve.setIndex(index);
      });
      return {
        curves: action.curves,
      };
    case "APPEND_CURVE":
      action.curve.setIndex(state.curves.length);
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
    case "DIVIDE_CURVE":
      return {
        curves: replaceDividedCurve(state.curves, action.index, action.curves),
      };
    default:
      throw new Error(`Unknown action`);
  }
};

const replaceDividedCurve = (
  curves: YoyoCurve[],
  index: number,
  newCurves: YoyoCurve[]
) => {
  const new_curves = [
    ...curves.slice(0, index),
    ...newCurves,
    ...curves.slice(index + 1),
  ];
  new_curves.forEach((curve, index) => {
    curve.setIndex(index);
  });

  return new_curves;
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
