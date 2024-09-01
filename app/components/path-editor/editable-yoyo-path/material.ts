import { MeshBasicMaterial, LineBasicMaterial } from "three";
import { PATH_COLOR } from "~/styles/const";

export const pointMaterial = new MeshBasicMaterial({ color: PATH_COLOR });
export const curveMaterial = new MeshBasicMaterial({ color: PATH_COLOR });
export const wireMaterial = new MeshBasicMaterial({ color: "grey" });
export const lineMaterial = new LineBasicMaterial({
  color: "grey",
  linewidth: 2,
  linecap: "round",
});
