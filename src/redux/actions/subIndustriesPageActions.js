import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSubIndustries = ({ industryName, userCountryId }) => {
  return fetchAction({
    type: "GET_SUB_INDUSTRIES_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Industry/GetSubIndustries/${industryName}/${userCountryId}`,
    verb: "GET",
  });
};
