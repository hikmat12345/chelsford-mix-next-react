import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const verifyCode = (code, email) => {
  return fetchAction({
    type: "VERIFY_CODE",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer/CustomerConfirmCode`,
    payload: JSON.stringify({
      ActivationCode: code,
      email: email,
    }),
  });
};

export const setVerifyCodeResponseToEmpty = () => {
  return {
    type: "SET_VERIFY_CODE_RESPONSE_TO_EMPTY",
  };
};
