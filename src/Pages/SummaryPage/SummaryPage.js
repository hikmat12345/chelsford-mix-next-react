//libs
import React, { Children, useCallback, useEffect, useState } from "react";
import {
  FAEText,
  FAETitle,
  FAERadioGroup,
  FAEButton,
  FAELoading,
  FAEDialogueBox,
  FAESelect,
  FAETextField,
  FAEShadowBox,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
 

//src
import {
  DataToDigits,
  FAEToaster,
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
  setCookies,
  todayDate,
} from "../../utils";
import {
  getSummary,
  getVoucherList,
  saveCodBooking,
  setSaveBookingResponseToEmpty,
  HoldPayment,
  setHoldPaymentResponseToEmpty,
  setCreateBookingResponseToEmpty,
  SalesOrderSummary,
  Getinvoice,
  applyDiscountCode,
  applyDiscountCodeObjectEmpty
} from "../../redux/actions/summaryPageActions";
import { getCardList } from "../../redux/actions/paymentDetailsPageActions";
import history from "../../history";
import { voucherParser } from "../../parsers";
import {  createBooking } from '../../redux/actions/summaryPageActions';
//scss 
import "./SummaryPage.scss";
import { capturePaymenFetch, oneTimeCapture, oneTimeHoldPayment } from "../../Webviews/ThreedsStatusWebviewAndroid/action";
import { ToastContainer } from "react-toastify";
import { GetVoucherByServiceId } from "../../redux/actions/servicesVocuhersPageActions";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import { useMemo } from "react";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const loaderApply = getFileSrcFromPublicFolder("loader_forcomponent.svg");
const SummaryPage = ({
  summary=[],
  getSummary,
  error,
  loading,
  getCardList,
  cardList,
  saveBooking,
  setSaveBookingResponseToEmpty,
  setHoldPaymentResponseToEmpty,
  setCreateBookingResponseToEmpty,
  saveBookingResponse,
  userCountryId, 
  userCountry,
  getVoucherList,
  voucherList,
  userCurrencyCode,
  defaultCardId,
  HoldPayment,
  holdpaymentData=[],
  saveCodBooking,
  createBooking,
  createBookingResp,
  GetVoucherByServiceId,
  summaryvoucher=[],
  SalesOrderSummary,
  Getinvoice,
  salesOrder,
  applyDiscountCode,
  discountPayload={},
  disocuntLoading,
  applyDiscountCodeObjectEmpty
}) => {
  const email = getCookies("customer_details").email;
  const [Loader, setLoader]= useState(loading)
  const location = useLocation();
  const { state, pathname } = location; 
  const {LinkUserCountry,LinkUserCountryId, serviceId, cartId, bookingId, freeConsultation, selectedSessions, providerId } = state;
    if(LinkUserCountry !==undefined && LinkUserCountry !==null && LinkUserCountry !==false){
       userCountry=LinkUserCountry
       userCountryId= LinkUserCountryId
     } 
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCard, setSelectedCard] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");
  const [discountCodeClicked, setdiscountCodeClicked] = useState(false);
  const [discountCode, setDiscountCode]=useState("")
  const [useDiscountCodeIcon,  setUseDiscountCode]=useState(false)
  const [popupBtnName, setPopupBtnName]=useState("Ok")
  const {
    address, 
    price,
    totalAmount,
    serviceName,
    bookingDate,
    bookingTime,
    percentageDiscount,
    currencySymbol,
    referralDiscount,
    voucherCode,
    voucherDiscount,
    duration,
    trainingEndDate, 
    trainingStartDate,
    trainingStartTime,
    isTraining,
    description,
    session,
    isReferralReceiver, 
  } = summary;  
  useEffect(()=>{
         GetVoucherByServiceId(getCookies("userId"), serviceId);
  }, []) 
  useEffect(() => {
    if (userCountry !== "") {
      userCountry === "PK"
        ? setPaymentMethod("cash")
        : setPaymentMethod("card");
    }
  }, [userCountry]); 

  useEffect(() => {
    getSummary({
      serviceId,
      cartId,
      voucherCode: summaryvoucher?.vouchers?.length ==1 ?  summaryvoucher?.vouchers[0]?.voucherCode : code,
      userId: getCookies("userId"),
      isFreeConsultation: freeConsultation,
      selectedSessions:0,
      countryId:1,
      isTraining:true,
      is_service:false,  
     });
    SalesOrderSummary({tempBookingId: bookingId, cartId:cartId, userId: JSON.parse(getCookies("userId"))}) 
    getVoucherList({ serviceId, userId: getCookies("userId") }); 
  }, [cartId, getSummary, getVoucherList, serviceId]);
  document.title = `Chelsford | ${serviceName} - Summary`; 

  useEffect(() => {
    if (paymentMethod !== "" && paymentMethod === "card") {
      getCardList(email);
    }
  }, [email, getCardList, paymentMethod]);

  useEffect(() => {
    setSelectedCard(defaultCardId ?? "");
  }, [defaultCardId]);
  const defaultPaymentMethodId= cardList?.filter((card) => card?.defaultPaymentMethod ==true)

  // handle click on confirm booking button 
  const  handleSaveBooking =(e)=>{
    setLoader(true)
    applyDiscountCodeObjectEmpty() 
    if((defaultPaymentMethodId[0]?.id =="" ||  defaultPaymentMethodId[0]?.id ==null ||  defaultPaymentMethodId[0]?.id ==undefined) && userCountryId !==171){
      setContent("Please select or add your payment card.");
      setOpen(true);
      setPopupBtnName("Select Card") 
      return
    } 
        if (freeConsultation) { 
            saveCodBooking({
              email,
              bookingId,
              isTreatmentOfferUsed: false,
              isReferralUsed: false,
              paymentAmount: 0,
              stripePaymentMethodId: "Cash",
              userCountryId,
              cartId,
              voucherCode,
              selectedSessions,
            });
        } else {
          Getinvoice({ 
            salesOrderNumber:salesOrder?.salesOrders?.salesOrderNumber,
            cartId:cartId,
            bookingId:bookingId,
            userId:JSON.parse(getCookies("userId")),
            // provider id 0 bcoz sajid said it's optional
            providerId:0 
          })
          bookingId == "" ? alert("Booking Id can't be empty"): 
          paymentMethod === "cash"  ?  
          saveCodBooking({
                  email,
                  bookingId,
                  isTreatmentOfferUsed: false,
                  isReferralUsed: false,
                  paymentAmount: totalAmount,
                  stripePaymentMethodId: "Cash",
                  userCountryId,
                  cartId,
                  voucherCode,
                  selectedSessions,
                  userCurrencyCode,
              })
            : HoldPayment({
                  paymentAmount:totalAmount,
                  stripePaymentMethodId: defaultPaymentMethodId[0]?.id,
                  bookingId, 
                  cartId, 
                  userCurrencyCode, 
                  email, 
                  userId:getCookies("userId")  
            }) &&  setStatus(true) 
        }   
   } 

  useEffect( async() => {  
    const {message, reason, redirectUrl, returnUrl, setupIntentResponseDetail} = holdpaymentData;
     const {transactionId,paymentMethodId}=setupIntentResponseDetail?setupIntentResponseDetail:{}
    if (!objectIsEmpty(holdpaymentData)) {
     if(holdpaymentData?.error !== true && holdpaymentData.code==0) {
      setLoader(true)
      applyDiscountCodeObjectEmpty()
       capturePaymenFetch({
            cartId,
            paymentAmount:totalAmount,
            stripePaymentMethodId:paymentMethodId,
            userCountryId:userCountryId !==""? userCountryId:getCookies("switched_id"), 
            bookingId:bookingId, 
            voucherCode:code, 
            userCurrencyCode,
            transactionId:transactionId,
            userId:getCookies("userId") 
          }).then((res)=>{ 
           
            if(res?.error !==true && res?.statusCode !==1){
              
                  createBooking({
                    trainingStartTime,
                    trainingStartDate,
                    amount :totalAmount,
                    cartId :cartId,
                    chargeId : res?.setupIntentResponseDetail?.chargeId,
                    distance :20,
                    isCaptured :true, 
                    isReferralReceiver :isReferralReceiver,
                    latitude : `${state?.latitude}` ,
                    longitude : `${state?.longitude}` ,
                    numberOfSessions :session,
                    providerIds : providerId ,
                    referralBonusUsed :false,
                    userId :JSON.parse(getCookies("userId")),
                    voucherCode :code,
                    serviceVenu: state.isInClinic ? 2:1,
                    bookingDate:bookingDate,
                    bookingTime:bookingTime,
                    duration:duration,
                    serviceId:serviceId,
                  })   
               } else{
                FAEToaster({
                  toaster:"error",
                  message:res.message, 
                })
               }
             }) 
          } if (holdpaymentData?.error !== true && holdpaymentData.code==10) { 
           await Getinvoice({ 
                  salesOrderNumber:salesOrder?.salesOrders?.salesOrderNumber,
                  cartId:cartId,
                  bookingId:bookingId,
                  userId:JSON.parse(getCookies("userId")),
                  providerId:0 
              })
            await setCookies('summary_detail', {isInClinic:state.isInClinic,trainingStartTime, trainingStartDate, bookingTime: isTraining ? trainingStartTime : bookingTime, bookingDate: isTraining ? trainingStartDate : bookingDate, serviceName,  currencySymbol:currencySymbol, isReferralReceiver:isReferralReceiver, selectedSessions:selectedSessions, latitude: state?.latitude,  longitude:state?.longitude, UbookingId:bookingId,totalAmount:totalAmount, returnUrl:returnUrl, Vouchercode:code, availableProviderId:providerId,  paymentMethod: paymentMethodId
              ,duration:duration, serviceId:serviceId,  })
           await   window.location.assign(`${redirectUrl}`);
          } else if (holdpaymentData?.error == true && holdpaymentData.code==1) {
            setContent(message);
            setOpen(true);
          }
        } 
      return ()=>{    
        setSaveBookingResponseToEmpty();
        setCreateBookingResponseToEmpty();
        setHoldPaymentResponseToEmpty(); 
      } 
  }, [
     holdpaymentData,
    //  createBookingResp,
     status
  ]);  

  // do send to thank page
  useEffect(()=>{  
  if(!objectIsEmpty(createBookingResp)){
    if( createBookingResp.code==0 && createBookingResp.error==false){
      history.push({
        pathname: "/thank-you-for-booking",
        state: {
            message: createBookingResp?.message,
            bookingTime: isTraining ? trainingStartTime : bookingTime,
            bookingDate: isTraining ? trainingStartDate : bookingDate,
            serviceName,
            bookingId: bookingId,
            cartid:cartId
        },
      }); 
     } else {
      FAEToaster({
        toaster:"error",
        message:createBookingResp?.message, 
      }) 
     }
   }
   return ()=>{ 
    setSaveBookingResponseToEmpty();
    setCreateBookingResponseToEmpty();
    setHoldPaymentResponseToEmpty(); 
  } 
  },[createBookingResp.code])

  const profileFormParser = (data) => {
    const parsedData =  data?.map(({ voucherCode }) => ({
      value: `${voucherCode}`,
      label: voucherCode,
    }));
    return parsedData;
  };

  

// useEffect(()=>{
//   if(voucherDiscount !== 0){
//     FAEToaster({message:"Voucher code applied successfuly.", toaster:"success"}) 
//   } 
// }, [voucherDiscount])

// apply voucher code 
const applyVoucherCode=  ()=>{
     setDiscountCode("");
      applyDiscountCodeObjectEmpty();
      getSummary({
        serviceId,
        cartId,
        voucherCode: code,
        userId: getCookies("userId"),
        isFreeConsultation: freeConsultation,
        selectedSessions,
      })
  } 
//  apply discount code 
 const handleDisocuntCode = async ()=>{
   await applyDiscountCodeObjectEmpty();
   setUseDiscountCode(false)
   await applyDiscountCode({
      userid:getCookies("userId"),
      serviceid:serviceId,
      discountcode:discountCode,
      currentdate:todayDate,
      countryid:userCountryId,
      numberofsession:selectedSessions,
      referraldiscount:referralDiscount 
    })
   await setdiscountCodeClicked(!discountCodeClicked) 
 }
 
 useEffect(()=>{ 
  if(!objectIsEmpty(discountPayload)){
      if(!discountPayload?.error){ 
        getSummary({
          serviceId,
          cartId,
          voucherCode: "",
          userId: getCookies("userId"),
          isFreeConsultation: freeConsultation,
          selectedSessions,  
          discountCodeResp: discountCode,
          discountCodeAmount: discountPayload?.discountCodeAmount,
        })  
        if(discountPayload?.message=="Success"){ 
          FAEToaster({message:"Your Discount code applied successfuly.", toaster:"success"}) 
        } else {
           FAEToaster({message:discountPayload?.message, toaster:"success"}) 
        }
        setUseDiscountCode("true")
   } else if(discountPayload?.error) { 
     FAEToaster({message:discountPayload?.message, toaster:"error"})
     setUseDiscountCode("false")
   } 
    return ()=> applyDiscountCodeObjectEmpty();
  } 
 }, [discountPayload?.error, discountCodeClicked])
 

  return (
    <>
      <div className="random-design-container dpt dpb">
        {Loader && (
          <FAELoading type="svg" loaderImage={loaderImage} height="400px" />
        )}
        {!Loader && (
          <>
            <FAETitle
              label={serviceName}
              logo={getFileSrcFromPublicFolder("title_logo.svg")}
            />
            {/* <FAEText bold>Please check your summary details</FAEText> */}
            <div className="details-and-method-container">
              <FAEText subHeading>
                <span className="red-text">Service</span> Details
              </FAEText>
              {(code !=="" && voucherDiscount !== 0) && 
                   <div className="fae-success-sum">
                     <div>Vocher applied </div> <FAEImage className="fae-success-sum-icon" placeholder={getFileSrcFromPublicFolder("icon-placeholder.png")}  
                      src={getFileSrcFromPublicFolder("success.png" )}/>
                   </div>
                   }
              <FAEShadowBox primary padding className="fae--summary-wrapper">
                <div className="summary-page-each-info-unit line-break">
                  <div>
                    <FAEText
                      tertiary
                      paragraph
                      className="summary-info-headers"
                      bold
                    >
                      Service Name
                    </FAEText>
                    <FAEText className="summary-info-text ">
                      {serviceName}
                    </FAEText>
                  </div>
                  <FAEText className="summary-info-text ">
                    {currencySymbol}
                    {price}
                  </FAEText>
                </div>

                <div className="summary-page-each-info-unit line-break">
                  <div>
                    <FAEText
                      tertiary
                      paragraph
                      className="summary-info-headers"
                    >
                      Date and Time
                    </FAEText>
                    <FAEText className="summary-info-text">
                      {isTraining
                        ? `${trainingStartDate} - ${trainingEndDate}`
                        : bookingDate}
                    </FAEText>
                  </div>
                  <FAEText className="summary-info-text">
                    {isTraining ? `${trainingStartTime?.split(":")[0]} : ${trainingStartTime?.split(":")[1]}` : bookingTime}
                  </FAEText>
                </div>

                {session !== 0 && (
                  <div className="summary-page-each-info-unit line-break">
                    <div>
                      <FAEText
                        tertiary
                        paragraph
                        className="summary-info-headers"
                      >
                        No. Of Sessions
                      </FAEText>
                      <FAEText className="summary-info-text">{session}</FAEText>
                    </div>
                  </div>
                )}

                <div className="summary-page-each-info-unit line-break">
                  <div>
                    <FAEText
                      tertiary
                      paragraph
                      className="summary-info-headers"
                    >
                      Location
                    </FAEText>
                    <FAEText className="summary-info-text">
                      {summary.location}
                    </FAEText>
                  </div>
                  {!isTraining && (
                    <div>
                      <FAEText
                        tertiary
                        paragraph
                        className="summary-info-headers"
                      >
                        Duration
                      </FAEText>
                      <FAEText className="summary-info-text">
                        {duration} min(s)
                      </FAEText>
                    </div>
                  )}
                </div>

                {isTraining && (
                  <div className="summary-page-each-info-unit line-break">
                    <div>
                      <FAEText
                        tertiary
                        paragraph
                        className="summary-info-headers"
                      >
                        Description
                      </FAEText>
                      <FAEText className="summary-info-text">
                        {description}
                      </FAEText>
                    </div>
                  </div>
                )}

                {/* <div className="summary-page-each-info-unit">
                  <div>
                    <FAEText
                      tertiary
                      paragraph
                      className="summary-info-headers">
                      Address
                    </FAEText>
                    <FAEText className="summary-info-text">{address}</FAEText>
                  </div>
                </div>  */}
              </FAEShadowBox>
            </div>

            {!freeConsultation && (
              <div className="details-and-method-container payment-details">
                <FAEText subHeading>
                  <span className="red-text">Payment</span> Details
                </FAEText>
                  <FAEShadowBox
                    primary
                    padding
                    className="details-and-method-wrapper-body"
                    >
                    <div className="summary-page-each-info-unit">
                      <FAEText tertiary>Price</FAEText>
                      <FAEText className="summary-info-text" tertiary>
                        {currencySymbol}
                        {price}
                      </FAEText>
                    </div>
                  <div className="summary-page-each-info-unit">
                    <FAEText tertiary>Discount</FAEText>
                    <FAEText className="summary-info-text" tertiary>
                      {currencySymbol}
                      {percentageDiscount}
                    </FAEText>
                  </div>
                  { (loading ==false && (discountPayload?.discountCodeAmount &&  discountPayload?.discountCodeAmount !==0)) ?
                    <div className="summary-page-each-info-unit">
                    <FAEText tertiary>Discount Code Amount </FAEText>
                    <FAEText className="summary-info-text" tertiary>
                      {currencySymbol}
                      {discountPayload?.discountCodeAmount}
                    </FAEText>
                  </div> :""
                  }
                  {referralDiscount !== 0 && (
                    <div className="summary-page-each-info-unit">
                      <FAEText tertiary>Referral Bonus</FAEText>
                      <FAEText className="summary-info-text" tertiary>
                        {currencySymbol}
                        {referralDiscount}
                      </FAEText>
                    </div>
                  )}
                  {voucherDiscount !== 0 && (
                    <div className="summary-page-each-info-unit">
                      <FAEText tertiary>Voucher Discount</FAEText>
                      <FAEText className="summary-info-text" tertiary>
                        {currencySymbol}
                        {voucherDiscount}
                      </FAEText>
                    </div>
                  )}
                  <div className="summary-page-each-info-unit top-line-break">
                    <FAEText className="summary-sub-total">Subtotal</FAEText>
                    <FAEText className="summary-sub-total">
                      {currencySymbol}
                      {totalAmount}
                    </FAEText>
                  </div>
                </FAEShadowBox>
              </div>
            )}
            {/* vocher section  */}
             {/* {!freeConsultation && voucherDiscount === 0 && (
              <div className="details-and-method-container payment-details">
                <FAEText subHeading>
                  <span className="red-text">Expert</span> Voucher
                </FAEText>
                <FAEShadowBox primary padding className="voucher-body-wrapper">
                  {voucherList.length !== 0 && (
                    <FAESelect
                      shadowBoxProps={{
                        className: "summary-voucher-field",
                      }}
                      values={voucherParser(voucherList)}
                      getSelectedValue={(value) => setCode(value)}
                      value={code}
                    />
                  )} 
                   {(  summaryvoucher?.vouchers?.length >1) ? (
                      <FAESelect
                          label={"Voucher Code"}
                          primary
                          shadowBoxProps={{
                            className: "fae--voucher-field",
                          }}  
                          values={profileFormParser(summaryvoucher?.vouchers)}
                          getSelectedValue={setCode}
                          value={code}
                        />) : (
                                <FAETextField
                                  className="fae--discount-field"
                                  label={"Voucher Code"}
                                  placeholder={"Please enter voucher code"}
                                  primary
                                  value={summaryvoucher?.length !==0 &&  (summaryvoucher?.vouchers[0]?.voucherCode !=="" && summaryvoucher?.vouchers[0]?.voucherCode !==undefined && summaryvoucher?.vouchers[0]?.voucherCode !==null) ? summaryvoucher?.vouchers[0]?.voucherCode :code} 
                                  type={"text"} 
                                  errorMessage={"errorMessage"}
                                  getValue={(value) =>
                                    setCode(value)
                                  }
                                  shadowBoxProps={{
                                    className: "fae--edit-profile-page-field",
                                  }} 
                              />
                       )}
                     {code !=="" && <FAEButton
                        onClick={() =>
                        code.length > 1 &&
                         applyVoucherCode()
                        }>
                         Apply Voucher
                      </FAEButton>
                     }
                </FAEShadowBox>
              </div>
            )}  */}
            
            {/* discount section  */}
            {/* <div className="details-and-method-container payment-details">
                <FAEText subHeading>
                  <span className="red-text">Expert</span> Discount
                </FAEText>
                <FAEShadowBox primary padding className="voucher-body-wrapper">
                  
                  <FAETextField
                        className="fae--discount-field"
                        label={"Discount Code"}
                        placeholder={"Please enter discount code"}
                        primary
                        value={discountCode} 
                        type={"text"} 
                        errorMessage={"errorMessage"}
                        getValue={(value) =>
                          setDiscountCode(value)
                        }
                        shadowBoxProps={{
                          className: "fae--edit-profile-page-field",
                        }} 
                    />{ 
                       !disocuntLoading ?
                       <div>
                          <FAEButton
                             onClick={handleDisocuntCode}  >
                             Apply Discount
                        </FAEButton>
                        <span className="discount-code-icon">
                          {console.log(discountPayload?.maxLimit, 'discountPayload?.maxLimit')}
                           {(useDiscountCodeIcon !==false && discountPayload?.maxLimit>0) && <FAEImage placeholder={getFileSrcFromPublicFolder("icon-placeholder.png")}  src={getFileSrcFromPublicFolder(useDiscountCodeIcon =="true"? "success.png" : useDiscountCodeIcon =="false" && "failed-icon.png")} />}
                        </span>
                         <FAEText>{ (useDiscountCodeIcon !==false &&  useDiscountCodeIcon =="true" )?( discountPayload?.maxLimit>0? `Maximum discount limit is ${currencySymbol}${discountPayload?.maxLimit}`: " "):""} </FAEText>
                       </div>
                      :
                     <div>
                        <FAELoading type="svg" loaderImage={"/assets/images/loader_forcomponent.svg"} /> 
                      </div>
                    } 
                  </FAEShadowBox>
             </div> */}
 
            {/* {!freeConsultation && (
              <div className="details-and-method-container payment-details">
                <FAEText subHeading>
                  <span className="red-text">Payment</span> Method
                </FAEText>
                <FAEShadowBox
                  padding
                  primary
                  className="details-and-method-wrapper-body"
                >
                  <div style={{ width: "100%" }}>
                    <FAERadioGroup
                      values={[
                        {
                          value: userCountry === "PK" ? "cash" : "card",
                          label: userCountry === "PK" ? "Cash on Delivery" : "Card",
                        },
                      ]}
                      value={paymentMethod}
                      getSelectedValue={(value) => setPaymentMethod(value)}
                      direction="vertical"
                    />
                  </div>
                </FAEShadowBox>
              </div>
            )} */}

            {paymentMethod == "card" && (
              <div className="details-and-method-container payment-details">
                <FAEText subHeading>
                  <span className="red-text">Payment</span> Information
                </FAEText>
                <FAEShadowBox
                  padding
                  primary
                  className="details-and-method-wrapper-body" >
                  <div className="voucher-body-wrapper">
                    <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "0.5px solid rgba(237, 237, 237, 1)",
                        paddingBottom: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        history.push({
                          pathname: "/payment-details",
                          state: { ...state, redirectedUrl: pathname },
                        })
                      }
                    >
                      <div>
                        <FAEText tertiary paragraph>
                          Payment Method
                        </FAEText>
                        {cardList?.length ==0  ?
                        <FAEText className="fae--payment-details-card-bar red-text">
                          Please add Credit or Debit Card
                        </FAEText>
                        :
                        <FAEText className="fae--payment-details-card-bar">
                          Credit or Debit Card
                        </FAEText>
                        }
                      </div>
                       {cardList?.length !==0  && 
                          <FAEText   tertiary>
                            {"Change Payment ->"}
                          </FAEText>
                        }
                    </div>
                    {Children.toArray(
                      cardList?.map((card) => {
                        const {
                          id,
                          card: { last4, brand },
                          defaultPaymentMethod
                        } = card;
                        return (
                          defaultPaymentMethod && (
                            <div style={{ width: "90%" }}>
                              <FAEText tertiary paragraph>
                                {brand.toUpperCase()} Card
                              </FAEText>
                              <FAEText className="fae--payment-details-card-bar">
                                {last4.padStart(16, "*")}
                              </FAEText>
                              {/* <FAEText paragraph secondary>
                                Expires: {exp_month}/{exp_year}
                              </FAEText> */}
                            </div>
                          )
                        );
                      })
                    )}
                    {/* <FAERadioGroup
                      values={cardListParser(cardList)}
                      getSelectedValue={(value) => setSelectedCard(value)}
                      direction="vertical"
                      value={selectedCard}
                    /> */}
                    {/* <FAEButton
                      onClick={() =>
                        history.push({
                          pathname: "/payment-details/add-card",
                          state: { ...state, redirectedUrl: pathname },
                        })
                      }
                    >
                      Add Card
                    </FAEButton> */}
                  </div>
                </FAEShadowBox>
              </div>
            )}
           <br/>
            {!freeConsultation ? (
              paymentMethod === "cash" || selectedCard !== "" ? (
                cardList?.length ==0 ?
                    <FAEButton
                      onClick={() =>
                        history.push({
                          pathname: "/payment-details/add-card",
                          state: { ...state, redirectedUrl: pathname },
                        }) }>
                      Confirm Booking
                    </FAEButton>   
                :
                <FAEButton onClick={handleSaveBooking}>
                  Confirm Booking
                </FAEButton>
              ) : (
                ""
              )
            ) : (
              <FAEButton onClick={handleSaveBooking}>
                Book Free Consultation
              </FAEButton>
            )}
          </>
        )}
      </div>
      <FAEDialogueBox
        open={open}
        content={content}
        buttons={[
          {
            label: popupBtnName,
            onClick: () => {
              popupBtnName ==="Select Card" ? history.push({
                pathname: "/payment-details",
                state: { ...state, redirectedUrl: pathname },
              })
              :
               setLoader(false)
               setOpen(false);
            },
          },
        ]}
      />
      <ToastContainer/>
    </>
  );
};

const mapStateToProps = ({
  summaryPageReducer: {
    error,
    loading,
    summary,
    saveBookingResponse,
    voucherList,
    holdpaymentData,
    createBookingResp,
    salesOrder,
    discountPayload,
    disocuntLoading
  },
  paymentDetailsPageReducer: { cardList, defaultCardId },
  defaultReducer: { userCountryId, userCountry, userCurrencyCode },
  servicesVouchersPageReducer:{summaryvoucher} 
  
}) => ({
  error,
  loading,
  summary,
  cardList,
  saveBookingResponse,
  userCountryId,
  userCountry,
  voucherList,
  userCurrencyCode,
  defaultCardId,
  holdpaymentData,
  createBookingResp,
  summaryvoucher,
  salesOrder,
  discountPayload,
  disocuntLoading
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSummary,
      getCardList, 
      setSaveBookingResponseToEmpty,
      setHoldPaymentResponseToEmpty,
      setCreateBookingResponseToEmpty,
      saveCodBooking,
      getVoucherList,
      HoldPayment,
      createBooking,
      GetVoucherByServiceId,
      Getinvoice,
      SalesOrderSummary,  
      applyDiscountCode,
      applyDiscountCodeObjectEmpty
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
