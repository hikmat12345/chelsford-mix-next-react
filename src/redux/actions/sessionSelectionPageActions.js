import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getServiceSessions = ({ serviceId, userCountryId }) => {
  return fetchAction({
    type: "GET_SERVICE_SESSIONS",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/ServiceTypeSession/GetServiceSessionsWithPrice/${serviceId}/${userCountryId}/get`,
    verb: "GET",
  });
};
