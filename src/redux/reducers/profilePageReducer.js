const initialState = {
  error: null,
  loading: false,
  passwordChanged: {},
};

const profilePageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "CHANGE_PASSWORD_REQUEST":
      return { ...state, loading: true };
    case "CHANGE_PASSWORD_RESPONSE":
      return {
        ...state,
        loading: false,
        passwordChanged: payload,
      };
    case "CHANGE_PASSWORD_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_PASSWORD_CHANGED_FALSE":
      return { ...state, loading: false, passwordChanged: {} };

    default:
      return { ...state };
  }
};

export default profilePageReducer;
