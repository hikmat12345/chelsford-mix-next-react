const initialState = {
  error: null,
  loading: false,
  saveCardDataResponse: {},
};

const addPaymentCardPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "SAVE_CARD_DATA_REQUEST":
      return { ...state, loading: true };
    case "SAVE_CARD_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        saveCardDataResponse: payload,
      };
    case "SAVE_CARD_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    case "SET_CARD_DATA_RESPONSE_TO_EMPTY":
      return { ...state, saveCardDataResponse: {} };

    default:
      return state;
  }
};

export default addPaymentCardPageReducer;
