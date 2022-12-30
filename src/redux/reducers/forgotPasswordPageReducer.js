const initialState = {
  error: "",
  loading: false,
  sendResetCodeResponse: {},
  verifyResetCodeResponse: {},
  resetPasswordResponse: {},
};

const forgotPasswordPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SEND_RESET_CODE_REQUEST":
      return { ...state, loading: true };
    case "SEND_RESET_CODE_RESPONSE":
      return {
        ...state,
        loading: false,
        sendResetCodeResponse: payload,
      };
    case "SEND_RESET_CODE_ERROR":
      return { ...state, error: payload, loading: false };

    case "VERIFY_RESET_CODE_REQUEST":
      return { ...state, loading: true };
    case "VERIFY_RESET_CODE_RESPONSE":
      return {
        ...state,
        loading: false,
        verifyResetCodeResponse: payload,
      };
    case "VERIFY_RESET_CODE_ERROR":
      return { ...state, error: payload, loading: false };

    case "RESET_PASSWORD_REQUEST":
      return { ...state, loading: true };
    case "RESET_PASSWORD_RESPONSE":
      return {
        ...state,
        loading: false,
        resetPasswordResponse: payload,
      };
    case "RESET_PASSWORD_ERROR":
      return { ...state, error: payload, loading: false };

    case "MAKE_SEND_RESET_CODE_FALSE":
      return { ...state, loading: false, sendResetCodeResponse: {} };

    case "MAKE_VERIFY_RESET_CODE_FALSE":
      return { ...state, loading: false, verifyResetCodeResponse: {} };

    case "MAKE_RESET_PASSWORD_FALSE":
      return { ...state, loading: false, resetPasswordResponse: {} };

    default:
      return { ...state };
  }
};

export default forgotPasswordPageReducer;
