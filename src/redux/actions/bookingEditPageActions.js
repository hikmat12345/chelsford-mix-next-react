import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_CRM = process.env.REACT_APP_BASE_URL_2
export const getEditBookingSlots = ({
  selectedDate,
  providerId,
  isInClinic,
  duration,
  cartId,
  serviceId,
  tempbookingid, 
  isBusiness,
  businessId
}) => { 


  return fetchAction({
    type: "GET_EDIT_BOOKING_SLOTS_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Providers/CheckExpertAvailableSlots`,
    payload:  JSON.stringify({
          bookingDate: selectedDate,
          bookingDuration:duration,
          currentTime: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          genderPreference:"both",  
          isBusiness:false,
          isInClinic: isInClinic,
          providerId: providerId,
          serviceId: serviceId,
          tempBookingId:tempbookingid,
          cartId:cartId
        }),
       
    verb: "POST",
  });
};

export const saveEditedBookingDateTime = ({
  selectedDate,
  selectedTime,
  bookingId,
  cartId,
  userId,
  providerId,
  customerId,
  endTime,
  startTime,
  sessionId,
  isSessionBookingAPI,
  latitude,
  longitude,
   duration,
   serviceId,
  serviceVenu,
}) => {
  return fetchAction({
    type: "SAVE_EDITED_DATE_AND_TIME",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    // endpoint: isSessionBookingAPI? `${APP_BASE_URL}/Booking/SessionBooking`: `${APP_BASE_URL}/Booking/UpdateBooking` ,
    endpoint: `${APP_BASE_URL_CRM}/Booking/UpdateBookingJds`,
    payload: 
    JSON.stringify({
         bookingId : bookingId,
         sessionId : sessionId,
         customerId : customerId,
         providerIds :  `${providerId}`,
         bookingDate : selectedDate,
         startTime : startTime,
         endTime : endTime,
         distance : 20,
         latitude : `${latitude}`,
         longitude : `${longitude}` ,
         duration:duration,
         serviceId:serviceId,
         serviceVenu:serviceVenu,
         
    }), 
  //  JSON.stringify({
  //   providerId:providerId,
  //   bookingDate:selectedDate,
  //   bookingId:bookingId,
  //   customerId:customerId,
  //   endTime:endTime,
  //   startTime:startTime, 
  //   sessionId:sessionId, 
  // })
});
};

export const makeBookingEditedToDefault = () => {
  return {
    type: "MAKE_EDITED_DATE_TIME_NEXT_PAGE_FALSE",
  };
};
