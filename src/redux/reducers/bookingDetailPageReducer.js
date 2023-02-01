const initialState = {
  error: null,
  loading: false,
  bookingDetails: {},
  bookingDeleted: false,
  bookingSessions: [],
  bookingVideos: [],
  bookingImages: [],
};

const bookingDetailPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_BOOKING_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "GET_BOOKING_DETAILS_RESPONSE":
      return {
        ...state,
        loading: false,
        bookingDetails: payload.error === true ? {} : payload.response[0],
        bookingDeleted: {},
        bookingImages: payload.statusCode !== 0 ? [] : payload.images,
        bookingVideos: payload.statusCode !== 0 ? [] : payload.videos,
      };
    case "GET_BOOKING_DETAILS_ERROR":
      return { ...state, loading: false, error: payload };

    case "DELETE_BOOKING_REQUEST":
      return { ...state, loading: true };
    case "DELETE_BOOKING_RESPONSE":
      return {
        ...state,
        loading: false,
        bookingDeleted: payload,
      };
    case "DELETE_BOOKING_ERROR":
      return { ...state, loading: false, error: payload };

    case "GET_BOOKING_SESSIONS_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "GET_BOOKING_SESSIONS_DETAILS_RESPONSE":
      return {
        ...state,
        loading: false,
        bookingSessions: payload.statusCode !== 0 ? [] : payload.bookingDetail,
        bookingDetails:
          payload.statusCode !== 0
            ? {}
            : payload.bookingDetail.find(
                ({ isCompleted }) => isCompleted === false
              ),
        bookingImages: payload.statusCode !== 0 ? [] : payload.images,
        bookingVideos: payload.statusCode !== 0 ? [] : payload.videos,
      };
    case "GET_BOOKING_SESSIONS_DETAILS_ERROR":
      return { ...state, loading: false, error: payload };

    case "GET_BOOKING_SELECTED_SESSION_DETAILS":
     
      return {
        ...state,
        loading: false,
        bookingDetails: payload.bookingSessions.find(
          ({ bookingId }) => bookingId === payload.bookingId
        ),
      };
      case "SET_DELETE_BOOKING_EMPTY":
        return { ...state,  bookingDeleted: {} };
    default:
      return state;
  }
};

export default bookingDetailPageReducer;
