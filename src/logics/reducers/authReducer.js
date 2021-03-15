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

    default:
      throw new Error("dispacth type doesn't provided");
  }
};

export default authReducer;
