/**
 * ヨーヨーの詳細データを表示するコンポーネント
 */

import { useInfo } from "./useInfo";
import classes from "./style.module.scss";
import { useState } from "react";

export function Inspector() {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: インフィル率と密度を設定できるようにする
  const [filamentDensity, setFilamentDensity] = useState(1.25); // フィラメントの密度 g/cm³
  const [infillRate, setInfillRate] = useState(0.9); // インフィル率（0.0〜1.0）
  const { volumeCm3, massG, momentOfInertia } = useInfo(
    infillRate,
    filamentDensity
  );

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
      {isOpen && (
        <div className={classes.overlay_form_box}>
          <table>
            <tr>
              <td className={classes.overlay}>Infill Rate:</td>
              <td className={classes.value}>
                <input
                  type="number"
                  min={0}
                  max={100}
                  step={5}
                  value={infillRate * 100}
                  onChange={(e) => setInfillRate(Number(e.target.value) / 100)}
                />
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>Filament Density:</td>
              <td className={classes.value}>
                <input
                  type="number"
                  min={0}
                  value={filamentDensity}
                  onChange={(e) => setFilamentDensity(Number(e.target.value))}
                />
                <var>
                  g/cm<sup>3</sup>
                </var>
              </td>
              <td>
                <div>
                  <button
                    onClick={() => {
                      setInfillRate(0.2);
                      setFilamentDensity(1.25);
                    }}
                  >
                    PLA
                  </button>
                  <button
                    onClick={() => {
                      setInfillRate(0.2);
                      setFilamentDensity(1.04);
                    }}
                  >
                    ABS
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>Volume:</td>
              <td className={classes.value}>
                {volumeCm3.toFixed(2)}{" "}
                <var>
                  cm<sup>3</sup>
                </var>
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>Mass:</td>
              <td className={classes.value}>
                {massG.toFixed(2)} <var>g</var>
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>Moment of Inertia:</td>
              <td className={classes.value}>
                {momentOfInertia.toExponential(2)}{" "}
                <var>
                  kg・cm<sup>2</sup>
                </var>
              </td>
            </tr>
          </table>
          <div>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className={classes.close_button}
            >
              <img src="/svg/close.svg" alt="close icon" width={"15rem"} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
