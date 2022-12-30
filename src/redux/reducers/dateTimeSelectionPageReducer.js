const initialState = {
  timeSlots: [],
  loading: null,
  error: null,
  nextPageDateTimeSelection: false,
};

const dateTimeSelectionPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    // case "GET_BOOKING_SLOTS_DATA_REQUEST":
    //   return { ...state, loading: true };
    // case "GET_BOOKING_SLOTS_DATA_RESPONSE":
    //   return {
    //     ...state,
    //      timeSlots: payload.timeSlots, 
    //     loading: false,
    //   };
    // case "GET_BOOKING_SLOTS_DATA_ERROR":
    //   return { ...state, error: payload, loading: false };

      case "GET_BOOKING_SLOTS_INHOUSE_REQUEST":
        return { ...state, loading: true };
      case "GET_BOOKING_SLOTS_INHOUSE_RESPONSE":
        return {
          ...state, 
          timeSlots: payload.result,
          loading: false,
        };
      case "GET_BOOKING_SLOTS_INHOUSE_ERROR":
        return { ...state, error: payload, loading: false };



    case "SAVE_DATE_AND_TIME_REQUEST":
      return { ...state, loading: true };
    case "SAVE_DATE_AND_TIME_RESPONSE":
      return {
        ...state,
        loading: false,
        nextPageDateTimeSelection: true,
      };
    case "SAVE_DATE_AND_TIME_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_DATE_TIME_NEXT_PAGE_FALSE":
      return {
        ...state,
        loading: false,
        nextPageDateTimeSelection: false,
        timeSlots: [],
      };
    default:
      return { ...state };
  }
};

export default dateTimeSelectionPageReducer;


