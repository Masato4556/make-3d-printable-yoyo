import { create } from "zustand";
import { Vector2 } from "../math/vector2";
import { YoyoShape } from "../yoyo/YoyoShape";
import { Point } from "../components/YoyoShapeEditor/models/Point/Point";

type CurveStore = {
  shape: YoyoShape;
};

type CurveActions = {
  getPoint: (pointId: string) => Point;
  movePoint: (pointId: string, newX: number, newY: number) => void;
  getPath: () => Vector2[];
};

export const useCurveStore = create<CurveStore & CurveActions>((set, get) => ({
  shape: YoyoShape.createDefault(),
  getPoint: (pointId: string) => {
    const { shape } = get();
    return shape.getPoint(pointId);
  },
  getPath: () => {
    const { shape } = get();
    return shape.getPath();
  },
  movePoint: (pointId: string, newX: number, newY: number) => {
    const { shape } = get();
    const newShape = shape.movePoint(pointId, newX, newY);
    set({ shape: newShape });
  },
}));
