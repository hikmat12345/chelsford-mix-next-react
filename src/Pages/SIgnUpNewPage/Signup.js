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
import "./signup.scss"
import { connect, useDispatch } from 'react-redux';
import MobileEntry from '../../widgets/mobileEntry';
import history from '../../history';
import PaswordField from '../../widgets/passwordToLogin';
import PhoneNumVerification from '../../widgets/phoneNumVerification';
import CreatePassword from '../../widgets/createPassword';
import ProfileInformation from '../../widgets/profileInformation';
import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton';
import { ToastContainer } from 'react-toastify';
import { useMemo } from 'react';
import { SocketService } from '../../helpers/socketservice';
import { setUserId } from '../../redux/actions/defaultActions';

 function Signup({
// reducers 
    loading,
    userCountryId,
    userCountry,
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
    const [mobileNumber, setMobileNumber] = useState("");
    const [userIdentification, setUserIdentfication] =useState("")
    const [mobileNumberErrMsg, setMobileError] =useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordText, setConfirmPasswordText] = useState("Please missmatching");
    const [authToken, setAuthToken]= useState("")
    const [loadToken,  setLoadToken]=useState(false)
    const [mobVerifCode, setMobVerifCode]= useState("")
    const [forgotPassFlag, setForgotPassFlag]= useState(false)
    const [loginPasswordFlag, setLoginPasswordFlag]= useState(false)
    const [firstNameInp, setFirstName]= useState("")
    const [lastNameInp, setLastname]= useState("")
    const [genderRadioVal, genderSelection] =useState("")
    const [agreement, handleAgreement] = useState(false)
    const [emailIdInput, setEmailIdInput] = useState("")
    const [resetPassFlag , setResetPassFlag]= useState(0)
    const [customerDz, setCustomerData]= useState({})
    const [passwordErrors, setPaasswordError]= useState()
    const [confirmPasswordErrors, setConfirmPasswordError]=useState()
    const [emailVerifCode, setEmailVerifCode]= useState("")
    const [tokenRefresh, setTokebRefresh] = useState(false);
    const [responseEmailMessage, emailErrorMessage]= useState("")
 /////////////////////////// use effects 
      useEffect(() => { 
        if (objectIsEmpty(checkNumber_response)) {
            history.push("/account")
          }
        }, []);

        useEffect(()=>{
          const interval= setInterval(()=>{
                setLoadToken(!loadToken)
              }, 100000)
          return ()=> clearInterval(interval)
        }, [loadToken]) 
   console.log(authToken, 'loadToken')
  // submit phone verification code 
      useEffect(() => {
        if (mobVerifCode.length === 6) {
          // Do_Empty_signup_reducer_OBJECT_Action()
          VerifySMSCodeAction({
            userId:userIdentification,
            verificationCode:mobVerifCode
          });
          setMobVerifCode("")
        }
      }, [mobVerifCode]);

      // submit email verification code 
      useEffect(() => {
        if (emailVerifCode.length === 6) {
          // Do_Empty_signup_reducer_OBJECT_Action()
          VerifyEmailNewSignup({
            userId:userIdentification,
            verificationCode:emailVerifCode
          });
          setEmailVerifCode("")
         } 
      }, [emailVerifCode]);

      useEffect(()=>{
        if(!objectIsEmpty(checkNumber_response)){
            setUserIdentfication(checkNumber_response?.userObject?.id)
          }  
          if(!objectIsEmpty(update_person_info_response)){
             setCustomerData(update_person_info_response)
          }
      }, [checkNumber_response, update_person_info_response])

      useEffect(() => { 

         if(checkNumber_response?.statusCode===-1){
            Do_Empty_signup_reducer_OBJECT_Action(); 
            history.push("/signupstep=verification-pn")  
         } 
         if(checkNumber_response?.statusCode===-2 ){
            setResetPassFlag(checkNumber_response?.statusCode) 
            Do_Empty_signup_reducer_OBJECT_Action();
            history.push("/account?loginstep=last")
         } 
         if (checkNumber_response?.statusCode===-3){
            Do_Empty_signup_reducer_OBJECT_Action();
            history.push("/account?signupstep=verification-pn")
         } 
          if(checkNumber_response?.statusCode===-4){
            Do_Empty_signup_reducer_OBJECT_Action();
            history.push("/account?signupstep=verification-pn")
         } 
         if(checkNumber_response?.statusCode===0 || (checkNumber_response?.statusCode===1 && checkNumber_response?.error !==true)  ){
          Do_Empty_signup_reducer_OBJECT_Action();
          history.push("/account?signupstep=verification-pn") 
         } 
         if(checkNumber_response?.error===true){
            FAEToaster({message: checkNumber_response?.message, toaster:"error"})
            Do_Empty_signup_reducer_OBJECT_Action();
         } 

        //  after first screen click
        if(forgotPassoword_response?.statusCode==0 ){
          Do_Empty_signup_reducer_OBJECT_Action(); 
          history.push("/account?code-verification=forgot-verification")  
         }
         if(verifySMS_response?.statusCode==0 && resetPassFlag==-2){ 
          Do_Empty_signup_reducer_OBJECT_Action();
          history.push({pathname:"/reset-password", state:{userId:userIdentification }}) 
         } 
         else  if(verifySMS_response?.statusCode==0 && checkNumber_response?.statusCode !==-2) 
         {
           Do_Empty_signup_reducer_OBJECT_Action();
           history.push("/account?signupstep=add-password") 
         }
         if(set_new_pass_response?.statusCode==0 && forgotPassFlag==true){ 
          Do_Empty_signup_reducer_OBJECT_Action();
          history.push("/account?signupstep=profile-information")
         } 
         if(update_person_info_response?.statusCode==0){
          Do_Empty_signup_reducer_OBJECT_Action();
          history.push("/account?signupstep=email-verification")
         }  
          

         if( verifySMS_response?.error ==true ){
          FAEToaster({message: verifySMS_response?.message, toaster:"error"})
          Do_Empty_signup_reducer_OBJECT_Action();
         }
         if( verify_email_response?.error ==true){
          FAEToaster({message: verifySMS_response?.message, toaster:"error"})
          Do_Empty_signup_reducer_OBJECT_Action();
         } 
         if(resendSMS_code_response?.error ==true ){
          FAEToaster({message: resendSMS_code_response?.message, toaster:"error"})
          Do_Empty_signup_reducer_OBJECT_Action();
         }
         if(update_person_info_response?.error ==true ){
          FAEToaster({message: update_person_info_response?.message, toaster:"error"})
          Do_Empty_signup_reducer_OBJECT_Action();
         }
         // return ()=>{ Do_Empty_signup_reducer_OBJECT_Action();}
      }, [checkNumber_response, verifySMS_response, 
          forgotPassoword_response,verify_email_response,
        update_person_info_response,set_new_pass_response,  resendSMS_code_response,]);

        // sign in
        const {  history: { location: state }} = props;
        const dispatch = useDispatch(); 
        useEffect(async () => { 
          if (!objectIsEmpty(sign_in_response)  || ( !objectIsEmpty(verify_email_response) && verify_email_response.error !==true)) { 
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
            const { statusCode, message, customerData } = (sign_in_response !==undefined && sign_in_response !==null && sign_in_response !==false &&  !objectIsEmpty(sign_in_response))  ? sign_in_response : customerDz;
              (await statusCode) !== 0 || statusCode == 2
              ? alert(message)
              : signInSuccesful(customerData);
            await Do_Empty_signup_reducer_OBJECT_Action();
          }
        return () => {
            Do_Empty_signup_reducer_OBJECT_Action();
          }
        }, [ 
          sign_in_response,
          verify_email_response, 
    ]);

 // /////////////////////////  functions 
      const handleToken = useCallback((token) => {
        setAuthToken(token);
      }, [loadToken]);
       const  handMobileEntrySubmit = (e)=>{
        setTokebRefresh((r) => !r);
        e.preventDefault();
        if(mobileNumber.length>=14) {
          setMobileError("")
            checkMobileNumber({
              mobileNumber:mobileNumber,
              countryCode: userCountryId, 
              authToken: authToken, 
           })
          } else {
           setMobileError("Please complete your phone numbuer")
          }
// history.push("/account?loginstep=last")
      }
      
     const passwordToLogin =()=>{ 
        history.push("/account?signupstep=verification-pn")
      }

// create password handler 
     const createPasswordHandle =(e)=>{
      e.preventDefault()
      if(confirmPassword==password && password?.length>=8 ){
        setForgotPassFlag(true) 
          setNewPassword({ 
            userId:userIdentification,
            password 
          })
       } else {
          setConfirmPasswordText("Check is your Password 8 digit? OR Check is your password matching?") 
       }
     }
 // login from password screen 
     const LoginHandler =()=>{ 
         signInAction(mobileNumber.replaceAll("-", "").trim(), password)
      }

  const onChangeConfirmPass=useMemo((e)=>{
      if(confirmPassword==password){
        setConfirmPasswordText("") 
      } else{
        setConfirmPasswordText("Plase mach your password") 
      }
     }, [confirmPassword])


// profile form submition 
    const ProfileInfoHandler=(e)=>{
      e.preventDefault()
      // if("^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]".test(emailIdInput)){
      UpdatePersonInfo({
        userId:userIdentification, 
        firstName:firstNameInp,
        lastName:lastNameInp,
        gender:genderRadioVal,
        emailAddress: emailIdInput,
        dob:""
      })
    //  } else {
    //   emailErrorMessage("Invalid Email")
    //  }
    }
    const RadioBoxesHanlder =(e)=>{
      genderSelection(e.target.value)
    }
  //  save or submit email id
    const SubmitEmailHandler=()=>{

    }
     //call api for forgot password announcment  
     const sendToForgot =()=>{ 
       forgotPassword({
        mobileNumber:mobileNumber,
        countryCode:userCountryId,
        isMobile: false,
        authToken: authToken
        // messageHash
       })
      }
    // create password that forgotton 
    const handleResetPassword= (e)=>{
      e.preventDefault()
        setForgotPassFlag(true) 
        setNewPassword({ 
          userId:userIdentification,
          password 
        }) 
    }
    // resend verification code again 
    const resendHandle =(isemailFlag)=>{
      ResendSMSCode({
        mobileNumber: mobileNumber.replaceAll("-", "").trim(),
        countryCode: userCountryId, 
        userId: userIdentification,
        email: emailIdInput,
        isEmail: isemailFlag
      })
     }
     const SkipHandler=()=>{
      history.push("/")
     }
   return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lci38kjAAAAAMPlCMX9KYmnuFwh7BLHX6O_j0ch">
       <GoogleReCaptcha onVerify={handleToken} refreshReCaptcha={tokenRefresh} /> 
         <div className="fae--new-signup-page-container" >
            {loading && (
               <div className='fae-signup-loader'>
                  <FAELoading   type="svg" loaderImage={loaderImage} height="100vh" />
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
                         
                          { searchParams.get("loginstep") =="last" ?
                               <>
                                 <PaswordField 
                                   setPasswordValue={(e)=>setPassword(e.target.value)}
                                   SubmitPasswordToLogin={passwordToLogin}/>
                                  <button className='fae-forgot-btn' onClick={sendToForgot}>Forgot Password?</button> 
                                 <FAEButton onClick={LoginHandler}>Login</FAEButton>
                               </>
                            : searchParams.get("signupstep") =="verification-pn" ?
                                 <PhoneNumVerification 
                                    resendHandler ={()=>resendHandle(false)}
                                    phoneNumber ={mobileNumber}
                                    verifcationCode ={setMobVerifCode}/>

                            : searchParams.get("code-verification") =="forgot-verification" ?
                                <PhoneNumVerification 
                                  resendHandler ={()=>resendHandle(false)}
                                  phoneNumber ={mobileNumber}
                                  verifcationCode ={setMobVerifCode}/>  

                            : searchParams.get("signupstep") =="add-password" ?
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

                             : searchParams.get("signupstep") =="profile-information" ?
                             // <button className='fae-skip-name' onClick={SkipHandler}>Skip</button>
                              <form onSubmit={ProfileInfoHandler}>
                                <ProfileInformation  
                                    InputFieldFNameChange={(e)=>setFirstName(e.target.value)}
                                    InputFieldLNameChange={(e)=>setLastname(e.target.value)}
                                    InputFieldEmailChange={(e)=>setEmailIdInput(e.target.value)}
                                    checkedSign={genderRadioVal}
                                    handleChange={RadioBoxesHanlder}
                                    // handleAgreement={(e)=>handleAgreement(!agreement)}
                                    emailTypeError={responseEmailMessage}
                                    // checkedStatus={agreement} 
                                    // submitPInfo={ProfileInfoHandler}
                                  />
                                </form> 

                             : searchParams.get("signupstep") =="email-verification" ?
                             // <button className='fae-skip-name' onClick={SkipHandler}>Skip</button>
                                <PhoneNumVerification
                                  resendHandler ={()=>resendHandle(true)}
                                  phoneNumber ={emailIdInput}
                                  verifcationCode ={setEmailVerifCode}/>

                              : searchParams.get("forgot-password") =="forgot" ?
                              <div>
                                  <PaswordField
                                    setPasswordValue={(e)=>setPassword(e.target.value)}
                                    passwordLabel="Please enter your password" />
                                  <PaswordField  
                                    setPasswordValue={(e)=>setConfirmPassword(e.target.value) }
                                    passwordLabel="Please confirm your password" />
                                  <FAEText className="fae-confirm-Text">{confirmPasswordText}</FAEText>
                                  <FAEButton onClick={handleResetPassword}>Next</FAEButton>
                               </div> 

                             : <MobileEntry 
                                enterNumberHandler ={handMobileEntrySubmit}
                                userCountry={userCountry}
                                handleChangefieldmobileValue ={setMobileNumber} 
                                message={mobileNumberErrMsg}
                                //  passwordFieldFlag={setLoginPasswordFlag}
                               > 
                               {/* <PaswordField   loginPasswordValue="" />  */}
                             </MobileEntry>
                        }     
                    </main> 
               </>   
          </div> 
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
      defaultReducer: { userCountryId, userCountry },
})=>{
    return {
        loading,
        userCountryId,
        userCountry,
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
export default connect(mapStateToProps, mapDispatchToProps )(memo(Signup))