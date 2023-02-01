const initialState = {
  error: null,
  loading: false,
  cardList: [],
  cardDeleted: false,
  defaultCardId: "",
};

const paymentDetailsPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_CARD_LIST_REQUEST":
      return { ...state, loading: true };
    case "GET_CARD_LIST_RESPONSE":
      return {
        ...state,
        loading: false,
        cardList: payload.error === true ? [] : payload?.paymentList?.data,
        defaultCardId: payload.error === true ? [] : payload,
        cardDeleted: false,
      };
    case "GET_CARD_LIST_ERROR":
      return { ...state, loading: false, error: payload };

    case "DELETE_CARD_REQUEST":
      return { ...state, loading: true };
    case "DELETE_CARD_RESPONSE":
      return {
        ...state,
        loading: false,
        cardDeleted: payload.error === true ? false : true,
      };
    case "DELETE_CARD_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_CARD_DEFAULT_REQUEST":
      return { ...state, loading: true };
    case "MAKE_CARD_DEFAULT_RESPONSE":
     
      return {
        ...state,
        loading: false,
        // cardDeleted: payload.error === true ? false : true,
        defaultCardData:payload
      };
    case "MAKE_CARD_DEFAULT_ERROR":
      return { ...state, loading: false, error: payload };
    case "SET_DEFAULT_CARD_OBJ_RESPONSE": 
        return {    ...state,   loading: false,  defaultCardData:{}
      };
    default:
      return state;
  }
};

export default paymentDetailsPageReducer;
