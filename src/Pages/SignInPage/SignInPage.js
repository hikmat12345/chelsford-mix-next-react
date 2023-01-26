//libs
import React, { useEffect, useLayoutEffect, useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
import {
  FAETitle,
  FAELoading,
  FAETextField,
  FAEButton,
  FAEText,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//src
import {
  getFileSrcFromPublicFolder,
  getUniqueData,
  objectIsEmpty,
  replaceSpaces,
  setCookies,
  validateInput,
} from "../../utils";
import {
  setSignInResponseToEmpty,
  signIn,
} from "../../redux/actions/signInPageActions";
import { setUserId } from "../../redux/actions/defaultActions";
import {changeULocId} from "../../redux/actions/changeCountryLocId"
import history from "../../history";

//scss
// import "./SignInPage.scss";
import { FAERadioGroup } from "@findanexpert-fae/components/dist/stories/FAERadioGroup/FAERadioGroup";
//import { FAEPhoneInput } from "@findanexpert-fae/components/dist/stories/FAEPhoneInput/FAEPhoneInput";
import { faeFormDataParser } from "../../parsers";
import FAEPhoneInput from "../../Temps/FAEPhoneInput/FAEPhoneInput";
import { SocketService } from "../../helpers/socketservice";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
const loaderImage = getFileSrcFromPublicFolder("loader.webm");

const SignInPage = ({
  loading,
  error,
  signInFormResponse,
  signIn,
  setSignInResponseToEmpty,
  setUserId,
  userCountryId,
  userCountry,
  changeULocId,
  ...props
}) => {

  useEffect(() => {
    history.push("/account")
  }, []);
  //javascript for Tab

  function openCity(cityName) {
    var i;
    var x = document.getElementsByClassName("Phone");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(signIn).style.display = "block";  
  }




  
  document.title = "Expert | Log In";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showImgInp, setShowImgInp] = useState("Email");

  const [errorFileds, setErrorFields] = useState([]);
  const [fieldAnswers, setFieldAnswers] = useState([]); 
  const {
    history: { location: state },
  } = props;

  const dispatch = useDispatch();
  useEffect(async () => { 
    if (!objectIsEmpty(signInFormResponse)) { 
      const signInSuccesful = async (customer) => {
        const { id } = customer;
        
        await setCookies("userId", id);
        await setCookies("customer_details", customer);
        //await changeULocId(id,  customer.firstName)
        await setUserId(id);
        setTimeout(() => {
          SocketService.init(dispatch);
        }, 300);
        if (!objectIsEmpty(localStorage.getItem("redirectUrl"))) { 
          await history.push({
            pathname: `${localStorage.getItem("redirectUrl")}`,
            state: JSON.parse(localStorage.getItem("stateObject")),
          });
          await localStorage.removeItem("redirectUrl");
        } else { 
          (await state.state) !== undefined
            ? history.push(`${state.state.next}`)
            : history.push("/");
        }
      };
      const { statusCode, message, customerData } = signInFormResponse;
      // statusCode === 2
      //   ? history.push({
      //       pathname: "/verify-account",
      //       state: { email: email },
      //     })
      //   :
      (await statusCode) !== 0 || statusCode == 2
        ? alert(message)
        : signInSuccesful(customerData);
      await setSignInResponseToEmpty();
    }
  }, [
    signInFormResponse,
    setSignInResponseToEmpty,
    setUserId,
    email,
    state.state,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  const fOption = [
    {
      id: 139,
      value: "Email",
    },
    {
      id: 140,
      value: "Phone Number",
    },
    {
      id: 140,
      value: "Account Number"
    }
  ];
  const profileFormParser = (data) => {
    const parsedData = data?.map(({ value, id }) => ({
      value: `${id}`,
      label: value,
    }));
    return parsedData;
  };
  const handleMailBoxAndMobile =(value) => { 
    setShowImgInp(value); 
  };
  



// Eamil validation 
  const handleChangefieldValue = ({ value, regex, id, fieldType, label }) => {
     setEmail(value.replaceAll("-", "").trim());  
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
const field= { 
    errorMessage: "invalid email",
    field: "Email"  ,
    inputField: "",
    isEmailVerified: false,
    isEnabled: true,
    isRequired: true, 
    label: "Email",
    maxLength: 200,
    minLength: 5,
    priority: 44,
    regex: "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]", 
    type: "EMAIL" 
  }
  const fieldAcc= { 
    errorMessageAcc: "invalid Account Number",
    fieldAcc: "number"  ,
    inputFieldAcc: "",
    isEmailVerifiedAcc: false,
    isEnabledAcc: true,
    isRequiredAcc: true, 
    labelAcc: "Account Number",
    maxLengthAcc: 20,
    minLengthAcc: 3,
    priorityAcc: 44,
    regexAcc: "[A-Za-z0-9.-]", 
    typeAcc: "number" 
  }
  const { type, regex, isRequired, errorMessage, label, id,  } = field; 
  const fieldType = type.toLowerCase();
  const { typeAcc, regexAcc, isRequiredAcc, errorMessageAcc, labelAcc, idAcc,  } = fieldAcc; 
  const fieldTypeAcc = type.toLowerCase();
  return (
    <>
     {/* {showImgInp == "Email" ? (
                  <> 
            
                        <FAETextField
                            autoComplete="new-password"
                            className="fae-signin-input"
                            placeholder={label}
                            primary
                            required={isRequired}
                            type={fieldType}
                            error={(value) =>
                              value !== "" && !validateInput(regex, value)
                            }
                            errorMessage={errorMessage}
                            getValue={(value) =>
                              handleChangefieldValue({
                                value,
                                regex,
                                id,
                                fieldType,
                                label,
                              })
                            }
                            shadowBoxProps={{
                              primary: true,
                            }}
                          />
                  </>
                ) : showImgInp == "Account Number" ? (
                  <>  
                    <FAETextField
                        className="fae-signin-input"
                        autoComplete="new-password"
                        placeholder={labelAcc}
                        primary
                        required={isRequiredAcc}
                        type={"number"}
                        error={(value) =>
                            value !== "" && !validateInput(regexAcc, value)
                        }
                        errorMessage={errorMessageAcc}
                        getValue={(value) =>
                          handleChangefieldValue({
                            value,
                            regexAcc,
                            idAcc,
                            fieldTypeAcc,
                            labelAcc,
                          })
                        }
                        shadowBoxProps={{
                          primary: true,
                        }}
                      />
                  </>
                ) : (
                  <FAEPhoneInput
                    className="fae-signin-input"
                    primary
                    getValue={(value) => handleChangefieldValue({ value })}
                    countryCode={userCountry}
                    shadowBoxProps={{
                      primary: true,
                    }}
                  />
                )}
 

                <div>
                <FAETextField
                  placeholder="Password"
                  primary
                  className="fae-password-field"
                  required
                  type="password"
                  getValue={setPassword}
                  shadowBoxProps={{
                    primary: true,
                  }}>
                  
                  </FAETextField>
                  <span className="show-password fa fa-arrow-right"></span>
                  </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <FAEText
                    onClick={() => history.push("/reset-password")}
                    style={{ cursor: "pointer" }}
                    className="fae-forgot-password-text"
                  >
                    Forgot Password?
                  </FAEText>
                </div>
                <FAEButton className="fae--sign-in-page-form-button">
                  LogIn
                </FAEButton>

                </div>  

 
              </form>
            </>
          )}
        </div>
        <ToastContainer />
      </div> */}
    </>
  );
};

const mapStateToProps = ({
  signInPageReducer: { error, loading, signInFormResponse },
  defaultReducer: { userCountryId, userCountry },
}) => ({
  error,
  loading,
  signInFormResponse,
  userCountryId,
  userCountry,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signIn,
      setSignInResponseToEmpty,
      setUserId,
      changeULocId
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
