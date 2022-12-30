const initialState = {
  timeSlots: [],
  loading: null,
  error: null,
  bookingEdited: false,
};

const bookingEditPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_EDIT_BOOKING_SLOTS_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_EDIT_BOOKING_SLOTS_DATA_RESPONSE":
      return {
        ...state,
        timeSlots: payload.availableSlots,
        loading: false,
      };
    case "GET_EDIT_BOOKING_SLOTS_DATA_ERROR":
      return { ...state, error: payload, loading: false };

    case "SAVE_EDITED_DATE_AND_TIME_REQUEST":
      return { ...state, loading: true };
    case "SAVE_EDITED_DATE_AND_TIME_RESPONSE":
      return {
        ...state,
        loading: false,
        bookingEdited: true,
      };
    case "SAVE_EDITED_DATE_AND_TIME_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_EDITED_DATE_TIME_NEXT_PAGE_FALSE":
      return { ...state, loading: false, bookingEdited: false, timeSlots: [] };

    default:
      return { ...state };
  }
};

export default bookingEditPageReducer;
