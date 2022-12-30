import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const acceptConsent = (bookingId) => {
  return fetchAction({
    type: "ACCEPT_CONSENT",
    headers: { contentType: "includeBearer"},
    verb: "PUT",
    endpoint: `${APP_BASE_URL}/Booking/UpdateConsentForm`,
    payload: JSON.stringify({
      bookingId,
      isAccepted: true,
    }),
  });
};

export const makeConsentAcceptedFalse = () => {
  return {
    type: "MAKE_CONSENT_ACCEPTED_FALSE",
  };
};

export const setConsentResponseToEmpty = () => {
  return {
    type: "DO_EMPTY_CONSENT_ANSWER_RESPONSE",
  };
};