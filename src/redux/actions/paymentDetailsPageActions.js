import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_PAYMENT = process.env.REACT_APP_PAYMENT_VOUCHER;
export const getCardList = (email) => {
  return fetchAction({
    type: "GET_CARD_LIST",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_PAYMENT}/Payment/ListOfCustomerPaymentMethods?Email=${email}`,
  });
};

export const deleteCard = ({ userId, paymentMethodId }) => {
  return fetchAction({
    type: "DELETE_CARD",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_PAYMENT}/Payment/RemovePaymentMethod`,
    verb: "DELETE",
    payload: JSON.stringify({ 
        userId: userId,
        paymentMethodId: paymentMethodId
      
    }),
  });
};

export const makeCardDefault = ({ userId, paymentMethodId }) => {
  return fetchAction({
    type: "MAKE_CARD_DEFAULT",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_PAYMENT}/Payment/AddDefaultPaymentMethod`,
    verb: "POST",
    payload: JSON.stringify({ 
        userId: userId,
        paymentMethodId: paymentMethodId 
    }),
  });
};
export const setDefaultCardObjEmpty = () => {
   return {
    type: "SET_DEFAULT_CARD_OBJ_RESPONSE",
   }
};
