

// //libs
import React, { useEffect, Children, useState } from "react";
import {
  FAETitle,
  FAEFloatingBookingPrice,
  // FAEAddressSelection,
  FAEButton,
  FAEText,
  FAELoading,
  FAEShadowBox,
  FAEDialogueBox,
  FAEGoogleMap,
  FAESelect,
} from "@findanexpert-fae/components";
import { useLocation, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import { addSpaces, getCookies, getFileSrcFromPublicFolder } from "../../utils";
import {
  getAddresses,
  getUserHomeAddresses,
  makeNextPageFalse,
  saveAddress,
} from "../../redux/actions/addressSelectionPageActions";
// import { faeAddressParser } from "../../parsers";
import history from "../../history";

//scss
import "./AddressSelectionPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
// const deleteIcon = getFileSrcFromPublicFolder("delete_svg.svg");
const notesIcon = getFileSrcFromPublicFolder("notes_svg.svg");
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const AddressSelectionPage = ({
  getAddresses,
  addresses,
  error,
  loading,
  bookingId,
  saveAddress,
  cartId,
  nextPage,
  makeNextPageFalse,
  getUserHomeAddresses,
  userHomeAddresses,
}) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [dialogueBoxTitle, setDialogueBoxTitle] = useState("");
  const [radius, setRadius] = useState(5);
  const [addressIdForClinics, setAddressIdForClinics] = useState(0); 
  const [AddressSelectid, setAddressSelectid]=useState()
  const { service } = useParams();
  const serviceName = addSpaces(service, "-");
  document.title = `Chelsford | ${serviceName} - Select Address`;
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
          availableFlag,
          pathValue,
          prevRevState,
      } = state;  
  useEffect(() => {
        state.isInClinic=false
    getAddresses({
      serviceId,
      isInClinic,
      userId: getCookies("userId"),
      selectedTime,
      selectedDate,
      radius,
      addressIdForClinics,
    });
  }, [
      addressIdForClinics,
      getAddresses,
      isInClinic,
      radius,
      selectedDate,
      selectedTime,
      serviceId,
  ]);

  useEffect(() => {
    getUserHomeAddresses(getCookies("userId"));
  }, [getUserHomeAddresses]);

  useEffect(() => {
    if (nextPage) {
      makeNextPageFalse();
      history.push({
        pathname:
        // hasAttributes && !freeConsultation
        // ?
        `/booking/${service}/attributes`,
        // : `/booking/${service}/date-time-selection`,
        state: {
          ...state,
          bookingId: bookingId,
          cartId: cartId,
          price,
          selectedDate,
          selectedTime,
          gated:true,
          AddressSelectid 
        },
      });
    }
  }, [
    bookingId,
    cartId,
    freeConsultation,
    hasAttributes,
    makeNextPageFalse,
    nextPage,
    price,
    selectedDate,
    selectedTime,
    service,
    state,
  ]);
 
  const handleAddressSelection = (status,id, userID) => {
    // here you go if not availbabile 
   if(status==='Not Available'){  
      history.push({
        pathname: `${pathValue}`,
        state: { 
          ...state,
          currencySymbol: currencySymbol, 
          hasAttributes: hasAttributes,
          isInClinic: isInClinic, 
          price: price,
          serviceId: serviceId,
          voucherId: voucherId,
          addressId:id,
          userId: userID
        },
      });  
    } else {
      // if available 
        saveAddress({
            addressId: id,
            location: isInClinic ? "inclinic" : "inhouse",
            serviceId,
            userId: getCookies("userId"),
            cartId: "",
            voucherId,
        });
     }
  }; 
  return (
    <>
      <div className="fae--service-location-page-container dpt dpb">
        <div className="fae--service-location-page-wrapper">
          <FAETitle
            label={serviceName}
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
           {isInClinic && (
           <FAEText className="line-break fae--all-addresses-page-original-address">
             Choose your desired address from where you want to get nearest clinic addresses
           </FAEText> ) }







          {isInClinic &&  (
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
                            userHomeAddresses?.map((userAddress) => {
                              const {
                                line1 = "",
                                line2,
                                townCity,
                                postalCode,
                                id,
                              } = userAddress;
                              
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
                                      {line1}
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
          )}











          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
          )}
  
          {!loading && (
            <div className="fae--all-addresses-addresses-wrapper">
              {Children.toArray(
                addresses?.map((userAddress) => {
                  const {
                    line1 = "",
                    line2,
                    townCity,
                    postalCode,
                    address,
                    id,
                    expertCenterName,
                    distance_unit,
                    latitude,
                    longitude,
                    userID,
                    status
                  } = userAddress;
                  
                 const  notavailbale = status==="Not Available"? "status-not-active":""
                  return isInClinic ? 
                    <div id ={notavailbale} className="clinics-addresses-main-container-for-each-unit">
                     <FAEShadowBox
                        primary
                        className="fae--all-addresses-adrress-bar-wrapper-clinics-addresses pointer" >
                        {status=='Not Available'? <span className="fae-fully-booked">Fully Booked</span>: ''}
                        <FAEText
                          className="fae--all-addresses-page-original-address"
                          style={{ fontWeight: "400" }} >
                          {expertCenterName}
                        </FAEText>
                         
                        <div className="line-break clinic-addresses-line-addresse-and-map-address-wrapper">
                          <div>
                             <FAEText
                              className="fae--all-addresses-page-original-address"
                              paragraph
                              tertiary  >
                              {line1}
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
                                        {expertCenterName}
                                      </FAEText>
                                      <FAEText
                                        className="fae--all-addresses-page-original-address"
                                        paragraph
                                        tertiary >
                                        {line1}
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
                          {distance_unit} km from {expertCenterName}
                        </FAEText>
                        {/* <FAEText
                        className="fae--all-addresses-notes-text pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(true);
                          setContent(address);
                        }}
                        paragraph
                        tertiary
                      >
                        <img
                          className="fae--all-addresses-action-icon"
                          src={notesIcon}
                          alt="notes_icon"
                          width="auto"
                          height="auto"
                        />
                        Address Notes
                      </FAEText> */}
                      </FAEShadowBox>
                      <FAEShadowBox
                        style={{ alignItems: "center" }}
                        primary
                        className="fae--all-addresses-adrress-bar-wrapper-clinics-addresses pointer"
                        onClick={() => {handleAddressSelection(status==='Not Available'? status:id, id, userID); setAddressSelectid(id)}}
                      >
                        <FAEText paragraph> {status=='Not Available'?"Search Alternative Slots": "Select"} </FAEText>
                      </FAEShadowBox>
                    </div>
                  : 
                    <FAEShadowBox
                      primary
                      className="fae--all-addresses-adrress-bar-wrapper pointer"
                      onClick={() =>{ handleAddressSelection('', id, userID); setAddressSelectid(id)}}  >
                        
                      <FAEText
                        className="fae--all-addresses-page-original-address"
                        paragraph
                        tertiary   >
                        {line1}
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
            </div>
          )}
          {/* <FAEAddressSelection
            loading={loading}
            loaderProps={{
              loaderImage,
              height: "200px",
              type: "video",
            }}
            addressList={faeAddressParser(addresses)}
            onClick={handleAddressSelection}
            shadowBoxProps={{ padding: true, primary: true }}
          /> */}
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
    loading,
    addresses,
    bookingId,
    cartId,
    nextPage,
    userHomeAddresses,
  },
}) => ({
  error,
  loading,
  addresses,
  bookingId,
  cartId,
  nextPage,
  userHomeAddresses,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAddresses,
      saveAddress,
      makeNextPageFalse,
      getUserHomeAddresses,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressSelectionPage);
