import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSessionBookings = (userId) => {
  return fetchAction({
    type: "GET_SESSION_BOOKINGS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Booking/GetCustomerSessionBookings?UserId=${userId}&PageNumber=1&RowsOfPage=50`,
    // payload: JSON.stringify({
    //   userId: userId,
    // }),
  });
};

// export const getSessionBookings = (userId) => {
//   return fetchAction({
//     type: "GET_SESSION_BOOKINGS",
//     verb: "POST",
//     endpoint: `${APP_BASE_URL}/Booking`,
//     payload: JSON.stringify({
//       userId: userId,
//     }),
//   });
// };
export const SaveSessionBooking = (cartId, numberOfSessions) => {
  return fetchAction({
    type: "SAVE_SESSION_BOOKINGS",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Booking/SaveSessions`,
      payload: JSON.stringify({
       cartId: cartId,
       numberOfSessions:numberOfSessions
    }),
  });
};

export const DeleteSessionBooking = (BookingId, SessionId) => {
  return fetchAction({
    type: "DELETE_SESSION_BOOKING",
    verb: "DELETE",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Booking/DeleteSessionBooking?BookingId=${BookingId}&SessionId=${SessionId}` 
  });
}; 