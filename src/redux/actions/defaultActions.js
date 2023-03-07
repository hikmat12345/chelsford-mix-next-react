import { fetchAction } from "../utils";

const GEO_LOCATION_API_KEY = process.env.REACT_APP_GEO_LOCATION_API_KEY;
const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

export const getUserLocation = () => {
  return fetchAction({
    type: "GET_USER_LOCATION_DATA",
    endpoint: `https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_LOCATION_API_KEY}`,
    verb: "GET",
  });
};
// export const setSignInResponseToEmpty = () => {
//   // return {
//   //   type: "GET_USER_LOCATION_DATA",
//   // };
 
// return fetchAction({
//   type: "GET_USER_LOCATION_DATA",
//   endpoint: `https://api.ipgeolocation.io/ipgeo?apiKey=${GEO_LOCATION_API_KEY}`,
//   verb: "GET",
// });
// }
export const getUserLocationId = (userCountry) => {
  return fetchAction({
    type: "GET_USER_LOCATION_ID",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Country/GetCountryDetail/${userCountry}/0`,
    verb: "GET",
  });
};

export const setUserId = (id) => {
  return {
    type: "SET_USER_ID",
    payload: id,
  };
};

export const getNotificationsList = (userId) => {
  return fetchAction({
    type: "GET_NOTIFICATIONS_LIST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_2}/Notification/getcustomernotifications?id=${userId}`,
    verb: "GET",
  });
};

export const getLegalInformation = ({ userCountryId, type }) => {
  return fetchAction({
    type: "GET_LEGAL_INFO",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Leagal?countryId=${userCountryId}&Type=${type}`,
    verb: "GET",
  });
};
