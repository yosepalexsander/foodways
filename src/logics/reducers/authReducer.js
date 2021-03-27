const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "REGISTER_SUCCESS":
    case "LOGIN_SUCCESS":
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
        isLoading: false
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
    default:
      throw new Error("dispacth type doesn't provided: ", type);
  }
};

export default authReducer;
