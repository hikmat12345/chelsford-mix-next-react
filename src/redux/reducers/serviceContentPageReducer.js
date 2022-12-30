const initialState = {
  error: null,
  loading: true,
  relatedServices: [],
  serviceDescription: {},
  onlyForYouServices: [],
  latestBlogs: [],
  bottomBanners: [],
  middleBanners: [],
  topBanners: [],
  featuredServices: [],
  trendingServices: [],
};

const serviceContentPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "GET_SERVICE_CONTENT_PAGE_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SERVICE_CONTENT_PAGE_DATA_RESPONSE":
      const { serviceDetail, bannersList, bottomBanner, featured, trending } =
        payload;
      return {
        ...state,
        serviceDescription: payload.error === false ? serviceDetail : {},
        bottomBanners: payload.error === false ? bottomBanner : [],
        middleBanners: payload.error === false ? bannersList : [],
        featuredServices: payload.error === false ? featured : [],
        trendingServices: payload.error === false ? trending : [],
        loading: false,
      };
    case "GET_SERVICE_CONTENT_PAGE_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default serviceContentPageReducer;
