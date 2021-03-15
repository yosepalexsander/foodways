const cartReducer = (state, action) => {
  const {
    type,
    payload: { restaurant, ...product },
  } = action;
  switch (type) {
    case "ADD_PRODUCT":
      const findProductById = state.carts.find(
        (cart) => cart.id === product.id
      );
      if (findProductById) {
        const updatedProduct = state.carts.map((cart) =>
          cart.id === product.id
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
            ...product,
            qty: 1,
          },
        ],
        currentRestaurant: restaurant,
      };
    case "REMOVE_PRODUCT": {
      const updatedProduct = state.carts.map((cart) =>
        cart.id === product.id
          ? {
              ...cart,
              qty: cart.qty - 1,
            }
          : cart
      );
      return {
        ...state,
        carts: updatedProduct,
      };
    }
    case "REMOVE_CART":
      const filteredProduct = state.carts.filter(
        (cart) => cart.id !== product.id
      );
      return {
        ...state,
        carts: filteredProduct,
      };
    case "SAVE_TO_STORAGE":
      localStorage.setItem("user_cart", JSON.stringify(state, null, 2));
      break;
    default:
      throw new Error("dispacth type doesn't provided");
  }
};

export default cartReducer;
