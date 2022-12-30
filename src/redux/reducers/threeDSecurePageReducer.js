 const initialState = { 
    loading: false,
    doPayMentResponse: [],
  };
  
  const threeDSecureReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case "THREE_D_SECURE_REQUEST":
        return { ...state, loading: true };
        case "THREE_D_SECURE_RESPONSE":
        return {
          ...state,
          loading: false,
          doPayMentResponse: payload,
        };
        case "THREE_D_SECURE_ERROR":
        return { ...state, loading: true,  };
  
      default:
        return state;
    }
  };
  
  export default threeDSecureReducer;