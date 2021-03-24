import { createContext, useReducer } from "react";

import orderReducer from "../reducers/orderReducer";

export const OrderContext = createContext();

const initialState = {
  history: [],
};
export const OrderContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};
