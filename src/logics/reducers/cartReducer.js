const cartReducer = (state, action) => {
  const {
    type,
    payload: { restaurantId, location, ...product } = {},
  } = action;
  switch (type) {
    case "ADD_PRODUCT":

      // Update product quantity if product id has already exist 
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

      if (state.restaurantId !== null && restaurantId !== state.restaurantId) {
        alert("You can just order from one restaurant at the time")
        return state
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
        restaurantId: restaurantId,
      };

    // reject action if restaurant id is not same
    case "REMOVE_PRODUCT":
      const updatedProduct = state.carts.map((cart) =>
        cart.id === product.id
          ? {
            ...cart,
            qty: cart.qty <= 1 ? cart.qty : cart.qty - 1,
          }
          : cart
      );
      return {
        ...state,
        carts: updatedProduct,
      };
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
    case "ADD_LOCATION":
      return {
        ...state,
        location
      }
    case "SUBMIT_CART":
      return {
        ...state,
        carts: [],
        restaurantId: null,
      };
    default:
      throw new Error("dispacth type doesn't provided");
  }
};

export default cartReducer;
