const initialState = {
  error: null,
  loading: false,
  subIdustries: [],
};

const subIndustriesPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_SUB_INDUSTRIES_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SUB_INDUSTRIES_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        subIndustries: payload.subIndustries,
      };
    case "GET_SUB_INDUSTRIES_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default subIndustriesPageReducer;
