import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const threeDSecure = (
    BookingID,
    TransactionId,
    AmountToCapture,
) => {
  return fetchAction({
    type: "THREE_D_SECURE",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Payment/DoPayment/${BookingID}/${TransactionId}/${AmountToCapture}`,
    verb: "GET",
  });
};

export const thankYouBookingAction = ({
  countryId,
  cartid, 
  bookingId
}) => {
    return fetchAction({
      type: "GET_THANKYOU_BOOKING",
      headers: { contentType: "includeBearer"},
      endpoint: `${APP_BASE_URL}/Booking/ThankYouBooking?CountryId=${countryId}`,
      verb: "POST",
      payload: JSON.stringify({ 
        cartId : cartid,
        bookingId : bookingId 
      }),
   });
};
