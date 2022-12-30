const initialState = {
  error: null,
  loading: false,
  upcomingBookings: [],
};

const upcomingBookingsPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_UPCOMING_BOOKINGS_REQUEST":
      return { ...state, loading: true };
    case "GET_UPCOMING_BOOKINGS_RESPONSE":
      return {
        ...state,
        loading: false,
        upcomingBookings:
          payload.error === true ? [] : payload.upcommingbookingList,
      };
    case "GET_UPCOMING_BOOKINGS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default upcomingBookingsPageReducer;
