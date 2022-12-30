import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

export const getHomePageData = ({ userCountryId, isMobile }) => {
  return fetchAction({
    type: "GET_HOME_PAGE_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/onecall/all/${userCountryId}/${isMobile}`,
    verb: "GET",
  });
};

export const getIndustries = (userCountryId, vale) => {
  return fetchAction({
    type: "GET_INDUSTRIES_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Industry/1/${userCountryId}/true`,
    verb: "GET",
  });
};

export const getOnlyForYouServices = ({ 
  email,
  pageNumber,
  pageSize,
  userCountry,
}) => { 
  return fetchAction({
    type: "GET_ONLY_FOR_YOU_SERVICES_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/OneCall/GetPreferences?email=${email}&pageNumber=${pageNumber}&pageSize=${pageSize}&countryISO_Code=${userCountry}`,
    verb: "GET",
  });
};
export const getAllServicesAction=(countryid, pagenumber, rowsofpage )=>{
  return fetchAction({
    type :"GET_ALL_SERVICES",
    headers: { contentType: "includeBearer"},
    endpoint:`${APP_BASE_URL}/Services/GetAllServicesForHomePage/${  countryid !==undefined  || countryid !==null || countryid !==false ?countryid:1 }/${pagenumber !==undefined  || pagenumber !==null?pagenumber:1}/${rowsofpage }`,
    verb:"GET"
  });
};
 
export const getSearchResults = ({ value, userCountryId }) => {
  return fetchAction({
    type: "GET_SEARCH_RESULTS",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_2}/Service/SearchService`,
    verb: "POST",
    payload: JSON.stringify({
      search: value,
      country: userCountryId,
    }),
  });
};
