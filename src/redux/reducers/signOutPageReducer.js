const initialState = {
  error: null,
  loading: false,
  signoutFormResponse: {},
};

const signOutPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "AccountOut_REQUEST":
      return { ...state, loading: true };
    case "AccountOut_RESPONSE":
      return {
        ...state,
        signoutFormResponse: payload,
        loading: false,
      };
    case "AccountOut_ERROR":
      return { ...state, loading: false, error: payload };
 
    default:
      return state;
  }
};

export default signOutPageReducer;
