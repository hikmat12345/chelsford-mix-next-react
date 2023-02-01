const initialState = {
  messageSent: false,
  loading: false,
};

const contactUsPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SEND_MESSAGE_REQUEST":
      return { ...state, loading: true };
    case "SEND_MESSAGE_RESPONSE":
      return {
        ...state,
        loading: false,
        messageSent: payload.error === true ? false : true,
      };
    case "SEND_MESSAGE_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_SEND_MESSAGE_FALSE":
      return { ...state, loading: false, messageSent: false };

    default:
      return state;
  }
};

export default contactUsPageReducer;
