import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from "react";

interface FormState {
  diameter: number;
  width: number;
}

type Action =
  | { type: "SET_DIAMETER"; payload: string }
  | { type: "SET_WIDTH"; payload: string };

const initialState: FormState = {
  diameter: 55,
  width: 55,
};

const FormStateContext = createContext<FormState | undefined>(undefined);
const FormDispatchContext = createContext<Dispatch<Action> | undefined>(
  undefined
);

const formReducer = (state: FormState, action: Action) => {
  const num = Number(action.payload);
  if (isNaN(num)) {
    throw new Error(`Invalid number: ${action.payload}`);
  }

  switch (action.type) {
    case "SET_DIAMETER":
      return { ...state, diameter: num };
    case "SET_WIDTH":
      return { ...state, width: num };
    default:
      throw new Error(`Unknown action`);
  }
};

interface FormProviderProps {
  children: ReactNode;
}

const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormStateContext.Provider value={state}>
      <FormDispatchContext.Provider value={dispatch}>
        {children}
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  );
};

const useFormState = () => {
  const context = useContext(FormStateContext);
  if (context === undefined) {
    throw new Error("useFormState must be used within a FormProvider");
  }
  return context;
};

const useFormDispatch = () => {
  const context = useContext(FormDispatchContext);
  if (context === undefined) {
    throw new Error("useFormDispatch must be used within a FormProvider");
  }
  return context;
};

export { FormProvider, useFormState, useFormDispatch };
