import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendResetCode = ({ email, countryCode, isMobile }) => {
  return fetchAction({
    type: "SEND_RESET_CODE",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer/ResetPassword`,
    payload: JSON.stringify({
      Email: email,
      isCustomer: true,
      ResetCode: "",
      Password: "",
      isReset: true,
      isVerifyCode: false,
      isUpdatePassword: false,
      CountryCode: countryCode,
      isMobile:isMobile
    }),
  });
};

export const verifyResetCode = ({ email, code, countryCode }) => {
  return fetchAction({
    type: "VERIFY_RESET_CODE",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer/ResetPassword`,
    payload: JSON.stringify({
      Email: email,
      isCustomer: true,
      ResetCode: code,
      Password: "",
      isReset: false,
      isVerifyCode: true,
      isUpdatePassword: false,
      CountryCode: countryCode,
    }),
  });
};

export const resetPassword = ({ email, code, password, countryCode, isMobile }) => {
  return fetchAction({
    type: "RESET_PASSWORD",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer/ResetPassword`,
    payload: JSON.stringify({
      Email: email,
      isCustomer: true,
      ResetCode: code,
      Password: password,
      isReset: false,
      isVerifyCode: false,
      isUpdatePassword: true,
      CountryCode: countryCode, 
    }),
  });
};

export const makeSendResetCodeResponseFalse = () => {
  return {
    type: "MAKE_SEND_RESET_CODE_FALSE",
  };
};

export const makeVerifyResetCodeResponseFalse = () => {
  return {
    type: "MAKE_VERIFY_RESET_CODE_FALSE",
  };
};

export const makeResetPasswordResponseFalse = () => {
  return {
    type: "MAKE_RESET_PASSWORD_FALSE",
  };
};
