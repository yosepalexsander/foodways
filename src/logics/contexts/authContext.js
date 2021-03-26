import { createContext, useMemo, useReducer } from "react";

import authReducer from "../reducers/authReducer";

export const UserContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const providerValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
};
