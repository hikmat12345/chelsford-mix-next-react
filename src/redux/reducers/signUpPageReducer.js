const initialState = {
  error: null,
  loading: false,
  signUpFormData: [],
  totalSteps: null,
  saveSignUpFormResponse: {},
  checkNumber_response:{},
  verify_email_response:{},
  set_new_pass_response:{},
  forgotPassoword_response:{},
  update_person_info_response:{},
  resendSMS_code_response:{},
  verifySMS_response:{}, 
  sign_in_response:{}
};

const signUpPageReducer = (state = initialState, action) => {
  const { payload, type } = action;
   switch (type) {
      
    case "GET_SIGN_UP_FORM_DATA_REQUEST":
      return { ...state, loading: true };
    case "GET_SIGN_UP_FORM_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        signUpFormData: payload.signuplist,
        totalSteps: payload.totalSteps,
      };
    case "GET_SIGN_UP_FORM_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    case "SAVE_SIGN_UP_FORM_DATA_REQUEST":
      return { ...state, loading: true };
    case "SAVE_SIGN_UP_FORM_DATA_RESPONSE":
      return {
        ...state,
        loading: false,
        saveSignUpFormResponse: payload,
      };
    case "SAVE_SIGN_UP_FORM_DATA_ERROR":
      return { ...state, loading: false, error: payload };

    case "SET_SAVE_SIGN_UP_RESPONSE_TO_EMPTY":
      return { ...state, saveSignUpFormResponse: {} };


 
    case  "CHECK_PHONE_NUMBER_REQUEST":
        return {...state, checkNumber_response:payload, loading:true};
    case  "CHECK_PHONE_NUMBER_RESPONSE":
        return {...state, checkNumber_response:payload, loading:false};
    case  "CHECK_PHONE_NUMBER_ERROR":
        return {...state, checkNumber_response:payload, loading:true};

    case  "VERIFY_SMS_CODE_REQUEST":
          return {...state, verifySMS_response:payload, loading:true};
    case  "VERIFY_SMS_CODE_RESPONSE":
          return {...state, verifySMS_response:payload, loading:false};
    case  "VERIFY_SMS_CODE_ERROR":
          return {...state, verifySMS_response:payload, loading:true};
           
    case  "RESEND_SMS_CODE_REQUEST":
            return {...state, resendSMS_code_response:payload, loading:true};
    case  "RESEND_SMS_CODE_RESPONSE":
            return {...state, resendSMS_code_response:payload, loading:false};
    case  "RESEND_SMS_CODE_ERROR":
            return {...state, resendSMS_code_response:payload, loading:true};
 
    case  "UPDATE_PERSON_INFO_REQUEST":
            return {...state, update_person_info_response:payload, loading:true};
    case  "UPDATE_PERSON_INFO_RESPONSE":
            return {...state, update_person_info_response:payload, loading:false};
    case  "UPDATE_PERSON_INFO_ERROR":
            return {...state, update_person_info_response:payload, loading:true};

    case  "FORGOT_PASSWORD_NEWSIGNUP_REQUEST":
            return {...state, forgotPassoword_response:payload, loading:true};
    case  "FORGOT_PASSWORD_NEWSIGNUP_RESPONSE":
            return {...state, forgotPassoword_response:payload, loading:false};
    case  "FORGOT_PASSWORD_NEWSIGNUP_ERROR":
            return {...state, forgotPassoword_response:payload, loading:true};
 
    case  "SET_NEW_PASSWORD_NEWSIGNUP_REQUEST":
            return {...state, set_new_pass_response:payload, loading:true};
    case  "SET_NEW_PASSWORD_NEWSIGNUP_RESPONSE":
            return {...state, set_new_pass_response:payload, loading:false};
    case  "SET_NEW_PASSWORD_NEWSIGNUP_ERROR":
            return {...state, set_new_pass_response:payload, loading:true};
 
    case  "VERIFY_EMAIL_NEWSIGNUP_REQUEST":
            return {...state, verify_email_response:payload, loading:true};
    case  "VERIFY_EMAIL_NEWSIGNUP_RESPONSE":
            return {...state, verify_email_response:payload, loading:false};
    case  "VERIFY_EMAIL_NEWSIGNUP_ERROR":
            return {...state, verify_email_response:payload, loading:true};
 

    case  "NEW_SIGN_IN_REQUEST":
            return {...state, sign_in_response:payload, loading:true};
    case  "NEW_SIGN_IN_RESPONSE":
            return {...state, sign_in_response:payload, loading:false};
    case  "NEW_SIGN_IN_ERROR":
            return {...state, sign_in_response:payload, loading:true};
    case  "SIGNUP_REDUCER_OBJECT_EMPTY":
            return {...state, checkNumber_response:{}, verifySMS_response:{},
                verify_email_response:{},  set_new_pass_response:{}, forgotPassoword_response:{},
                update_person_info_response:{},  resendSMS_code_response:{}, sign_in_response:{}};
                
    default:
      return state;
  }
};

export default signUpPageReducer;
