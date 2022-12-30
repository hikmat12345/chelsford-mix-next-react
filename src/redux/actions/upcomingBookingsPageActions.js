import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUpcomingBookings = (userId) => {
  return fetchAction({
    type: "GET_UPCOMING_BOOKINGS",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Booking`,
    payload: JSON.stringify({
      userId: userId,
    }),
  });
};
