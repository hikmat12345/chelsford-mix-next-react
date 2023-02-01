const initialState = {
  error: null,
  loading: false,
  services: [],
};

const servicesPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_SERVICES_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SERVICES_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        services: payload.services,
      };
    case "GET_SERVICES_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default servicesPageReducer;
