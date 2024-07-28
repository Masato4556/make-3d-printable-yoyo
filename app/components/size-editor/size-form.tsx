import {
  useYoyoSizeDispatch,
  useYoyoSizeState,
} from "~/contexts/YoyoSizeContext";

export function SizeForm() {
  const { diameter, width, trapezeWidth } = useYoyoSizeState();
  const yoyoSizeReducer = useYoyoSizeDispatch();

  return (
    <div className="overlay-form-box">
      <input
        type="number"
        defaultValue={diameter}
        onChange={(e) => {
          yoyoSizeReducer({
            type: "SET_DIAMETER",
            value: Number(e.target.value),
          });
        }}
      />
      <input
        type="number"
        defaultValue={width}
        onChange={(e) => {
          yoyoSizeReducer({
            type: "SET_WIDTH",
            value: Number(e.target.value),
          });
        }}
      />
      <input
        type="number"
        defaultValue={trapezeWidth}
        onChange={(e) => {
          yoyoSizeReducer({
            type: "SET_TRAPEZE_WIDTH",
            value: Number(e.target.value),
          });
        }}
      />
    </div>
  );
}
