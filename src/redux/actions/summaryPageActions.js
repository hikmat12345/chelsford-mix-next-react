import { fetchAction } from "../utils";

const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_BASE_URL_2 = process.env.REACT_APP_BASE_URL_2;
const REACT_APP_PAYMENT  = process.env.REACT_APP_PAYMENT_VOUCHER;
export const getSummary = ({
  cartId,
  serviceId,
  userId,
  voucherCode,
  isFreeConsultation,
  selectedSessions,
  countryId,
  discountCodeResp,
  discountCodeAmount,
  isTraining,
  is_service,
   
}) => {
  return fetchAction({
    type: "GET_SUMMARY_DATA",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/CalculateSummary`,
    payload: JSON.stringify({
      countryId:countryId,
      serviceId: serviceId,
      userId: userId,
      isService: true,
      cartId: cartId,
      VoucherCode: voucherCode,
      isFreeConsultation,
      session: selectedSessions,
      devicePlatform: "web",
      deviceName: "web",
      discountCode: discountCodeResp,
      discountCodeAmount: discountCodeAmount,
      isTraining: isTraining,
      is_service:is_service,
    }),
  });
};

export const getVoucherList = ({ serviceId, userId }) => {
  return fetchAction({
    type: "GET_VOUCHER_LIST",
    verb: "GET",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL}/Voucher/GetVoucherList/${userId}/${serviceId}`,
  });
};
 
export const capturePaymentAction = ({
  cartId,
  paymentAmount,
  stripePaymentMethodId,
  userCountryId, 
  bookingId, 
  voucherCode, 
  userCurrencyCode,
  transactionId,
  userId
   
}) => {
  return fetchAction({
    type: "SAVE_BOOKING",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${REACT_APP_PAYMENT}/Payment/CapturePayment`,
    payload: JSON.stringify({
    
       bookingId :bookingId,
       cartId : cartId ,
       countryId :userCountryId,
       currency :userCurrencyCode,
       paymentAmount,
       returnUrl: `${document.domain=='localhost'?'https://expert-dev.findanexpert.net/paymentverification':document.domain.indexOf("findanexpert") !==-1 ?`https://${document.domain}/paymentverification`:"https://www.expert.one/paymentverification"}`,
       stripePaymentMethodId :stripePaymentMethodId
      , transactionId :transactionId,
       userId :userId,
       voucherCode :voucherCode 
    
    }),
  });
};
export const saveCodBooking = ({
  paymentAmount,
  stripePaymentMethodId,
  userCountryId,
  email,
  bookingId,
  isReferralUsed,
  isTreatmentOfferUsed,
  cartId,
  voucherCode,
  selectedSessions,
  userCurrencyCode,
}) => {
  return fetchAction({
    type: "SAVE_BOOKING",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_2}/Payment/Cod`,
    payload: JSON.stringify({
      stripepaymentmethodId: stripePaymentMethodId,
      bookingid: bookingId,
      serviceproviderid: 0,
      currency: userCurrencyCode,
      paymentamount: paymentAmount,
      referralbonusused: isReferralUsed,
      isfreetreatmentused: isTreatmentOfferUsed,
      isocode: userCountryId,
      email,
      cartId,
      VoucherCode: voucherCode,
      numberOfSession: selectedSessions,
    }),
  });
};

export const HoldPayment = ({
  paymentAmount,
  stripePaymentMethodId, 
  bookingId, 
  cartId, 
  userCurrencyCode, 
  userId
}) => { 
  return fetchAction({
    type: "HOLD_PAYMENT",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${REACT_APP_PAYMENT}/Payment/HoldPayment`,
    payload: JSON.stringify({
      bookingId :bookingId,
      cartId : cartId ,
      currency : userCurrencyCode ,
      paymentAmount :paymentAmount,
      paymentMethodId :stripePaymentMethodId,
      returnUrl: `${document.domain=='localhost'?'https://expert-dev.findanexpert.net/paymentverification':document.domain.indexOf("findanexpert") !==-1 ?`https://${document.domain}/paymentverification`:"https://www.expert.one/paymentverification"}`,
      userId : userId 
        
    }),
  });
};



export const createBooking=({
  amount ,
  cartId ,
  chargeId ,
  distance ,
  isCaptured ,
  isReferralReceiver ,
  latitude ,
  longitude ,
  numberOfSessions ,
  providerIds ,
  referralBonusUsed ,
  userId ,
  voucherCode ,
  serviceVenu,
   bookingDate,
   bookingTime,
   duration,
   serviceId,
   trainingStartTime,
   trainingStartDate,
})=>{ 
 return fetchAction({
    type: "CREATE_BOOKING",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    endpoint: `${APP_BASE_URL_2}/Booking/CreateBookingTraining`,
    payload: JSON.stringify({
      amount:amount,
      cartId:cartId,
      chargeId:chargeId,
      // distance:distance,
      isCaptured:isCaptured,
      isReferralReceiver:isReferralReceiver,
      // latitude:latitude,
      // longitude:longitude,
      // numberOfSessions:numberOfSessions,
      // serviceVenu:serviceVenu,
      // providerIds:providerIds,
      referralBonusUsed:referralBonusUsed,
      userId:userId,
      voucherCode:voucherCode, 
      bookingDate: trainingStartDate,
      bookingTime:trainingStartTime,
      // duration:duration,
      serviceId:serviceId,
    }),
  });
}
 

 
export const setSaveBookingResponseToEmpty = () => {
  return {
    type: "SET_SAVE_BOOKING_RESPONSE_TO_EMPTY",
  };
};

export const setHoldPaymentResponseToEmpty = () => {
  return {
    type: "SET_HOLD_PAYMENT_RESPONSE_TO_EMPTY",
  };
};
export const setCreateBookingResponseToEmpty = () => {
  return {
    type: "SET_CREATEBOOKING_PAYMENT_RESPONSE_TO_EMPTY",
  };
};


export const SalesOrderSummary = ({tempBookingId, cartId, userId}) => {
  return fetchAction({
    type: "SALES_ORDER",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    payload: JSON.stringify({ 
        tempBookingId: tempBookingId,
        cartId: cartId,
        userId: userId
    }), 
    endpoint: `${APP_BASE_URL_2}/SalesOrder/SalesOrder` ,
  });
};

export const Getinvoice = ({
  salesOrderNumber,
  cartId,
  bookingId,
  userId,
  providerId
}) => {
  return fetchAction({
    type: "SALES_GET_INVOICE",
    verb: "POST",
    headers: { contentType: "includeBearer"},
    payload: JSON.stringify({
      salesOrderNumber: salesOrderNumber,
      cartId: cartId,
      bookingId: bookingId,
      userId: userId,
      providerId: providerId
    }), 
    endpoint: `${APP_BASE_URL_2}/SalesOrder/Getinvoice` ,
  });
};

export const applyDiscountCode= ({
 userid,
 serviceid,
 discountcode,
 currentdate,
 countryid,
 numberofsession,
 referraldiscount
})=>{
  return fetchAction({
    headers: { contentType: "includeBearer"},
    type:"APPLY_DISCOUNT_CODE",
    verb:"POST",
    payload :JSON.stringify({
      userid          :!isNaN(userid)? JSON.parse(userid):  userid,         
      serviceid       :serviceid ,    
      discountcode    :discountcode ,
      currentdate     :currentdate ,
      countryid       :countryid ,    
      numberofsession :numberofsession ,
      referraldiscount:referraldiscount     
    }),
    endpoint:`${APP_BASE_URL_2}/CalculateSummary/redeemdiscountcode`
  })
}

export const applyDiscountCodeObjectEmpty= ( )=>{

   return    {
    type: "SET_DIDSCOUNT_CODE_OBJ_TO_EMPTY",
  };
 }