import moment from "moment";
import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_JDS = process.env.REACT_APP_PAYMENT_JDS;

export const getBookingSlots = ({
  selectedDate, 
  serviceId,
  latitude,
  longitude,
  countryId,
  duration,
  distance,
  serviceVenu,
   
}) => {
 
 const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' '); 
    let [hours, minutes] = time.split(':'); 
    if (hours === '12') {
      hours = '00';
    } 
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    } 
    return `${hours}:${minutes}`;
  }

  var currentTime =  `${
    `${new Date().getHours()}`.length === 1
      ? `0${new Date().getHours()}`
      : new Date().getHours()
  }:${
    `${new Date().getMinutes()}`.length === 1
      ? `0${new Date().getMinutes()}`
      : new Date().getMinutes()
  }`;
  
  const currentDateAndTime= 
  `${new Date().getFullYear()}-${
    `${new Date().getMonth() + 1}`.length === 1
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1
  }-${
    `${new Date().getDate()}`.length === 1
      ? `0${new Date().getDate()}`
      : new Date().getDate()
  }`
  return fetchAction({
    type: "GET_BOOKING_SLOTS_DATA",
    endpoint: `${APP_BASE_URL_JDS}/Clinic/CreateTimeSlots`,

    payload: JSON.stringify({
          bookingDate: selectedDate,
          latitude: latitude,
          longitude: longitude,
          distance: distance,
          countryId: countryId,
          serviceId: serviceId,
          duration: duration,
          serviceVenu: serviceVenu 
    }),
    verb: "POST",
  });
};

 

export const makeDateTimeNextPageFalse = () => {
  return {
    type: "MAKE_DATE_TIME_NEXT_PAGE_FALSE",
  };
};

// alternate action of get slot 
export const alternateGetBookingSlots = ({
  selectedDate,
  providerId,
  isInClinic,
  duration,
  cartId,
  serviceId,
  tempbookingid, 
  isBusiness,
  businessId,
  serviceVenu
}) => {
    
  return fetchAction({
    type: "GET_ALTERNATE_BOOKING_SLOTS_DATA",
    endpoint: `${APP_BASE_URL_JDS}/Clinic/CreateTimeSlotsForBusiness`,
    payload:  JSON.stringify({ 
      businessId: businessId,
      bookingDate: selectedDate,
      serviceId: serviceId,
      duration: duration,
      serviceVenu:serviceVenu, 
        }), 
    verb: "POST",
  });
};



export const SaveAlternateTempBooking = ({ 
 tempBookingId,
 addressId ,
 cartId ,
 bookingDate,
 bookingTime,
 customerNotes
}) => { 
  return fetchAction({
    type: "SAVE_ALTERNET_BOOKING",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/TempBooking/SaveTempBooking`,
    payload: JSON.stringify({
        tempBookingId: tempBookingId,
        addressId: addressId,
        cartId:cartId,
        bookingDate: bookingDate,
        bookingTime:bookingTime,
        customerNotes:customerNotes
    }),
  });
};

