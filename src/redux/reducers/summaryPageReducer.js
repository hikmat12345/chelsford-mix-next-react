const initialState = {
  error: null,
  loading: false,
  summary: [],
  saveBookingResponse: {},
  voucherList: [],
  holdpaymentData:{},
  createBookingResp:{},
  disocuntLoading:false
};

const summaryPageReducer = (state = initialState, action) => { 
  const { payload, type } = action;
  switch (type) {
    case "GET_SUMMARY_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SUMMARY_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        summary: payload.summary,
      };
    case "GET_SUMMARY_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    case "SAVE_BOOKING_REQUEST":
      return { ...state, loading: true };
    case "SAVE_BOOKING_RESPONSE":
      return {
        ...state,
        loading: false,
        saveBookingResponse: payload,
      };
    case "SAVE_BOOKING_ERROR":
      return { ...state, loading: false, error: payload };

    case "GET_VOUCHER_LIST_REQUEST":
      return { ...state, loading: true };
    case "GET_VOUCHER_LIST_RESPONSE":
      return {
        ...state,
        loading: false,
        voucherList: payload.statusCode !== 0 ? [] : payload.voucherList,
      };
    case "GET_VOUCHER_LIST_ERROR":
      return { ...state, error: payload, loading: false };

      case "HOLD_PAYMENT_REQUEST":
        return { ...state, loading: true };
      case "HOLD_PAYMENT_RESPONSE": 
        return {
          ...state,
          loading: false,
          holdpaymentData:  payload,
        };
      case "HOLD_PAYMENT_ERROR":
        return { ...state, error: payload, loading: false };
      
        case "CREATE_BOOKING_REQUEST":
          return { ...state, loading: true };
        case "CREATE_BOOKING_RESPONSE": 
          return {
            ...state,
            loading: false,
            createBookingResp:  payload,
          };
        case "CREATE_BOOKING_ERROR":
          return { ...state, error: payload, loading: false };

       case "SET_SAVE_BOOKING_RESPONSE_TO_EMPTY":
        return { ...state, loading: false, saveBookingResponse: {} };
       case "SET_HOLD_PAYMENT_RESPONSE_TO_EMPTY":
        return { ...state, loading: false, holdpaymentData: {} };
        case "SET_CREATEBOOKING_PAYMENT_RESPONSE_TO_EMPTY":
        return { ...state, loading: false,   createBookingResp:{} };
       
        case "SALES_GET_INVOICE_REQUEST":
          return { ...state, loading: true };
        case "SALES_GET_INVOICE_RESPONSE":
          return {
            ...state,
            loading: false,
            getInvoiceResponse: payload,
          };
        case "SALES_GET_INVOICE_ERROR":
          return { ...state, error: payload, loading: false };
    
          case "SALES_ORDER_REQUEST":
          return { ...state, loading: true };
        case "SALES_ORDER_RESPONSE":
          return {
            ...state,
            loading: false,
            salesOrder: payload,
          };
        case "SALES_ORDER_ERROR":
          return { ...state, error: payload, loading: false };
          case "APPLY_DISCOUNT_CODE_REQUEST":
            return { ...state, loading: true , disocuntLoading:true};
          case "APPLY_DISCOUNT_CODE_RESPONSE":
            return {
              ...state,
              loading: false,
              disocuntLoading:false,
              discountPayload: payload,
            };
          case "APPLY_DISCOUNT_CODE_ERROR":
            return { ...state, error: payload, loading: true,  disocuntLoading:true };
         case "SET_DIDSCOUNT_CODE_OBJ_TO_EMPTY":
              return { ...state, loading: false, discountPayload:{}, disocuntLoading:false };
            
    default:
      return state;
  }
};

export default summaryPageReducer;
