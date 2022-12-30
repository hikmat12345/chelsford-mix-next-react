import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL_2;

export const getFaqs = ({ pageNumber, userCountry }) => {
  return fetchAction({
    type: "GET_FAQS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/FAQs/Customer?pagenumber=${pageNumber}&pagesize=100&isCustomer=true&IsoCode=${userCountry}`,
  });
};
