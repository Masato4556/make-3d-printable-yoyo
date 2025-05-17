import { Mesh, BufferGeometry } from "three";
import { CSG } from "three-csg-ts";

export const unionGeometry = (
  geometry1: BufferGeometry,
  geometry2: BufferGeometry
) => {
  const mesh1 = new Mesh(geometry1);
  const mesh2 = new Mesh(geometry2);

  const csg1 = CSG.fromMesh(mesh1);
  const csg2 = CSG.fromMesh(mesh2);
  const resultCSG = csg2.union(csg1);
  const resultMesh = CSG.toMesh(resultCSG, mesh2.matrix);
  resultMesh.updateMatrix();
  const unionedGeometry = resultMesh.geometry;
  unionedGeometry.computeVertexNormals();
  return unionedGeometry;
};

export const differenceGeometry = (
  geometry1: BufferGeometry,
  geometry2: BufferGeometry
) => {
  const mesh1 = new Mesh(geometry1);
  const mesh2 = new Mesh(geometry2);

  const csg1 = CSG.fromMesh(mesh1);
  const csg2 = CSG.fromMesh(mesh2);
  const resultCSG = csg1.subtract(csg2);
  const resultMesh = CSG.toMesh(resultCSG, mesh1.matrix);
  resultMesh.updateMatrix();
  const differenceGeometry = resultMesh.geometry;
  differenceGeometry.computeVertexNormals();
  return differenceGeometry;
};
