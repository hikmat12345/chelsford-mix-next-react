import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const changePassword = ({ email, password, oldPassword }) => {
  return fetchAction({
    type: "CHANGE_PASSWORD",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer/ResetPassword`,
    verb: "POST",
    payload: JSON.stringify({
      email: email,
      isCustomer: true,
      isReset: false,
      isVerifyCode: false,
      isUpdatePassword: false,
      resetCode: "",
      password: password,
      oldPassword: oldPassword,
      isUpdateProfilePassword: true,
    }), 
  });
};

export const makePasswordChangedFalse = () => {
  return {
    type: "MAKE_PASSWORD_CHANGED_FALSE",
  };
};
