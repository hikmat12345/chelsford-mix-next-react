import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getProfileFields = ({ userCountryId, userId }) => {
  return fetchAction({
    type: "GET_PROFILE_FIELDS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/SignupConfiguration/${userCountryId}/1/${userId}/3/0/false`,
  });
};

export const updateProfile = ({ userId, fieldAnswers }) => {
  return fetchAction({
    type: "SAVE_UPDATED_PROFILE",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer`,
    verb: "PUT",
    payload: JSON.stringify({
      lstFields: fieldAnswers,
      id: userId,
    }),
  });
};

export const makeUpdateProfileResponseToEmpty = () => {
  return {
    type: "MAKE_UPDATED_PROFILE_RESPONSE_TO_EMPTY",
  };
};
