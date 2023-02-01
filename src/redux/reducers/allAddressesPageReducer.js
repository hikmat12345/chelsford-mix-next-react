const initialState = {
  error: null,
  loading: false,
  allAddresses: [],
  addressDeleted: false,
};

const allAddressesPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_ALL_ADDRESSES_REQUEST":
      return { ...state, loading: true };
    case "GET_ALL_ADDRESSES_RESPONSE":
      return {
        ...state,
        loading: false,
        allAddresses: payload.addressesList,
        addressDeleted: false,
      };
    case "GET_ALL_ADDRESSES_ERROR":
      return { ...state, loading: false, error: payload };

    case "DELETE_ADDRESS_REQUEST":
      return { ...state, loading: true };
    case "DELETE_ADDRESS_RESPONSE":
      return {
        ...state,
        loading: false,
        addressDeleted: payload.error === true ? false : true,
      };
    case "DELETE_ADDRESS_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default allAddressesPageReducer;
