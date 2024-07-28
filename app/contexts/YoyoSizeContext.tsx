import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

interface YoyoSizeState {
  diameter: number;
  width: number;
  trapezeWidth: number;
}

type Action =
  | { type: "SET_DIAMETER"; value: number }
  | { type: "SET_WIDTH"; value: number }
  | { type: "SET_TRAPEZE_WIDTH"; value: number };

const initialState: YoyoSizeState = {
  diameter: 55,
  width: 45,
  trapezeWidth: 42,
};

const YoyoSizeStateContext = createContext<YoyoSizeState>(initialState);
const YoyoSizeDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

const yoyoSizeReducer = (state: YoyoSizeState, action: Action) => {
  switch (action.type) {
    case "SET_DIAMETER":
      return {
        ...state,
        diameter: action.value,
      };
    case "SET_WIDTH":
      return {
        ...state,
        width: action.value,
      };
    case "SET_TRAPEZE_WIDTH":
      return {
        ...state,
        trapezeWidth: action.value,
      };
    default:
      throw new Error(`Unknown action`);
  }
};

interface YoyoSizeProviderProps {
  children: ReactNode;
}

const YoyoSizeProvider = ({ children }: YoyoSizeProviderProps) => {
  const [state, dispatch] = useReducer(yoyoSizeReducer, initialState);

  return (
    <YoyoSizeStateContext.Provider value={state}>
      <YoyoSizeDispatchContext.Provider value={dispatch}>
        {children}
      </YoyoSizeDispatchContext.Provider>
    </YoyoSizeStateContext.Provider>
  );
};

const useYoyoSizeState = () => {
  const context = useContext(YoyoSizeStateContext);
  if (context === undefined) {
    throw new Error("useYoyoSizeState must be used within a YoyoSizeProvider");
  }
  return context;
};

const useYoyoSizeDispatch = () => {
  const context = useContext(YoyoSizeDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useYoyoSizeDispatch must be used within a YoyoSizeProvider"
    );
  }
  return context;
};

export { YoyoSizeProvider, useYoyoSizeState, useYoyoSizeDispatch };
