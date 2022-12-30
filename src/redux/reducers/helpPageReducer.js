const initialState = {
  error: null,
  loading: false,
  faqs: [],
};

const helpPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_FAQS_REQUEST":
      return { ...state, loading: true };
    case "GET_FAQS_RESPONSE":
      return {
        ...state,
        loading: false,
        faqs: payload.error === true ? [] : payload.result,
      };
    case "GET_FAQS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};

export default helpPageReducer;
