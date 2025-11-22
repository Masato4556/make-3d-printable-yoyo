import { create } from "zustand";
import { BufferGeometry } from "three";
import { Bearing, BEARING_SIZE } from "../models/yoyo/bearing";
import { YoyoShape } from "../models/yoyo/YoyoShape";
import { GeometryFactory } from "../components/ModelViewer/GeometryFactory/GeometryFactory";

type GeometryStore = {
  wingGeometry: BufferGeometry | undefined;
  bearing: Bearing;
  shoudUpdate: boolean;
};

type GeometryActions = {
  updateGeometry: (bearingType: "sizeC", shape: YoyoShape) => void;
  triggerUpdate: () => void;
};

export const useGeometryStore = create<GeometryStore & GeometryActions>(
  (set) => ({
    wingGeometry: new BufferGeometry(),
    bearing: BEARING_SIZE["sizeC"], // TODO: GeometryFactoryという名前なのにGeometryではないデータを扱っているので修正
    shoudUpdate: true, // 初回は必ず更新する
    updateGeometry: (bearingType: "sizeC", shape: YoyoShape) => {
      const path = shape.getPath();
      const geometryFactory = new GeometryFactory(bearingType, path);
      const newWingGeometry = geometryFactory.getWingGeometry();
      set({
        wingGeometry: newWingGeometry,
        bearing: geometryFactory.getBearing(),
        shoudUpdate: false, // 更新完了したのでfalseにする
      });
    },
    triggerUpdate: () => {
      set({ shoudUpdate: true });
    },
  })
);
