import { createContext, useReducer } from "react";

import authReducer from "../reducers/authReducer";

export const UserContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
