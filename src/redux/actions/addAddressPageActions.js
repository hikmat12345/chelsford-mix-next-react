import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

export const getAddressSuggestions = (value) => {
  return fetchAction({
    type: "ADDRESS_PREDICTIONS",
    headers: { contentType: "includeBearer"},
    verb: "GET",
    endpoint: `${APP_BASE_URL}/GoogleApi/predictions/${value}/${GOOGLE_MAP_API_KEY}`,
  });
};

export const getPlaceDetails = (placeId) => {
  return fetchAction({
    type: "GET_PLACE_DETAILS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/GoogleApi/placedetails/${placeId}/${GOOGLE_MAP_API_KEY}`,
  });
};

export const saveAddress = ({
  userId,
  addressId,
  suggestionForProvider,
  lat,
  lng,
  radius,
  addressoperation,
  postCode,
  addressNickName,
  buildingNumber,
  streetAddress,
  city,
}) => {
  return fetchAction({
    type: "SAVE_ADDRESS",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Providers/Address/${addressoperation}`,
    payload: JSON.stringify({
      UserID: userId,
      PostalCode: postCode,
      Address: suggestionForProvider,
      Line1: addressNickName,
      Line2: `${buildingNumber} ${streetAddress}`,
      TownCity: city,
      latitude: lat,
      longitude: lng,
      Radius: radius,
      isResidentialAddress: true,
      isActive: true,
      ID: addressId,
    }),
  });
};

export const setSaveAddressResponseToEmpty = () => {
  return {
    type: "SET_SAVE_ADDRESS_RESPONSE_TO_EMPTY",
  };
};
