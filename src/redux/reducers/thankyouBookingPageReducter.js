const initialState = {
    error: null,
    loading: true,
    ThankYouBookingResponse: '',
  };
  
  const thankyouBookingPageReducter = (state = initialState, action) => {
    const { payload, type } = action; 

    switch (type) {
      case "GET_THANKYOU_BOOKING_REQUEST":
        return { ...state, loading: true };
      case "GET_THANKYOU_BOOKING_RESPONSE":
        return {
          ...state,
          loading: false,
          ThankYouBookingResponse: payload.booking ,
        };
      case "GET_THANKYOU_BOOKING_ERROR":
        return { ...state, loading: true, error: payload  };
      default:
        return state;
    }
  };
  
  export default thankyouBookingPageReducter;