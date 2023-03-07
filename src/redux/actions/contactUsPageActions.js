import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendMessage = ({ email, customerName, message, subject }) => {
  return fetchAction({
    type: "SEND_MESSAGE",
    headers: { contentType: "includeBearer"},
    verb: "POST",
    endpoint: `${APP_BASE_URL}/Users/contactus`,
    payload: JSON.stringify({
      customerEmail: email,
      customerName,
      body: message,
      subject,
      isChelsford: true
    }),
  });
};

export const makeSendMessageFalse = () => {
  return {
    type: "MAKE_SEND_MESSAGE_FALSE",
  };
};
