//libs
import React, { useEffect, useState } from "react";
import {
  FAEAutoComplete,
  FAEGoogleMap,
  FAETextField,
  FAEButton,
  FAELoading,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

//src
import {
  getAddressSuggestions,
  getPlaceDetails,
  setSaveAddressResponseToEmpty,
  saveAddress,
} from "../../redux/actions/addAddressPageActions";
import UserInfoPageLayout from "../UserInfoPageLayout";
import { addressSuggestionsParser } from "../../parsers";
import {
  divideAddress,
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
} from "../../utils";
import history from "../../history";

//scss
import "./AddAddressPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const AddAddressPage = ({
  loading,
  error,
  addressSuggestions,
  getAddressSuggestions,
  getPlaceDetails,
  placeDetails,
  saveAddressResponse = {},
  setSaveAddressResponseToEmpty,
  saveAddress,
  userLat,
  userLng,
}) => {
  document.title = `Chelsford | Add Address`;
  const userId = getCookies("userId");
  const location = useLocation();
  const { addressoperation } = useParams();
  const { state } = location;
  const redirectUrl =
    state.redirectedUrl !== undefined
      ? `${state.redirectedUrl}`
      : "/your-addresses";
  const addressObj = state.address !== undefined ? state.address : {};
  const {
    line1 = "",
    line2 = "",
    latitude = 0,
    longitude = 0,
    id = "",
  } = addressObj;
  const [lat, setLat] = useState(latitude);
  const [lng, setLng] = useState(longitude);
  const [address, setAddress] = useState(line1);
  const [suggestionForProvider, setSuggestionForProvider] = useState(line2);
  const [addressId] = useState(id);
  const [addressNickName, setAddressNickName] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");

  useEffect(() => {
    if (userLat !== 0 && userLng !== 0 && lat === 0 && lng === 0) {
      setLat(parseInt(userLat));
      setLng(parseInt(userLng));
    }
  }, [lat, lng, userLat, userLng]);

  useEffect(() => {
    if (!objectIsEmpty(saveAddressResponse)) {
      const { message, error } = saveAddressResponse;
      error === true
        ? alert(message)
        : history.push({
            pathname: redirectUrl,
            state: state === undefined ? "" : { ...state },
          });
      setSaveAddressResponseToEmpty();
    }
  }, [redirectUrl, saveAddressResponse, setSaveAddressResponseToEmpty, state]);

  const handleChangeDragEvent = (mapValues) => {
    const { mapAddress, lat, lng, addressComponents } = mapValues;
    setAddress(mapAddress);
    setLat(lat);
    setLng(lng);
    setStreetAddress(divideAddress(addressComponents).streetAddress);
    setBuildingNumber(divideAddress(addressComponents).buildingNumber);
    setCity(divideAddress(addressComponents).city);
    setPostCode(divideAddress(addressComponents).postCode);
  };

  useEffect(() => {
    if (!objectIsEmpty(placeDetails)) {
      const {
        formatted_address,
        geometry: {
          location: { lat, lng },
        },
        address_components,
      } = placeDetails;
      setAddress(formatted_address);
      setLat(lat);
      setLng(lng);
      setStreetAddress(divideAddress(address_components).streetAddress);
      setBuildingNumber(divideAddress(address_components).buildingNumber);
      setCity(divideAddress(address_components).city);
      setPostCode(divideAddress(address_components).postCode);
    }
  }, [placeDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return saveAddress({
      userId,
      radius: 0,
      suggestionForProvider,
      lat,
      lng,
      addressId,
      addressoperation,
      postCode,
      city,
      buildingNumber,
      streetAddress,
      addressNickName,
    });
  };

  return (
    <>
      <UserInfoPageLayout>
        <form
          onSubmit={handleSubmit}
          className="fae--add-address-page-main-container"
        >
          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
          )}
          {!loading && (
            <>
              <FAEAutoComplete
                type="search"
                onChange={(e) => getAddressSuggestions(e.target.value)}
                label="Address"
                placeholder="Address"
                values={addressSuggestionsParser(addressSuggestions)}
                getSelectedValue={(placeId) => getPlaceDetails(placeId)}
                value={{ label: address }}
                required={true}
                isRequired={true}
                primary
              />
              <FAEGoogleMap
                apiKey={GOOGLE_MAP_API_KEY}
                lat={lat}
                lng={lng}
                address={address}
                getMapValues={(e) => handleChangeDragEvent(e)}
                className="fae--add-address-page-google-map"
              />
              <FAETextField
                label="Nickname this Address (Home / Work)"
                getValue={setAddressNickName}
                value={addressNickName}
                placeholder="Nickname this Address (Home / Work)"
                primary
                required={true}
                isRequired={true}
              />
              <FAETextField
                label="Building Number / Number"
                value={buildingNumber}
                placeholder="Building Number / Number"
                getValue={setBuildingNumber}
                primary
                required={true}
                isRequired={true}
              />
              <FAETextField
                label="Street Address"
                getValue={setStreetAddress}
                value={streetAddress}
                placeholder="Street Address"
                primary
                required={true}
                isRequired={true}
              />
              <FAETextField
                label="City"
                getValue={setCity}
                value={city}
                placeholder="City"
                primary
                required={true}
                isRequired={true}
              />
              <FAETextField
                label="Post Code / Zip Code"
                getValue={setPostCode}
                value={postCode}
                placeholder="Post Code / Zip Code"
                primary
                required={true}
                isRequired={true}
              />
              <FAETextField
                label="Address Notes (Optional)"
                getValue={setSuggestionForProvider}
                value={suggestionForProvider}
                placeholder="Address Notes (Optional)"
                primary
              />
              <FAEButton calssName="fae--add-address-button">
                Save Address
              </FAEButton>
            </>
          )}
        </form>
      </UserInfoPageLayout>
    </>
  );
};

const mapStateToProps = ({
  addAddressPageReducer: {
    error,
    loading,
    addressSuggestions,
    placeDetails,
    saveAddressResponse,
  },
  defaultReducer: { userLat, userLng },
}) => ({
  error,
  loading,
  addressSuggestions,
  placeDetails,
  saveAddressResponse,
  userLat,
  userLng,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAddressSuggestions,
      getPlaceDetails,
      setSaveAddressResponseToEmpty,
      saveAddress,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressPage);
