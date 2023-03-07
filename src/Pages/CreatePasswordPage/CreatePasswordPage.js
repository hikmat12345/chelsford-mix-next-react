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

 function CreatePasswordPage({
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
    const loaderImage = getFileSrcFromPublicFolder("loader_forcomponent.svg");
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

    const location =useLocation()
 /////////////////////////// use effects 
//  useEffect(() => {
 
//   if (objectIsEmpty(checkNumber_response)) {
//       history.push("/account")
//   }
// }, []);

      useEffect(()=>{
        const interval= setInterval(()=>{
              setLoadToken(!loadToken)
            }, 20000)
         return ()=> clearInterval(interval)
      }, [loadToken]) 
    
      useEffect(() => {  
         if(set_new_pass_response?.statusCode==0 && forgotPassFlag==false){ 
          history.push({ pathname:"/account?signupstep=profile-information", state:{userId:location?.state?.userId}})
         }  

         if( set_new_pass_response?.statusCode==1   ){
          FAEToaster({message:  set_new_pass_response?.message !== undefined && set_new_pass_response?.message  , toaster:"error"}
             )
        }
        return ()=> {
          Do_Empty_signup_reducer_OBJECT_Action();
        }
       }, [ set_new_pass_response ]); 

        // sign in
        const {  history: { location: state }} = props;
        const dispatch = useDispatch(); 
        useEffect(async () => { 
          if (!objectIsEmpty(sign_in_response)  || !objectIsEmpty(set_new_pass_response) || !objectIsEmpty(customerData)) { 
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
                (await state.state) !== undefined
                  ? history.push(`${state.state.next}`)
                  : history.push("/");
              }
            };
            const { statusCode, message, customerData } =   set_new_pass_response;
              (await statusCode) !== 0 || statusCode == 2
              ? alert(message)
              : signInSuccesful(customerData);
            await Do_Empty_signup_reducer_OBJECT_Action();
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
     const createPasswordHandle =()=>{
      if(password?.length )
        setNewPassword({ 
          userId:userIdentification,
          password 
        })
      }
 

  const onChangeConfirmPass=useMemo((e)=>{
      if(confirmPassword==password){
        setConfirmPasswordText("") 
      } else{
        setConfirmPasswordText("Plase mach your password") 
      }
     }, [confirmPassword])


 
  
  
     const SkipHandler=()=>{
      history.push("/")
     }
   return (
    <GoogleReCaptchaProvider reCaptchaKey="6LfR7U0jAAAAAFOkVZiFzhUq2d2T57juuM8bkI4P">
       <GoogleReCaptcha onVerify={handleToken} refreshReCaptcha={false} /> 
         <>
          <div className="fae--new-signup-page-container" >
            {loading && (
                <FAELoading   type="svg" loaderImage={loaderImage} height="630px" />
                )}
                {/* main head  */}
                 {!loading && (
                  <>
                   <div className="loginlogotop">
                         {window.screen.width>600?
                        <FAEImage className="fae-login-desktop-logo" src={getFileSrcFromPublicFolder("expert_logo_full.PNG")}/>
                        : <>
                            <FAEImage className="fae-mobile-logo" src={getFileSrcFromPublicFolder("expert_logo_full.PNG")}/>
                            <FAETitle
                                className="fae-mobile-login-title"
                                label="Expert"
                                logo={getFileSrcFromPublicFolder("title_logo.svg")}
                            />
                            <FAEText className="fae-aaa-text">AnyService AnyTime AnyWhere</FAEText>
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
               )}
          </div>
        </>
        <ToastContainer/>
    </GoogleReCaptchaProvider>
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
export default connect(mapStateToProps, mapDispatchToProps )(memo(CreatePasswordPage))