import React, { useEffect,useState } from 'react'
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
  import './PaymentSuccessPage.scss';
  import { FAEContainer } from '@findanexpert-fae/components/dist/stories/FAEContainer/FAEContainer';
import { FAEServiceCard } from '@findanexpert-fae/components/dist/stories/FAEServiceCard/FAEServiceCard';
import { FAEAddressCard } from '@findanexpert-fae/components/dist/stories/FAEAddressCard/FAEAddressCard';
import { FAEBookingCard } from '@findanexpert-fae/components/dist/stories/FAEBookingCard/FAEBookingCard';
import FAEVoucherCard from '../../Temps/FAEVoucherCard/FAEVoucherCard';
import { FAEOfferServiceCard } from '@findanexpert-fae/components/dist/stories/FAEOfferServiceCard/FAEOfferServiceCard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {oneTimeCapture, oneTimeThreedsStatus, oneTimeHoldPayment} from '../../Webviews/ThreedsStatusWebviewAndroid/action';
import { useLocation } from 'react-router-dom';
import { FAEDialogueBox } from '@findanexpert-fae/components/dist/stories/FAEDialogueBox/FAEDialogueBox';

function PaymentSuccessPage() {
    const {state}=useLocation()
    const [stateData, setStateData]=useState(state)
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [success, setSuccess] =useState("no");
   
   const { serviceName, cartId,currencySymbol,subTotal, bookingId, amount,numberOfSessions, currency, returnUrl, paymentMethodId,generalBookingId, countryId, voucherCode,saveOneTimeCardDataResponse, userId}=stateData ?stateData:{}
   
 useEffect(()=> { 
    if(stateData?.summarypage ==true){
        setSuccess("yes")
    }
 var url = new URL(window.location.href); 
 var transactionid = url?.searchParams?.get("transactionId") ?? 0;

const setReturnUrl= `${document.domain=='localhost'?'https://expert-dev.findanexpert.net/payment-success':document.domain.indexOf("findanexpert") !==-1 ?`https://${document.domain}/payment-success`:"https://www.expert.one/payment-success"}`
   if(transactionid ===0){ 
    console.log(transactionid, 'transactionid') 
      const myoneTimeHoldPaymentObj ={
            userId: userId,
            cartId: cartId,
            bookingId:  bookingId,
            paymentAmount: subTotal,
            currency:currencySymbol=="£"?"GBP":"PKR",
            returnUrl:setReturnUrl,
            paymentMethodId: saveOneTimeCardDataResponse?.setupIntentResponseDetail?.paymentMethodId
          } 
           setCookies('summary_detail', { ...state, bookingTime: "", bookingDate:"", serviceName:serviceName, usercountryId:countryId, setuserid:userId, currencySymbol:currencySymbol=="£"?"GBP":"PKR", isReferralReceiver:"", selectedSessions:numberOfSessions, latitude: "",
          longitude:"", UbookingId:bookingId,totalAmount:subTotal, returnUrl:setReturnUrl, Vouchercode:voucherCode, availableProviderId:"",  paymentMethod: saveOneTimeCardDataResponse?.setupIntentResponseDetail?.paymentMethodId })
          oneTimeHoldPayment(myoneTimeHoldPaymentObj).then(async(resp) => { 
            console.log(resp, )
           if (resp.error === false && resp.code === 0) { 
              //    it is thank you page call 
              const captureObj={
                paymentAmount: state.subTotal,
                bookingId: state.bookingId,
                generalBookingId:state.generalBookingId ? state.generalBookingId:0,
                stripePaymentMethodId: resp?.setupIntentResponseDetail?.paymentMethodId,
                countryId: state?.countryId,
                voucherCode: state?.voucherCode?voucherCode:"",
                cartId:  state?.cartId,
                userId: state?.userId,
                transactionId: resp?.setupIntentResponseDetail?.transactionId,
                returnUrl: state.setReturnUrl,
               }
               
                oneTimeCapture(captureObj).then(result => {
                    if(result?.code==0 && result?.error ==false){ 
                        setSuccess("yes") 
                    } else {
                        setContent(result?.message);
                        setOpen(true);  
                    } 
                });  
            }
            if (resp.error === false && resp.code === 10) {
             //    it is stripe redirect way method.
                 await   window.location.assign(`${resp?.redirectUrl}`);
             } else if (resp.error == true && resp.code==1) {
                // it is an error if occur 
                 setContent(resp?.message);
                 setOpen(true);
             }  
        })
    } else{ 
       
        // came frome stripe  
        const {bookingTime, bookingDate, currencyName, usercountryId, setuserid, serviceName, generalBookingId, isReferralReceiver,currencySymbol, selectedSessions, latitude,  longitude, UbookingId, totalAmount, returnUrl , Vouchercode, availableProviderId, paymentMethod}=getCookies("summary_detail") !==undefined? getCookies("summary_detail") :{}
        var paymentIntent = url?.searchParams?.get("payment_intent_client_secret") ?? "no";
        var UrlcartId = url?.searchParams?.get("cartId") ?? "no";
          oneTimeThreedsStatus({cartId:UrlcartId, transactionId:transactionid}).then((myValueResult) =>{
            if (myValueResult.code === 0){ 
                const captureObj={
                paymentAmount: totalAmount,
                bookingId: UbookingId,
                generalBookingId:generalBookingId ? generalBookingId:0,
                stripePaymentMethodId: paymentMethod ,
                countryId: currencyName,
                voucherCode: voucherCode?voucherCode:"",
                cartId:  UrlcartId,
                userId: setuserid,
                transactionId: transactionid,
                returnUrl: setReturnUrl,
               }
               console.log(captureObj, 'captureObj 2')
                oneTimeCapture(captureObj).then(result => {
                    if(result?.code==0 && result?.error ==false){
                        setStateData(getCookies("summary_detail"))
                        setSuccess("yes")
                    } else {
                        setContent(result?.message);
                        setOpen(true);  
                    } 
                });
             }
           });
       }
    },[]); 
    const loaderImage = getFileSrcFromPublicFolder("loader.GIF"); 
    const currencyNameSymbol=stateData?.currencySymbol !=="GBP"?"Rs":"£"
  return (
    <>
        <FAEContainer style={{backgroundColor: '#f7f7f7'}}>
            <div className='fae-paynow-container'>
                <div className='fae-paynow-logo'>
                    <FAEImage src={getFileSrcFromPublicFolder("expert_logo.PNG")}/>
                    <h1>Expert</h1>
                </div>
                {success =="no" && 
                  (<FAELoading  type="svg" loaderImage={loaderImage} height="700px" />)
                }        
                {success =="yes" && 
                (
                 <>
                  <div className='fae-paynow-card-above'>
                    <div className='fae-paynow-invoice'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice ID.</FAEText>
                        <FAEText style={{fontSize: '16px'}}>{stateData?.invoiceNumber}</FAEText>
                    </div>
                    <div className='fae-paynow-created-on'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Created on</FAEText>
                        <FAEText style={{fontSize: '16px'}}>{stateData?.createdDate}</FAEText>
                    </div>
                </div>
                
                <div className="fae-paynow-card">
                    <div className='fae-paynowpaid-card-top'>
                        <div className='fae-paynow-invoice'>
                            <FAEText style={{color:'#5FDF5A', paddingTop: '5px', paddingBottom: '5px'}}>Paid</FAEText>
                            <FAEText style={{fontSize: '20px'}}>{currencyNameSymbol}{stateData?.subTotal}</FAEText>
                        </div>
                        <div className='fae-paynow-created-on'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Payable By</FAEText>
                            <FAEText style={{fontSize: '16px'}}>{stateData?.payableBy}</FAEText>
                        </div>
                    </div>
                    <div className='fae-paynow-invoice-form' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice Form</FAEText> 
                            <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',  fontWeight: 'bold'}}>{stateData?.businessName}</FAEText>
                            <div className='fae-invoice-icons'><FAEImage className="fae-addPhoneIcon-img" src={getFileSrcFromPublicFolder("icons/phone.PNG")}/> <FAEText style={{fontSize: '16px', paddingTop: '5px',color:'#6c6c6c'}}>{stateData?.businessAddress}</FAEText></div>
                            <div className='fae-invoice-icons'><FAEImage className="fae-addPhoneIcon-img" src={getFileSrcFromPublicFolder("icons/location.PNG")}/> <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}>{stateData?.businessPhone}</FAEText></div>
                      </div>
                    <div className='fae-paynow-invoice-form' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice To</FAEText>
                            <FAEText style={{fontSize: '16px', fontWeight: 'bold'}}>{stateData?.userName}</FAEText> 
                            <div className='fae-invoice-icons'><FAEImage className="fae-addPhoneIcon-img" src={getFileSrcFromPublicFolder("icons/location.PNG")}/> <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}>{stateData?.customerAddress}</FAEText></div>                 
                      </div>
                    <div className='fae-paynow-invoice-desc' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                        <div className='fae-paynow-description'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Description</FAEText>
                            <FAEText style={{fontSize: '16px', fontWeight: 'bold'}}>{stateData?.serviceName}</FAEText>
                            <FAEText style={{fontSize: '14px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}>{stateData.numberOfSessions} Sessions</FAEText>
                        </div>
                        <div className='fae-paynow-price'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Price</FAEText>
                            <FAEText style={{fontSize: '16px'}}>{currencyNameSymbol}{stateData?.price}</FAEText>
                        </div>
                    </div>
                    <div className='fae-paynow-invoice-desc' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                        <div className='fae-paynow-description'>
                            <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c'}}>Sub Total</FAEText>
                            <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c'}}>Discount</FAEText>
                            <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}>Tax</FAEText>
                        </div>
                        <div className='fae-paynow-price'>
                         <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c'}}>{currencyNameSymbol}{stateData?.subTotal}</FAEText>
                         <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c', textAlign: 'end' }}>{stateData?.discount}%</FAEText>
                         <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c', textAlign: 'end'}}>{stateData?.tax}%</FAEText>
                        </div>
                    </div>
                    <div className='fae-paynow-invoice-desc' style={{margin: '15px'}}>
                        <div className='fae-paynow-description'>
                            <FAEText style={{fontSize: '20px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c', fontWeight: 'bold'}}>Total to Pay</FAEText>
                        </div>
                        <div className='fae-paynow-price'>
                        <FAEText style={{fontSize: '20px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c', fontWeight: 'bold'}}>{currencyNameSymbol}{stateData?.subTotal}</FAEText>
                        </div>
                    </div> 
                </div>
               </>
                )}
            </div>
            <FAEDialogueBox
                open={open}
                content={content}
                buttons={[
                {
                    label: "Ok",
                    onClick: () => {
                    //set3dSecurity()
                    setOpen(false);
                    },
                },
                ]}
            />
         </FAEContainer>
    </>
  ) }

// export default PayNowPaidPage


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
      {  },
      dispatch
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccessPage);