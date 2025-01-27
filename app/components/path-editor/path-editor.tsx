/**
 * ヨーヨーのパスエディターのトップレベルコンポーネント
 */
import { Inspector } from "./inspector/inspector";
import { CurveEditor } from "./curves/CurveEditor";

type Props = {
  hidden: boolean;
};

export function PathEditor(props: Props) {
  const { hidden } = props;

  return (
    <>
      <CurveEditor />
      {!hidden && <Inspector />}
    </>
  );
}
