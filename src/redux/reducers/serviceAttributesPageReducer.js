const initialState = {
  error: null,
  loading: false,
  serviceAttributes: [],
  nextPageAttributes: false,
  videoUploadedResponse: {},
  uploadedImages: [],
  uploadedVideos: [],
  isDeletedResponse: false,
};

const serviceAttributesPageReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case "GET_SERVICE_ATTRIBUTES_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SERVICE_ATTRIBUTES_DATA_RESPONSE":
      return {
        ...state,
        serviceAttributes: payload.attributesList,
        loading: false,
      };
    case "GET_SERVICE_ATTRIBUTES_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    case "SAVE_SERVICE_ATTRIBUTES_REQUEST":
      return { ...state, loading: true };
    case "SAVE_SERVICE_ATTRIBUTES_RESPONSE":
      return {
        ...state,
        loading: false,
        nextPageAttributes: payload.error === true ? false : true,
      };
    case "SAVE_SERVICE_ATTRIBUTES_ERROR":
      return { ...state, loading: false, error: payload };

    case "UPLOAD_BOOKING_VIDEO_REQUEST":
      return { ...state };
    case "UPLOAD_BOOKING_VIDEO_RESPONSE":
      return {
        ...state,
        videoUploadedResponse: payload,
      };
    case "UPLOAD_BOOKING_VIDEO_ERROR":
      return { ...state, error: payload };

    case "GET_BOOKING_UPLOADED_IMAGES_AND_VIDEOS_REQUEST":
      return { ...state };
    case "GET_BOOKING_UPLOADED_IMAGES_AND_VIDEOS_RESPONSE":
      return {
        ...state,
        uploadedImages:
          payload.code === 0 ? payload.expertAttachments.images : [],
        uploadedVideos:
          payload.code === 0 ? payload.expertAttachments.video : [],
      };
    case "GET_BOOKING_UPLOADED_IMAGES_AND_VIDEOS_ERROR":
      return { ...state, error: payload };

    case "DELETE_BOOKING_UPLOADED_IMAGE_OR_VIDEO_REQUEST":
      return { ...state };
    case "DELETE_BOOKING_UPLOADED_IMAGE_OR_VIDEO_RESPONSE":
      return {
        ...state,
        isDeletedResponse: payload,
      };
    case "DELETE_BOOKING_UPLOADED_IMAGE_OR_VIDEO_ERROR":
      return { ...state, error: payload };

    case "MAKE_SERVICE_ATTRIBUTES_NEXT_PAGE_FALSE":
      return {
        ...state,
        loading: false,
        nextPageAttributes: false,
        serviceAttributes: [],
      };

    case "MAKE_DELETE_BOOKING_UPLOADED_IMAGE_OR_VIDEO_RESPONSE_FALSE":
      return {
        ...state,
        loading: false,
        nextPageAttributes: false,
        isDeletedResponse: {},
      };

    case "MAKE_VIDEO_UPLOADED_RESPONSE_EMPTY":
      return {
        ...state,
        loading: false,
        videoUploadedResponse: {},
      };

    default:
      return state;
  }
};

export default serviceAttributesPageReducer;
