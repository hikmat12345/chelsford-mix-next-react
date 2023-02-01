const initialState = {
  error: null,
  loading: true,
  subServices: [],
};

const subServicesPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_SUB_SERVICES_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SUB_SERVICES_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        subServices: payload.result,
      };
    case "GET_SUB_SERVICES_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default subServicesPageReducer;
