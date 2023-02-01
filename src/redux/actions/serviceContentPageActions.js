import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getServiceDetail = ({ serviceName, userCountryId, isMobile }) => {
  console.log("you hit ")
  return fetchAction({
    type: "GET_SERVICE_CONTENT_PAGE_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/OneCall/GetAllByServiceNameFrontEnd/${serviceName}/${userCountryId}/${isMobile}`,
    verb: "GET",
  });
};
