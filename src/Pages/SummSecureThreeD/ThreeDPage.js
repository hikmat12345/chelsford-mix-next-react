
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'; 
import { threeDSecure } from '../../redux/actions/threeDSecure';
import { DataToDigits, getCookies, getFileSrcFromPublicFolder, objectIsEmpty } from '../../utils';
import './ThreeDPage.scss'
import { FAEButton, FAEText } from "@findanexpert-fae/components";
import { FAEShadowBox } from '@findanexpert-fae/components/dist/stories/FAEShadowBox/FAEShadowBox';
import { bindActionCreators } from 'redux';
import { FAELoading } from '@findanexpert-fae/components/dist/stories/FAELoading/FAELoading';
import { capturePaymentAction, createBooking, setHoldPaymentResponseToEmpty, setSaveBookingResponseToEmpty } from '../../redux/actions/summaryPageActions';
import { ThreedsStatus, capturePaymenFetch} from '../../Webviews/ThreedsStatusWebviewAndroid/action';
 const  ThreeDPage=({
    userCountryId,
    thankyouBookingPageReducter, 
    threeDSecure,
    doPayMentResponse,
    capturePaymentAction,
    saveBookingResponse,
    createBooking,
    loading,
    createBookingResp,
    userCurrencyCode,
    setHoldPaymentResponseToEmpty,
    setSaveBookingResponseToEmpty
 })=> { 
   // write variable 
   const [threeDsRespon, setThreedsRespons]=useState({})
    const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
    const stripeKey = process.env.REACT_APP_STRIPE_KEY;
    var url = new URL(window.location.href); 
    var transactionid = url?.searchParams?.get("transactionId") ?? 0; 
     const {isInClinic,trainingStartTime, trainingStartDate, bookingTime, bookingDate,  serviceName, isReferralReceiver,currencySymbol, selectedSessions, latitude,  longitude, UbookingId, totalAmount, returnUrl , Vouchercode, availableProviderId, paymentMethod, duration, serviceId,isTraining}=getCookies("summary_detail")
    var paymentIntent = url?.searchParams?.get("payment_intent_client_secret") ?? "no";
    var cartId = url?.searchParams?.get("cartId") ?? "no"; 
    const state= useSelector(state=>state) 
    useEffect(()=>{
      if((paymentIntent !=="no" && paymentIntent !==undefined) && transactionid !==0){ 
        ThreedsStatus({ cartId, transactionId:transactionid })
            .then(async (result) =>{  
                setThreedsRespons(result)
                if (result.message === 'succeeded' && result.code === 0) { 
                  capturePaymenFetch({
                        cartId,
                        paymentAmount:totalAmount,
                        stripePaymentMethodId:paymentMethod,
                        userCountryId:userCountryId !==""? userCountryId:getCookies("switched_id"), 
                        bookingId:UbookingId, 
                        voucherCode:Vouchercode, 
                        userCurrencyCode,
                        transactionId:transactionid,
                        userId:getCookies("userId") 
                        }).then((res)=>{ 
                           if(res?.error !==true && res?.statusCode !==1){
                                createBooking({
                                  amount :totalAmount,
                                  isTraining,
                                  trainingStartTime, 
                                  trainingStartDate,
                                  cartId :cartId,
                                  chargeId : res?.setupIntentResponseDetail?.chargeId,
                                  distance :20,
                                  isCaptured :true, 
                                  isReferralReceiver :isReferralReceiver,
                                  latitude : `${latitude}` ,
                                  longitude : `${longitude}` ,
                                  numberOfSessions :selectedSessions,
                                  providerIds : availableProviderId ,
                                  referralBonusUsed :false,
                                  userId :JSON.parse(getCookies("userId")),
                                  voucherCode :Vouchercode ,
                                  bookingDate:bookingDate,
                                  bookingTime:bookingTime,
                                  serviceVenu:  isInClinic ? 2:1,
                                  duration:duration,
                                  serviceId:serviceId,  
                                })
                              } else{ 
                              alert(res.message)
                            } 
                        })  
                      }  
               
            }).catch((e)=>{ 
            }); 
         }
         return ()=>{
          setSaveBookingResponseToEmpty();
          setHoldPaymentResponseToEmpty(); 
          
       }
    }, [])

   // ditructure 
    const loaderImage = getFileSrcFromPublicFolder("loader.GIF"); 
    // create booking api 
    //  useEffect(()=>{ 
    //     // if(!objectIsEmpty(saveBookingResponse)){
    //       if(saveBookingResponse?.error !==true && saveBookingResponse?.statusCode !==1){
    //            createBooking({
    //             amount :totalAmount,
    //             cartId :cartId,
    //             chargeId : saveBookingResponse?.setupIntentResponseDetail?.chargeId,
    //             distance :20,
    //             isCaptured :true, 
    //             isReferralReceiver :isReferralReceiver,
    //             latitude : `${latitude}` ,
    //             longitude : `${longitude}` ,
    //             numberOfSessions :selectedSessions,
    //             providerIds : availableProviderId ,
    //             referralBonusUsed :false,
    //             userId :JSON.parse(getCookies("userId")),
    //             voucherCode :Vouchercode   
    //         })
    //        } else{
    //         console.log("do in else ")
    //         alert(saveBookingResponse.message)
    //       }
    //     // }  
    //  },[]) 
    // loading on none 
    if (loading) {
      return <FAELoading type="svg" loaderImage={loaderImage} height="500px" />;
    } 
     
    return ( 
    <>
    <div className="fae--thank-you-booking-page-container">
      <div className="fae--thank-you-booking-page-wrapper dpt dpb">
        {!loading && (
        <>
         {threeDsRespon?.error !==true && threeDsRespon?.code !==3 ? (
           <>  
               <div className="fae--thank-you-booking-page-booking-detail">
                  <img className="fae--thank-you-booking-page-img" src={ getFileSrcFromPublicFolder(!doPayMentResponse?.error ?'green-35.svg':'rounded-cross-icon.PNG')} />
                 <div>
                   <FAEText subHeading> {!doPayMentResponse?.error ? 'Booking Confirmed': 'Not succefully done'} </FAEText>
                   <FAEText> {!doPayMentResponse?.error ? 'Expert has recieved your booking':'sorry' }</FAEText>
                  </div> 
                </div>  
             {/* <div className="fae--thank-you-booking-page-booking-detail">
                 <img className="fae--thank-you-booking-page-img" src={getFileSrcFromPublicFolder('red-36.svg')} />
               <div>
                 <FAEText > Allocation the booking to the </FAEText>
                 <FAEText subHeading> best Expert in your area</FAEText>
               </div> 
             </div>   */}
             <div className="fae--thank-you-booking-card">
             <FAEShadowBox
                  padding
                  primary
                  className="details-and-method-wrapper-booking-body fae-unborder-cards" >
                   <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "0.5px solid rgba(237, 237, 237, 1)",
                        paddingBottom: "10px",
                        cursor: "pointer",
                      }} > 
                      <div>
                        <FAEText tertiary paragraph>
                          Booking Id
                        </FAEText> 
                      </div>
                        <FAEText bold >
                          {UbookingId && `${UbookingId}`}
                        </FAEText>
                   </div> 
             </FAEShadowBox>

              <FAEShadowBox
                  padding
                  primary
                  className="details-and-method-wrapper-booking-body" >
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
                    >
                       
                        <FAEText tertiary paragraph>
                          Service Name
                        </FAEText> 
                        <FAEText bold>
                          {serviceName && `${serviceName} `}
                      </FAEText>  
                    </div> 
             </FAEShadowBox>
             <FAEShadowBox
                  padding
                  primary
                  className="details-and-method-wrapper-booking-body" >
                   <div
                      style={{
                        width: "90%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "0.5px solid rgba(237, 237, 237, 1)",
                        paddingBottom: "10px",
                        cursor: "pointer",
                      }} >
                      <div>
                        <FAEText tertiary paragraph >
                         Date and Time
                        </FAEText> 
                      </div>
                      <FAEText bold>
                      { bookingDate && `${bookingDate} `} ( {bookingTime && bookingTime } )
                      </FAEText>
                    </div> 
             </FAEShadowBox> 
            <FAEShadowBox
                  padding
                  primary
                  className="details-and-method-wrapper-booking-body fae-unborder-cards"   >
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
                    >
                      <div> 
                        <FAEText bold className="fae--payment-details-card-bar">
                        {(threeDsRespon.code ==0 && threeDsRespon.message =="Paid") ?
                        "Thanks, You Already Paid.":
                         createBookingResp?.message && createBookingResp?.message}
                        </FAEText>
                      </div>
                      <FAEText>
                         
                      </FAEText>
                    </div> 
             </FAEShadowBox> 
             </div>
          <br/>
          {!doPayMentResponse?.error  && <FAEShadowBox
                  padding
                  primary
                  className="details-and-method-wrapper-booking"
                > 
                     <div className='fae-booking-thanks-prices'>
                       <FAEText subHeading className="fae--payment-details-card-bar">
                          Paid
                        </FAEText>

                      <FAEText bold className='fae-payment-prices' > 
                      {(threeDsRespon.code ==0 && threeDsRespon.message =="Paid") ?
                        "Already Paid":
                        `${currencySymbol} ${totalAmount}`} 
                      </FAEText> 
                    </div>   
             </FAEShadowBox> } 
             </>
             ): 
              <div className="fae--thank-you-booking-card" style={{marginBottom: 200, marginTop:50}}>
             <FAEShadowBox
                 padding
                 primary
                 className="details-and-method-wrapper-booking-body fae-unborder-cards" >
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
                   >
                   <div className="fae--thank-you-booking-page-booking-detail" >
                       <img className="fae--thank-you-booking-page-img" src={ getFileSrcFromPublicFolder( 'rounded-cross-icon.PNG')} />
                        <div>
                          <FAEText heading> Sorry! we are unable to process.</FAEText>
                    </div> 
                </div> 
                   </div> 
            </FAEShadowBox>
            </div>
            }
        </> )}
         </div>
        </div>
      </>
     )
    }
 
    const mapStateToProps = ({
        thankyouBookingPageReducter ,
        threeDSecureReducer:{doPayMentResponse},
        defaultReducer: { userCountryId, userCurrencyCode },
        summaryPageReducer:{saveBookingResponse, createBookingResp, loading } , 
         
      }) => ({  
        thankyouBookingPageReducter,
        userCountryId,
        doPayMentResponse,
        saveBookingResponse,
        loading,
        createBookingResp,
        userCurrencyCode
      });
      
      const mapDispatchToProps = (dispatch) => {
        return bindActionCreators(
          {
              
             threeDSecure ,
             capturePaymentAction,
             createBooking,
             setHoldPaymentResponseToEmpty,
             setSaveBookingResponseToEmpty
          },
          dispatch
        );
      };
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(ThreeDPage);
      























// import React, { useEffect, useState } from 'react'
// import { connect, useDispatch, useSelector } from 'react-redux'; 
// import { threeDSecure, thankYouBookingAction } from '../../redux/actions/threeDSecure';
// import { getFileSrcFromPublicFolder } from '../../utils';
// import './ThreeDPage.scss'
// import { FAEButton, FAEText } from "@findanexpert-fae/components";
// import { FAEShadowBox } from '@findanexpert-fae/components/dist/stories/FAEShadowBox/FAEShadowBox';
// import { bindActionCreators } from 'redux';
// import { FAELoading } from '@findanexpert-fae/components/dist/stories/FAELoading/FAELoading';
//  const  ThreeDPage=({
//     userCountryId,
//     thankyouBookingPageReducter,
//     thankYouBookingAction,
//     threeDSecure,
//     doPayMentResponse,
//     loading
//  })=> { 
//     const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
//     const stripeKey = process.env.REACT_APP_STRIPE_KEY;
//     var url = new URL(window.location.href);
//     var amount = url?.searchParams?.get("amount")?? 0;
//     var transactionid = url?.searchParams?.get("transactionid") ?? 0;
//     var bookingid = url?.searchParams?.get("bookingid") ?? 0;
//     var payment_intent_client_secret = url?.searchParams?.get("payment_intent_client_secret") ?? "no";
     
//     const dispatch= useDispatch()
//     const state= useSelector(state=>state) 
//     var stripe = window.Stripe(stripeKey);
//     // var transactionid='pi_3Kj3hrDgOHdTtARl35mAwc5k'
//     // var bookingid=6711
//     useEffect(()=>{
//       if(payment_intent_client_secret !=="no"){
//         const getCartId= localStorage.getItem('cartid')
//         thankYouBookingAction(userCountryId ?userCountryId :171 , getCartId)
//         stripe.retrievePaymentIntent(`${payment_intent_client_secret}`)
//         .then(async (result) =>{
//           console.log(result, 'result' ,paymentIntent)
//              if (result.error) {
//                 // PaymentIntent client secret was invalid
//             } else { 
//                 if (result.paymentIntent.status === 'succeeded' || result.paymentIntent.status === "requires_capture") { 
//                    await   threeDSecure(bookingid,transactionid,amount) 
//                 }  
//             }
//         }); 
//       }
//     }, [])
//    const {address,
//     bookingDate,
//     bookingId,
//     bookingTime,
//     currencyCode, 
//     currencySymbol, 
//     price,
//     serviceId,
//     serviceName,
//     userId }= thankyouBookingPageReducter.ThankYouBookingResponse
//     const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
//     if (loading) {
//       return <FAELoading type="svg" loaderImage={loaderImage} height="500px" />;
//     } 
     
//     return ( 
//     <>
//     <div className="fae--thank-you-booking-page-container">
//       <div className="fae--thank-you-booking-page-wrapper dpt dpb">
//          {payment_intent_client_secret !=="no" && !loading  ? (
//            <>
//         <FAEText className="fae--thank-you-booking-message">
//              {/* response?.message */}
//             </FAEText> 
//                <div className="fae--thank-you-booking-page-booking-detail">
//                   <img className="fae--thank-you-booking-page-img" src={ getFileSrcFromPublicFolder(!doPayMentResponse?.error ?'green-35.svg':'rounded-cross-icon.PNG')} />
//                  <div>
//                    <FAEText heading> {!doPayMentResponse?.error ? 'Booking Confirmed': 'Not succefully done'} </FAEText>
//                    <FAEText> {!doPayMentResponse?.error ? 'Expert has recieved your booking':'sorry' }</FAEText>
//                   </div> 
//                 </div>  
//              <div className="fae--thank-you-booking-page-booking-detail">
//                  <img className="fae--thank-you-booking-page-img" src={getFileSrcFromPublicFolder('red-36.svg')} />
//                <div>
//                  <FAEText > Allocation the booking to the </FAEText>
//                  <FAEText subHeading> best Expert in your area</FAEText>
//                </div> 
//              </div>  
//              <div className="fae--thank-you-booking-card">
//               <FAEShadowBox
//                   padding
//                   primary
//                   className="details-and-method-wrapper-booking-body fae-unborder-cards" >
//                    <div
//                       style={{
//                         width: "90%",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         borderBottom: "0.5px solid rgba(237, 237, 237, 1)",
//                         paddingBottom: "10px",
//                         cursor: "pointer",
//                       }} 
//                     >
//                       <div>
//                         <FAEText tertiary paragraph>
//                           Service Name
//                         </FAEText>
//                         <FAEText subHeading className="fae--payment-details-card-bar">
//                         {serviceName}
//                         </FAEText>
//                       </div>
//                       <FAEText  >
//                         {price && `${currencySymbol} ${price}`}
//                       </FAEText>
//                     </div> 
//              </FAEShadowBox>
//              <FAEShadowBox
//                   padding
//                   primary
//                   className="details-and-method-wrapper-booking-body" >
//                    <div
//                       style={{
//                         width: "90%",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         borderBottom: "0.5px solid rgba(237, 237, 237, 1)",
//                         paddingBottom: "10px",
//                         cursor: "pointer",
//                       }} >
//                       <div>
//                         <FAEText tertiary paragraph >
//                          Date and Time
//                         </FAEText>
//                         <FAEText subHeading className="fae--payment-details-card-bar">
//                          { bookingDate && `${bookingDate} `}
//                         </FAEText>
//                       </div>
//                       <FAEText  >
//                         {bookingTime && bookingTime }
//                       </FAEText>
//                     </div> 
//              </FAEShadowBox> 
//             <FAEShadowBox
//                   padding
//                   primary
//                   className="details-and-method-wrapper-booking-body fae-unborder-cards"   >
//                    <div
//                       style={{
//                         width: "90%",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         borderBottom: "0.5px solid rgba(237, 237, 237, 1)",
//                         paddingBottom: "10px",
//                         cursor: "pointer",
//                       }} 
//                     >
//                       <div>
//                         <FAEText tertiary paragraph>
//                           Address
//                         </FAEText>
//                         <FAEText subHeading className="fae--payment-details-card-bar">
//                          {address && address}
//                         </FAEText>
//                       </div>
//                       <FAEText  >
                         
//                       </FAEText>
//                     </div> 
//              </FAEShadowBox> 
//              </div>
//           <br/>
//           {!doPayMentResponse?.error  && <FAEShadowBox
//                   padding
//                   primary
//                   className="details-and-method-wrapper-booking"
//                 >
//                    {/* <div className='fae-booking-thanks-prices'>
//                        <FAEText subHeading className="fae--payment-details-card-bar">
//                           Total
//                         </FAEText>
                      
//                       <FAEText className='fae-payment-prices' >
//                         {price && price}
//                       </FAEText> 
//                     </div> */} 
//                      <div className='fae-booking-thanks-prices'>
//                        <FAEText subHeading className="fae--payment-details-card-bar">
//                           Paid
//                         </FAEText>
                      
//                       <FAEText className='fae-payment-prices' >
//                         {price && price}
//                       </FAEText> 
//                     </div>  

//                     {/* <div className='fae-booking-thanks-prices'>
//                        <FAEText subHeading className="fae--payment-details-card-bar">
//                           Balance
//                         </FAEText>
                      
//                       <FAEText className='fae-payment-prices' >
//                         {price && price}
//                       </FAEText> 
//                     </div> */}
//              </FAEShadowBox> } 
//              </>
//              ): 
//               <div className="fae--thank-you-booking-card" style={{marginBottom: 200, marginTop:50}}>
//              <FAEShadowBox
//                  padding
//                  primary
//                  className="details-and-method-wrapper-booking-body fae-unborder-cards" >
//                   <div
//                      style={{
//                        width: "90%",
//                        display: "flex",
//                        justifyContent: "space-between",
//                        alignItems: "center",
//                        borderBottom: "0.5px solid rgba(237, 237, 237, 1)",
//                        paddingBottom: "10px",
//                        cursor: "pointer",
//                      }} 
//                    >
//                    <div className="fae--thank-you-booking-page-booking-detail" >
//                        <img className="fae--thank-you-booking-page-img" src={ getFileSrcFromPublicFolder( 'rounded-cross-icon.PNG')} />
//                         <div>
//                           <FAEText heading> Sorry! Unable to Process, Something missing in your parameter.</FAEText>
//                     </div> 
//                 </div> 
//                    </div> 
//             </FAEShadowBox>
//             </div>
//             } 
//          </div>
//         </div>
//       </>
//      )
//     }
 
//     const mapStateToProps = ({
//         thankyouBookingPageReducter ,
//         threeDSecureReducer:{doPayMentResponse},
//         defaultReducer: { userCountryId },
//         loading
//       }) => ({  
//         thankyouBookingPageReducter,
//         userCountryId,
//         doPayMentResponse,
//         loading
//       });
      
//       const mapDispatchToProps = (dispatch) => {
//         return bindActionCreators(
//           {
//              thankYouBookingAction,
//              threeDSecure 
//           },
//           dispatch
//         );
//       };
      
//       export default connect(
//         mapStateToProps,
//         mapDispatchToProps
//       )(ThreeDPage);
      