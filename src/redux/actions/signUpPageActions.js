import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

export const getSignUpForm = (countryId, step) => {
  return fetchAction({
    type: "GET_SIGN_UP_FORM_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/SignupConfiguration/${countryId}/1/0/3/${step}/true`,
    verb: "GET",
  });
};

export const saveSignUpForm = (fieldAnswers, countryId, authToken) => {
  return fetchAction({
    type: "SAVE_SIGN_UP_FORM_DATA",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer`,
    verb: "POST",
    payload: JSON.stringify({
      DeviceId: "_web",
      DeviceName: "_web",
      MACAddress: "_web",
      isMobile: false,
      authToken: authToken,
      CountryCode: countryId,
      lstFields: fieldAnswers,
    }),
  });
};
export const setSignUpResponseToEmpty = () => {
  return  fetchAction({
    type: "SET_SAVE_SIGN_UP_RESPONSE_TO_EMPTY",
  });
};

 
// new signup actions start 
export const checkMobileNumber =({
  mobileNumber,
  countryCode, 
  authToken
})=>{
   return fetchAction({
      type:"CHECK_PHONE_NUMBER",
      verb: "POST",
      headers: { contentType: "includeBearer"},
      endpoint:`${APP_BASE_URL}/NewUser/CheckMobileNumber`,
      payload: JSON.stringify({
        mobileNumber: mobileNumber,
        countryCode: countryCode, 
        deviceId: "_web",
        deviceName: "_web", 
        // devicePlatform: "_web",
        macAddress: "_web",
        isMobile: false,
        authToken: authToken,
        isChelsfordRequest:true
     })
  })
}

// signin password insert api 
export const signInAction = (mobile, password) => {
  return fetchAction({
    type: "NEW_SIGN_IN",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Customer/CustomerSignin?iscustomer=true`,
    verb: "POST",
    payload: JSON.stringify({
      email: mobile,
      password: password,
      deviceid: "web",
      deviceplatform: "web",
      devicename: "web",
      macaddress: "web",
    }),
  });
};

export const VerifySMSCodeAction =({
  userId,
  verificationCode
})=>{
  return fetchAction({
    type :"VERIFY_SMS_CODE",
    verb :"POST",
    headers:{ contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/NewUser/VerifySMSCode`,
    payload :JSON.stringify({
      userId: userId,
      verificationCode: verificationCode
    }) 
  })
}

 
export const Do_Empty_signup_reducer_OBJECT_Action = () => {
   return  {
    type:"SIGNUP_REDUCER_OBJECT_EMPTY",
  };
};

export const ResendSMSCode=({
  mobileNumber,
  countryCode,
  messageHash,
  userId,
  email,
  isEmail
})=>{
  return fetchAction({
    type:"RESEND_SMS_CODE",
    verb:"POST",
    headers:{contentType: "includeBearer"},
    endpoint:`${APP_BASE_URL}/NewUser/ResendSMSCode`,
    payload :JSON.stringify({
      mobileNumber: mobileNumber,
      countryCode: countryCode,
      messageHash: messageHash,
      userId: userId,
      email: email,
      isEmail: isEmail
    })
  })
}

export const UpdatePersonInfo=({
    userId,
    strPassword,
    emailAddress,
    firstName,
    lastName,
    gender,
    dob
})=>{
  return fetchAction({
    type:"UPDATE_PERSON_INFO",
    verb:"POST",
    headers:{contentType: "includeBearer"},
    endpoint:`${APP_BASE_URL}/NewUser/UpdatePersonalInfo`,
    payload :JSON.stringify({
      userId: userId,
      strPassword:strPassword,
      emailAddress: emailAddress,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dob: dob
    })
  })
}
export const forgotPassword=({
    mobileNumber,
  countryCode,
   messageHash,
   authToken
})=>{
  return fetchAction({
    type:"FORGOT_PASSWORD_NEWSIGNUP",
    verb:"POST",
    headers:{contentType: "includeBearer"},
    endpoint:`${APP_BASE_URL}/NewUser/ForgotPassword`,
    payload :JSON.stringify({
      mobileNumber: mobileNumber,
      countryCode:countryCode,
      isMobile: false,
      authToken: authToken,
      isChelsfordRequest:true
     })
  })
}
export const setNewPassword=({
userId,
password
})=>{
  return fetchAction({
    type:"SET_NEW_PASSWORD_NEWSIGNUP",
    verb:"POST",
    headers:{contentType: "includeBearer"},
    endpoint:`${APP_BASE_URL}/NewUser/SetNewPassword`,
    payload :JSON.stringify({
      userId: userId,
      newPassword: password
    })
  })
}
export const VerifyEmailNewSignup=({
  userId,
  verificationCode
})=>{
  return fetchAction({
    type:"VERIFY_EMAIL_NEWSIGNUP",
    verb:"POST",
    headers:{contentType: "includeBearer"},
    endpoint:`${APP_BASE_URL}/NewUser/VerifyEmail`,
    payload :JSON.stringify({
      userId: userId,
      verificationCode:verificationCode
    })
  })
}

