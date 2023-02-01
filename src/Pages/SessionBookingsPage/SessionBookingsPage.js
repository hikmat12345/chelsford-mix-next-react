//libs
import React, { useEffect, Children } from "react";
import {
  FAELoading,
  FAEBookingCard,
  FAEContainer,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import {
  getCookies,
  getFileSrcFromPublicFolder,
  NoResult,
  replaceSpaces,
} from "../../utils";
import history from "../../history";
import { DeleteSessionBooking, getSessionBookings } from "../../redux/actions/sessionBookingsPageActions";
import { 
  getSelectedSessionDetail,
} from "../../redux/actions/bookingDetailPageActions";

//scss
import "./SessionBookingsPage.scss";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholderImage = getFileSrcFromPublicFolder("placeholder.jpg");

const SessionBookingsPage = ({
  getSessionBookings, 
  loading,
  sessionBookings=[],
  DeleteSessionBooking, 
  deleteSession="" 
}) => {
  document.title = `Chelsford | Upcoming Bookings`;
  const userId = getCookies("userId");
  useEffect(() => {
    getSessionBookings(userId);
  }, [getSessionBookings, userId]); 
  
  const deleteSessionHandler=(BookingId, SessionId)=>{
    DeleteSessionBooking(BookingId, SessionId)
  }
  
  return (
    <>
      <div className="fae--session-bookings-page-main-container">
        {loading && (
          <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
        )}
         
        {!loading && (
          <FAEContainer>
          
            <div className="fae--session-bookings-page-bookings-wrapper">
              {Children.toArray(
                sessionBookings.map((booking) => {
                  const { 
                    serviceTypeName = "",
                    providerName = "",
                    providerId, 
                    bookingId, 
                    bookingDetail
                  } = booking;
                  const parentService= serviceTypeName
                  const storeBooking=booking 
                 const countAvailableSession=  bookingDetail?.filter((slotSession)=>slotSession.bookingId !== bookingId)
                   
                  return (
                  <>
                    <FAEBookingCard
                      src={placeholderImage}
                        serviceName={serviceTypeName} 
                      expertName={
                        providerName.trim() !== "" || providerId !== 0
                          ? providerName
                          : "Looking for suitable provider..."
                       } 
                      buttonProps={ 
                        {
                          primary: true,
                          onClick: () =>
                            history.push({
                              pathname: `/your-bookings/${replaceSpaces(
                                serviceTypeName,
                                "-"
                              )}/details`,
                              state: { ...booking },
                            }),
                        }
                      }
                      shadowBoxProps={{
                        backgroundColor: "#F9F9F9",
                        padding: window.screen.width < 500 ? true : false,
                      }}
                    />
      
            <div className="fae--booking-detail-page-address-wrapper fae-session-list">
                  <FAEText
                    paragraph
                    tertiary
                    className="fae--booking-detail-page-info-headers"
                  >
                   {`${countAvailableSession?.length} (of ${bookingDetail?.length}) sessions remaining`} 
                  </FAEText>
                  <div className="fae--booking-sessions-wrapper"> 
                    {Children.toArray( 
                      bookingDetail.map((booking, index) => { 
                        
                        return( 
                             
                          <FAEText 
                            className={`fae--booking-detail-page-info-booking-text sessions-details pointer  
                            ${
                              booking.isCompleted ? "completed-sessions":
                              booking.displayedBookingDate !== ""  ?"fae-avaiable-booking":
                              booking.displayedBookingDate ==""  ?"fae-not-booking":""
                            }` 
                          }
                        
                            onClick={() => { 
                              return booking.isCompleted
                                ? ""
                                : booking.displayedBookingDate !== ""
                                ?  history.push({
                                  pathname: `/your-bookings/${replaceSpaces(
                                    serviceTypeName,
                                    "-"
                                  )}/details`,
                                  state: {
                                    ...booking, 
                                    sessionFlag:true,
                                    latitude: booking?.latitude,
                                    longitude: booking?.longitude
                                  },
                                }) :booking.displayedBookingDate ==""?
                                  history.push({
                                    pathname: `/booking/${replaceSpaces(
                                      serviceTypeName,
                                      "-"
                                    )}/date-time-selection-for-clinics`,
                                    state: {
                                      ...booking,
                                      duration:booking.bookingDuration,
                                      sessionFlag:true,
                                      AddressSelectid:booking?.addressId,
                                      voucherId:booking?.voucherId,
                                      latitude: booking?.latitude,
                                      longitude: booking?.longitude
                                    },
                                  }) :"" 
                              }} > 
                            
                            {booking.isCompleted=== true?<div className="checked-sessions">{index + 1}</div>
                            :booking.displayedBookingDate !== ""? <><div>{booking.displayedBookingDate.split(" ")[0]}</div><div>{booking.displayedBookingDate.split(" ")[1]}</div><span className="fae-sup-number">{index + 1}</span></> 
                            :booking.displayedBookingDate == ""? index + 1:""}
                           </FAEText> 
                          );   
                         })
                       )}
                     </div>
                    </div> 
                   </>
                  );
                })
              )} 
            </div>
          </FAEContainer>
        )}
        {NoResult(loading, sessionBookings, "You have no session bookings" )}
      </div>
    </>
  );
};

const mapStateToProps = ({
  sessionBookingsPageReducer: { error, loading, sessionBookings, deleteSession },
}) => ({
  error,
  loading,
  sessionBookings,
  deleteSession
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    getSessionBookings,
    getSelectedSessionDetail,
    DeleteSessionBooking
   }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionBookingsPage);
