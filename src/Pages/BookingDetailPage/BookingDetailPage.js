//libs
import React, { Children, useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useLocation, useParams } from "react-router-dom";
import {
  FAEText,
  FAEAvatar,
  FAEButton,
  FAELoading,
  FAEDialogueBox,
  FAEShadowBox,
  FAEImage,
} from "@findanexpert-fae/components";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import {
  deleteBooking,
  deleteBookingSession,
  getBookingDetails,
  getBookingsSessions,
  getSelectedSessionDetail,
  setBookingDeleteEmpty,
} from "../../redux/actions/bookingDetailPageActions";
import {
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
  replaceSpaces,
} from "../../utils";
import history from "../../history";

//scss
import "./BookingDetailPage.scss";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FAETextField } from "@findanexpert-fae/components/dist/stories/FAETextField/FAETextField";
import { sendMessageToProvider } from "../ChatPage/SendMessage";
const messageIcon = getFileSrcFromPublicFolder("booking_message_icon.svg");
const videoNotesIcon = getFileSrcFromPublicFolder("video_notes_icon.svg");
const deleteIcon = getFileSrcFromPublicFolder("delete_icon.svg");
const editIcon = getFileSrcFromPublicFolder("edit_icon.svg");
const notesIcon = getFileSrcFromPublicFolder("notes_icon.svg");
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholder = getFileSrcFromPublicFolder("placeholder.jpg");

const BookingDetailPage = ({
  error,
  loading,
  bookingDetails = [],
  getBookingDetails,
  bookingDeleted,
  deleteBooking,
  deleteBookingSession,
  getBookingsSessions,
  bookingSessions,
  getSelectedSessionDetail,
  bookingImages,
  bookingVideos,
  setBookingDeleteEmpty
}) => {
  document.title = `Chelsford | Booking Details`;
  const userId = getCookies("userId");
  const pathLocation = useLocation();
  const { jobtype, service } = useParams();
  const { state, sessionFlag} = pathLocation;
  const [open, setOpen] = useState(false) 
  const [content, setContent] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
    const {sessionId} =state 
    const {
      address = "",
      bookingDuration = "",
      bookingTime = "",
      displayedBookingDate="",
      serviceTypeName = "",
      providerId = 0,
      amount = "",
      bookingDate = "",
      currencySymbol = "",
      location = "",
      providerName = "",
      consentForm = "",
      hasAcceptedConsent,
      // videoURL,
      customerNotes,
      isTraining,
      isOnline,
      trainingEndDate,
      trainingEndTime,
      trainingStartDate,
      trainingStartTime,
      totalSession,
      completeSession,
      bookingId, 
      paymentStatus,
      status
      // bookedSession,
    } = bookingDetails;  
  const conversation = useSelector((state) =>
    state.customerChatReducer.conversations.find(
      (con) => con.job.jobId == bookingDetails.bookingId,
    ),
  );
  useEffect(() => {
    if(window.runScript) { 
      window.runScript();
    }
  }, [loading])
  useEffect(() => {
    // sessionId>0   ?
       getBookingsSessions({
          serviceId: state.serviceId !==undefined ?state.serviceId: state?.serviceTypeId,
          cartId: state.cartId,
          bookingId: state.bookingId, 
          sessionId: state?.sessionId 
        })  
      // : getBookingDetails({bookingId: state.bookingId, sessionId: state?.sessionId,  serviceId: state.serviceId, cartId:state.cartId});
  }, [
    getBookingDetails, 
    state.bookingId,
    state.cartId,
    state.serviceTypeId,
    state.totalSession,
  ]);

  useEffect(() => {
    if(!objectIsEmpty(bookingDeleted)){
    if (bookingDeleted.code !==1 ) {
      history.push("/your-bookings/upcoming");
    }else{
      alert(bookingDeleted.message)
      setBookingDeleteEmpty()
    }
   }
   return ()=> setBookingDeleteEmpty()
  }, [bookingDeleted]); 
  
  const clickHasConsent = () => {
    history.push({
      pathname: `/your-bookings/${replaceSpaces(serviceTypeName.replaceAll("/", "-"), "-")}/details/consent-form`,
      state: {
        ...state,
        productcartId: state.cartId,
        saveState: bookingDetails,
        path: `/your-bookings/${serviceTypeName}/details`,
        sessionId:state.bookingId,sessionId,
        // serviceId: state.serviceTypeId,
      },
    });
  }; 
  // popup
  const [openPopUp, setOpenPopup] = useState(false);
  const [openDeletePopUp, setOpenDeletePopUp]=useState(false)
  const [reasonValue, setReasonValue]=useState("")
  const [notesMessage, setNotesMessage]=useState("")
  const closeRef= useRef()
  const clickHandler = () => { 
    if(reasonValue !==""){
    //  setOpenDeletePopUp(true)  
     sessionId>0 ? deleteBookingSession({ sessionId,  bookingId  }): deleteBooking({ userId, bookingId, reasonValue  });
     closeRef.current.click()
     setOpenPopup(false);
    }else {
      setNotesMessage("The reason input is required!")
    }
  }; 
   const clickDeleteBookintHandler= (userId, bookingId)=>{
       setOpenDeletePopUp(true) 
      // deleteBooking({bookingId, sessionId })  
  } 
  const handleMessage = (data) => {
    conversation === undefined || conversation == null
      ? setMessageOpen(true)
      : history.push("/customer-chat", {
          conversation: conversation,
          ...bookingDetails,
      });
  };
  const handleClosed = (data) => { 
    if (!data) {
      alert("some thing went wrong please try again");
      setMessageOpen(false);
      return;
    }
    history.push("/customer-chat", {
      ...bookingDetails,
      isVisitor: false,
      conversation: data.conversation,
    });
  };
  return (
    <>
      <UserInfoPageLayout childWidth="100%" paddingTop="">
        {loading && (
          <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
        )}
        {!loading && (
          <div className="fae--booking-detail-page-main-container">
            <div className="fae--booking-detail-page-avatar-price-wrapper">
              <FAEText subHeading primary>
                Booking ID: {bookingId}
              </FAEText>
              <div className="fae--booking-details-page-top-info-bar">
                <FAEAvatar
                  variant="rounded"
                  src={getFileSrcFromPublicFolder("placeholder.jpg")}
                />
                <div className="fae--booking-detail-page-name-price-wrapper">
                  <div>
                    <FAEText subHeading primary>
                      {serviceTypeName}
                    </FAEText>
                    <FAEText paragraph primary>
                      {providerName.trim() !== "" || providerId !== 0
                        ? providerName
                        : "Looking for suitable provider..."}
                    </FAEText>
                  </div> 
                  {/* {completeSession > 0 ? (
                    <FAEText subHeading primary>
                      Already Paid
                    </FAEText>
                  ) : ( */}
                    <FAEText subHeading primary>
                      {currencySymbol}
                      {amount}   / {paymentStatus}
                    </FAEText>
                  {/* )} */}
                  {/* <FAEText subHeading primary>
                    Already Paid
                  </FAEText> */}
                </div>
              </div>
            </div>

            <FAEShadowBox
              className="fae--booking-detail-page-main-container"
              padding
              style={{ width: "95%" }}
            >
              <div className="fae--booking-detail-page-day-time-wrapper line-break">
                <FAEText
                  paragraph
                  tertiary
                  className="fae--booking-detail-page-info-headers"
                >
                  Day and Time
                </FAEText>
                <div className="fae--booking-detail-page-date-time">
                  <FAEText className="fae--booking-detail-page-info-booking-text">
                    {isTraining
                      ? `${trainingStartDate} - ${trainingEndDate}`
                      : displayedBookingDate}
                  </FAEText>
                  <FAEText className="fae--booking-detail-page-info-booking-text">
                    {isTraining
                      ? `${trainingStartTime} - ${trainingEndTime}`
                      : bookingTime}
                  </FAEText>
                </div>
              </div>

              {!isTraining && (
                <div className="fae--booking-detail-page-duration-wrapper line-break">
                  <FAEText
                    paragraph
                    tertiary
                    className="fae--booking-detail-page-info-headers"
                  >
                    Duration
                  </FAEText>
                  <FAEText className="fae--booking-detail-page-duration fae--booking-detail-page-info-booking-text">
                    {bookingDuration}
                  </FAEText>
                </div>
              )}
              <div
                className={`fae--booking-detail-page-address-wrapper ${
                  totalSession > 0 ? "line-break" : ""
                }`} >
                <FAEText
                  paragraph
                  tertiary
                  className="fae--booking-detail-page-info-headers" >
                  {location}
                </FAEText>
                <FAEText className="fae--booking-detail-page-address fae--booking-detail-page-info-booking-text line-break">
                  {address}
                </FAEText>
              </div>
              {/* {!hasAcceptedConsent ? (
                <div className="fae--booking-detail-page-duration-wrapper line-break">
                  <FAEText
                    paragraph
                    tertiary
                    className="fae--booking-detail-page-info-headers"
                  >
                    Required Form
                  </FAEText>
                  <button
                    className="fae--booking-detail-page-duration fae--booking-detail-page-info-booking-text fae-consent-form"
                    onClick={clickHasConsent}
                  >
                    {"Sign The Consent Form  >"}
                  </button>
                </div>
              ) : (
                <div className="fae--booking-detail-page-duration-wrapper line-break">
                  <FAEText className="fae--booking-detail-page-address fae--booking-detail-page-info-booking-text">
                    Consent Accepted
                  </FAEText>
                </div>
              )}  */}
            </FAEShadowBox> 
            <div className="fae--booking-detail-page-action-buttons-wrapper">
              {(bookingVideos.length > 0 || bookingImages.length > 0) && (
                <FAEText
                  onClick={() => {
                    setOpen(true);
                    setContent(
                      <div className="notes-video-and-images-detail-page-main-container">
                        <div className="fae--service-attributes-uploaded-images-or-videos-wrapper line-break">
                          <FAEText subHeading>Videos</FAEText>
                          <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
                            {bookingVideos.map(({ filePath, id }) => (
                              <div className="fae--service-attributes-custom-image-or-video-wrapper-main-container">
                                <a
                                  className="fae--service-attributes-custom-image-or-video-wrapper"
                                  target="_blank"
                                  href={filePath}
                                  rel="noreferrer"
                                >
                                  <div className="fae--service-card-image-container">
                                    <video
                                      src={filePath}
                                      alt={filePath}
                                      width="100%"
                                      height="100%"
                                      type="video/mp4"
                                      key={id}
                                    />
                                  </div>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="fae--service-attributes-uploaded-images-or-videos-wrapper">
                          <FAEText subHeading>Images</FAEText>
                          <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
                            {bookingImages.map(({ id, filePath }) => (
                              <div className="fae--service-attributes-custom-image-or-video-wrapper-main-container">
                                <a
                                  className="fae--service-attributes-custom-image-or-video-wrapper"
                                  target="_blank"
                                  href={filePath}
                                  rel="noreferrer"
                                >
                                  <FAEImage
                                    placeholder={placeholder}
                                    src={filePath}
                                    alt={filePath}
                                    key={id}
                                    width="100%"
                                    height="100%"
                                  />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>,
                    );
                  }}
                  className="fae--bokking-detail-action-button"
                >
                  <img
                    src={videoNotesIcon}
                    alt="video_notes_icon"
                    width="auto"
                    height="auto"
                  />
                  Video Notes
                </FAEText>
              )}
              {customerNotes && (
                <FAEText
                  onClick={() => {
                    setOpen(true);
                    setContent(customerNotes);
                  }}
                  className="fae--bokking-detail-action-button"
                >
                  <img
                    src={notesIcon}
                    alt="notes_icon"
                    width="auto"
                    height="auto"
                  />
                   Notes
                </FAEText>
              )}
           {(providerName.trim() !==""  || providerId !== 0) &&(
              <FAEText
                  onClick={() => {
                      handleMessage();
                    }}
                    className="fae--bokking-detail-action-button"
                   >
                    <img
                      src={messageIcon}
                      alt="message_icon"
                      width="auto"
                      height="auto"
                    />
                    Message
                    {conversation && conversation.counts > 0 ? (
                      <span className="badge badge-success">
                        {conversation.counts}
                      </span>
                    ) : (
                      ""
                    )}
              </FAEText>
            )}
            {/* {(providerName.trim() !==""  || providerId !== 0) &&(
                <p                  
                      className="fae-text fae--bokking-detail-action-button" data-fae-id={providerId} data-title={providerName}
                    >
                      <img
                        src={messageIcon}
                        alt="message_icon"
                        width="auto"
                        height="auto"
                      />
                      Call
                </p>
            )} */}
              {completeSession > 0 ? (
                ""
              ) : (  
                <div>
                  <Popup
                    open={openPopUp}
                    trigger={
                      <FAEText className="fae--bokking-detail-action-button"> 
                          <img
                            src={deleteIcon}
                            alt="delete_icon"
                            width="auto"
                            height="auto"
                          />
                          Cancel 
                       </FAEText>
                     }
                     className="fae-booking-cancel-message-popup" 
                    position="left center"  >
                    {(close) => (
                      <div>
                        <FAEText className="fae-popup-title" >Delete Scheduled Booking</FAEText>
                        <FAEText className="fae-popup-message">Are you sure you want to delete the selected booking?</FAEText>
                        <div className="fae-delete-session-btns">
                            <button
                              ref={closeRef}
                              className="popup-sure-btn"
                              onClick={close}  >
                              NO
                            </button>
                            <button
                              className="popup-sure-btn" 
                              onClick={() => clickDeleteBookintHandler(userId, bookingId)}  >
                              YES
                            </button>
                         </div>
                      </div>
                    )}
                 </Popup> 
                 <Popup 
                    open={openDeletePopUp}
                    position="right center" >
                    {(close) => (
                      <div>
                        <FAEText className="fae-popup-title">Reason!</FAEText>
                        <FAEText className="fae-popup-message">Please explain the reason, why you want to delete the booking</FAEText>
                        <input className="fae-reason-input" onChange={(e)=>setReasonValue(e.target.value)} placeholder="please write reason"/>
                        {notesMessage !=="" && <FAEText style={{ margin: "auto",fontSize: "10px" }} className="red-text">{notesMessage}</FAEText>}
                          <button
                            className="popup-sure-btn"
                            onClick={close}>
                              CANCEL
                          </button>
                          <button
                            className="popup-sure-btn"
                            onClick={() => clickHandler(userId, bookingId)}  >
                              DELETE BOOKING
                          </button>
                      </div>
                    )}
                  </Popup>
                </div>
              )}
              {!isTraining && providerId !== 0 && (
                <FAEText
                  onClick={() =>
                    history.push({
                      pathname: `/your-bookings/${service}/edit`,
                      state: { ...bookingDetails, businessId:state?.businessId, cartId: state.cartId, sessionId:sessionId},
                    })
                  }
                  className="fae--bokking-detail-action-button" >
                  <img
                    src={editIcon}
                    alt="edit_icon"
                    width="auto"
                    height="auto"
                  />
                  Edit
                </FAEText>
              )}
            </div>
            {/* {providerId !== 0 &&
              consentForm !== "" &&
              hasAcceptedConsent === false && (
                <FAEButton
                  onClick={() =>
                    history.push({
                      pathname: `/your-bookings/${service}/consent`,
                      state: {
                        jobtype,
                        ...bookingDetails,
                      },
                    })
                  }
                  className="fae--booking-details-page-consent-button"
                >
                  Consent Form
                </FAEButton>
              )} */}
          </div>
        )}
      </UserInfoPageLayout>
      <FAEDialogueBox
        title="Notes"
        open={open}
        content={content}
        buttons={[
          {
            label: "Ok",
            onClick: () => setOpen(false),
          },
        ]}
      />
      <FAEDialogueBox
        title="Message"
        open={messageOpen}
        content={
          <MessageDialogue
            details={bookingDetails}
            onClosed={(d) => handleClosed(d)}
          />
        }
        buttons={[
          {
            label: "close",
            onClick: () => setMessageOpen(false),
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({
  bookingDetailPageReducer: {
    error,
    loading,
    bookingDetails,
    bookingDeleted,
    bookingSessions,
    bookingImages,
    bookingVideos,
  },
}) => ({
  error,
  loading,
  bookingDetails,
  bookingDeleted,
  bookingSessions,
  bookingImages,
  bookingVideos,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBookingDetails,
      deleteBooking,
      deleteBookingSession,
      getBookingsSessions,
      getSelectedSessionDetail,
      setBookingDeleteEmpty
    },
    dispatch,
  );
};

const MessageDialogue = ({ details, onClosed }) => {
  const [message, setmessage] = useState("");

  const sendMessage = () => {
    const { email, id, firstName, lastName } = getCookies("customer_details");
    const { bookingId, providerId, serviceTypeName, providerName } = details;

    sendMessageToProvider({
      customerId: id,
      providerId,
      jobTitle: serviceTypeName,
      jobId: bookingId,
      text: message,
      customerName: `${firstName} ${lastName}`,
      providerName,
    })
      .then((res) => { 
        onClosed(res);
      })
      .catch((err) => { 
        onClosed(false);
      });
  };

  return (
    <div className="container">
      <div>
        <FAEText subHeading>
          Send Message to <strong> {details?.providerName}</strong> against{" "}
          <strong>{details?.serviceTypeName} </strong>
        </FAEText>
        <div className="form-group">
          <FAETextField
            type="textarea"
            placeholder="Type message ..."
            value={message}
            getValue={setmessage}
          />
        </div>
        <div className="form-group">
          <FAEButton
            style={{ marginTop: "10px", float: "left", marginLeft: "10px" }}
            className="btn btn-primary"
            onClick={() => sendMessage()}
          >
            {" "}
            Send
          </FAEButton>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingDetailPage);
