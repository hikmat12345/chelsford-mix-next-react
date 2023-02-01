import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const PAYMENT_VOUCHER= process.env.REACT_APP_PAYMENT_VOUCHER

 


export const getGiftVouchers = (userId) => {
  return fetchAction({
    type: "GET_GIFT_VOUCHERS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${PAYMENT_VOUCHER}/Voucher/GetVoucherByUserId?id=${userId}`,
  });
};

export const sendGiftVoucher = ({ email, userId, amount, voucherCode }) => {
  return fetchAction({
    type: "SEND_GIFT_VOUCHER",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Voucher/SendGiftVoucher`,
    payload: JSON.stringify({
      VoucherCode: voucherCode,
      UserId: parseInt(userId),
      CreatedForEmail: email,
      Amount: amount,
    }),
  });
};

export const makeGiftVoucherResponseToEmpty = () => {
  return {
    type: "MAKE_GIFT_VOUCHER_RESPONSE_TO_EMPTY",
  };
};
