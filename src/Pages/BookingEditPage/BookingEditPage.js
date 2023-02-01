//libs
import React, { useEffect, useState } from "react";
import {
  FAEDateTimeSelection,
  FAEButton,
  FAETitle,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

//src
import {
  getEditBookingSlots,
  makeBookingEditedToDefault,
  saveEditedBookingDateTime,
} from "../../redux/actions/bookingEditPageActions";
import { addSpaces, getCookies, getFileSrcFromPublicFolder, todayDate } from "../../utils";
import { faeBookingTimeSlotsParser } from "../../parsers";
import history from "../../history";
import UserInfoPageLayout from "../UserInfoPageLayout";

//scss
import "./BookingEditPage.scss";
import { alternateGetBookingSlots, getBookingSlots } from "../../redux/actions/dateTimeSelectionForClinicsActions";
import { getAvaliableBookingSlots } from "../../redux/actions/dateTimeSelectionPageActions";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const BookingEditPage = ({
  loading,
  error,
  timeSlots = [],
  getEditBookingSlots,
  saveEditedBookingDateTime,
  makeBookingEditedToDefault,
  bookingEdited,
  getBookingSlots,
  getAvaliableBookingSlots,
  alternateGetBookingSlots,
  alternatetimeSlots
}) => {
  document.title = `Chelsford | Edit Booking`;
  const userId = getCookies("userId");
  const { service } = useParams();
  const serviceName = addSpaces(service, "-");
  const location = useLocation();
  const { state } = location;
  const {
    serviceId,
    bookingId,
    isInHouse ,
    isInClinic ,
    cartId,
    providerId,
    bookingDuration,
    serviceTypeId,
    tempBookingId,
    isOnline, 
    addressId, 
    sessionId,
    latitude,
    longitude,
    businessId, 
  } = state;  
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    setSelectedTime("");
    if (selectedDate !== "") {  
      alternateGetBookingSlots({
        businessId: businessId,
        selectedDate,
        serviceId: state.serviceTypeId,
        duration: bookingDuration ,
        serviceVenu: isInClinic? 2:1,
     }) 
    }
  }, [
    bookingDuration,
    getEditBookingSlots,
    isInClinic,
    isInHouse,
    selectedDate,
    serviceId,
    serviceTypeId,
    tempBookingId,
  ]);
  const renameSLotsKeys= alternatetimeSlots.map((obj)=>{
    obj['availablefrom'] = obj['timeStart'];
    obj['availableto'] = obj['timeEnd'];
   return obj
  });
  useEffect(() => {
    if (bookingEdited) {
      makeBookingEditedToDefault();
      history.push({
        pathname: `/your-bookings/${service}/details`,
        state: { ...state },
      });
    }
  }, [bookingEdited, bookingId, makeBookingEditedToDefault, service, state]); 

  const startEndTime= renameSLotsKeys.filter((eachSlot)=>eachSlot.availablefrom==selectedTime)
  const startTime= startEndTime[0]?.availablefrom;
  const endTime= startEndTime[0]?.availableto

  const handleSaveBookingDateAndTime = (e) => {
    e.preventDefault(); 
    saveEditedBookingDateTime({
      bookingId:bookingId,
      providerId: providerId, 
      selectedDate,
      selectedTime, 
      customerId:!isNaN(userId)?JSON.parse(userId):userId, 
      endTime:endTime,
      startTime:startTime,
      sessionId:sessionId,
      latitude:latitude,
      longitude:longitude,

      duration:bookingDuration,
      serviceId:serviceId,
      serviceVenu:2,
    })
  };

  return (
    <>
      <UserInfoPageLayout>
        {" "}
        <div className="fae--date-time-selection-main-container dpt dpb">
          <FAETitle
            label={serviceName}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          <FAEDateTimeSelection
            className="fae-date-time-selection-container-width"
            loaderForTimeSlots={loading}
            loaderPropsForTimeSlots={{
              loaderImage,
              height: "200px",
              type: "video",
            }}
            getSelectedDate={setSelectedDate}
            getSelectedTime={setSelectedTime}
            slots={faeBookingTimeSlotsParser(renameSLotsKeys)}
          />
          {selectedTime !== "" && (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className="dpb"
            >
              <FAEButton
                className="fae--date-time-selection-button"
                onClick={handleSaveBookingDateAndTime}
              >
                Update
              </FAEButton>
            </div>
          )}
        </div>
      </UserInfoPageLayout>
    </>
  );
};

const mapStateToProps = ({
  bookingEditPageReducer: { error,  timeSlots, bookingEdited },
  dateTimeSelectionForClinicsReducer:{alternatetimeSlots, loading}
}) => ({
  error,
  loading,
  timeSlots,
  bookingEdited,
  alternatetimeSlots
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBookingSlots,
      getAvaliableBookingSlots,
      getEditBookingSlots,
      saveEditedBookingDateTime,
      makeBookingEditedToDefault,
      alternateGetBookingSlots
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingEditPage);
