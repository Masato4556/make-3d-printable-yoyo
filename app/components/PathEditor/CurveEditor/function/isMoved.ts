import { Vector2 } from "../../../../math/vector2";

export const isMoved = (movement: Vector2): boolean =>
  movement.x !== 0 || movement.y !== 0;
