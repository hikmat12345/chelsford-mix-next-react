const initialState = {
  error: null,
  loading: false,
  profileFields: [],
  updateProfileRespone: {},
};

const editProfilePageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_PROFILE_FIELDS_REQUEST":
      return { ...state, loading: true };
    case "GET_PROFILE_FIELDS_RESPONSE":
      return {
        ...state,
        loading: false,
        profileFields: payload.error === true ? [] : payload.signuplist,
      };
    case "GET_PROFILE_FIELDS_ERROR":
      return { ...state, loading: false, error: payload };

    case "SAVE_UPDATED_PROFILE_REQUEST":
      return { ...state, loading: true };
    case "SAVE_UPDATED_PROFILE_RESPONSE":
      return {
        ...state,
        loading: false,
        updateProfileRespone: payload,
      };
    case "SAVE_UPDATED_PROFILE_ERROR":
      return { ...state, loading: false, error: payload };

    case "MAKE_UPDATED_PROFILE_RESPONSE_TO_EMPTY":
      return { ...state, loading: false, updateProfileRespone: {} };

    default:
      return { ...state };
  }
};

export default editProfilePageReducer;
