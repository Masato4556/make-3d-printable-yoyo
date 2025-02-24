import { useMemo } from "react";
import { useYoyoPath } from "~/contexts/YoyoCurveContext";
import { GeometryFactory } from "../geometry/GeometryFactory";

// TODO: どのベアリングを選択したかなどのmodel-viewerとpath-viewerで共に用いるデータをproviderから取得できるようにする

export const useYoyoGeometry = function () {
  const bearingType = "sizeC"; // TODO: ベアリングの種類を選択できるようにする

  const { yoyoPath } = useYoyoPath();

  return useMemo(() => {
    const geometryFactory = new GeometryFactory(bearingType, yoyoPath);
    return {
      bearingSeatGeometry: geometryFactory.getBearingSeatGeometry(),
      wingGeometry: geometryFactory.getWingGeometry(),
    };
  }, [bearingType, yoyoPath]);
};
