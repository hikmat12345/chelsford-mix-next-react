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
  makeDateTimeNextPageFalse,
  saveBookingDateAndTime,
  getAvaliableBookingSlots,
  saveBookingDateAndTimeNextTime
} from "../../redux/actions/dateTimeSelectionPageActions";
import { getBookingSlots } from "../../redux/actions/dateTimeSelectionForClinicsActions";
import { addSpaces, getCookies, getFileSrcFromPublicFolder } from "../../utils";
import { faeBookingTimeSlotsParser } from "../../parsers";
import history from "../../history";

//scss
import "./DateTimeSelectionPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const DateTimeSelectionPage = ({
  loading, 
  timeSlots = [],
  clinicTimeSlots=[],
  getBookingSlots,
  getAvaliableBookingSlots,
  saveBookingDateAndTime,
  makeDateTimeNextPageFalse,   
  userId,
  saveBookingDateAndTimeNextTime,
  userCountryId,
  clinicslotLoading,
  holdpaymentData,    createBookingResp
}) => { 
  const { service } = useParams();
  const serviceName = addSpaces(service, "-");
  document.title = `Chelsford | ${serviceName} - Schedule`;
  const location = useLocation();
   
  const { state } = location;
  const {
    serviceId,
    isInHouse,
    isInClinic,
    duration,
    bookingId,
    cartId,
    notes,
    AddressSelectid,
    voucherId,
    sessionFlag, 
    isOnline,
    providerId,
    latitude,
   longitude
  } = state;   
  const todayDate= `${new Date().getFullYear()}-${
    `${new Date().getMonth() + 1}`.length === 1
      ? `0${new Date().getMonth() + 1}`
      : new Date().getMonth() + 1
  }-${
    `${new Date().getDate()}`.length === 1
      ? `0${new Date().getDate()}`
      : new Date().getDate()
  }`
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [selectedTime, setSelectedTime] = useState(""); 
  if(isInClinic) {  
    timeSlots=clinicTimeSlots
    loading=clinicslotLoading
  }
  const renameSLotsKeys= timeSlots.map((obj)=>{
    obj['availablefrom'] = obj['timeStart'];
    obj['availableto'] = obj['timeEnd'];
   return obj
  });
  
   useEffect(() => {
    setSelectedTime("");
    if (selectedDate !== "") { 
     if(isInClinic) {  
       getBookingSlots({ 
          selectedDate,
          latitude: latitude,
          longitude: longitude,
          distance: 20,
          countryId: userCountryId,
          serviceId: serviceId,
          duration: duration,
          serviceVenu: 2  
      });
    }else if(isInHouse) { 
      getAvaliableBookingSlots({ 
        selectedDate, 
        serviceId, 
        bookingDuration:duration,
        providerId:  providerId =="Null" ?"":providerId,  
      })
     }
    }
    return () => {
      makeDateTimeNextPageFalse();
    };
  }, [
    bookingId,
    duration,
    getBookingSlots,
    getAvaliableBookingSlots,
    isInClinic,
    isInHouse,
    makeDateTimeNextPageFalse,
    selectedDate,
    serviceId,
  ]); 
  
  const startEndTime= renameSLotsKeys.filter((eachSlot)=>eachSlot.availablefrom==selectedTime)
  const startTime= startEndTime[0]?.availablefrom;
  const endTime= startEndTime[0]?.availableto 
  const handleSaveBookingDateAndTime = async (e) => { 
    e.preventDefault(); 
    if(isInHouse){   
      await saveBookingDateAndTimeNextTime({
        selectedDate, 
        cartId: cartId, 
        bookingStartTime:startTime,
        bookingEndTime:endTime,
        addressId: AddressSelectid,
      })
    }
   await makeDateTimeNextPageFalse();
 
   if(isInClinic){ 
    await history.push({ 
     pathname: `/booking/${service}/date-time-selection/select-clinic-address`,
      state: {
        ...state,
        selectedDate: selectedDate,
        selectedTime:selectedTime,
        servicePathName: service,
        startTime:startTime,
        endTime:endTime,
        providerId:renameSLotsKeys?.availableProviders
      },
    });
   } else if(isInHouse){ 
    await history.push({
       pathname: `/booking/${service}/summary`,
       state: {
         ...state,
         servicePathName: service
       },
     });
   }
  }; 
 const handleSaveBookingDateAndTimeSession= async ()=>{
  await saveBookingDateAndTime({
    selectedDate, 
    cartId: cartId, 
    bookingStartTime:startTime,
    bookingEndTime:endTime,
    addressId: AddressSelectid,
  })
   await history.push("/your-bookings/session")
 }  
  return (
    <>
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
            className="dpb" >
              {sessionFlag !== true && <FAEButton
              className="fae--date-time-selection-button"
              style={{ borderRadius: "4px" }}
              onClick={handleSaveBookingDateAndTime} >
                Next
            </FAEButton>} 
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({
  dateTimeSelectionPageReducer: {
    error,
    loading,
    timeSlots,
    nextPageDateTimeSelection,
  }, defaultReducer: {userId, userCountryId}
  ,dateTimeSelectionForClinicsReducer:{ clinicslotLoading,  clinicTimeSlots},
  summaryPageReducer: {     holdpaymentData,    createBookingResp  }
}) => ({
  error,
  loading,
  timeSlots,
  nextPageDateTimeSelection,
  userId,
  userCountryId,
  clinicTimeSlots,
  clinicslotLoading,

  holdpaymentData,    createBookingResp
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getBookingSlots,
      getAvaliableBookingSlots,
      saveBookingDateAndTime,
      makeDateTimeNextPageFalse,
      saveBookingDateAndTimeNextTime
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateTimeSelectionPage);
