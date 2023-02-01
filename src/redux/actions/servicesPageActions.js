import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getServices = ({ industryName, userCountryId }) => {
  return fetchAction({
    type: "GET_SERVICES_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Services/GetServices/${industryName}/${userCountryId}`,
    verb: "GET",
  });
};
