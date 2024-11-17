import { CubicBezierCurve3 } from "three";
export const divideBezierCurve = (curve: CubicBezierCurve3, t: number) => {
  const { v0: p0, v1: p1, v2: p2, v3: p3 } = curve;
  const q0 = p0.clone().lerp(p1, t);
  const q1 = p1.clone().lerp(p2, t);
  const q2 = p2.clone().lerp(p3, t);
  const r0 = q0.clone().lerp(q1, t);
  const r1 = q1.clone().lerp(q2, t);
  const s = r0.clone().lerp(r1, t);
  return [
    new CubicBezierCurve3(p0, q0, r0, s),
    new CubicBezierCurve3(s, r1, q2, p3),
  ];
};
