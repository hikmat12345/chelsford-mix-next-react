const initialState = {
  error: null,
  loading: false,
  sessionBookings: [],
  savesession:[],
  deleteSession:""
};

const sessionBookingsPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_SESSION_BOOKINGS_REQUEST":
      return { ...state, loading: true };
    case "GET_SESSION_BOOKINGS_RESPONSE":
      return {
        ...state,
        loading: false,
        sessionBookings:
          payload.error === true ? [] : payload.response,
      };
    case "GET_SESSION_BOOKINGS_ERROR":
      return { ...state, loading: false, error: payload };

      case "SAVE_SESSION_BOOKINGS_REQUEST":
        return { ...state, loading: true };
      case "SAVE_SESSION_BOOKINGS_RESPONSE":
        return {
          ...state,
          loading: false,
          savesession: payload,
        };
      case "SAVE_SESSION_BOOKINGS_ERROR":
        return { ...state, loading: false, error: payload };

        case "DELETE_SESSION_BOOKING_REQUEST":
          return { ...state, loading: true };
        case "DELETE_SESSION_BOOKING_RESPONSE":
          return {
            ...state,
            loading: false,
            deleteSession: payload,
          };
        case "DELETE_SESSION_BOOKING_ERROR":
          return { ...state, loading: false, error: payload };
        
    default:
      return state;
  }
};

export default sessionBookingsPageReducer;
