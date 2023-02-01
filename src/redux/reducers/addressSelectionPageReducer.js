const initialState = {
  error: null,
  loading: false,
  loading_address:false,
  addresses: [],
  bookingId: "",
  cartId: "",
  nextPage: false,
  userHomeAddresses: [],
  checkServiceavailabiltiyData:"",
  defaultPaymentMethod:"",
  destroyPaymentMethod:""

};

const addressSelectionPageReducer = (state = initialState, action) => {
 
  const { payload, type } = action; 
  switch (type) {
    case "GET_ADDRESSES_FOR_BOOKING_REQUEST":
      return { ...state, loading: true };
    case "GET_ADDRESSES_FOR_BOOKING_RESPONSE":
      return {
        ...state,
        loading: false,
        addresses: payload.code !== 0 ? [] : payload.timeSlots,
     
      };
    case "GET_ADDRESSES_FOR_BOOKING_ERROR":
      return { ...state, loading: false, error: payload };

      case "GET_ADDRESSES_LIST_REQUEST":
        return { ...state, loading_address: true };
      case "GET_ADDRESSES_LIST_RESPONSE":
        return {
          ...state,
           loading_address: false,
           addresses: payload.statusCode !== 0 ? [] : payload.addressesList
        };
      case "GET_ADDRESSES_LIST_ERROR":
        return { ...state, loading_address: true, error: payload };

    case "GET_USER_HOME_ADDRESSES_REQUEST":
      return { ...state, loading: true };
    case "GET_USER_HOME_ADDRESSES_RESPONSE":
      return {
        ...state,
        loading: false,
        userHomeAddresses:
          payload.code !== 0 ? [] : payload.timeSlots,
      };
    case "GET_USER_HOME_ADDRESSES_ERROR":
      return { ...state, loading: false, error: payload };

    case "SAVE_ADDRESS_FOR_BOOKING_REQUEST":
      return { ...state, loading: true };
    case "SAVE_ADDRESS_FOR_BOOKING_RESPONSE":
   
      return {
        ...state,
        loading: false,
        bookingId: payload.tempBookingID,
        cartId: payload.cartId,
        nextPage: true,
      };
    case "SAVE_ADDRESS_FOR_BOOKING_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_NEXT_PAGE_FALSE":
      return { ...state, loading: false, nextPage: false };

    case "CHECK_SERVICES_AVAILABILITY_REQUEST":
      return { ...state, loading: true };
    case "CHECK_SERVICES_AVAILABILITY_RESPONSE":
      return {
        ...state,  loading: false,  checkServiceavailabiltiyData: payload,
      };
    case "CHECK_SERVICES_AVAILABILITY_ERROR":
      return { ...state, loading: false, error: payload };

      case "ADD_DEFAULT_PAYMENT_METHOD_REQUEST":
        return { ...state, loading: true };
      case "ADD_DEFAULT_PAYMENT_METHOD_RESPONSE":
        return {
          ...state,  loading: false,  defaultPaymentMethod: payload,
        };
      case "ADD_DEFAULT_PAYMENT_METHOD_ERROR":
        return { ...state, loading: false, error: payload };

        case "REMOVE_PAYMENT_METHOD_REQUEST":
          return { ...state, loading: true };
        case "REMOVE_PAYMENT_METHOD_RESPONSE":
          return {
            ...state,  loading: false,  destroyPaymentMethod: payload,
          };
        case "REMOVE_PAYMENT_METHOD_ERROR":
          return { ...state, loading: false, error: payload };
 
    default:
      return state;
  }
};

export default addressSelectionPageReducer;
