const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "REGISTER":
    case "LOGIN":
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: {
          id: payload.id,
          fullName: payload.fullName,
          role: payload.role
        },
        isAuthenticated: true,
      };
    case "AUTH_ERROR":
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
