import { createContext, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";

export const CartContext = createContext();

const initialState = {
  carts: [],
  restaurantId: null,
  location: {}
};
export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
