import { Vector2 } from "three";

export interface UICurve {
  dispatch: (uiCurve: UICurve) => void;
  getPath(): Vector2[];
  getElement(): JSX.Element;
  getFirstPoint(): Vector2;
  getLastPoint(): Vector2;
  updateFirstPoint(v: Vector2): void;
  updateLastPoint(v: Vector2): void;
}
