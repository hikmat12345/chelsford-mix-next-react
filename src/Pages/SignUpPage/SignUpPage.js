//libs
import React, { useEffect, Children, useState, useCallback } from "react";
import {
  FAETitle,
  FAELoading,
  FAETextField,
  FAEButton,
  FAEPhoneInput,
  FAEDialogueBox,
  FAEText,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
 import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
//src
import {
  getFileSrcFromPublicFolder,
  getUniqueData,
  objectIsEmpty,
  validateInput,
} from "../../utils";
import {
  getSignUpForm,
  saveSignUpForm,
  setSignUpResponseToEmpty,
} from "../../redux/actions/signUpPageActions";
import history from "../../history";

//scss
// import "./SignUpPage.scss";
import { FAERadioGroup } from "@findanexpert-fae/components/dist/stories/FAERadioGroup/FAERadioGroup";

const loaderImage = getFileSrcFromPublicFolder("loader.webm");

const SignUpPage = ({
  loading,
  error,
  getSignUpForm,
  userCountryId,
  signUpFormData,
  totalSteps,
  saveSignUpFormResponse,
  setSignUpResponseToEmpty,
  saveSignUpForm,
}) => {
  useEffect(() => {
    history.push("/account")
  }, []);
  document.title = "Expert | Sign Up";
  const [currentStep, setCurrentStep] = useState(1);
  const [errorFileds, setErrorFields] = useState([]);
  const [fieldAnswers, setFieldAnswers] = useState([]);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken]= useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [capcha , setCapcha]= useState(true)
  const [loadToken,  setLoadToken]=useState(false)
  useEffect(() => {
    if (userCountryId !== "") {
      getSignUpForm(userCountryId, currentStep);
    }
  }, [getSignUpForm, userCountryId, currentStep]);

  useEffect(() => { 
    setErrorFields(
      signUpFormData?.map((field) => ({
        fieldId: field.id,
        error: field.isRequired,
      }))
    );
  }, [signUpFormData]);
  
useEffect(()=>{
  const interval= setInterval(()=>{
        setLoadToken(!loadToken)
      }, 15000)
   return ()=> clearInterval(interval)
}, [loadToken]) 
 
 
  useEffect(() => {
    if (!objectIsEmpty(saveSignUpFormResponse)) {
      const { error, message } = saveSignUpFormResponse;
      if (error) {
        alert(message);
      } else {
        setOpen(true);
        setContent(message);
      }
      setSignUpResponseToEmpty();
    }
  }, [saveSignUpFormResponse, setSignUpResponseToEmpty]);

  const handleChangefieldValue = ({ value, regex, id, fieldType, label }) => {
    fieldType === "email" && setEmail(value);
    label === "Password" && setPassword(value);
    label === "Confirm password" && setConfirmPassword(value);
    setFieldAnswers(
      getUniqueData(
        [{ fieldId: id, answer: value }, ...fieldAnswers],
        "fieldId"
      )
    );
    value !== "" &&
      setErrorFields(
        getUniqueData(
          [
            { fieldId: id, error: !validateInput(regex, value) },
            ...errorFileds,
          ],
          "fieldId"
        )
      );
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
   if(!capcha){
    alert("Please set reCAPTCHA")
   }else{
    return errorFileds.some((field) => field.error === true)
    ? alert("Please fill required fields")
    : currentStep !== totalSteps
    ? setCurrentStep(currentStep + 1)
    : password === confirmPassword
    ? saveSignUpForm(fieldAnswers, userCountryId, authToken)
    : alert("Passwords do not match!");
  };
};
  const profileFormParser = (data) => {
    const parsedData = data?.map(({ value ,id }) => ({
      value: `${id}`,
      label: value,
    }));
    return parsedData;
  };
 
  const handleToken = useCallback((token) => {
    console.log("token:", token);
    setAuthToken(token);
  }, [loadToken]);
  
if(loading){
   return (
      <FAELoading type="video" loaderImage={loaderImage} height="630px" />
        )
   }
   const doPadding= signUpFormData?.length<4 ?(signUpFormData.length==1 ?{paddingBottom: 284}:{paddingBottom: 280}): {paddingBottom: 284}
// const CaptchaKey= "6Lcap5IiAAAAAOL4eiZ0oKV5iAYS-LDWWSWzphpW"
  return (
    <>
    </>
  //   <GoogleReCaptchaProvider reCaptchaKey="6LfR7U0jAAAAAFOkVZiFzhUq2d2T57juuM8bkI4P">
  //      <GoogleReCaptcha onVerify={handleToken} refreshReCaptcha={false} /> 
  //      <>
  //       <div className="fae--sign-up-page-container dpt dpb" style={doPadding}>
  //          {!loading && (  <div className="fae--sign-up-page-wrapper">
  //         <FAETitle
  //           label="Sign Up"
  //           logo={getFileSrcFromPublicFolder("title_logo.svg")}
  //         /> 
  //         {!loading && signUpFormData?.length !== 0 && (
  //           <form
  //             onSubmit={handleSubmit}
  //             className="fae--sign-up-page-form-wrapper" >
  //               {Children.toArray(
  //                 signUpFormData?.map((field) => {
  //                   const { type, regex, isRequired, errorMessage, label, id, optionList, inputField } =
  //                     field; 
  //                 const fieldType = type.toLowerCase(); 
  //                 return (
  //                   <>
  //                     {fieldType === "text" ||
  //                      fieldType === "email" ||
  //                      fieldType === "password" ? (
  //                       <FAETextField
  //                         autoComplete="new-password"
  //                         placeholder={label}
  //                         primary
  //                         required={isRequired}
  //                         type={fieldType}
  //                         error={(value) =>
  //                            value !== "" && !validateInput(regex, value)
  //                         }
  //                         errorMessage={errorMessage}
  //                         getValue={(value) =>
  //                           handleChangefieldValue({
  //                             value,
  //                             regex,
  //                             id,
  //                             fieldType,
  //                             label,
  //                           })
  //                          }
  //                         shadowBoxProps={{
  //                           primary: true,
  //                         }}
  //                       />
  //                       ) : (
  //                       ""
  //                       )}
  //                     {fieldType === "phone" && (
  //                        <>
  //                        <FAEPhoneInput
  //                           primary
  //                           required={isRequired}
  //                           getValue={(value) =>
  //                             handleChangefieldValue({ id, value, label })
  //                           }
  //                           shadowBoxProps={{
  //                             primary: true,
  //                           }}
  //                         />
  //                       </>
  //                     )} 
  //                      {(fieldType === "radio" && optionList !==null ) && (
  //                         <FAERadioGroup
  //                           label={label}
  //                           values={profileFormParser(optionList)}  
  //                           primary 
  //                           shadowBoxProps={{
  //                             className: "fae--signup-page-field",
  //                           }}
  //                           isRequired={isRequired}
  //                           required={isRequired}
  //                           getSelectedValue={(value) =>
  //                             handleChangefieldValue({ id , value, label  })
  //                           } 
  //                         /> 
  //                     )} 
  //                   </>
  //                 );
  //               }) 
  //             )}
              
  //             <div className="fae-recaptcha">
  //               {/* <ReCAPTCHA 
  //                 sitekey={CaptchaKey}
  //                 onExpired={(e) => setCapcha(false)} 
  //               />  */}
  //             </div>
  //             {currentStep === totalSteps && (
  //               <FAEText>
  //                 By clicking Sign Up, indicates that you have read and agree to
  //                 our{" "}
  //                 <Link style={{ color: "red" }} to="/terms-and-conditions">
  //                   Terms & Conditions
  //                 </Link>{" "}
  //                 and{" "}
  //                 <Link style={{ color: "red" }} to="/privacy-policy">
  //                   Privacy Policy
  //                 </Link> .
  //               </FAEText>
  //             )}
  //             <FAEButton className="fae--sign-up-page-form-button">
  //               {currentStep !== totalSteps ?  "Next" : "Sign Up"}
  //             </FAEButton>
  //           </form>
  //         )}
  //       </div>)}  
  //     </div>
  //     <FAEDialogueBox
  //       open={open}
  //       content={content}
  //       buttons={[
  //         {
  //           label: "Ok",
  //           onClick: () => {
  //             setOpen(false);
  //             history.push({
  //               pathname: "/verify-account",
  //               state: { email },
  //             });
  //           },
  //         },
  //       ]}
  //     />
  //     </>
  // </GoogleReCaptchaProvider>
  );
};

const mapStateToProps = ({
  signUpPageReducer: {
    error,
    loading,
    signUpFormData,
    totalSteps,
    saveSignUpFormResponse,
  },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  signUpFormData,
  userCountryId,
  totalSteps,
  saveSignUpFormResponse,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSignUpForm,
      saveSignUpForm,
      setSignUpResponseToEmpty,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);