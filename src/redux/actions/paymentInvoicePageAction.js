import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_JDS = process.env.REACT_APP_PAYMENT_JDS;
const REACT_APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

const REACT_APP_PAYMENT = process.env.REACT_APP_PAYMENT_VOUCHER
export const addOneTimePayment = ({
  userId,
  firstName, 
  surname, 
  expirationYear,
  expirationMonth,
  cardNumber,
  cvv,
  city,
  country,
  line1,
  line2,
  state,
  postalCode
}) => {
  return fetchAction({
    type: "ADD_ONETIME_CARD_DATA",
    verb: "POST",  
    headers: { contentType: "includeBearer"},
    endpoint: `${REACT_APP_PAYMENT}/OneTimePayment/SavePaymentMethod`,
    payload: JSON.stringify({ 
        userId: userId,
        cardOwnerFirstName: firstName,
        cardOwnerLastName: surname,
        cardNumber: cardNumber,
        expirationYear: expirationYear,
        expirationMonth: expirationMonth,
        cvv: cvv,
        billingAddress: {
          city: city,
          country: country,
          line1: line1,
          line2: line2,
          state: state,
          postalCode: postalCode
        } 
    }),
  });
};
export const SalesOrderInvoiceAction = ({BookingId, CustomerId}) => {
  return fetchAction({
    type: "SALES_ORDER_INVOICE",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${REACT_APP_BASE_URL_2}/SalesOrder/Invoice?BookingId=${BookingId}&CustomerId=${CustomerId}` ,
  });
};
 

 