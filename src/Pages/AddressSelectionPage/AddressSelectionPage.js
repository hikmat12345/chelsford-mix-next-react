//libs
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
} from "@findanexpert-fae/components";
import { useLocation, useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect, useSelector } from "react-redux";

//src
import { addSpaces, getCookies, getFileSrcFromPublicFolder } from "../../utils";
import {
  getAddresses,
  getUserHomeAddresses,
  makeNextPageFalse,
  saveAddress,
} from "../../redux/actions/addressSelectionPageActions"; 
import history from "../../history";

//scss
import "./AddressSelectionPage.scss";


const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const AddressSelectionPage = ({
  getAddresses,
  addresses, 
  loading,
  bookingId,
  saveAddress,
  cartId,
  nextPage,
  makeNextPageFalse,
  getUserHomeAddresses,
  userHomeAddresses,
  addressSelectionPageReducer
}) => {
  const loaderImage = getFileSrcFromPublicFolder("loader.GIF"); 
  const notesIcon = getFileSrcFromPublicFolder("notes_svg.svg");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [dialogueBoxTitle, setDialogueBoxTitle] = useState("");
  const [radius, setRadius] = useState(5);
  const [addressIdForClinics, setAddressIdForClinics] = useState(0);
  const [latLanObject, setUbdateObjec]=useState({})
  const { service } = useParams();
  const serviceName = addSpaces(service, "-");
  document.title = `Chelsford | ${serviceName} - Select Address`;
  const location = useLocation();
  const { state, pathname } = location;
  const store= useSelector(state=>state)
  const {
    serviceId,
    isInClinic,
    isInHouse,
    hasAttributes,
    price,
    freeConsultation,
    currencySymbol,
    voucherId,
    selectedTime,
    selectedDate,
    pathValue,
  } = state; 
  useEffect(() => {
  //  state.isInClinic=false
    getAddresses({
      serviceId,
      isInClinic,
      isInHouse,
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
          `/booking/${service}/attributes`, 
        state: {
          ...state,
          bookingId: bookingId,
          cartId: cartId,
          price,
          selectedDate,
          selectedTime,
          ...latLanObject
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

  const handleAddressSelection = async (status,id, userID, latitude, longitude) => {
      await setUbdateObjec({id:id, latitude:latitude, longitude:longitude})
      await  saveAddress({
            addressId: id,
            location: isInClinic ? "inclinic" : "inhouse",
            serviceId,
            userId: getCookies("userId"),
            cartId: "",
            voucherId,
        });  
  };
 
  const doPadding= addresses?.length<4 ?(addresses.length==1 ?{paddingBottom: 254}:{paddingBottom: 250}): {paddingBottom: 40}
  return (
    <> 
      <div className="fae--service-location-page-container dpt dpb" style={doPadding}>
        <div className="fae--service-location-page-wrapper" >
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
           <FAEText className="line-break fae--all-addresses-page-original-address fae-address-selection-msg">
             Choose your desired address from where you want to get nearest clinic addresses  
           </FAEText> ) }
  
           <FAEText className="line-break fae--all-addresses-page-original-address fae-address-selection-second-msg">
             I want my service at
           </FAEText> 
          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
          )} 
          {!loading && (
            <div className="fae--all-addresses-addresses-wrapper">

              {addresses && Children.toArray(
                addresses?.map((userAddress) => {
                  const {
                    line1 = "",
                    line2,
                    townCity,
                    postalCode,
                    address,
                    id, 
                    userID, 
                    longitude,
                    latitude
                  } = userAddress; 
                  return  (
                    <FAEShadowBox
                      primary
                      className="fae--all-addresses-adrress-bar-wrapper pointer"
                      onClick={() =>{ handleAddressSelection('', id, userID, latitude, longitude); }}  >

                      <FAEText
                        className="fae--all-addresses-page-original-address fae-address-title"
                        paragraph
                        tertiary
                      >
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
                      </FAEText>
                    </FAEShadowBox>
                  );
                })
              )}
             {!loading && Array.isArray(addresses)? (addresses.length ==0? <FAEText className="ResultEmpty" subHeading style={{textAlign: "center"}}> <img src={getFileSrcFromPublicFolder("result not found-img.png")} /></FAEText>:""):""}
            </div>
          )  }
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
        </div>
      </div>
      <FAEDialogueBox
        title={dialogueBoxTitle}
        open={open}
        content={content.length !==0?content: "Address Notes not available"}
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
  } 
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
