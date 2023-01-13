//libs
import React, { useEffect, useState } from "react";
import { FAEText, FAEButton, FAELoading } from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import {
  saveCardData,
  setCardDataResponseToEmpty,

} from "../../redux/actions/addPaymentCardPageActions";
import {
  FAEToaster,
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
} from "../../utils";
import history from "../../history"; 
//scss
import "./AddPaymentCardPage.scss"; 
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss'; 
//src     
import 'react-credit-cards/es/styles-compiled.css';  
import { makeCardDefault,setDefaultCardObjEmpty } from "../../redux/actions/paymentDetailsPageActions";
const stripeKey = process.env.REACT_APP_STRIPE_KEY;
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const AddPaymentCardPage = ({
  loading=true,
  saveCardDataResponse,
  setCardDataResponseToEmpty,
  setDefaultCardObjEmpty,
  saveCardData,
  userCountry,
  makeCardDefault
}) => {
  document.title = `Chelsford | Add Card`;
  const location = useLocation(); 
 
  const { state } = location;
  const redirectUrl =
    state === undefined ? "/payment-details" : `${state.redirectedUrl}`;
  const userData = getCookies("customer_details");
  const { firstName, lastName, email } = userData;
   
   const userId = getCookies("userId");
  useEffect(() => {
      if (!objectIsEmpty(saveCardDataResponse)) {
        const { code, message, error } = saveCardDataResponse;
        code  == 0 & error ==false &&  makeCardDefault({userId, paymentMethodId:saveCardDataResponse?.setupIntentResponseDetail?.paymentMethodId })
        code  == 0 & error ==false && FAEToaster({   message:"Your card added successfuly.",  }) 
        code  !== 0 & error ==true && FAEToaster({   toaster:"error",  message:message,   }) 
        code  == 0 & error ==false  &&   history.push({  pathname: redirectUrl,  state: { ...state, cardmessage: message },  });
      return ()=>{
        setCardDataResponseToEmpty();
        setDefaultCardObjEmpty();
        }  
      } 
    }, [
      email,
      redirectUrl,
      saveCardDataResponse, 
      state,
    ]);
 
  
  const [cvc, setCvc] = useState("")
  const [expiry, setExpiry] = useState("")
  const [expiryShow, setExpiryShow] = useState("")
  const [focus, setFocus] = useState("")
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [address, setAddress] = useState("")
  const [addressLine, setAddressLine] = useState("")
  const [city, setCity] = useState("")
  const [stateValue, setState] = useState("")
  const [country, setCountry] = useState(userCountry)
  const [postCode, setPostCode] = useState("")
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("")
 
  const handleInputChange = (e) => {
    if (e.target.name === "name") {
      setFocus("name")
      setName(e.target.value.toUpperCase())
    }
    else if (e.target.name === "number") {
      if (e.target.value.replace(/\s/g, "").length <= 16) {
          if (e.target.value.replace(/\s/g, "").length % 4 === 0 && e.nativeEvent.inputType === "insertText") {
            setFocus("number")
            setNumber(e.target.value + " ") 
          }
          else {
            setFocus("number")
            setNumber(e.target.value)
          }
      }
      else {
        FAEToaster({toaster: "error", message:"not more than 16 digits!"})
        console.log(e.target.value.replace(/\s/g, "").substring(0, 16))
      }
    } 

    else if (e.target.name === "expiry") {
      setFocus("expiry")
      setExpiryShow(e.target.value)
      setExpiry(e.target.value.split("-")[1] + "/" + e.target.value.split("-")[0])
    }
    else if (e.target.name === "cvc") {


      if (e.target.value.replace(/\s/g, "").length <= 4) {
          if (e.target.value.replace(/\s/g, "").length % 5 === 0 && e.nativeEvent.inputType === "insertText") {
            setFocus("cvc")
            setCvc(e.target.value + " ") 
          }
          else {
            setFocus("cvc")
            setCvc(e.target.value)
          }
        }
        else {
          FAEToaster({toaster: "error", message:"not more than 4 digits!"})
          console.log(e.target.value.replace(/\s/g, "").substring(0, 16))
        } 
     }
  }

  const handleBillingAddress = (e) => {
    if (e.target.name === "address") {
      setAddress(e.target.value)
    }
    else if (e.target.name === "address_line") {
      setAddressLine(e.target.value)
    }
    else if (e.target.name === "city") {
      setCity(e.target.value)
    }
    else if (e.target.name === "state") {
      setState(e.target.value)
    }
    else if (e.target.name === "country") {
      setCountry(e.target.value)
    }
    else if (e.target.name === "post_code") {
      setPostCode(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    var cardNumber = number.replace(/\s/g, "").substring(0, 16)
    var expMonth = parseInt(expiry.split("/")[0])
    var expYear = parseInt(expiry.split("/")[1])   
    saveCardData({ 
      firstName:name,
      surname: lastName,
      userId, 
      expirationYear:expYear,
      expirationMonth:expMonth,
      cardNumber:cardNumber,
      cvv:cvc,
      city: city,
      country:country,
      line1:address,
      line2: addressLine,
      state: stateValue,
      postalCode: postCode
    })
  }
 


//   Visa	4242 
// Visa (debit)	4000
// Mastercard	5555 
// Mastercard (2-series)	2223 
// Mastercard (debit)	5200 
// Mastercard (prepaid)	5105 
// American Express	3782 
// American Express	3714 
// Discover	6011 
// Discover	6011 
// Discover (debit)	6011 
// Diners Club	3056 
// Diners Club (14-digit card)	3622 
// JCB	3566 
// UnionPay	6200 
  
   
  return (
    < div className="fae-payment-card-page">
      <UserInfoPageLayout 
      > 
       {loading && (
          <FAELoading type="svg" loaderImage={loaderImage} height="400px" />
        )}
        {!loading && (
          <>
            <Cards
                cvc={cvc}
                expiry={expiry}
                focused={focus}
                name={name}
                number={number}
                callback= {(e) => console.log("ee: ",e)}
              />
              <br />
              <form className="card-detail-form" onSubmit={handleSubmit}>
                  <FAEText subHeading className="card-heading">Credit Card</FAEText>
               <div >
                  <label>Card Number</label>
                < >
                    <input
                      type="tel"
                      name="number"
                      placeholder="Card Number"
                      className="card-input-field"
                      value={number}
                      required
                      onChange={handleInputChange}
                    />
                </> 
                <label>Card Holder</label>
                <>
                      <input
                        type="text"
                        name="name"
                        placeholder="Card Holder"
                        className="card-input-field"
                        value={name}
                        required
                        onChange={handleInputChange}
                      />
                </>
                <label>Expiry Month/Year</label>
                   <>
                      <input
                        type="month"
                        name="expiry"
                        placeholder="Expiry Month/Year"
                        className="card-input-field"
                        value={expiryShow}
                        onChange={handleInputChange}
                        required 
                        min="2023-01"
                        max="2030-05"
                      />
                </>
                <label>CVC</label>
                  <>
                    <input
                      type="number"
                      name="cvc"
                      placeholder="CVC"
                      className="card-input-field"
                      value={cvc}
                      onChange={handleInputChange}
                      required
                      minLength={4}
                      maxLength={4}
                    />
                </>
            </div>
             <br />
        <FAEText subHeading className="card-heading">Billing Address</FAEText>
           <div  >
              <label>Address</label>
              < >
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="card-input-field"
                  value={address}
                  onChange={handleBillingAddress}
                />
              </>
              <label>Address line 2</label>
              <>
                <input
                  type="text"
                  name="address_line"
                  placeholder="Address Line 2"
                  className="card-input-field"
                  value={addressLine}
                  onChange={handleBillingAddress}
                />
              </>
            <div className="billing-detail">
              <div>
                <label>City</label>
                <>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="card-input-field"
                    value={city}
                    onChange={handleBillingAddress}
                  />
                </>
              </div>
              <div>
                <label>State</label>
                <>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="card-input-field"
                    value={stateValue}
                    onChange={handleBillingAddress}
                  />
                </>
              </div>
            </div>
            <div className="billing-detail">
              <div>
                <label>Country</label>
                <>
                  <select defaultValue={userCountry} onChange={(e) => setCountry(e.target.value)} className="card-input-field">
                    <option value='PK'>Pakistan</option>
                    <option value='GB'>United Kingdom</option>
                    <option value='US'>United State Of America</option>
                    <option value='SA'>Saudi Arabia</option>
                  </select> 
                </>
              </div>
              <div>
                <label>Post Code</label>
                <>
                  <input
                    type="text"
                    name="post_code"
                    placeholder="Post Code"
                    className="card-input-field"
                    value={postCode}
                    onChange={handleBillingAddress}
                  />
                </>
              </div>
            </div>
          </div>
          <br />
          <FAEButton className="fae-payment-card-btn" type='submit'>Add Card</FAEButton>
        </form>
        </>
       )}
     </UserInfoPageLayout>
     <ToastContainer/>
    </div>
  );
};

const mapStateToProps = ({
  addPaymentCardPageReducer: { error, loading, saveCardDataResponse },
  defaultReducer: { userCountryId, userCountry, userCurrencyCode },
}) => ({
  error,
  loading,
  saveCardDataResponse,
  userCountry
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setCardDataResponseToEmpty,
      setDefaultCardObjEmpty,
      saveCardData,
      makeCardDefault
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentCardPage);
