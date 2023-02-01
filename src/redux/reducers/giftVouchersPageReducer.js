const initialState = {
  error: null,
  loading: false,
  giftVouchers: [],
  sendGiftVoucherResponse: {},
};

const giftVouchersPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_GIFT_VOUCHERS_REQUEST":
      return { ...state, loading: true };
    case "GET_GIFT_VOUCHERS_RESPONSE":
      return {
        ...state,
        loading: false,
        giftVouchers: payload.statusCode !== 0 ? [] : payload.giftVoucherList,
      };
    case "GET_GIFT_VOUCHERS_ERROR":
      return { ...state, loading: false, error: payload };

    case "SEND_GIFT_VOUCHER_REQUEST":
      return { ...state, loading: true };
    case "SEND_GIFT_VOUCHER_RESPONSE":
      return {
        ...state,
        loading: false,
        sendGiftVoucherResponse: payload,
      };
    case "SEND_GIFT_VOUCHER_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_GIFT_VOUCHER_RESPONSE_TO_EMPTY":
      return { ...state, loading: false, sendGiftVoucherResponse: {} };

    default:
      return state;
  }
};

export default giftVouchersPageReducer;
