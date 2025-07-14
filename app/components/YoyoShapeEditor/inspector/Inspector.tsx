/**
 * ヨーヨーの詳細データを表示するコンポーネント
 */

import { useInfo } from "./useInfo";
import classes from "./style.module.scss";
import { useState } from "react";

export function Inspector() {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: インフィル率と密度を設定できるようにする
  const infillRate = 0.9; // インフィル率（0.0〜1.0）
  const density = 1.25 * infillRate; // PLAの密度 g/cm³
  const { volumeCm3, massG, momentOfInertia } = useInfo();

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
              <td className={classes.overlay}>
                Infill Rate:
              </td>
              <td className={classes.value}>
                {infillRate * 100}%
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>
                Density:
              </td>
              <td className={classes.value}>
                {density.toFixed(2)}
                <var>
                  g/cm<sup>3</sup>
                </var>
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>
                Volume:
              </td>
              <td className={classes.value}>
                {volumeCm3.toFixed(2)}{" "}
                <var>
                  cm<sup>3</sup>
                </var>
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>
                Mass:
              </td>
              <td className={classes.value}>
                {massG.toFixed(2)}{" "}
                <var>
                  g
                </var>
              </td>
            </tr>
            <tr>
              <td className={classes.overlay}>
                Moment of Inertia:
              </td>
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
