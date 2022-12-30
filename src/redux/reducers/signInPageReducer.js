const initialState = {
  error: null,
  loading: false,
  signInFormResponse: {},
};

const signInPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SIGN_IN_REQUEST":
      return { ...state, loading: true };
    case "SIGN_IN_RESPONSE":
      return {
        ...state,
        signInFormResponse: payload,
        loading: false,
      };
    case "SIGN_IN_ERROR":
      return { ...state, loading: false, error: payload };

    case "SET_SAVE_SIGN_IN_RESPONSE_TO_EMPTY":
      return { ...state, signInFormResponse: {} };

    default:
      return state;
  }
};

export default signInPageReducer;
