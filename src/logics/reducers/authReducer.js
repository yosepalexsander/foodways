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
          image: payload.image,
          role: payload.role,
          location: {},
        },
        isAuthenticated: true,
        isLoading: false
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: true
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        user: payload,
      };
    case "ADD_LOCATION":
      return {
        ...state,
        user: {
          ...state.user,
          location: { ...payload.location },
        }
      }
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
