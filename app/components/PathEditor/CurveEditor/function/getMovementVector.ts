import { Vector2 } from "../../../../math/vector2";
import { Point } from "../../models/Point/Point";

export const getMovementVector = (from: Point, to: Point): Vector2 =>
  new Vector2(to.x - from.x, to.y - from.y);
