const initialState = {
  timeSlots: [], 
  clinicTimeSlots:[],
  clinicslotLoading:false,
  alternatetimeSlots: [], 
  loading: null,
  error: null,
  nextPageDateTimeSelection: false,
  success:null, 
};

const dateTimeSelectionForClinicsReducer = (state = initialState, action) => {
  const { payload, type } = action; 
  switch (type) {
    case "GET_BOOKING_SLOTS_DATA_REQUEST":
      return { ...state, clinicslotLoading: true };
    case "GET_BOOKING_SLOTS_DATA_RESPONSE":
      return {
        ...state,
        clinicTimeSlots: payload.timeSlots,
        clinicslotLoading: false,
      };
    case "GET_BOOKING_SLOTS_DATA_ERROR":
      return { ...state, error: payload, clinicslotLoading: false };

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
    
      case "GET_ALTERNATE_BOOKING_SLOTS_DATA_REQUEST":
        return { ...state, loading: true };
      case "GET_ALTERNATE_BOOKING_SLOTS_DATA_RESPONSE":
        return {
          ...state,
          alternatetimeSlots: payload.timeSlots,
          loading: false,
        };
      case "GET_ALTERNATE_BOOKING_SLOTS_DATA_ERROR":
        return { ...state, error: payload, loading: false };

      case "SAVE_ALTERNET_BOOKING_REQUEST":
        return { ...state, loading: true };
      case "SAVE_ALTERNET_BOOKING_RESPONSE":
        return {
          ...state,
          success: payload,
          loading: false,
        };
      case "SAVE_ALTERNET_BOOKING_ERROR":
        return { ...state, error: payload, loading: false };
 
    default:
      return { ...state };
  }
};

export default dateTimeSelectionForClinicsReducer;
