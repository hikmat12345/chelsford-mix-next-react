const initialState = {
  error: null,
  loading: false,
  sessions: [],
};

const sessionSelectionPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_SERVICE_SESSIONS_REQUEST":
      return { ...state, loading: true };
    case "GET_SERVICE_SESSIONS_RESPONSE":
      return {
        ...state,
        sessions: payload.error === true ? [] : payload.serviceSessionsList,
        loading: false,
      };
    case "GET_SERVICE_SESSIONS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default sessionSelectionPageReducer;
