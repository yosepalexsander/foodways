const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ORDER_PENDING":
      return {
        ...state,
        history: [
          ...state.history,
          {
            id: Math.random() * 50,
            product: payload.product,
            total: payload.total,
            status: "Waiting Approve",
            date: payload.date,
            restaurant: payload.restaurant,
          },
        ],
      };
    case "ORDER_SUCCESS":
      return {
        ...state,
        history: [
          ...state.history,
          {
            id: Math.random() * 50,
            product: payload.product,
            total: payload.total,
            status: "Success",
            date: payload.date,
            restaurant: payload.restaurant,
          },
        ],
      };
    case "ORDER_CANCEL":
      const updatedOrder = state.history.map((order) =>
        order.id === payload.id
          ? {
              ...order,
              status: "Cancel",
            }
          : order
      );
      return {
        ...state,
        history: updatedOrder,
      };
    default:
      throw new Error("dispacth type doesn't provided");
  }
};

export default authReducer;
