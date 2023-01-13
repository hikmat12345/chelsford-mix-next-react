  //libs
import React, { useEffect, useState } from "react";
import { FAECardInput, FAEText, FAEButton, FAEShadowBox, FAEContainer } from "@findanexpert-fae/components"; 
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
//src 
import {
  addOneTimePayment,
} from "../../redux/actions/paymentInvoicePageAction";
import {
  FAEToaster,
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
} from "../../utils";
import history from "../../history";

//scss
import "./AddPaymentPage.scss"; 
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss'; 
//src     
import 'react-credit-cards/es/styles-compiled.css';  
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import { FAELoading } from "@findanexpert-fae/components/dist/stories/FAELoading/FAELoading";
const stripeKey = process.env.REACT_APP_STRIPE_KEY;
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const AddPaymentPage = ({
  loading,
  saveCardDataResponse,
  setCardDataResponseToEmpty,
  addOneTimePayment,
  userCountry,
  saveOneTimeCardDataResponse
}) => {
  document.title = `Chelsford | Add Card`;
  const location = useLocation();  
  const { state } = location;
  const redirectUrl =
    state === undefined ? "/payment-details" : `${state.redirectedUrl}`;
  const userData = getCookies("customer_details");
  // const { firstName, lastName, email } = userData;
  
  useEffect(()=>{
    var body = document.getElementsByTagName("body")[0];
    var classValue ='payment-method'
    body.className = body.className + ' '+ classValue; 
 }, [])

  useEffect(() => {
      if (!objectIsEmpty(saveOneTimeCardDataResponse)) {
        const { code,error, message } = saveOneTimeCardDataResponse;
        // code !== 0
        //   ? FAEToaster({message})
        //   : state === undefined
        //   ? history.push(redirectUrl)
        //   : FAEToaster({message})
        error== false? history.push({
              pathname: "/payment-success",
              state: { ...state, saveOneTimeCardDataResponse},
            }):FAEToaster({message:message, toaster:"error"}) 
      } 
    }, [
      userData?.email,
      redirectUrl,
      saveOneTimeCardDataResponse, 
      state,
    ]);
  const userId = getCookies("userId"); 
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
            FAEToaster({message:"You can't enter more than 16 digits!",toaster:"error"}) 
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
          FAEToaster({message:"You can't enter more than 4 digits!", toaster:"error"}) 
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
    addOneTimePayment({ 
      firstName:name,
      surname: userData?.lastName,
      userId:state?.userId, 
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
  // useEffect(()=>{
  //   if(!objectIsEmpty){
      
  //   }
  // }, [saveOneTimeCardDataResponse]) 
  // const {}= saveOneTimeCardDataResponse
  return (
    <FAEContainer style={{backgroundColor: '#f7f7f7'}}>
           {loading && (
            <FAELoading  type="svg" loaderImage={loaderImage} height="700px"  />
            )}
           {!loading && (
             <div className='fae-addpayment-container'>
                <div className='fae-paynow-logo'>
                    <FAEImage src={getFileSrcFromPublicFolder("expert_logo.PNG")}/>
                    <h1>Expert</h1>
                 </div>
                 <div className='fae-paynow-card-above'>
                    <div className='fae-paynow-invoice'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice ID.</FAEText>
                        <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{state?.invoiceNumber}</FAEText>
                    </div>
                    <div className='fae-paynow-created-on'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Created on</FAEText>
                        <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{state?.createdDate}</FAEText>
                    </div>
                </div> 
            <div className="fae-payand_add-card">
                <div className='fae-paynow-card-top'>
                        <div className='fae-paynow-invoice'>
                            <FAEText style={{color:'#db0406', paddingTop: '5px', paddingBottom: '5px'}}>Unpaid</FAEText>
                            <FAEText style={{fontSize: '20px', fontWeight: 'bold'}}>{state?.currencySymbol}{state.subTotal}</FAEText>
                        </div>
                        <div className='fae-paynow-created-on'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', fontWeight: 'bold', paddingBottom: '5px'}}>Payable By</FAEText>
                            <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{state?.payableBy}</FAEText>
                        </div>
                    </div>
          <form className="fae-payand_add-form" onSubmit={handleSubmit}>   
                <FAEText heading className="card-heading">Card Detail</FAEText>
              <div >
                {/* <label>Card Holder</label> */}
                <>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name on Card"
                        className="card-addpay-input-field"
                        value={name}
                        required
                        onChange={handleInputChange}
                      />
                  </> 
                 < >
                    <input
                      type="tel"
                      name="number"
                      placeholder="Card Number"
                      className="card-addpay-input-field"
                      value={number}
                      required
                      onChange={handleInputChange}
                    />
                </>  
                <div className="fae-card-input-flexing">
                   <>
                      <input
                        type="month"
                        name="expiry"
                        placeholder="Expiry Month/Year"
                        className="card-addpay-input-field"
                        value={expiryShow}
                        onChange={handleInputChange}
                        required 
                        min="2023-01"
                        max="2030-05"
                        />
                   </>
                {/* <label>CVC</label> */}
                  <>
                    <input
                      type="number"
                      name="cvc"
                      placeholder="CVC"
                      className="card-addpay-input-field"
                      value={cvc}
                      onChange={handleInputChange}
                      required
                      minLength={3}
                      maxLength={3}
                    />
                  </>
                </div>
            </div>
             <br />
        <FAEText subHeading className="card-heading">Billing Address</FAEText>
           <div  >
              {/* <label>Address</label> */}
              < >
                <input
                  type="text"
                  name="address"
                  placeholder="Address Line 1"
                  className="card-addpay-input-field"
                  value={address}
                  onChange={handleBillingAddress}
                />
              </>
              
              <div>
                {/* <label>City</label> */}
                <>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="card-addpay-input-field"
                    value={city}
                    onChange={handleBillingAddress}
                  />
                </> 
                
              </div>
              <div>
                {/* <label>Country</label> */}
                <>
                  <select defaultValue={state?.countryCode} onChange={(e) => setCountry(e.target.value)} className="card-addpay-input-field">
                    <option value='PK'>Pakistan</option>
                    <option value='GB'>United Kingdom</option>
                    <option value='US'>United State Of America</option>
                    <option value='SA'>Saudi Arabia</option>
                  </select> 
                </> 
                {/* <label>Post Code</label> */}
                <>
                  <input
                    type="text"
                    name="post_code"
                    placeholder="Post Code"
                    className="card-addpay-input-field"
                    value={postCode}
                    onChange={handleBillingAddress}
                  />
                </>
              </div> 
            </div>
          <br /> 
          <FAEButton type='submit' className="fae-pay-process-btn">Pay</FAEButton>
        </form> 
        </div>
       
      </div>
    )}
    <ToastContainer/>
    </FAEContainer>
  );
};
 

const mapStateToProps = ({ 
    defaultReducer: { userCountryId, userCountry, userCurrencyCode },
    salesOrderinvoiceRedcuer: {error, loading, saveOneTimeCardDataResponse}
  }) => ({
    error,
    loading, 
    userCountry,
    saveOneTimeCardDataResponse
  });
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      { 
        addOneTimePayment,
      },
      dispatch
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddPaymentPage);