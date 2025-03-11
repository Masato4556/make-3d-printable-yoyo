/**
 * ダウンロードするモデルデータを管理するコンテキスト
 */

import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

interface ModelState {
  bearingSeat: Blob | undefined;
  wing: Blob | undefined;
}

type Action =
  | { type: "SET_BEARING_SEAT"; payload: string }
  | { type: "SET_WING"; payload: string };

const initialState: ModelState = { bearingSeat: undefined, wing: undefined };

const ModelStateContext = createContext<ModelState>(initialState);
const ModelDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

const modelReducer = (state: ModelState, action: Action): ModelState => {
  switch (action.type) {
    case "SET_BEARING_SEAT":
      return {
        ...state,
        bearingSeat: new Blob([action.payload], { type: "application/stl" }),
      };
    case "SET_WING":
      return {
        ...state,
        wing: new Blob([action.payload], { type: "application/stl" }),
      };
    default:
      throw new Error(`Unknown action`);
  }
};

interface ModelProviderProps {
  children: ReactNode;
}

const ModelProvider = ({ children }: ModelProviderProps) => {
  const [state, dispatch] = useReducer(modelReducer, initialState);

  return (
    <ModelStateContext.Provider value={state}>
      <ModelDispatchContext.Provider value={dispatch}>
        {children}
      </ModelDispatchContext.Provider>
    </ModelStateContext.Provider>
  );
};

const useModelState = () => {
  const context = useContext(ModelStateContext);
  if (context === undefined) {
    throw new Error("useModelState must be used within a ModelProvider");
  }
  return context;
};

const useModelDispatch = () => {
  const context = useContext(ModelDispatchContext);
  if (context === undefined) {
    throw new Error("useModelDispatch must be used within a ModelProvider");
  }
  return context;
};

export { ModelProvider, useModelState, useModelDispatch };
