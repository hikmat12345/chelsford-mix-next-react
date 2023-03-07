const initialState = {
  userCountry: "",
  userCountryId: "",
  userId: "",
  userLat: 0,
  userLng: 0,
  notificationsList: [],
  legalInfo: "",
  loading: true,
  userCurrencyCode: "",
};

const defaultReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_USER_LOCATION_DATA_REQUEST":
      return { ...state };
    case "GET_USER_LOCATION_DATA_RESPONSE":
      return {
        ...state,
          userCountry: payload.country_code2,
        // userCountry:"GB",
        userLat: payload.latitude,
        userLng: payload.longitude,
      };
    case "GET_USER_LOCATION_DATA_ERROR":
      return { ...state, error: payload };

    case "GET_USER_LOCATION_ID_REQUEST":
      return { ...state };
    case "GET_USER_LOCATION_ID_RESPONSE":
      return {
        ...state,
        //  userCountryId: 1,
       userCountryId: payload.countryDetail.id,
        // userCurrencyCode: "GBP",

       userCurrencyCode: payload.countryDetail.currencyCode,
      };
    case "CHANGE_USER_LOCATION_ID_RESPONSE":
      return {
        ...state,
        // userCountryId: 1,
        userCurrencyCode: payload.currencyCode,
        // userCurrencyCode:"GBP",
         userCountry:payload.userCountry,
        // userCountry:"GB",
         userCountryId: payload.countryId, 
      };
    case "GET_USER_LOCATION_ID_ERROR":
      return { ...state, error: payload };

    case "GET_NOTIFICATIONS_LIST_REQUEST":
      return { ...state };
    case "GET_NOTIFICATIONS_LIST_RESPONSE":
      return {
        ...state,
        notificationsList: payload.error === true ? [] : payload.result,
      };
    case "GET_NOTIFICATIONS_LIST_ERROR":
      return { ...state, error: payload };

    case "GET_LEGAL_INFO_REQUEST":
      return { ...state, loading: true };
    case "GET_LEGAL_INFO_RESPONSE":
      return {
        ...state,
        legalInfo:
          payload.error === true ? "" : payload.leagalsList[0].description,
        loading: false,
      };
    case "GET_LEGAL_INFO_ERROR":
      return { ...state, error: payload, loading: false };

    case "SET_USER_ID":
      return {
        ...state,
        userId: payload,
      };

    default:
      return { ...state };
  }
};

export default defaultReducer;
