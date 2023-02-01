const initialState = {
  error: null,
  loading: false,
  verifyCodeResponse: {},
};

const CodeVerificationPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "VERIFY_CODE_REQUEST":
      return { ...state, loading: true };
    case "VERIFY_CODE_RESPONSE":
      return {
        ...state,
        loading: false,
        verifyCodeResponse: payload,
      };
    case "VERIFY_CODE_ERROR":
      return { ...state, loading: false, error: payload };

    case "SET_VERIFY_CODE_RESPONSE_TO_EMPTY":
      return { ...state, verifyCodeResponse: {} };

    default:
      return state;
  }
};

export default CodeVerificationPageReducer;
