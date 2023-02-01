const initialState = {
  error: null,
  loading: false,
  addressSuggestions: [],
  placeDetails: [],
  saveAddressResponse: {},
};

const addAddressPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "ADDRESS_PREDICTIONS_REQUEST":
      return { ...state };
    case "ADDRESS_PREDICTIONS_RESPONSE":
      return {
        ...state,
        addressSuggestions:
          payload.error === true ? [] : payload.result.predictions,
      };
    case "ADDRESS_PREDICTIONS_ERROR":
      return { ...state, error: payload };

    case "GET_PLACE_DETAILS_REQUEST":
      return { ...state };
    case "GET_PLACE_DETAILS_RESPONSE":
      return {
        ...state,
        placeDetails: payload.error === true ? [] : payload.result.result,
      };
    case "GET_PLACE_DETAILS_ERROR":
      return { ...state, error: payload };

    case "SAVE_ADDRESS_REQUEST":
      return { ...state, loading: true };
    case "SAVE_ADDRESS_RESPONSE":
      return {
        ...state,
        loading: false,
        saveAddressResponse: payload,
      };
    case "SAVE_ADDRESS_ERROR":
      return { ...state, loading: false, error: payload };

    case "SET_SAVE_ADDRESS_RESPONSE_TO_EMPTY":
      return { ...state, saveAddressResponse: {} };

    default:
      return state;
  }
};

export default addAddressPageReducer;
