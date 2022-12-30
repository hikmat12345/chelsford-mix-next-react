const initialState = {
  error: null,
  loading: false,
  completedBookings: [],
};

const completedBookingsPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_COMPLETED_BOOKINGS_REQUEST":
      return { ...state, loading: true };
    case "GET_COMPLETED_BOOKINGS_RESPONSE":
      return {
        ...state,
        loading: false,
        completedBookings:
          payload.error === true ? [] : payload.completedbookingList,
      };
    case "GET_COMPLETED_BOOKINGS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default completedBookingsPageReducer;
