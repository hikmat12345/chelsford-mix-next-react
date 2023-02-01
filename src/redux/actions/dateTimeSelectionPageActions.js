import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const PAYMENT_JDS = process.env.REACT_APP_PAYMENT_JDS
export const getAvaliableBookingSlots = ({
  selectedDate, 
  serviceId, 
  bookingDuration,
  providerId, 
}) => {
  return fetchAction({
    type: "GET_BOOKING_SLOTS_INHOUSE",
    endpoint: `${PAYMENT_JDS}/TimeSlots/GetTimeSlots`,
    payload: JSON.stringify({ 
         bookingDate :selectedDate,
         serviceId :serviceId,
         providersId :providerId,
         duration :bookingDuration  
    }),
    verb: "POST",
  });
};

export const saveBookingDateAndTime = ({
  selectedDate,
  selectedTime,
  bookingId,
  cartId,
  notes,
  bookingStartTime,
  bookingEndTime,
  addressId
}) => {
  return fetchAction({
    type: "SAVE_DATE_AND_TIME",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/TempBooking/SaveTempBooking`,
    payload: JSON.stringify({
      bookingDate: selectedDate,
      bookingTime: selectedTime,
      tempBookingId: bookingId,
      cartId: cartId,
      customerNotes: notes,
    }),
  });
}; 


export const saveBookingDateAndTimeNextTime = ({
  selectedDate, 
  cartId, 
  bookingStartTime,
  bookingEndTime,
  addressId 
}) => { 

  return fetchAction({
    type: "SAVE_DATE_AND_TIME",
    verb: "PUT",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/TempBooking/BookingDateTime`,
    payload: JSON.stringify({ 
        cartId: cartId,
        bookingDate: selectedDate,
        bookingStartTime: bookingStartTime,
        bookingEndTime: bookingEndTime,
        addressId:addressId
    }),
  });
}; 
export const makeDateTimeNextPageFalse = () => {
  return {
    type: "MAKE_DATE_TIME_NEXT_PAGE_FALSE",
  };
};
