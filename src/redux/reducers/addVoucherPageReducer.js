const initialState = {
  error: null,
  loading: false,
  voucherAddedResponse: {},
};

const addVoucherPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "ADD_VOUCHER_REQUEST":
      return { ...state, loading: true };
    case "ADD_VOUCHER_RESPONSE":
      return {
        ...state,
        loading: false,
        voucherAddedResponse: payload,
      };
    case "ADD_VOUCHER_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_VOUCHER_ADDED_RESPONSE_EMPTY":
      return { ...state, loading: false, voucherAddedResponse: {} };

    default:
      return state;
  }
};

export default addVoucherPageReducer;
