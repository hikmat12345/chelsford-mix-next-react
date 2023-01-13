//libs
import React, { useEffect, Children, useState } from "react";
import {
  FAETitle,
  FAEFloatingBookingPrice, 
  FAEButton,
  FAEText,
  FAEloading_address,
  FAEShadowBox,
  FAEDialogueBox,
  FAEGoogleMap,
  FAESelect,
} from "@findanexpert-fae/components";
import { useLocation, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import { addSpaces, getCookies, getFileSrcFromPublicFolder, NoResult } from "../../utils";
import {
  getAddressesBStatus,
  getUserHomeAddresses,
  makeNextPageFalse,
  saveAddress, 
} from "../../redux/actions/addressSelectionPageActions"; 
import history from "../../history";

//scss
import "./AddressSelectionBStatusPage.scss";
import { saveBookingDateAndTimeNextTime, saveBookingDateAndTime } from "../../redux/actions/dateTimeSelectionPageActions";
 import { buildQueries } from "@testing-library/react";
import { getClinicAddressAPI } from "../../Webviews/ThreedsStatusWebviewAndroid/action";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF"); 
const notesIcon = getFileSrcFromPublicFolder("notes_svg.svg");
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const AddressSelectionNearClinicPage = ({
  getAddressesBStatus,
  addresses, 
  loading_address,
  bookingId,
  getUserHomeAddresses,
  userHomeAddresses,
  saveBookingDateAndTimeNextTime, 
  userCountryId, 
}) => {

  
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [dialogueBoxTitle, setDialogueBoxTitle] = useState("");
  const [radius, setRadius] = useState(20); 
   
  const location = useLocation();
  const { state, pathname } = location;
 
  const {
          serviceId,
          isInClinic,
          hasAttributes,
          price,
          freeConsultation,
          currencySymbol,
          voucherId,
          selectedTime,
          selectedDate,
          exactflagOfClinic,
          startTime,
          endTime,
          servicePathName,
          AddressSelectid, 
          cartId, 
          latitude,
          longitude,
          id
      } = state; 
     
      document.title = `Chelsford | ${servicePathName} - Select Address`; 
      const [addressIdForClinics, setAddressIdForClinics] = useState(AddressSelectid);
      useEffect(() => { 
        getAddressesBStatus(
          {  selectedDate,
            startTime, 
            endTime,
            latitude: latitude,
            longitude: longitude, 
            userCountryId,
            serviceVenu: 2,
            serviceId: serviceId, 
            distance: 20 }  
        );
      }, [
          addressIdForClinics,
          getAddressesBStatus,
          isInClinic,
          radius,
          selectedDate,
          selectedTime,
          serviceId,
      ]);
  const addressId=id
  useEffect(() => {
    getUserHomeAddresses(getCookies("userId"));
  }, [getUserHomeAddresses]); 

  const  handleAddressSelection =async (availableProviderId,id, businessId) => {
     // here you go if not availbabile 
   await  getClinicAddressAPI({
            serviceID: serviceId,
            userId: businessId,
            inhouse: false,
            inclinic: true,
            genderPreference: "both",
            selectedDate: selectedDate,
            selectedTime: selectedTime,
            radius: 20,
            addressId: addressId,
            cartId: cartId
         }).then(async(response)=>{ 
               if(availableProviderId  =='0' ){  
                  history.push({
                    pathname: `/booking/${servicePathName}/date-time-selection-for-clinics`,
                    state: { 
                      ...state,
                      currencySymbol: currencySymbol, 
                      hasAttributes: hasAttributes,
                      isInClinic: isInClinic, 
                      price: price,
                      serviceId: serviceId,
                      voucherId: voucherId,
                      addressId:response?.addressesList[0]?.id,
                      providerId: availableProviderId ,
                      businessId:businessId
                    },
                  });  
                } else {  
              await saveBookingDateAndTimeNextTime({
                  selectedDate, 
                  cartId: cartId, 
                  bookingStartTime:startTime,
                  bookingEndTime:endTime,
                  addressId: response?.addressesList[0]?.id,
                }) 
              await history.push({
                pathname:  `/booking/${servicePathName}/summary`, 
                state: {
                  ...state,
                  bookingId: bookingId,
                  cartId: cartId, 
                  selectedDate,
                  selectedTime,
                  gated:true,
                  providerId:availableProviderId,
                  isInClinic, 
                },
            });
          }
      }) 
  }; 
   const doPadding= addresses?.length<4 ?(addresses.length==1 ?{paddingBottom: 254}:{paddingBottom: 220}): {paddingBottom: 40}
 console.log(loading_address, 'loading_address')
  return (
    <>
      <div className="fae--service-location-page-container dpt dpb">
        <div className="fae--service-location-page-wrapper fae-mobile-spacing" style={doPadding}>
          <FAETitle
            label={addSpaces(servicePathName, "-") }
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
           {!freeConsultation && (
            <FAEFloatingBookingPrice
              currencySymbol={currencySymbol}
              justify="flex-end"
              price={price}
              backgroundImage={getFileSrcFromPublicFolder("parchii_icon.svg")}
            />
            )}
           {exactflagOfClinic && (
           <FAEText className="line-break fae--all-addresses-page-original-address">
             Choose your desired address from where you want to get nearest clinic addresses 
           </FAEText> ) }
 
           {isInClinic && (
           <FAEText className="line-break fae--all-addresses-page-original-address">
             Choose your desired address from where you want to get nearest clinic addresses
           </FAEText> ) } 

            <div style={{ width: "100%" }}>
              <div className="fae--clinic-addresses-radius">
                <FAEText tertiary>Result within</FAEText>
                
                <div style={{ width: "20%" }}>
                  <FAESelect
                    shadowBoxProps={{
                      primary: true,
                    }}
                    values={[
                      { label: "5 km", value: 5 },
                      { label: "10 km", value: 10 },
                      { label: "15 km", value: 15 },
                      { label: "20 km", value: 20 },
                      { label: "25 km", value: 25 }, 
                    ]}
                    value={radius}
                    getSelectedValue={setRadius}
                    primary
                  />
                </div>
                <FAEText tertiary>
                  Km of{" "}
                  <span
                    onClick={() => {
                      setOpen(true);
                      setDialogueBoxTitle("Select Your Address");
                      setContent(
                        <div className="fae--all-addresses-addresses-wrapper">
                      
                          {Children.toArray(
                            userHomeAddresses.map((userAddress) => {
                              const {
                                businessAddress = "",
                                line2,
                                townCity,
                                postalCode,
                                id,
                              } = userAddress;
                              console.log(userAddress, 'userAddress')
                              return ( 
                                <FAEShadowBox
                                  primary
                                  onClick={() => {
                                    setAddressIdForClinics(id);
                                    setOpen(false);
                                    setContent("");
                                    setDialogueBoxTitle("");
                                  }}
                                  padding
                                > 
                                  <div
                                    style={{
                                      width: "95%",
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                  > 
                                    <FAEText
                                      className="fae--all-addresses-page-original-address"
                                      paragraph
                                      tertiary
                                    >
                                      {businessAddress}
                                    </FAEText>
                                    <FAEText className="fae--all-addresses-page-original-address">
                                      {line2}
                                    </FAEText>
                                    <FAEText className="fae--all-addresses-page-original-address">
                                      {townCity}
                                    </FAEText>
                                    <FAEText className="fae--all-addresses-page-original-address">
                                      {postalCode}  
                                    </FAEText>
                                  </div>
                                </FAEShadowBox>
                              );
                            })
                          )}
                          
                        
                        </div>
                      );
                    }}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                  >
                    Home Address
                  </span>
                </FAEText>
              </div>
            </div>
         { loading_address && (
            <>
              <FAEloading_address type="svg" loaderImage={loaderImage} height="200px" />
             </>
          )}
  
          {!loading_address && (
            <div className="fae--all-addresses-addresses-wrapper"> 
              {Children.toArray(
                addresses.map((userAddress) => { 
                  const {
                    businessAddress = "",
                    line2,
                    townCity,
                    postalCode,
                    address,
                    id,
                    businessName,
                    distance_unit,
                    latitude,
                    longitude,
                    userID,
                    status,
                    availableProviders,
                    businessId
                  } = userAddress;
                  const  notavailbale = availableProviders =="0"? "status-not-active":""
                  return isInClinic ? 
                    <div id ={notavailbale} className="clinics-addresses-main-container-for-each-unit">
                     <FAEShadowBox
                        primary
                        className="fae--all-addresses-adrress-bar-wrapper-clinics-addresses pointer" >
                        {availableProviders =='0'? <span className="fae-fully-booked">Fully Booked</span>: ''}
                        <FAEText
                          className="fae--all-addresses-page-original-address"
                          style={{ fontWeight: "400" }} >
                          {businessName}
                        </FAEText>
                         
                        <div className="line-break clinic-addresses-line-addresse-and-map-address-wrapper">
                          <div>
                             <FAEText
                              className="fae--all-addresses-page-original-address"
                              paragraph
                              tertiary  >
                              {businessAddress}
                            </FAEText>
                            <FAEText className="fae--all-addresses-page-original-address">
                              {line2}
                            </FAEText>
                            <FAEText className="fae--all-addresses-page-original-address">
                              {townCity}
                            </FAEText>
                            <FAEText className="fae--all-addresses-page-original-address">
                              {postalCode}
                            </FAEText>
                          </div>
                          <FAEText
                            className="fae--all-addresses-page-original-address map-address"
                            tertiary
                            onClick={() => {
                              setOpen(true);
                              setDialogueBoxTitle("Clinic Location");
                              setContent(
                                <FAEGoogleMap
                                  apiKey={GOOGLE_MAP_API_KEY}
                                  lat={latitude}
                                  lng={longitude}
                                  address={
                                    <div>
                                      <FAEText
                                        className="fae--all-addresses-page-original-address"
                                        style={{ fontWeight: "400" }}  >
                                        {businessName}
                                      </FAEText>
                                      <FAEText
                                        className="fae--all-addresses-page-original-address"
                                        paragraph
                                        tertiary >
                                        {businessAddress}
                                      </FAEText>
                                      <FAEText className="fae--all-addresses-page-original-address">
                                        {line2}
                                      </FAEText>
                                      <FAEText className="fae--all-addresses-page-original-address">
                                        {townCity}
                                      </FAEText>
                                      <FAEText className="fae--all-addresses-page-original-address">
                                        {postalCode}
                                      </FAEText>
                                    </div>
                                   }
                                  // className="fae--add-address-page-google-map"
                                />
                              );
                            }}
                          >
                            <img
                              src={getFileSrcFromPublicFolder(
                                "address_location.svg"
                              )}
                              alt="address_location"
                              width="25px"
                              height="auto"
                            />
                            Map
                          </FAEText>
                        </div>
                        <FAEText
                          tertiary
                          className="fae--all-addresses-page-original-address"
                        >
                          {distance_unit} km from {businessName}
                        </FAEText>
                       </FAEShadowBox>
                      <FAEShadowBox
                        style={{ alignItems: "center" }}
                        primary
                        className="fae--all-addresses-adrress-bar-wrapper-clinics-addresses pointer"
                        onClick={() => handleAddressSelection(availableProviders !=='0'? availableProviders:availableProviders, id, businessId)}
                      >
                        <FAEText paragraph> {availableProviders  =='0'?"Search Alternative Slots": "Select"} </FAEText>
                      </FAEShadowBox>
                    </div>
                  : 
                    <FAEShadowBox
                      primary
                      className="fae--all-addresses-adrress-bar-wrapper pointer"
                      onClick={() => handleAddressSelection('', id, businessId)}  >
                        
                      <FAEText
                        className="fae--all-addresses-page-original-address"
                        paragraph
                        tertiary   >
                        {businessAddress}
                      </FAEText> 
                     
                      <div>
                        <FAEText className="fae--all-addresses-page-original-address">
                          {line2}
                        </FAEText>
                       
                        <FAEText className="fae--all-addresses-page-original-address">
                          {townCity}
                        </FAEText>
                        <FAEText className="fae--all-addresses-page-original-address">
                          {postalCode}
                        </FAEText>
                      </div>
                      <FAEText
                        className="fae--all-addresses-notes-text pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(true);
                          setContent(address);
                          setDialogueBoxTitle("Address Notes");
                        }}
                        paragraph
                        tertiary >
                        <img
                          className="fae--all-addresses-action-icon"
                          src={notesIcon}
                          alt="notes_icon"
                          width="auto"
                          height="auto"
                        />
                        Address Notes
                      </FAEText>
                    </FAEShadowBox> ;
                })
              )}
              { <div className="fae-noresult-container">{NoResult(loading_address, addresses)}</div>}
            </div>
          )} 
          {!isInClinic && (
            <FAEButton
              onClick={() =>
                history.push({
                  pathname: "/your-addresses/add",
                  state: { ...state, redirectedUrl: pathname },
                })
              }
              style={{ borderRadius: "4px" }}
            >
              + Add Address
            </FAEButton>
          )}
        </div>
      </div>
      <FAEDialogueBox
        title={dialogueBoxTitle}
        open={open}
        content={content}
        buttons={[
          {
            label: "Ok",
            onClick: () => setOpen(false),
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({
  addressSelectionPageReducer: {
    error,
    loading_address,
    addresses,
    bookingId,
    cartId,
    nextPage,
    userHomeAddresses,

  }, defaultReducer: {userId, userCountryId},
 }) => ({
  error,
  loading_address,
  addresses,
  bookingId,
  cartId,
  nextPage,
  userHomeAddresses,
  userCountryId, 
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAddressesBStatus,
      saveAddress,
      makeNextPageFalse,
      getUserHomeAddresses,
      saveBookingDateAndTimeNextTime,
      saveBookingDateAndTime, 
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressSelectionNearClinicPage);
