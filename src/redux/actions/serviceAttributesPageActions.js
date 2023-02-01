import { fetchAction } from "../utils";
import jsonToFormData from "json-form-data";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;

export const getServiceAttributesData = (serviceId) => {
  return fetchAction({
    type: "GET_SERVICE_ATTRIBUTES_DATA",
    headers: { isBearer:true, contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/ServiceAttribute/${serviceId}`,
    verb: "GET",
  });
};

export const saveServiceAttributes = ({ cartId, bookingId, fieldAnswers }) => {
  return fetchAction({
    type: "SAVE_SERVICE_ATTRIBUTES",
    headers: { isBearer:true, contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/BookingAttribute/SaveBookingAttributes`,
    verb: "POST",
    payload: JSON.stringify({
      cartId,
      bookingId,
      attributes: fieldAnswers,
    }),
  });
};

export const uploadBookingVideo = ({ cartId, src, userId, filetype }) => {
  const formData = {
    filetoupload: src,
    CartId: cartId,
    userid: userId,
    filetype,
  };
  return fetchAction({
    type: "UPLOAD_BOOKING_VIDEO",
    endpoint: `${APP_BASE_URL_2}/BookingAttachments/UploadAttachments_Expert`,
    verb: "POST",
    payload: jsonToFormData(formData),
    headers: {
      isBearer:true,
      contentType: "multipart",
    },
  });
};

export const getBookingVideoAndImages = (cartId) => {
  return fetchAction({
    type: "GET_BOOKING_UPLOADED_IMAGES_AND_VIDEOS",
    endpoint: `${APP_BASE_URL_2}/BookingAttachments/GetBookingAttachments_Expert?CartId=${cartId}`,
    verb: "GET",
    headers: { 
      isBearer:true,
      contentType: "multipart",
    },
  });
};

export const deleteImageOrVideo = ({ cartId, id }) => {
  return fetchAction({
    type: "DELETE_BOOKING_UPLOADED_IMAGE_OR_VIDEO",
    endpoint: `${APP_BASE_URL_2}/BookingAttachments/DeleteBookingAttachment_Expert?Id=${id}&CartId=${cartId}`,
    verb: "DELETE",
    headers: { 
      isBearer:true,
      contentType: "multipart",
    },
  });
};

export const makeIsDeletedResponseEmpty = () => {
  return {
    type: "MAKE_DELETE_BOOKING_UPLOADED_IMAGE_OR_VIDEO_RESPONSE_FALSE",
  };
};

export const makeServiceAttributesNextPageFalse = () => {
  return {
    type: "MAKE_SERVICE_ATTRIBUTES_NEXT_PAGE_FALSE",
  };
};

export const makeVideoUploadedResponseEmpty = () => {
  return {
    type: "MAKE_VIDEO_UPLOADED_RESPONSE_EMPTY",
  };
};
