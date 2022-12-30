import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const signIn = (email, password) => {
  return fetchAction({
    type: "SIGN_IN",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer/CustomerSignin?iscustomer=true`,
    verb: "POST",
    payload: JSON.stringify({
      email: email,
      password: password,
      deviceid: "web",
      deviceplatform: "web",
      devicename: "web",
      macaddress: "web",
    }),
  });
};
export const signOutDeleteAccount = (userId, isSignOut_isDelete) => {
  return fetchAction({
    type: "AccountOut",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Users/signout`,
    verb: "POST",
    payload: JSON.stringify({
         userId : userId,
         deviceId: "web",
         isDeleted: isSignOut_isDelete ===true?true:false
    }),
  });
};
export const setSignInResponseToEmpty = () => {
  return {
    type: "SET_SAVE_SIGN_IN_RESPONSE_TO_EMPTY",
  };
};
