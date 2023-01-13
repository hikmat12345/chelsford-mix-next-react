//libs
import React, { useEffect, Children, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  FAEText,
  FAELoading,
  FAERadioGroup,
} from "@findanexpert-fae/components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useLocation } from "react-router-dom";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import { FAEToaster, getCookies, getFileSrcFromPublicFolder, objectIsEmpty } from "../../utils";
import {
  deleteCard,
  getCardList,
  makeCardDefault,
  setDefaultCardObjEmpty,
} from "../../redux/actions/paymentDetailsPageActions";
import history from "../../history";
import Popup from "reactjs-popup"
import 'reactjs-popup/dist/index.css';
//scss
import "./PaymentDetailsPage.scss";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import { ToastContainer } from "react-toastify";

const email = getCookies("customer_details").email;
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const deleteIcon = getFileSrcFromPublicFolder("delete_icon.svg");

const PaymentDetailsPage = ({
  error,
  loading,
  cardList,
  getCardList,
  deleteCard,
  cardDeleted,
  userCountry,
  defaultCardId,
  makeCardDefault,
  setDefaultCardObjEmpty,
  defaultCardData={}
}) => {
  
  document.title = `Chelsford | Payment Details`;
  const location = useLocation();
  const [open, setOpen] = useState(false); 
  const { state } = location;
  const redirectUrl = state === undefined ? "" : `${state.redirectedUrl}`; 
  useEffect(() => {
    if (!objectIsEmpty(defaultCardData)){
     if(defaultCardData?.code==0 && defaultCardData?.message=="succeeded"){
      console.log(defaultCardData, 'defaultCardData')
      FAEToaster({ 
        message:"Your selected card is now default.", 
      }) 
    }
    return ()=> setDefaultCardObjEmpty()
  }
    // 
  }, [ defaultCardData]);

  useEffect(() => {
    if (cardDeleted === true) {
      FAEToaster({
        toaster:"success",
        message:"Card Deleted successfuly.", 
      }) 
        getCardList(email);
    } 
  }, [cardDeleted]);
  useEffect(() => {
    console.log(defaultCardData?.code, 'dddd ?.code')
    getCardList(email);
  }, [getCardList, defaultCardData?.code]);
console.log(defaultCardData?.code, 'defaultCardData?.code')
  const userId=getCookies("userId")
  const clickHandler= (id, email)=>{
    deleteCard({ userId, paymentMethodId:id });
    setOpen(false)
  }
  const videoUploadIcon = getFileSrcFromPublicFolder;
 const cardIcon=(cardInfoResponse)=>{
  
    if (cardInfoResponse=="visa") {
      return (videoUploadIcon("icons/visa_card.PNG")); 
    } else if (cardInfoResponse=="mastercard") { 
      return (videoUploadIcon("icons/master_card.PNG")); 
    } else if(cardInfoResponse=="unionpay") { 
      return (videoUploadIcon("icons/unionpay.PNG")); 
    }else if(cardInfoResponse=="jcb"){ 
      return (videoUploadIcon("icons/jcb.PNG")); 
    }else{
      return (videoUploadIcon("icons/visa_card.PNG")); 
    }
 }
 
  return (
    <>
      <UserInfoPageLayout>
        {userCountry === "PK" ? (
          <FAERadioGroup
            values={[
              {
                label: "Cash on Delivery",
                value: "cash",
              },
            ]}
            direction="vertical"
            value="cash"
          />
        ) : (
          <div className="fae--payment-details-page-main-container">
            <div className="fae--payment-details-heading-button-wrapper">
              <FAEText heading>Payment Details</FAEText>{" "}
              {/* {redirectUrl === "" && ( */}
                <FAEText
                  onClick={() => history.push("/payment-details/add-card")}
                  className="fae--payment-details-add-button">
                  <span className="red-text bold">+</span> Add New Card
                </FAEText>
              {/* )} */}
            </div>
            {loading && (
              <FAELoading
                type="svg"
                loaderImage={loaderImage}
                height="200px"
              />
            )}
            {!loading && (
              <div className="fae--payment-details-cards-wrapper">
                {Children.toArray(
                  cardList?.map((card) => {
                    const {
                      id,
                      card: { last4, exp_month, exp_year, brand },
                      customer,
                      defaultPaymentMethod
                    } = card; 
                    return (
                      <div
                        onClick={() =>
                          defaultPaymentMethod !== true &&
                            makeCardDefault({userId, paymentMethodId:id })
                         }
                        className="fae--paymet-details-card-wrapper pointer"
                        >  
                        <div style={{display:'flex'}}>
                          <FAEImage className="fae-img-card-brand" src={cardIcon(brand)} />
                          <div>
                            <FAEText className="fae--payment-details-card-bar">
                             {last4.padStart(16, "*")}
                            </FAEText>
                            <FAEText paragraph secondary>
                              Expires: {exp_month}/{exp_year} {defaultPaymentMethod}
                            </FAEText>
                           </div>
                        </div>
                        <div className="fae--payment-card-unit-actions">
                          {defaultPaymentMethod && (
                            <CheckCircleIcon style={{ color: "green" }} />
                          )}
                           {(defaultPaymentMethod   == "" || defaultPaymentMethod  ==undefined || defaultPaymentMethod  ==null &&  defaultPaymentMethod) && (  
                            <Popup  trigger={  
                                <img
                                    className="fae--payment-details-action"
                                    src={deleteIcon}
                                    alt="delete_icon"
                                    width="auto"
                                    height="auto"
                                    onClick={(e) => {
                                      e.stopPropagation(); 
                                    }}
                                  />
                               } open={open}  position="left center">
                                {close => (
                                  <div className="fae-change-country-popup">
                                    Are you sure you want to delete this card
                                    <a className="close" onClick={close}>
                                      &times;
                                    </a>
                                    <button className='popup-sure-btn' onClick={()=>clickHandler(id, email) }>Yes</button>
                                  </div>
                                )} 
                          </Popup>  
                          )}  
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        )}
      </UserInfoPageLayout>
      <ToastContainer/>
    </>
  );
};

const mapStateToProps = ({
  paymentDetailsPageReducer: {
    error,
    loading,
    cardList,
    cardDeleted,
    defaultCardId,
    defaultCardData
  },
  defaultReducer: { userCountry },
}) => ({
  error,
  loading,
  cardList,
  cardDeleted,
  userCountry,
  defaultCardId,
  defaultCardData
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getCardList, deleteCard, makeCardDefault, setDefaultCardObjEmpty },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsPage);




// //libs
// import React, { useEffect, Children, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   FAEText,
//   FAELoading,
//   FAERadioGroup,
// } from "@findanexpert-fae/components";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import { useLocation } from "react-router-dom";

// //src
// import UserInfoPageLayout from "../UserInfoPageLayout";
// import { FAEToaster, getCookies, getFileSrcFromPublicFolder, objectIsEmpty } from "../../utils";
// import {
//   deleteCard,
//   getCardList,
//   makeCardDefault,
//   setDefaultCardObjEmpty,
// } from "../../redux/actions/paymentDetailsPageActions";
// import history from "../../history";
// import Popup from "reactjs-popup"
// import 'reactjs-popup/dist/index.css';
// //scss
// import "./PaymentDetailsPage.scss";
// import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
// import { ToastContainer } from "react-toastify";

// const email = getCookies("customer_details").email;
// const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
// const deleteIcon = getFileSrcFromPublicFolder("delete_icon.svg");

// const PaymentDetailsPage = ({
//   error,
//   loading,
//   cardList,
//   getCardList,
//   deleteCard,
//   cardDeleted,
//   userCountry,
//   defaultCardId,
//   makeCardDefault,
//   setDefaultCardObjEmpty,
//   defaultCardData={}
// }) => {
  
//   document.title = `Chelsford | Payment Details`;
//   const location = useLocation();
//   const [open, setOpen] = useState(false); 
//   const { state } = location;
//   const redirectUrl = state === undefined ? "" : `${state.redirectedUrl}`; 
//   useEffect(() => {
//     if (!objectIsEmpty(defaultCardData)){
//      if(defaultCardData?.code==0 && defaultCardData?.message=="succeeded"){ 
//       FAEToaster({ 
//         message:"Your selected card is now default.", 
//       }) 
//     }
//     return ()=> setDefaultCardObjEmpty()
//   }
//     // 
//   }, [ defaultCardData]);

//   useEffect(() => {
//     if (cardDeleted === true) {
//       FAEToaster({
//         toaster:"success",
//         message:"Card Deleted successfuly.", 
//       }) 
//       redirectUrl !== ""
//       ? history.push({
//           pathname: redirectUrl,
//           state: { ...state },
//         }) :
//         getCardList(email);
//     } 
//   }, [cardDeleted]);
//   useEffect(() => {
//     getCardList(email);
//   }, [getCardList]);

//   const userId=getCookies("userId")
//   const clickHandler= (id, email)=>{
//     deleteCard({ userId, paymentMethodId:id });
//     setOpen(false)
//   }
//   const videoUploadIcon = getFileSrcFromPublicFolder;
//  const cardIcon=(cardInfoResponse)=>{
  
//     if (cardInfoResponse=="visa") {
//       return (videoUploadIcon("icons/visa_card.PNG")); 
//     } else if (cardInfoResponse=="mastercard") { 
//       return (videoUploadIcon("icons/master_card.PNG")); 
//     } else if(cardInfoResponse=="unionpay") { 
//       return (videoUploadIcon("icons/unionpay.PNG")); 
//     }else if(cardInfoResponse=="jcb"){ 
//       return (videoUploadIcon("icons/jcb.PNG")); 
//     }else{
//       return (videoUploadIcon("icons/visa_card.PNG")); 
//     }
//  }
 
//   return (
//     <>
//       <UserInfoPageLayout>
//         {userCountry === "PK" ? (
//           <FAERadioGroup
//             values={[
//               {
//                 label: "Cash on Delivery",
//                 value: "cash",
//               },
//             ]}
//             direction="vertical"
//             value="cash"
//           />
//         ) : (
//           <div className="fae--payment-details-page-main-container">
//             <div className="fae--payment-details-heading-button-wrapper">
//               <FAEText heading>Payment Details</FAEText>{" "}
//               {/* {redirectUrl === "" && ( */}
//                 <FAEText
//                   onClick={() => history.push("/payment-details/add-card")}
//                   className="fae--payment-details-add-button">
//                   <span className="red-text bold">+</span> Add New Card
//                 </FAEText>
//               {/* )} */}
//             </div>
//             {loading && (
//               <FAELoading
//                 type="svg"
//                 loaderImage={loaderImage}
//                 height="200px"
//               />
//             )}
//             {!loading && (
//               <div className="fae--payment-details-cards-wrapper">
//                 {Children.toArray(
//                   cardList?.map((card) => {
//                     const {
//                       id,
//                       card: { last4, exp_month, exp_year, brand },
//                       customer,
//                       defaultPaymentMethod
//                     } = card; 
//                     return (
//                       <div
//                         onClick={() =>
//                           defaultPaymentMethod !== true &&
//                             makeCardDefault({userId, paymentMethodId:id })
//                          }
//                         className="fae--paymet-details-card-wrapper pointer"
//                         >  
//                         <div style={{display:'flex'}}>
//                           <FAEImage className="fae-img-card-brand" src={cardIcon(brand)} />
//                           <div>
//                             <FAEText className="fae--payment-details-card-bar">
//                              {last4.padStart(16, "*")}
//                             </FAEText>
//                             <FAEText paragraph secondary>
//                               Expires: {exp_month}/{exp_year} {defaultPaymentMethod}
//                             </FAEText>
//                            </div>
//                         </div>
//                         <div className="fae--payment-card-unit-actions">
//                           {defaultPaymentMethod   !== "" || defaultPaymentMethod  !==undefined || defaultPaymentMethod  !==null &&  defaultPaymentMethod && (
//                             <CheckCircleIcon style={{ color: "green" }} />
//                           )}
//                            {(defaultPaymentMethod   == "" || defaultPaymentMethod  ==undefined || defaultPaymentMethod  ==null &&  defaultPaymentMethod) && (  
//                             <Popup  trigger={  
//                                 <img
//                                     className="fae--payment-details-action"
//                                     src={deleteIcon}
//                                     alt="delete_icon"
//                                     width="auto"
//                                     height="auto"
//                                     onClick={(e) => {
//                                       e.stopPropagation(); 
//                                     }}
//                                   />
//                                } open={open}  position="left center">
//                                 {close => (
//                                   <div className="fae-change-country-popup">
//                                     Are you sure you want to delete this card
//                                     <a className="close" onClick={close}>
//                                       &times;
//                                     </a>
//                                     <button className='popup-sure-btn' onClick={()=>clickHandler(id, email) }>Yes</button>
//                                   </div>
//                                 )} 
//                           </Popup>  
//                           )}  
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </UserInfoPageLayout>
//       <ToastContainer/>
//     </>
//   );
// };

// const mapStateToProps = ({
//   paymentDetailsPageReducer: {
//     error,
//     loading,
//     cardList,
//     cardDeleted,
//     defaultCardId,
//     defaultCardData
//   },
//   defaultReducer: { userCountry },
// }) => ({
//   error,
//   loading,
//   cardList,
//   cardDeleted,
//   userCountry,
//   defaultCardId,
//   defaultCardData
// });

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     { getCardList, deleteCard, makeCardDefault, setDefaultCardObjEmpty },
//     dispatch
//   );
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetailsPage);
