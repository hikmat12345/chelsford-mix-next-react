const initialState = {
  error: null,
  loading: false,
  sentReferralList: [],
  referralSentResponse: {},
  referralBonusDetails: {},
};

const referralPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_SENT_REFERRAL_LIST_REQUEST":
      return { ...state, loading: true };
    case "GET_SENT_REFERRAL_LIST_RESPONSE":
      return {
        ...state,
        loading: false,
        sentReferralList: payload.code !== 0 ? [] : payload.result,
        referralSentResponse: {},
      };
    case "GET_SENT_REFERRAL_LIST_ERROR":
      return { ...state, loading: false, error: payload };

    case "GET_REFERRAL_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "GET_REFERRAL_DETAILS_RESPONSE":
      return {
        ...state,
        loading: false,
        referralBonusDetails: payload.code !== 0 ? {} : payload.result[0],
      };
    case "GET_REFERRAL_DETAILS_ERROR":
      return { ...state, loading: false, error: payload };

    case "SEND_REFERRAL_REQUEST":
      return { ...state, loading: true };
    case "SEND_REFERRAL_RESPONSE":
      return {
        ...state,
        loading: false,
        referralSentResponse: payload,
      };
    case "SEND_REFERRAL_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return { ...state };
  }
};

export default referralPageReducer;
