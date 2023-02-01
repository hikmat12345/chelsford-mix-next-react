import { fetchAction } from "../utils";
import jsonToFormData from "json-form-data";
const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const consetFormGetQuestions = (serviceid) => {
  return fetchAction({
    type: "GET_CONSENT_QUESTIONS",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Question/GetServiceQuestions/${serviceid}`,
  });
}; 
export const consetFormPostQuestions = (cartId, answers, BookingId, sessionId) => { 
  return fetchAction({
    type: "POST_CONSENT_QUESTIONS",
    headers: { contentType: "includeBearer"},
    payload: JSON.stringify({
     cartId : cartId,
     answers : answers,
     bookingId: BookingId,
     sessionId:sessionId
  }),
    verb: "POST", 
    endpoint: `${APP_BASE_URL}/Question/SaveServiceConsentAnswers`,
  });
};
 

// new apis 
export const GetServiceQuestionsAction = (serviceid, bookingId, sessionId) => { 
  return fetchAction({
    type: "GET_CONSENT_SERVICES_QUESTIONS", 
    verb: "GET", 
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Question/GetServiceQuestions/${serviceid}/${bookingId}/${sessionId}`,
  });
}; 

export const SaveServiceQuestionsAnswersAction = (
  {
    cartId,
    bookingId,
    sessionId,
    userId, 
    signatureImageUrl,
    answers,
    consentTime,
    consentDate
  }
) => {  
  return fetchAction({
    type: "SAVE_CONSENT_SERVICES_QANSWERS",
    payload: JSON.stringify({
      cartId: cartId,
      bookingId: bookingId,
      sessionId:sessionId,
      userId: userId,
      signatureImageUrl: signatureImageUrl,
      answers: answers,
      consentDate: consentDate,
      consentTime: consentTime,  
    }),
    headers: { contentType: "includeBearer"},
    verb: "POST", 
    endpoint: `${APP_BASE_URL}/Question/SaveServiceConsentAnswers`,
  });
};  


export const UploadServiceConsentSignatureAction = (file ) => { 
   console.log("sdfksldfj")
  return fetchAction({
    type: "SAVE_CONSENT_SIGNATURE_IMAGE",
    verb: "POST", 
    endpoint: `${APP_BASE_URL}/Question/UploadServiceConsentSignature`,
    payload: file,
    headers: { 
      isBearer:true,
      contentType: "multipart",
    },
  });
}; 

export const signuatureObjectDoEmpty = () => {  
 return fetchAction({
   type: "DO_SET_SIGNATURE_OBJ_RESPONSE", 
 });
}; 




 