import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getPointsVouchers = (userId) => {
  return fetchAction({
    type: "GET_POINTS_VOUCHERS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Voucher/GetVoucherListByType/${userId}/0`,
  });
};
