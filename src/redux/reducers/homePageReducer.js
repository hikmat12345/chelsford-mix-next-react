const initialState = {
  error: null,
  loading: true,
  apiMessage: "",
  topSlider: [],
  industries: [],
  topBanners: [],
  featuredServices: [],
  middleBanners: [],
  trendingServices: [],
  bottomBanners: [],
  onlyForYouServices: [],
  bottomBannerScroller: [],
  offerServices: [],
  searchResults: [],
};

const homePageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_HOME_PAGE_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_HOME_PAGE_DATA_RESPONSE":
      const {
        slider,
        topBanner,
        bottomBanner,
        middleBanner,
        trending,
        featured,
        bottomBannerScroller,
        inCompletedJobs,
      } = payload;
      return {
        ...state,
        loading: false,
        apiMessage: payload.message,
        topSlider: payload.error === true ? [] : slider,
        topBanners: payload.error === true ? [] : topBanner,
        featuredServices: payload.error === true ? [] : featured,
        middleBanners: payload.error === true ? [] : middleBanner,
        trendingServices: payload.error === true ? [] : trending,
        bottomBanners: payload.error === true ? [] : bottomBanner,
        bottomBannerScroller:
          payload.error === true ? [] : bottomBannerScroller,
        offerServices: payload.error === true ? [] : inCompletedJobs,
      };
    case "GET_HOME_PAGE_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    case "GET_INDUSTRIES_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_INDUSTRIES_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        industries: payload.error === true ? [] : payload.industrylist,
      };
    case "GET_INDUSTRIES_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case "GET_ONLY_FOR_YOU_SERVICES_DATA_REQUEST":
      return { ...state, loading: true };
     
    case "GET_ONLY_FOR_YOU_SERVICES_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        onlyForYouServices: payload.error === true ? [] : payload.preferences,
      };
    case "GET_ONLY_FOR_YOU_SERVICES_DATA_ERROR":
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case "GET_SEARCH_RESULTS_REQUEST":
      return { ...state };
    case "GET_SEARCH_RESULTS_RESPONSE":
      return {
        ...state,
        searchResults: payload.error === true ? [] : payload.result,
      };
    case "GET_SEARCH_RESULTS_ERROR":
      return { ...state, error: payload };
    default:
      return { ...state };
  }
};

export default homePageReducer;
