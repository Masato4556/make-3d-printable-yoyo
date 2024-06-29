import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

type File = {
  blob: string;
  type: string;
};
interface ModelState {
  core: File;
  wing: File;
}

type Action =
  | { type: "SET_CORE"; payload: string }
  | { type: "SET_WING"; payload: string };

const initialState: ModelState = {
  core: {
    blob: "",
    type: "application/stl",
  },
  wing: {
    blob: "",
    type: "application/stl",
  },
};

const ModelStateContext = createContext<ModelState>(initialState);
const ModelDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

const modelReducer = (state: ModelState, action: Action) => {
  switch (action.type) {
    case "SET_CORE":
      return {
        ...state,
        core: { blob: action.payload, type: "application/stl" },
      };
    case "SET_WING":
      return {
        ...state,
        wing: { blob: action.payload, type: "application/stl" },
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
