const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TO_CART":
      const findProductById = state.carts.find(
        (cart) => cart.id === payload.id
      );
      if (findProductById) {
        const updatedProduct = state.carts.map((cart) =>
          cart.id === payload.id
            ? {
                ...cart,
                qty: cart.qty + 1,
              }
            : cart
        );
        return {
          ...state,
          carts: updatedProduct,
        };
      }
      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...payload,
            qty: 1,
          },
        ],
      };
    case "REMOVE_CART":
      const filteredProduct = state.carts.filter(
        (cart) => cart.id !== payload.id
      );
      return {
        ...state,
        carts: filteredProduct,
      };
    case "SAVE_TO_STORAGE":
      localStorage.setItem("user_cart", JSON.stringify(state, null, 2));
      break;
    default:
      throw new Error();
  }
};

export default cartReducer;
