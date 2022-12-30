const initialState = {
  error: null,
  loading: false,
  servicesVouchers: [],
  summaryvoucher:[],
  voucherhistory:[]
};

const servicesVouchersPageReducer = (state = initialState, action) => {
 
  const { payload, type } = action;
  switch (type) {
    case "GET_SERVICES_VOUCHERS_REQUEST":
      return { ...state, loading: true };
    case "GET_SERVICES_VOUCHERS_RESPONSE":
      return {
        ...state,
        loading: false,
        servicesVouchers:
          payload,
      };
    case "GET_SERVICES_VOUCHERS_ERROR":
      return { ...state, loading: false, error: payload };
      case "GET_SUMMARY_VOUCHERS_REQUEST":
        return { ...state, loading: true };
      case "GET_SUMMARY_VOUCHERS_RESPONSE":
        return {
          ...state,
          loading: false,
          summaryvoucher:  payload,
        };
      case "GET_SUMMARY_VOUCHERS_ERROR":
        return { ...state, loading: false, error: payload };

        case "GET_HISTORY_VOUCHERS_REQUEST":
        return { ...state, loading: true };
      case "GET_HISTORY_VOUCHERS_RESPONSE":
        return {
          ...state,
          loading: false,
          voucherhistory:  payload,
        };
      case "GET_HISTORY_VOUCHERS_ERROR":
        return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default servicesVouchersPageReducer;
