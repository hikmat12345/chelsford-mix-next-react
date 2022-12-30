import { fetchAction } from "../../redux/utils";
const REACT_APP_PAYMENT_VOUCHER = process.env.REACT_APP_PAYMENT_VOUCHER;
const BEARER_TOKEN= process.env.REACT_APP_BEARER_TOKEN
const APP_BASE_URL = process.env.REACT_APP_BASE_URL;

//business availibility


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json"); 
myHeaders.append("mode", "no-cors");
myHeaders.append("Authorization", `Bearer ${BEARER_TOKEN}`); 
myHeaders.append("Access-Control-Allow-Origin","*");

export const ThreedsStatus = ({ cartId , transactionId }) => {
 
var raw = JSON.stringify({
   cartId : cartId,
   transactionId : transactionId
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
}; 
return fetch(`${REACT_APP_PAYMENT_VOUCHER}/Payment/ThreedsStatus`, requestOptions)
  .then(response => response.json())
  .then(result =>  result)
  .catch(error => error); 
};
 

export const capturePaymenFetch = ({ 
  cartId,
  paymentAmount,
  stripePaymentMethodId,
  userCountryId, 
  bookingId, 
  voucherCode, 
  userCurrencyCode,
  transactionId,
  userId}) => {
 
  var data = JSON.stringify({ 
    bookingId :bookingId,
    cartId : cartId ,
    countryId :userCountryId,
    currency :userCurrencyCode,
    paymentAmount,
    returnUrl: `${document.domain=='localhost'?'https://expert-dev.findanexpert.net/paymentverification':document.domain.indexOf("findanexpert") !==-1 ?`https://${document.domain}/paymentverification`:"https://www.expert.one/paymentverification"}`,
    stripePaymentMethodId :stripePaymentMethodId,
    transactionId :transactionId,
    userId :userId,
    voucherCode :voucherCode  
 });
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
  }; 
  return fetch( `${REACT_APP_PAYMENT_VOUCHER}/Payment/CapturePayment`, requestOptions)
    .then(response => response.json())
    .then(result =>  result)
    .catch(error => error); 
  };


  export function oneTimeCapture(oneTimeCaptureObj){
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(oneTimeCaptureObj),
      redirect: 'follow'
    }; 

     return fetch(`${REACT_APP_PAYMENT_VOUCHER}/OneTimePayment/CapturePayment`,requestOptions)
     .then(jsondata => {
      return jsondata?.json();
     }).then((resp) => {
      return resp 
    })
    .catch(e => {
      console.log('e', e)
    })

  }

  export function oneTimeHoldPayment(oneTimeHoldPaymentObj){
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(oneTimeHoldPaymentObj),
      redirect: 'follow'
    }; 
  return  fetch(`${REACT_APP_PAYMENT_VOUCHER}/OneTimePayment/HoldPayment`,requestOptions).then(response => response?.json())
          .then((resp) =>  resp  )
          .catch(e => console.log('e', e) )
  }
  
  export function oneTimeThreedsStatus(oneTimeThreedsStatusObj){
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(oneTimeThreedsStatusObj),
      redirect: 'follow'
    }; 
    return fetch(`${REACT_APP_PAYMENT_VOUCHER}/OneTimePayment/ThreedsStatus`,requestOptions).then(response => response?.json())
    .then((resp) =>  resp)
    .catch(e => console.log('e', e))
  }
 
export function getClinicAddressAPI(getclinicPayload){
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(getclinicPayload),
    redirect: 'follow'
  }; 
return  fetch(`${APP_BASE_URL}/Addresses/GetClinicAddresses`,requestOptions).then(response => response?.json())
        .then((resp) =>  resp  )
        .catch(e => console.log('e', e) )
}