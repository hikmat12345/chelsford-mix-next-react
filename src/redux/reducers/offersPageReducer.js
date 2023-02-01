const initialState = {
  error: null,
  loading: false,
  offers: [],
};

const offersPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_OFFERS_REQUEST":
      return { ...state, loading: true };
    case "GET_OFFERS_RESPONSE":
      return {
        ...state,
        loading: false,
        offers: payload.error === true ? [] : payload.servicesList,
      };
    case "GET_OFFERS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};

export default offersPageReducer;
