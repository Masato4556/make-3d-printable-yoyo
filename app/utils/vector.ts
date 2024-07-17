import { Vector2, Vector3 } from "three";

export function vector3dTo2d(vec3: Vector3) {
  return new Vector2(vec3.x, vec3.y);
}
