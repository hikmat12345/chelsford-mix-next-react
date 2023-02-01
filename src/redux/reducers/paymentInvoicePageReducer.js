const initialState = {
  error: null,
  loading: false,
  salesOrderinvoice: {},
  saveOneTimeCardDataResponse:{} 
};

const salesOrderinvoiceRedcuer = (state = initialState, action) => {
  const { payload, type } = action;
 
  switch (type) {
    case "SALES_ORDER_INVOICE_REQUEST":
      return { ...state, loading:true };
    case "SALES_ORDER_INVOICE_RESPONSE": 
      return {
        ...state,
        salesOrderinvoice: payload,
        loading:false
      };
    case "SALES_ORDER_INVOICE_ERROR":
      return { ...state, error: payload, loading:true };
   
      case "ADD_ONETIME_CARD_DATA_REQUEST":
        return { ...state, loading: true };
      case "ADD_ONETIME_CARD_DATA_RESPONSE":
        return {
          ...state,
          loading: false,
          saveOneTimeCardDataResponse: payload,
        };
      case "ADD_ONETIME_CARD_DATA_ERROR":
        return { ...state, loading: false, error: payload };
   
    default:
      return state;
  }
};

export default salesOrderinvoiceRedcuer;
