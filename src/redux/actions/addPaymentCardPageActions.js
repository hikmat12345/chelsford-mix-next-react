import { fetchAction } from "../utils";
 
const REACT_APP_PAYMENT = process.env.REACT_APP_PAYMENT_VOUCHER
export const saveCardData = ({
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
    type: "SAVE_CARD_DATA",
    verb: "POST",  
    headers: { contentType: "includeBearer"},
    endpoint: `${REACT_APP_PAYMENT}/Payment/SavePaymentMethod`,
    payload: JSON.stringify({
      // firstName,
      // surname,
      // stripeToken,
      // email,
      // isDefault: true,
        
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

export const setCardDataResponseToEmpty = () => {
  return {
    type: "SET_CARD_DATA_RESPONSE_TO_EMPTY",
  };
};
