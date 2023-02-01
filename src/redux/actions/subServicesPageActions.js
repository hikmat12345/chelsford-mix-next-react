import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSubServices = ({
  serviceName,
  userCountryId,
  isMainService,
}) => {
  return fetchAction({
    type: "GET_SUB_SERVICES_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Services/GetSubServiceByName/${serviceName}/${userCountryId}/${isMainService}`,
    verb: "GET",
  });
};
