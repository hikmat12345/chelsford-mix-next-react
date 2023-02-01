import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getOffers = (userCountryId) => {
  return fetchAction({
    type: "GET_OFFERS",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Services/GetAllOfferedServices/${userCountryId}`,
    verb: "GET",
  });
};
