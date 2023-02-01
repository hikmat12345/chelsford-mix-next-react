import React, { useEffect, useState } from 'react';
import {
    FAETitle,
    FAELoading,
    FAETextField,
    FAEButton,
    FAEText,
  } from "@findanexpert-fae/components";
  import "react-toastify/dist/ReactToastify.css";
  //src
  import {
      getCookies,
    getFileSrcFromPublicFolder,
    getUniqueData,
    objectIsEmpty,
    replaceSpaces,
    setCookies,
    validateInput,
  } from "../../utils";
  import  FAEPhoneInput from "../../Temps/FAEPhoneInput/FAEPhoneInput";
  import { SocketService } from "../../helpers/socketservice";
  import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
  import './PaymentMethodSelectionPage.scss';
  import { FAEContainer } from '@findanexpert-fae/components/dist/stories/FAEContainer/FAEContainer';
import { FAEServiceCard } from '@findanexpert-fae/components/dist/stories/FAEServiceCard/FAEServiceCard';
import { FAEAddressCard } from '@findanexpert-fae/components/dist/stories/FAEAddressCard/FAEAddressCard';
import { FAEBookingCard } from '@findanexpert-fae/components/dist/stories/FAEBookingCard/FAEBookingCard';
import FAEVoucherCard from '../../Temps/FAEVoucherCard/FAEVoucherCard';
import { FAEOfferServiceCard } from '@findanexpert-fae/components/dist/stories/FAEOfferServiceCard/FAEOfferServiceCard';
import { useLocation, withRouter } from 'react-router-dom';
import history from '../../history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function PaymentMethodSelectionPage({
    userId
}) {
   const {state} =useLocation()
const [phonenumumber, setPhoneNumber]=useState() 
 useEffect(()=>{
    var body = document.getElementsByTagName("body")[0];
    var classValue ='payment-method'
    body.className = body.className + ' '+ classValue; 
 }, [])
    // phone validation 
  const handleChangefieldValue = ({ value }) => {
    setPhoneNumber(value.replaceAll("-", "").trim());  
 }; 
 const userSignedInStatus =
    userId !== "" || getCookies("userId") !== undefined ? true : false;
 const payByExpertAccHandler=async()=>{
    
    const setReturnUrl= `${document.domain=='localhost'?'https://expert-dev.findanexpert.net/payment-success':document.domain.indexOf("findanexpert") !==-1 ?`https://${document.domain}/payment-success`:"https://www.expert.one/payment-success"}`

        if(!userSignedInStatus){
             await localStorage.setItem("redirectUrl", `/booking/Office-cleaning-sub-service/summary`)
             await localStorage.setItem('stateObject', JSON.stringify({...state,setuserId:state.userId,setReturnUrl:setReturnUrl, LinkUserCountry:state?.countryId==1 && "GB",LinkUserCountryId:state?.countryId, selectedSessions:state?.numberOfSessions }))
             await history.push(`/booking/${state.serviceName.replaceAll(" ", "-").toLowerCase()}/summary`)
        } else{
          history.push({pathname:`/booking/${state.serviceName.replaceAll(" ", "-").toLowerCase()}/summary`, state:{...state ,setuserId:state.userId,setReturnUrl:setReturnUrl, LinkUserCountry:state?.countryId==1 && "GB",LinkUserCountryId:state?.countryId,  selectedSessions:state?.numberOfSessions }})
       }
 }
 const ukflag = getFileSrcFromPublicFolder("uk-flag.png");

  return (
    <>
        <FAEContainer style={{backgroundColor: '#f7f7f7'}}>
            <div className='fae-paynow-container'>
                <div className='fae-paynow-logo'>
                    <FAEImage src={getFileSrcFromPublicFolder("expert_logo.PNG")}/>
                    <h1>Expert</h1>
                </div>
                <div className='fae-paynow-card-above'>
                    <div className='fae-paynow-invoice'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice ID.</FAEText>
                        <FAEText style={{  fontSize: '14px', fontWeight: 'bold'}}>{state?.invoiceNumber}</FAEText>
                    </div>
                    <div className='fae-paynow-created-on'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Created on</FAEText>
                        <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{state?.createdDate}</FAEText>
                    </div>
                </div>
                
                <div className="fae-paynowlogin-card">
                    <div className='fae-paynowlogin-card-top'>
                        <div className='fae-paynow-invoice'>
                            <FAEText style={{color:'#db0406', paddingTop: '5px', paddingBottom: '5px'}}>Unpaid</FAEText>
                            <FAEText style={{fontSize: '20px', fontWeight: 'bold'}}>{state?.currencySymbol}{state?.subTotal}</FAEText>
                        </div>
                        <div className='fae-paynow-created-on'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Payable By</FAEText>
                            <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{state?.payableBy}</FAEText>
                        </div>
                    </div>
                    <div className='fae-paynowlogin-payby'>
                        <FAEText style={{fontSize: '20px', color: '#444444'}}>Pay By Your Expert Account</FAEText>
                    </div> 
                </div>
                {/* <div className='fae-paynowlogin-phoneinput'>
                    <FAEText style={{backgroundColor: '#ffffff', width: '65px', textAlign: 'center', marginLeft: '20px', marginBottom: '-2px', borderRadius:'2px', zIndex:'100'}}>Phone</FAEText>
                    <FAEPhoneInput
                        className="fae-signin-input"
                        primary
                        getValue={(value) => handleChangefieldValue({ value })}
                        countryCode={"GB"}
                        shadowBoxProps={{
                        primary: true,
                        }}
                    />
                    
                </div> */}
                <div className='fae-paynowlogin-loginbtn'>
                    <FAEButton onClick={payByExpertAccHandler} style={{width: ' 100%', padding: '20px 0 20px 0', fontSize:'18px', marginTop: '10px'}}>{userSignedInStatus?"Pay Now":"Log In"}</FAEButton>
                </div>
                <div className='fae-paynowlogin-paybydeb'>
                    <FAEText className="fae-paynowlogin-paybydeb-title">Pay By Credit Or Debit Card</FAEText>
                    <div className='fae-paynowlogin-payimg'>
                    <FAEImage className="fae-paynowlogin-payimg-img" src={getFileSrcFromPublicFolder("icons/master_card.PNG")}/>
                        <FAEImage className="fae-paynowlogin-payimg-img" src={getFileSrcFromPublicFolder("icons/visa_card.PNG")}/>
                        <FAEImage className="fae-paynowlogin-payimg-img" src={getFileSrcFromPublicFolder("icons/unionpay.PNG")}/>

                    </div>
                    <div className='fae-paynowlogin-paylogin'>
                        <FAEButton onClick={()=>history.push({pathname:"/add-payment", state:{...state}})} style={{width: ' 95%', padding: '20px 0 20px 0', fontSize:'18px', marginTop: '10px', backgroundColor: '#444444'}}>Pay Now</FAEButton>
                    </div>
                </div>
                
            </div>
         </FAEContainer>
    </>
  )
}
 
const mapStateToProps = ({
    addPaymentCardPageReducer: { error, loading, saveCardDataResponse },
    defaultReducer: { userCountryId,userId, userCountry, userCurrencyCode },
  }) => ({
    error,
    loading,
    saveCardDataResponse,
    userCountry,
    userId
  });
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      {
        
      },
      dispatch
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodSelectionPage);
