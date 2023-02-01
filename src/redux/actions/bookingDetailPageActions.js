import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getBookingDetails = ({bookingId, SessionId}) => {
  const session=SessionId !==undefined?`&SessionId=${SessionId}`:`&SessionId=0`
  return fetchAction({
    type: "GET_BOOKING_DETAILS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Booking/GetSessionBookingDetail?BookingId=${bookingId}${session}`,
  });
};

export const getBookingsSessions = ({ cartId, serviceId, bookingId,sessionId }) => {
  return fetchAction({
    type: "GET_BOOKING_SESSIONS_DETAILS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Booking/GetSessionBooking/${cartId}/${serviceId}/${bookingId}/${sessionId}`,
  });
};
// export const getBookingDetails = ({bookingId, SessionId, serviceId, cartId}) => {
//   const session=SessionId !==undefined?SessionId:0
//   return fetchAction({
//     type: "GET_BOOKING_DETAILS",
//     verb: "GET",
//     endpoint: `${APP_BASE_URL}/Booking/GetSessionBooking/${cartId}/${serviceId}/${bookingId}/${session}`,
//   });
// };

// export const getBookingsSessions = ({ cartId, serviceId, bookingId, sessionId}) => {
//   return fetchAction({
//     type: "GET_BOOKING_SESSIONS_DETAILS",
//     verb: "GET",
//     endpoint: `${APP_BASE_URL}/Booking/GetSessionBooking/${cartId}/${serviceId}/${bookingId}/${sessionId}`,
//   });
// };
export const getSelectedSessionDetail = ({ bookingId, bookingSessions }) => {
 
  return {
    type: "GET_BOOKING_SELECTED_SESSION_DETAILS",
    payload: { bookingSessions, bookingId },
  };
};






 // Delete Booking API call 

export const deleteBooking = ({ userId, bookingId, reasonValue  }) => {
  return fetchAction({
    type: "DELETE_BOOKING",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint:  `${APP_BASE_URL}/Booking/CancelBooking`, 
    payload:  JSON.stringify({
      bookingId: bookingId,
      userId: userId,
      notes: reasonValue,
      cancelledBy: 0,
      isRequestFromExpert: true
    }),
  });
}; 

export const deleteBookingSession = ({ sessionId,  bookingId  }) => {
  return fetchAction({
    type: "DELETE_BOOKING",
    verb: "DELETE",
    headers: { contentType: "includeBearer"},
    endpoint:  `${APP_BASE_URL}/Booking/DeleteSessionBooking?BookingId=${bookingId}&SessionId=${sessionId}`,
  });
};
 
export const setBookingDeleteEmpty = () => {
  return {
    type: "SET_DELETE_BOOKING_EMPTY",
  };
};