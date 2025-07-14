import { useState } from "react";
import { useInfo } from "./useInfo";

export const useMaterialProperties = (
  initialInfillRate = 0.9,
  initialFilamentDensity = 1.25
) => {
  const [filamentDensity, setFilamentDensity] = useState(
    initialFilamentDensity
  );
  const [infillRate, setInfillRate] = useState(initialInfillRate);
  const { volumeCm3, massG, momentOfInertia } = useInfo(
    infillRate,
    filamentDensity
  );

  return {
    filamentDensity,
    setFilamentDensity,
    infillRate,
    setInfillRate,
    volumeCm3,
    massG,
    momentOfInertia,
  };
};
