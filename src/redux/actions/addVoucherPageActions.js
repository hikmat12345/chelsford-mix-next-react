import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const saveVoucher = ({ voucherCode, userId }) => {
  return fetchAction({
    type: "ADD_VOUCHER",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Voucher/AddVoucherByCustomer`,
    payload: JSON.stringify({
      userId,
      voucherCode,
    }),
  });
};

export const makeVoucherAddedResponseEmpty = () => {
  return {
    type: "MAKE_VOUCHER_ADDED_RESPONSE_EMPTY",
  };
};
