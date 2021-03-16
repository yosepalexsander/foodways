const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      localStorage.setItem("user login", JSON.stringify(payload));
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        user: payload,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        user: {
          ...state.user,
          products: [
            ...state.user.products,
            {
              id: Math.random() * 50,
              price: parseInt(payload.price),
              ...payload,
            },
          ],
        },
      };

    default:
      throw new Error("dispacth type doesn't provided");
  }
};

export default authReducer;
