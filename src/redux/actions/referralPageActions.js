import { fetchAction } from "../utils";

const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

export const sendReferral = ({ email, userId, userCountry, phone, name }) => {
  return fetchAction({
    type: "SEND_REFERRAL",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_2}/Referral/SendReferral`,
    verb: "POST",
    payload: JSON.stringify({
      receiveremail: email,
      userid: parseInt(userId),
      iso: userCountry,
      isresendrequest: false,
      receivermobile: phone,
      receivername: name,
    }),
  });
};

export const getReferralDetails = ({ userCountry, userId }) => {
  return fetchAction({
    type: "GET_REFERRAL_DETAILS",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_2}/Referral/getreferralbonus?isoCode=${userCountry}&userid=${userId}`,
    verb: "GET",
  });
};

export const getReferralList = ({ pageNumber, pageSize, userId }) => {
  return fetchAction({
    type: "GET_SENT_REFERRAL_LIST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_2}/Referral/getreferrallist?pagesize=${pageSize}&pagenumber=${pageNumber}&userid=${userId}`,
    verb: "GET",
  });
};
