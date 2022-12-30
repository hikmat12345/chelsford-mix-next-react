import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_PAYMENT_VOUCHER;
const REACT_APP_MARKETING = process.env.REACT_APP_MARKETING
export const getServicesVouchers = (userId) => {
  return fetchAction({
    type: "GET_SERVICES_VOUCHERS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Voucher/GetActiveVoucherByUserId?id=${userId}`,
  });
};
 

export const GetVoucherByServiceId = (userId, serviceId) => {
  return fetchAction({
    type: "GET_SUMMARY_VOUCHERS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${REACT_APP_MARKETING}/Voucher/GetVoucherByServiceId?userId=${userId}&serviceId=${serviceId}`,
  });
};

export const GetServiceVoucherHistory = (userId ) => {
  return fetchAction({
    type: "GET_HISTORY_VOUCHERS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${REACT_APP_MARKETING}/Voucher/GetServiceVoucherHistory?userId=${userId}`,
  });
}; 