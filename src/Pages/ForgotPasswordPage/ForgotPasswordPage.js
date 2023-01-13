// react libraries 
import React, { memo, useCallback, useEffect, useState } from 'react'
import { GoogleReCaptchaProvider, GoogleReCaptcha,  } from "react-google-recaptcha-v3";
import { bindActionCreators } from 'redux';
// images components 
import { FAEImage,FAEText, FAELoading, FAETitle } from '@findanexpert-fae/components';
import 'react-toastify/dist/ReactToastify.css'; 
// redux actions and utitlities 
import { FAEToaster, getFileSrcFromPublicFolder, objectIsEmpty, setCookies } from '../../utils';
import {  checkMobileNumber, Do_Empty_signup_reducer_OBJECT_Action, forgotPassword, getSignUpForm,  ResendSMSCode,  saveSignUpForm,  setNewPassword,  setSignUpResponseToEmpty, signInAction, UpdatePersonInfo, VerifyEmailNewSignup, VerifySMSCodeAction, } from "../../redux/actions/signUpPageActions";
import "../SIgnUpNewPage/signup.scss"
import { connect, useDispatch } from 'react-redux'; 
import history from '../../history';
import PaswordField from '../../widgets/passwordToLogin'; 
import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton';
import { ToastContainer } from 'react-toastify';
import { useMemo } from 'react';
import { SocketService } from '../../helpers/socketservice';
import { setUserId } from '../../redux/actions/defaultActions';
import { useLocation } from 'react-router-dom';

 function ForgotPasswordPage({
// reducers 
    loading,
    userCountryId,
    checkNumber_response,
    verifySMS_response, 
    verify_email_response,
    set_new_pass_response,
    forgotPassoword_response,
    update_person_info_response,
    resendSMS_code_response,
    sign_in_response,
// actions  
    checkMobileNumber,
    VerifySMSCodeAction,
    Do_Empty_signup_reducer_OBJECT_Action,
    forgotPassword,
    setNewPassword,
    UpdatePersonInfo,
    ResendSMSCode,
    VerifyEmailNewSignup,
    signInAction,
    setUserId,
     ...props
 }) {
/////////////////////////// variables 
    const loaderImage = getFileSrcFromPublicFolder("account-loader.svg");
    const searchParams=new URLSearchParams(window.location.search) 
/////////////////////////// hooks 
    const [userIdentification, setUserIdentfication] =useState("") 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordText, setConfirmPasswordText] = useState("Please missmatching");
    const [authToken, setAuthToken]= useState("")
    const [loadToken,  setLoadToken]=useState(false) 
    const [forgotPassFlag, setForgotPassFlag]= useState(false) 
    const [customerData, setCustomerData]= useState({})
    const [passwordErrors, setPaasswordError]= useState()
    const [confirmPasswordErrors, setConfirmPasswordError]=useState()
    
  const locationData =useLocation()
 /////////////////////////// use effects 
     useEffect(()=>{
        const interval= setInterval(()=>{
              setLoadToken(!loadToken)
            }, 20000)
         return ()=> clearInterval(interval)
      }, [loadToken]) 
    
      useEffect(() => {   
         if( set_new_pass_response?.statusCode==1   ){
            FAEToaster({message:  set_new_pass_response?.message !== undefined && set_new_pass_response?.message  , toaster:"error"}
          )
        } 
       }, [ set_new_pass_response ]); 

    // sign in
        const {  history: { location: state }} = props;
        const dispatch = useDispatch(); 
        useEffect(async () => { 
          if (!objectIsEmpty(set_new_pass_response)) { 
            console.log("sign_in_response")
            const signInSuccesful = async (customer) => {
              const { id } = customer; 
              await setCookies("userId", id);
              await setCookies("customer_details", customer);
              await setUserId(id);
              setTimeout(() => {
                SocketService.init(dispatch);
              }, 300);
              if (!objectIsEmpty((localStorage.getItem("redirectUrl") !==null && localStorage.getItem("redirectUrl") !==undefined)  ?localStorage.getItem("redirectUrl") :{})) { 
                await history.push({
                  pathname: `${localStorage.getItem("redirectUrl")}`,
                  state: JSON.parse(localStorage.getItem("stateObject")),
                });
                await localStorage.removeItem("redirectUrl");
              } else { 
                await Do_Empty_signup_reducer_OBJECT_Action();
                history.push("/")
                // (await state.state) !== undefined
                //   ? history.push(`${state.state.next}`)
                //   : history.push("/");
              }
            };
            const { statusCode, message, customerData } =   set_new_pass_response;
              (await statusCode) !== 0 || statusCode == 2
              ? alert(message)
              : signInSuccesful(customerData);
           }
                         return ()=> Do_Empty_signup_reducer_OBJECT_Action(); 
        }, [  
          set_new_pass_response, 
    ]);

 // /////////////////////////  functions 
      const handleToken = useCallback((token) => {
        setAuthToken(token);
      }, [loadToken]); 

// create password handler 
     const createPasswordHandle =(e)=>{
      e.preventDefault()
      if(confirmPassword==password && password?.length>=8 ){
        setNewPassword({ 
          userId:locationData?.state?.userId,
          password 
        })} else {
          setConfirmPasswordText("Check is your Password 8 digit? OR Check is your password matching?") 
        }
      }
  
  const onChangeConfirmPass=useMemo((e)=>{
      if(confirmPassword==password){
        setConfirmPasswordText("") 
      } else{
        setConfirmPasswordText("Plase match your password") 
      }
     }, [confirmPassword]) 
  
     const SkipHandler=()=>{
      history.push("/")
     }
   return (
    
         <>
          <div className="fae--new-signup-page-container" >
             {loading && (
               <div className='fae-signup-loader'>
                  <FAELoading type="svg" loaderImage={loaderImage} height="100vh" />
                </div> 
                )}
                {/* main head  */}
                 <>
                   <div className="loginlogotop">
                   {window.screen.width>600?
                        <FAEImage className="fae-login-desktop-logo" src={getFileSrcFromPublicFolder("expert_logo_full.PNG")}/>
                        : <>
                            <FAEImage className="fae-mobile-logo" src={getFileSrcFromPublicFolder("expert_logo_full.PNG")}/>
                            {/* <FAETitle
                                className="fae-mobile-login-title"
                                label="Expert"
                                logo={getFileSrcFromPublicFolder("title_logo.svg")}
                            /> */}
                            {/* <FAEText className="fae-aaa-text">AnyService AnyTime AnyWhere</FAEText> */}
                        </> }
                    </div>
                    
                  {/* main body  context  */}
                    <main>
                      <form onSubmit={createPasswordHandle}>
                            <PaswordField
                              setPasswordValue={(e)=>setPassword(e.target.value)}
                              passwordLabel="Please enter your password" />
                             <span className="error">{passwordErrors}</span>
                            <PaswordField  
                              setPasswordValue={(e)=>setConfirmPassword(e.target.value) }
                              passwordLabel="Please confirm your password" />
                              <span className="error">{confirmPasswordErrors}</span>
                             <FAEText className="fae-confirm-Text">{confirmPasswordText}</FAEText>
                            <FAEButton>Next</FAEButton>
                        </form> 
                    </main> 
                 </>   
            </div>
           <ToastContainer/> 
        </> 
      )
   }

const mapStateToProps = ({
    signUpPageReducer: {
        error,
        loading,
        checkNumber_response,
        verify_email_response,
        set_new_pass_response,
        forgotPassoword_response,
        update_person_info_response,
        resendSMS_code_response,
        verifySMS_response,  
        sign_in_response
      },
      defaultReducer: { userCountryId },
})=>{
    return {
        loading,
        userCountryId,
        checkNumber_response,
        verify_email_response,
        set_new_pass_response,
        forgotPassoword_response,
        update_person_info_response,
        resendSMS_code_response,
        verifySMS_response, 
        sign_in_response
    }
}

const mapDispatchToProps =(dispatch)=>{
    return bindActionCreators({ 
        checkMobileNumber, 
        VerifySMSCodeAction,
        ResendSMSCode,
        UpdatePersonInfo,
        forgotPassword,
        setNewPassword,
        VerifyEmailNewSignup,
        Do_Empty_signup_reducer_OBJECT_Action ,

        signInAction,
        setUserId
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps )(memo(ForgotPasswordPage))



// //libs
// import React, { useEffect, useState } from "react";
// import {
//   FAETitle,
//   FAETextField,
//   FAEButton,
//   FAEPhoneInput,
//   FAECodeInput,
//   FAEDialogueBox,
// } from "@findanexpert-fae/components";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";

// //src
// import { getFileSrcFromPublicFolder, objectIsEmpty } from "../../utils";
// import history from "../../history";
// import {
//   makeResetPasswordResponseFalse,
//   makeSendResetCodeResponseFalse,
//   makeVerifyResetCodeResponseFalse,
//   resetPassword,
//   sendResetCode,
//   verifyResetCode,
// } from "../../redux/actions/forgotPasswordPageActions";

// //scss
// import "./ForgotPasswordPage.scss";

// const ForgotPasswordPage = ({
//   error,
//   loading,
//   sendResetCodeResponse,
//   verifyResetCodeResponse,
//   resetPasswordResponse,
//   resetPassword,
//   sendResetCode,
//   verifyResetCode,
//   makeSendResetCodeResponseFalse,
//   makeVerifyResetCodeResponseFalse,
//   makeResetPasswordResponseFalse,
//   userCountryId,
// }) => {
//   document.title = "Expert | Reset Password";
//   const [email, setEmail] = useState(""); 
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [code, setCode] = useState("");
//   const [isCodeSent, setIsCodeSent] = useState(false);
//   const [isCodeVerified, setIsCodeVerified] = useState(false);
//   const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
//   const [open, setOpen] = useState("");
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     if (code.length === 6) {
//       verifyResetCode({
//         email: email !== "" ? email : mobile,
//         code,
//         countryCode: userCountryId,
//       });
//     }
//   }, [code, email, mobile, userCountryId, verifyResetCode]);

//   useEffect(() => {
//     if (!objectIsEmpty(sendResetCodeResponse)) {
//       const { error, message } = sendResetCodeResponse;
//       setOpen(true);
//       makeSendResetCodeResponseFalse();
//       setContent(message);
//       if (!error) {
//         setIsCodeSent(true);
//       }
//     }
//   }, [makeSendResetCodeResponseFalse, sendResetCodeResponse]);

//   useEffect(() => {
//     if (!objectIsEmpty(verifyResetCodeResponse)) {
//       const { error, message } = verifyResetCodeResponse;
//       setOpen(true);
//       setContent(message);
//       makeVerifyResetCodeResponseFalse();
//       if (!error) {
//         setIsCodeVerified(true);
//       }
//     }
//   }, [makeVerifyResetCodeResponseFalse, verifyResetCodeResponse]);

//   useEffect(() => {
//     if (!objectIsEmpty(resetPasswordResponse)) {
//       const { error, message } = resetPasswordResponse;
//       setOpen(true);
//       setContent(message);
//       makeResetPasswordResponseFalse();
//       if (!error) {
//         setIsPasswordUpdated(true);
//       }
//     }
//   }, [makeResetPasswordResponseFalse, resetPasswordResponse]);
  
//   const isMobile= email.indexOf("@") ==-1 ?true: false
//   const handleSendResetCode = (e) => {
  
//     e.preventDefault();
     
//     if (email === "" && mobile === "") {
//       setOpen(true);
//       setContent("Please fill at least one field");
//     } else {
//       sendResetCode({
//         email: email !== "" ? email : mobile,
//         countryCode: userCountryId,
//         isMobile:isMobile
//       });
//     }
//   }; 
//   const handleResetPassword = (e) => {
//     e.preventDefault();
//     resetPassword({
//       email: email !== "" ? email : mobile,
//       code,
//       password,
//       countryCode: userCountryId,
//     }); 
//   };

//   return (
//     <>
//       <div className="fae--sign-in-page-container dpt dpb">
//         <div className="fae--sign-in-page-wrapper">
//           <FAETitle
//             label="Reset Password"
//             logo={getFileSrcFromPublicFolder("title_logo.svg")}
//           />
//           {!isCodeSent ? (
//             <form
//               className="fae--forgot-password-send-code-form"
//               onSubmit={handleSendResetCode}
//             >
//               <FAETextField
//                 type="email"
//                 getValue={(value) => {
//                   setEmail(value);
//                   setMobile(""); 
//                 }}
//                 value={email}
//                 placeholder="Enter your email"
//                 primary
//                 shadowBoxProps={{ primary: true }}
//               />
//               OR
//               <FAEPhoneInput
//                 getValue={(value) => { 
//                   setMobile(value);
//                   setEmail("");
//                 }}
//                 value={mobile}
//                 primary
//                 shadowBoxProps={{ primary: true }}
//               />{" "}
//               <FAEButton>{loading ? "Please Wait..." : "Send Code"}</FAEButton>
//             </form>
//           ) : !isCodeVerified ? (
//             <FAECodeInput getValue={setCode} />
//           ) : (
//             <form
//               className="fae--forgot-password-send-code-form"
//               onSubmit={handleResetPassword}
//             >
//               <FAETextField
//                 type="password"
//                 getValue={setPassword}
//                 value={password}
//                 placeholder="Password"
//                 primary
//                 shadowBoxProps={{ primary: true }}
//                 error={(value) =>
//                   value.length !== 0 && value.length < 8 ? true : false
//                 }
//                 errorMessage={"Password length must be 8 or greater"}
//                 required
//               />
//               <FAETextField
//                 type="password"
//                 getValue={setConfirmPassword}
//                 value={confirmPassword}
//                 placeholder="Confirm Password"
//                 primary
//                 shadowBoxProps={{ primary: true }}
//                 error={(value) =>
//                   (value.length !== 0 && value.length < 8) || value !== password
//                     ? true
//                     : false
//                 }
//                 errorMessage={
//                   password !== confirmPassword && confirmPassword.length > 7
//                     ? "Password do not match!"
//                     : "Confirm Password length must be 8 or greater"
//                 }
//                 required
//               />
//               {password === confirmPassword && (
//                 <FAEButton>
//                   {" "}
//                   {loading ? "Please Wait..." : "Update Password"}{" "}
//                 </FAEButton>
//               )}
//             </form>
//           )}
//         </div>
//       </div>
//       <FAEDialogueBox
//         open={open}
//         content={content}
//         buttons={[
//           {
//             label: "Ok",
//             onClick: () => {
//               if (isPasswordUpdated) {
//                 history.push("/sign-in");
//                 setOpen(false);
//               } else {
//                 setOpen(false);
//               }
//             },
//           },
//         ]}
//       />
//     </>
//   );
// };

// const mapStateToProps = ({
//   forgotPasswordPageReducer: {
//     error,
//     loading,
//     sendResetCodeResponse,
//     verifyResetCodeResponse,
//     resetPasswordResponse,
//   },
//   defaultReducer: { userCountryId },
// }) => ({
//   error,
//   loading,
//   sendResetCodeResponse,
//   verifyResetCodeResponse,
//   resetPasswordResponse,
//   userCountryId,
// });

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       sendResetCode,
//       verifyResetCode,
//       resetPassword,
//       makeSendResetCodeResponseFalse,
//       makeVerifyResetCodeResponseFalse,
//       makeResetPasswordResponseFalse,
//     },
//     dispatch
//   );
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
