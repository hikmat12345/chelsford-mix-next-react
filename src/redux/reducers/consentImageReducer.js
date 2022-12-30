const initialState = { 
    saveSignatureImageRespon:""
  };

const consentPageImageReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
   case "SAVE_CONSENT_SIGNATURE_IMAGE_REQUEST":
        return {...state };
    case "SAVE_CONSENT_SIGNATURE_IMAGE_RESPONSE":
       return {...state, saveSignatureImageRespon: payload}
    case "SAVE_CONSENT_SIGNATURE_IMAGE_ERROR":
       return {...state,  } 
    case "DO_SET_SIGNATURE_OBJ_RESPONSE":
        return {...state, saveSignatureImageRespon: {}}
    default:
      return state;
     }
   }
 export default consentPageImageReducer;