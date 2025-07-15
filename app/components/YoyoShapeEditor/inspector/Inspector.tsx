/**
 * ヨーヨーの詳細データを表示するコンポーネント
 */

import classes from "./style.module.scss";
import { useState, type FC, type ReactNode } from "react";
import { useMaterialProperties } from "./useMaterialProperties";

const PRESETS = [
  { name: "PLA", filamentDensity: 1.25 },
  { name: "ABS", filamentDensity: 1.04 },
];

const InspectorRow: FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => (
  <tr>
    <td className={classes.overlay}>{label}:</td>
    <td className={classes.value}>{children}</td>
  </tr>
);

const InspectorPanel = ({ onClose }: { onClose: () => void }) => {
  const {
    filamentDensity,
    setFilamentDensity,
    infillRate,
    setInfillRate,
    volumeCm3,
    massG,
    momentOfInertia,
  } = useMaterialProperties();

  return (
    <div className={classes.overlay_form_box}>
      <table>
        <tbody>
          <InspectorRow label="Infill Rate">
            <input
              type="number"
              min={0}
              max={100}
              step={5}
              value={infillRate * 100}
              onChange={(e) => setInfillRate(Number(e.target.value) / 100)}
            />
          </InspectorRow>
          <InspectorRow label="Filament Density">
            <input
              type="number"
              min={0}
              value={filamentDensity}
              onChange={(e) => setFilamentDensity(Number(e.target.value))}
            />
            <var>
              g/cm<sup>3</sup>
            </var>
          </InspectorRow>
          <tr>
            <td />
            <td>
              <div>
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setFilamentDensity(preset.filamentDensity);
                    }}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </td>
          </tr>
          <InspectorRow label="Volume">
            {volumeCm3.toFixed(2)}{" "}
            <var>
              cm<sup>3</sup>
            </var>
          </InspectorRow>
          <InspectorRow label="Mass">
            {massG.toFixed(2)} <var>g</var>
          </InspectorRow>
          <InspectorRow label="Moment of Inertia">
            {momentOfInertia.toExponential(2)}{" "}
            <var>
              kg・m<sup>2</sup>
            </var>
          </InspectorRow>
        </tbody>
      </table>
      <div>
        <button onClick={onClose} className={classes.close_button}>
          <img src="/svg/close.svg" alt="close icon" width={"15rem"} />
        </button>
      </div>
    </div>
  );
};

export function Inspector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {!isOpen && (
        <button
          className={classes.button}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src="/svg/info.svg" alt="info icon" width={"25rem"} />
        </button>
      )}
      {isOpen && <InspectorPanel onClose={() => setIsOpen(false)} />}
    </div>
  );
}
