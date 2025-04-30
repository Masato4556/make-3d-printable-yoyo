/**
 * ヨーヨーの詳細データを表示するコンポーネント
 */

import { useInfo } from "./useInfo";
import classes from "./style.module.scss";
import { useState } from "react";

export function Inspector() {
  const [isOpen, setIsOpen] = useState(false);
  const { volumeCm3 } = useInfo();
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
          <div>
            Volume: {volumeCm3.toFixed(2)}{" "}
            <var>
              cm<sup>3</sup>
            </var>
          </div>
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
