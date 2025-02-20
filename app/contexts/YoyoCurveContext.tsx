/**
 * ヨーヨーのカーブを管理するコンテキスト
 */

import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
  useMemo,
  useEffect,
} from "react";

import { YoyoCurve } from "./curves/YoyoCurve";
import { YoyoCubicBezierCurve } from "./curves/YoyoCubicBezierCurve";
import { YoyoVerticalLine } from "./curves/YoyoVerticalLine";
import { YoyoHorizontalLine } from "./curves/YoyoHorizontalLine";
import { Vector2 } from "~/contexts/Vector2";

interface YoyoCurveState {
  curves: YoyoCurve[];
}

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
        const current = state.curves[i];
        if (current === undefined) {
          break;
        }
        state.curves[i - 1]?.updateLastPoint(current.getFirstPoint());
      }
      for (let i = action.index; i + 1 < state.curves.length; i += 1) {
        const current = state.curves[i];
        if (current === undefined) {
          break;
        }
        state.curves[i + 1]?.updateFirstPoint(current.getLastPoint());
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

  useEffect(() => {
    dispatch({
      type: "SET_CURVES",
      curves: [
        new YoyoCubicBezierCurve(
          new Vector2(0, 10.75),
          new Vector2(5.25, 10.75),
          new Vector2(15.75, 27.5),
          new Vector2(21, 27.5),
          (curve, index) => {
            dispatch({ type: "UPDATE_CURVE", index, curve });
          },
          (curves, index) => {
            dispatch({ type: "DIVIDE_CURVE", index, curves: curves });
          },
          { fixedEdge: "start" }
        ),

        new YoyoHorizontalLine(
          new Vector2(21, 27.5),
          new Vector2(28, 27.5),
          (curve, index) => {
            dispatch({ type: "UPDATE_CURVE", index, curve });
          }
        ),
        new YoyoVerticalLine(
          new Vector2(28, 27.5),
          new Vector2(28, 0),
          (curve, index) => {
            dispatch({ type: "UPDATE_CURVE", index, curve });
          },
          { editablePoint: "end" }
        ),
      ],
    });
  }, []);

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
