
//libs
import React, { useEffect, Children, useState } from "react";
import {
  FAETitle,
  FAESelect,
  FAERadioGroup,
  FAECheckBoxGroup,
  FAETextField,
  FAELoading,
  FAEButton,
  FAEShadowBox,
  FAEText,
  FAEImage,
  FAEDialogueBox
  // FAEVideo,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
 
//src
import {
  addSpaces,
  getCookies,
  getFileSrcFromPublicFolder,
  getUniqueData,
  objectIsEmpty,
} from "../../utils";
import {
  getServiceAttributesData,
  makeServiceAttributesNextPageFalse,
  saveServiceAttributes,
  uploadBookingVideo,
  makeVideoUploadedResponseEmpty,
  getBookingVideoAndImages,
  deleteImageOrVideo,
  makeIsDeletedResponseEmpty,
} from "../../redux/actions/serviceAttributesPageActions";
import { faeFormDataParser } from "../../parsers";
import {
  makeNextPageFalse,
  saveAddress,
  CheckServiceAvailability
} from "../../redux/actions/addressSelectionPageActions";
import history from "../../history";
import {
  makeDateTimeNextPageFalse,
  saveBookingDateAndTime,
} from "../../redux/actions/dateTimeSelectionPageActions";
import ClearIcon from '@material-ui/icons/Clear';
//scss
import "./ServiceAttributesPage.scss"; 
import { SaveSessionBooking } from "../../redux/actions/sessionBookingsPageActions";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholder = getFileSrcFromPublicFolder("placeholder.jpg");
const imageUploadIcon = getFileSrcFromPublicFolder("image_upload_icon.svg");
const videoUploadIcon = getFileSrcFromPublicFolder("video_upload_icon.svg");

const ServiceAttributesPage = ({
  error,
  loading,
  userCountryId,
  serviceAttributes = [],
  getServiceAttributesData,
  nextPageAttributes,
  makeServiceAttributesNextPageFalse,
  saveServiceAttributes,
  videoUploadedResponse,
  uploadBookingVideo,
  bookingId,
  cartId,
  saveAddress,
  makeVideoUploadedResponseEmpty,
  makeNextPageFalse,
  getBookingVideoAndImages,
  uploadedImages,
  uploadedVideos,
  deleteImageOrVideo,
  isDeletedResponse,
  makeIsDeletedResponseEmpty,
  SaveSessionBooking,
  saveBookingDateAndTime, 
  CheckServiceAvailability,
  checkServiceavailabiltiyData=[]
}) => {
  const userId = getCookies("userId");
  const { service } = useParams();
  const serviceName = addSpaces(service, "-");
  document.title = `Chelsford | ${serviceName} - Attributes`;
  const location = useLocation();
  const { state } = location;
  
  const {
    serviceId,
    isOnline,
    isInHouse,
    voucherId,
    isInClinic,
    selectedDate,
    selectedTime,
    hasProducts,
    selectedSessions,
    latitude,
    longitude,
  } = state;  
  const [errorFileds, setErrorFields] = useState([]);
  const [fieldAnswers, setFieldAnswers] = useState([]);
  const [imageUploading, setImageUploading] = useState(false);
  const [textNotes, setTextNotes] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [deleteFileParams, setDeleteFileParams] = useState({});
  useEffect(() => {
    if (isOnline) {
      saveAddress({
        addressId: 0,
        location: "Online",
        serviceId,
        userId,
        cartId: "",
        voucherId,
      });
    }
  }, [isOnline, saveAddress, serviceId, userId, voucherId]);

  useEffect( async() => { 
    await getServiceAttributesData(serviceId);
    if(isInHouse) { 
     // ServiceAvailability  CheckServiceAvailability
       await CheckServiceAvailability({
        serviceId: serviceId,
        countryId: userCountryId,
        latitude: latitude,
        longitude: longitude,
      })
    } 
    getBookingVideoAndImages(cartId ? cartId : state.cartId);
    return () => makeNextPageFalse();
  }, [
    cartId,
    getBookingVideoAndImages,
    getServiceAttributesData,
    makeNextPageFalse,
    serviceId,
    state.cartId,
  ]);

  useEffect(() => {
    if (!objectIsEmpty(videoUploadedResponse)) {
      setVideoUploading(false);
      setImageUploading(false);
      const { message, code } = videoUploadedResponse;
      if (code !== 0) {
        alert(message);
      } else {
        alert(message);
        getBookingVideoAndImages(cartId ? cartId : state.cartId);
      }
      makeVideoUploadedResponseEmpty();
    }
  }, [
    videoUploadedResponse,
    userId,
    makeVideoUploadedResponseEmpty,
    cartId,
    state.cartId,
    getBookingVideoAndImages,
  ]);

  useEffect(() => {
    if (!objectIsEmpty(isDeletedResponse)) {
      setVideoUploading(false);
      setImageUploading(false);
      const { message, code } = isDeletedResponse;
      if (code !== 0) {
        alert(message);
      } else {
        alert(message);
        getBookingVideoAndImages(cartId ? cartId : state.cartId);
      }
      makeIsDeletedResponseEmpty();
    }
  }, [
    cartId,
    getBookingVideoAndImages,
    isDeletedResponse,
    makeIsDeletedResponseEmpty,
    state.cartId,
  ]);
 
  useEffect(async() => {
   if (nextPageAttributes) {
       await selectedSessions >0 && SaveSessionBooking(cartId, selectedSessions) 
      makeServiceAttributesNextPageFalse();  
      await hasProducts &&  history.push({
                pathname: `/product-list:${service}`,
                state: {
                  ...state,
                  notes: textNotes,
                  bookingId: bookingId ? bookingId : state.bookingId,
                  cartId: cartId ? cartId : state.cartId,
                  pathName: `/booking/${service}/date-time-selection`,
                  serviceId: serviceId,
                  bookingName: serviceName,
                  providerId:checkServiceavailabiltiyData.availableProviders
                },
              }) 
      await  !hasProducts && history.push({
            pathname: `/booking/${service}/date-time-selection`,
            state: {
              ...state,
              notes: textNotes,
              bookingId: bookingId ? bookingId : state.bookingId,
              cartId: cartId ? cartId : state.cartId,
              bookingName: serviceName,
              providerId:checkServiceavailabiltiyData.availableProviders
            },
          });
     }
     

    localStorage.setItem('cartid',state.cartId)
  }, [
    bookingId,
    cartId,
    isInClinic,
    makeServiceAttributesNextPageFalse,
    nextPageAttributes,
    saveBookingDateAndTime,
    selectedDate,
    selectedTime,
    service,
    state,
    textNotes,
  ]);
    

  const handleChangefieldValue = (id, value) => {
    setFieldAnswers(getUniqueData([{ id, value }, ...fieldAnswers], "id"));
  };

  const handleCheckBoxError = ({ isRequired, id, error }) => {
    isRequired === true &&
      setErrorFields(getUniqueData([{ id, error }, ...errorFileds], "id"));
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return errorFileds.some((field) => field.error === true)
      ? alert("Please fill required fields")
      : saveServiceAttributes({
          cartId: cartId ? cartId : state.cartId,
          bookingId: bookingId ? bookingId : state.bookingId,
          fieldAnswers,
        });
  };

  const imageHandler = (e) => {
    e.preventDefault();
    setImageUploading(true);
    if (e.target.files[0]) {
      uploadBookingVideo({
        cartId: cartId ? cartId : state.cartId,
        userId,
        src: e.target.files[0],
        filetype: "I",
      });
    }
  };

  const videoHandler = (e) => {
    e.preventDefault();
    setVideoUploading(true);
    if (e.target.files[0]) {
      uploadBookingVideo({
        cartId: cartId ? cartId : state.cartId,
        userId,
        src: e.target.files[0],
        filetype: "V",
      });
    }
  };

  const deleteImageHandler = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setImageUploading(true);
    deleteImageOrVideo({ cartId: cartId ? cartId : state.cartId, id });
  };

  const deleteVideoHandler = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setVideoUploading(true);
    deleteImageOrVideo({ cartId: cartId ? cartId : state.cartId, id });
  };

  const delteFile =(e, id, isVideo)=>{ 
    setDeleteFileParams({e:e, id:id, filetype:isVideo})
    setDeleteMessage(true)
  }
  const delteFileOkay = ()=>{
    const {e,id, filetype}=deleteFileParams
    filetype? deleteVideoHandler(e, id): deleteImageHandler(e, id);
    setDeleteMessage(false)
  }
  const toDisabled=()=>{
    setDeleteMessage(false)
  }
  return (
    <>
      <div className="fae--service-attributes-page-container dpt dpb">
        <div className="fae--service-attributes-page-wrapper">
          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="300px" />
          )}
          {!loading && (
           <>
            <FAETitle
              label={serviceName}
              logo={getFileSrcFromPublicFolder("title_logo.svg")}
            />
            <form
              onSubmit={handleSubmit}
              className="fae--service-attributes-page-attributes-form"
            >
              {Children.toArray(
                serviceAttributes.map((attribute) => {
                  const {
                    attributeTypeName,
                    attributeKey,
                    attributeID,
                    options = [],
                    isRequired,
                  } = attribute;
                  const fieldType = attributeTypeName.toLowerCase();
                  return (
                    <>
                      {fieldType === "select" && (
                        <FAESelect
                          label={attributeKey}
                          primary
                          shadowBoxProps={{ primary: true }}
                          values={faeFormDataParser(options)}
                          required={isRequired}
                          isRequired={isRequired}
                          getSelectedValue={(value) =>
                            handleChangefieldValue(attributeID, value)
                          }
                        />
                      )}
                      {fieldType === "textbox" && (
                        <FAETextField
                          label={attributeKey}
                          primary
                          shadowBoxProps={{ primary: true }}
                          placeholder={attributeKey}
                          required={isRequired}
                          isRequired={isRequired}
                          getValue={(value) =>
                            handleChangefieldValue(attributeID, value)
                          }
                        />
                      )}
                      {fieldType === "checkbox" && (
                        <FAECheckBoxGroup
                          label={attributeKey}
                          values={faeFormDataParser(options)}
                          primary
                          shadowBoxProps={{ primary: true }}
                          error={(values) =>
                            isRequired && values.length < 1
                              ? handleCheckBoxError({
                                  isRequired,
                                  id: attributeID,
                                  error: true,
                                })
                              : handleCheckBoxError({
                                  isRequired,
                                  id: attributeID,
                                  error: false,
                                })
                          }
                          errorMessage="Select at least 1"
                          isRequired={isRequired}
                          getSelectedValues={(values) =>
                            handleChangefieldValue(
                              attributeID,
                              values.toString()
                            )
                          }
                        />
                      )}
                      {fieldType === "radiobutton" && (
                        <FAERadioGroup
                          label={attributeKey}
                          values={faeFormDataParser(options)}
                          primary
                          shadowBoxProps={{ primary: true }}
                          isRequired={isRequired}
                          required={isRequired}
                          getSelectedValue={(value) =>
                            handleChangefieldValue(attributeID, value)
                          }
                        />
                      )}
                    </>
                  );
                })
              )}
              <FAEShadowBox>
                <FAETextField
                  label="Add Text Notes"
                  placeholder="Notes..."
                  primary
                  shadowBoxProps={{
                    primary: true,
                  }}
                  value={textNotes}
                  getValue={(value) => setTextNotes(value)}
                />
              </FAEShadowBox>
              <FAEShadowBox
                className="fae--service-attributes-page-notes-wrapper"
                padding
                primary
              >
                {/* <div style={{ textAlign: "center" }}>
                  <FAEText subHeading>Notes</FAEText>
                  <FAEText>
                    Please Enter Text Notes or Image or Video Notes
                  </FAEText>
                </div> */}
                <div className="fae--service-attributes-page-image-or-video-notes-wrapper">
                  <div className="fae--service-attributes-page-add-wrapper">
                    <label htmlFor="video-upload" className="pointer">
                      <FAEText className="fae--service-attributes-uploading-image-or-video-button">
                        <img
                          src={videoUploadIcon}
                          alt="video_upload_icon"
                          width="40px"
                          height="40px"
                        />
                        Add Video Notes
                      </FAEText>
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      name="image-upload"
                      id="video-upload"
                      onChange={videoHandler}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="fae--service-attributes-page-add-wrapper">
                    <label htmlFor="image-upload" className="pointer">
                      <FAEText className="fae--service-attributes-uploading-image-or-video-button">
                        <img
                          src={imageUploadIcon}
                          alt="image_upload_icon"
                          width="40px"
                          height="40px"
                        />
                        Add Image Notes
                      </FAEText>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="image-upload"
                      id="image-upload"
                      onChange={imageHandler}
                      style={{ display: "none" }}
                      // multiple
                    />
                  </div>
                </div>
              </FAEShadowBox>
              <FAEShadowBox
                padding
                primary
                style={{ flexDirection: "column", gap: "10px" }}
              >
                <div className="fae--service-attributes-uploaded-images-or-videos-wrapper line-break">
                  <FAEText subHeading>Videos</FAEText>
                  <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
                    {!videoUploading ? (
                      uploadedVideos.map(({ filePath, id }) => (
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
                          <div
                            onClick={(e) => {
                              delteFile(e, id, true);
                            }}
                            className="fae--addresses-delete-icon-wrapper pointer"  >
                           <ClearIcon style={{color: "#ffebee"}}/> 
                          </div>
                        </div>
                      ))
                    ) : (
                      <FAELoading
                        loaderImage={loaderImage}
                        height="200px"
                        type="svg"
                      />
                    )}
                  </div>
                </div>
                <div className="fae--service-attributes-uploaded-images-or-videos-wrapper">
                  <FAEText subHeading>Images</FAEText>
                  <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
                    {!imageUploading ? (
                      uploadedImages.map(({ id, filePath }) => (
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
                          <div
                            onClick={(e) => {
                              delteFile(e, id, false);
                            }}
                            className="fae--addresses-delete-icon-wrapper pointer"
                          >
                             <ClearIcon style={{color: "#ffebee"}}/> 
                          </div>
                        </div>
                      ))
                    ) : (
                      <FAELoading
                        loaderImage={loaderImage}
                        height="200px"
                        type="svg"
                      />
                    )}
                  </div>
                </div>
              </FAEShadowBox>
              <FAEButton
                type="submit"
                className="fae--service-attributes-button"
              >
                Next
              </FAEButton>
            </form>
            </>
          )}
        </div>
      </div>
    {deleteMessage &&  
     <FAEDialogueBox
        title=""
        open={deleteMessage}
        content={"Are you sure you want to delete this file."}
        buttons={[
          {
            label: "Yes",
            onClick: delteFileOkay,
          },
          {
            label: "Cancel",
            onClick:()=>setDeleteMessage(false)
          },
        ]}
      >  
     </FAEDialogueBox> 
      }
    </>
  );
};

const mapStateToProps = ({
  serviceAttributesPageReducer: {
    error,
    loading,
    serviceAttributes,
    nextPageAttributes,
    videoUploadedResponse,
    uploadedImages,
    uploadedVideos,
    isDeletedResponse,
  },
  addressSelectionPageReducer: { bookingId, cartId, checkServiceavailabiltiyData},
  dateTimeSelectionPageReducer: { nextPageDateTimeSelection },
  defaultReducer:{userCountryId}
}) => ({
  error,
  loading,
  userCountryId,
  serviceAttributes,
  nextPageAttributes,
  videoUploadedResponse,
  bookingId,
  cartId,
  uploadedImages,
  uploadedVideos,
  isDeletedResponse,
  nextPageDateTimeSelection,
  checkServiceavailabiltiyData
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getServiceAttributesData,
      makeServiceAttributesNextPageFalse,
      saveServiceAttributes,
      uploadBookingVideo,
      saveAddress,
      makeVideoUploadedResponseEmpty,
      makeNextPageFalse,
      getBookingVideoAndImages,
      deleteImageOrVideo,
      makeIsDeletedResponseEmpty,
      makeDateTimeNextPageFalse,
      saveBookingDateAndTime,
      SaveSessionBooking,
      CheckServiceAvailability
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceAttributesPage);
































// //libs
// import React, { useEffect, Children, useState } from "react";
// import {
//   FAETitle,
//   FAESelect,
//   FAERadioGroup,
//   FAECheckBoxGroup,
//   FAETextField,
//   FAELoading,
//   FAEButton,
//   FAEShadowBox,
//   FAEText,
//   FAEImage,
//   // FAEVideo,
// } from "@findanexpert-fae/components";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { useLocation, useParams } from "react-router-dom";

// //src
// import {
//   addSpaces,
//   getCookies,
//   getFileSrcFromPublicFolder,
//   getUniqueData,
//   objectIsEmpty,
// } from "../../utils";
// import {
//   getServiceAttributesData,
//   makeServiceAttributesNextPageFalse,
//   saveServiceAttributes,
//   uploadBookingVideo,
//   makeVideoUploadedResponseEmpty,
//   getBookingVideoAndImages,
//   deleteImageOrVideo,
//   makeIsDeletedResponseEmpty,
// } from "../../redux/actions/serviceAttributesPageActions";
// import { faeFormDataParser } from "../../parsers";
// import {
//   makeNextPageFalse,
//   saveAddress,
// } from "../../redux/actions/addressSelectionPageActions";
// import history from "../../history";
// import {
//   makeDateTimeNextPageFalse,
//   saveBookingDateAndTime,
// } from "../../redux/actions/dateTimeSelectionPageActions";

// //scss
// import "./ServiceAttributesPage.scss";

// const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
// const placeholder = getFileSrcFromPublicFolder("placeholder.jpg");
// const imageUploadIcon = getFileSrcFromPublicFolder("image_upload_icon.svg");
// const videoUploadIcon = getFileSrcFromPublicFolder("video_upload_icon.svg");

// const ServiceAttributesPage = ({
//   error,
//   loading,
//   serviceAttributes = [],
//   getServiceAttributesData,
//   nextPageAttributes,
//   makeServiceAttributesNextPageFalse,
//   saveServiceAttributes,
//   videoUploadedResponse,
//   uploadBookingVideo,
//   bookingId,
//   cartId,
//   saveAddress,
//   makeVideoUploadedResponseEmpty,
//   makeNextPageFalse,
//   getBookingVideoAndImages,
//   uploadedImages,
//   uploadedVideos,
//   deleteImageOrVideo,
//   isDeletedResponse,
//   makeIsDeletedResponseEmpty,
//   nextPageDateTimeSelection,
//   saveBookingDateAndTime,
//   makeDateTimeNextPageFalse,
// }) => {
//   const userId = getCookies("userId");
//   const { service } = useParams();
//   const serviceName = addSpaces(service, "-");
//   document.title = `Chelsford | ${serviceName} - Attributes`;
//   const location = useLocation();
//   const { state } = location;
//   const {
//     serviceId,
//     isOnline,
//     voucherId,
//     isInClinic,
//     selectedDate,
//     selectedTime,
//   } = state;
//   const [errorFileds, setErrorFields] = useState([]);
//   const [fieldAnswers, setFieldAnswers] = useState([]);
//   const [imageUploading, setImageUploading] = useState(false);
//   const [textNotes, setTextNotes] = useState("");
//   const [videoUploading, setVideoUploading] = useState(false);

//   useEffect(() => {
//     if (isOnline) {
//       saveAddress({
//         addressId: 0,
//         location: "Online",
//         serviceId,
//         userId,
//         cartId: "",
//         voucherId,
//       });
//     }
//   }, [isOnline, saveAddress, serviceId, userId, voucherId]);

//   useEffect(() => {
//     getServiceAttributesData(serviceId);
//     getBookingVideoAndImages(cartId ? cartId : state.cartId);
//     return () => makeNextPageFalse();
//   }, [
//     cartId,
//     getBookingVideoAndImages,
//     getServiceAttributesData,
//     makeNextPageFalse,
//     serviceId,
//     state.cartId,
//   ]);

//   useEffect(() => {
//     if (!objectIsEmpty(videoUploadedResponse)) {
//       setVideoUploading(false);
//       setImageUploading(false);
//       const { message, code } = videoUploadedResponse;
//       if (code !== 0) {
//         alert(message);
//       } else {
//         alert(message);
//         getBookingVideoAndImages(cartId ? cartId : state.cartId);
//       }
//       makeVideoUploadedResponseEmpty();
//     }
//   }, [
//       videoUploadedResponse,
//       userId,
//       makeVideoUploadedResponseEmpty,
//       cartId,
//       state.cartId,
//       getBookingVideoAndImages,
//   ]);

//   useEffect(() => {
//     if (!objectIsEmpty(isDeletedResponse)) {
//       setVideoUploading(false);
//       setImageUploading(false);
//       const { message, code } = isDeletedResponse;
//       if (code !== 0) {
//         alert(message);
//       } else {
//         alert(message);
//         getBookingVideoAndImages(cartId ? cartId : state.cartId);
//       }
//       makeIsDeletedResponseEmpty();
//     }
//   }, [
//     cartId,
//     getBookingVideoAndImages,
//     isDeletedResponse,
//     makeIsDeletedResponseEmpty,
//     state.cartId,
//   ]);

//   useEffect(() => {
//     if (nextPageAttributes) {
//       makeServiceAttributesNextPageFalse();
//       isInClinic
//         ? saveBookingDateAndTime({
//             selectedTime,
//             selectedDate,
//             bookingId: state.bookingId,
//             cartId: state.cartId,
//             notes: textNotes,
//           })
//         : 
//         !state.productFlag ? history.push({
//         // state.productFlag ? history.push({
//             pathname: `/booking/${service}/date-time-selection`,
//             state: {
//               ...state,
//               notes: textNotes,
//               bookingId: bookingId ? bookingId : state.bookingId,
//               cartId: cartId ? cartId : state.cartId,
//             },
//           })
//           :
//           history.push({
//             pathname: `/product-list:${service}`,
//             state: {
//               ...state,
//               notes: textNotes,
//               bookingId: bookingId ? bookingId : state.bookingId,
//               cartId: cartId ? cartId : state.cartId,
//               pathName: `/booking/${service}/date-time-selection`,
//               bookingName: serviceName 
//             },
//           });
//     }
//   }, [
//     bookingId,
//     cartId,
//     isInClinic,
//     makeServiceAttributesNextPageFalse,
//     nextPageAttributes,
//     saveBookingDateAndTime,
//     selectedDate,
//     selectedTime,
//     service,
//     state,
//     textNotes,
//   ]);  
//   useEffect(() => {
//     if (isInClinic && nextPageDateTimeSelection && !state?.gated ) {
//       makeDateTimeNextPageFalse();
//       history.push({
//         pathname: `/booking/${service}/summary`,
//         state: {
//           ...state,
//         },
//       });
//     }
//   }, [
//     isInClinic,
//     makeDateTimeNextPageFalse,
//     nextPageDateTimeSelection,
//     service,
//     state,
//   ]);

//   const handleChangefieldValue = (id, value) => {
//     setFieldAnswers(getUniqueData([{ id, value }, ...fieldAnswers], "id"));
//   };

//   const handleCheckBoxError = ({ isRequired, id, error }) => {
//     isRequired === true &&
//       setErrorFields(getUniqueData([{ id, error }, ...errorFileds], "id"));
//     return error;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     return errorFileds.some((field) => field.error === true)
//       ? alert("Please fill required fields")
//       : saveServiceAttributes({
//           cartId: cartId ? cartId : state.cartId,
//           bookingId: bookingId ? bookingId : state.bookingId,
//           fieldAnswers,
//         });
//   };

//   const imageHandler = (e) => {
//     e.preventDefault();
//     setImageUploading(true);
//     if (e.target.files[0]) {
//       uploadBookingVideo({
//         cartId: cartId ? cartId : state.cartId,
//         userId,
//         src: e.target.files[0],
//         filetype: "I",
//       });
//     }
//   };

//   const videoHandler = (e) => {
//     e.preventDefault();
//     setVideoUploading(true);
//     if (e.target.files[0]) {
//       uploadBookingVideo({
//         cartId: cartId ? cartId : state.cartId,
//         userId,
//         src: e.target.files[0],
//         filetype: "V",
//       });
//     }
//   };

//   const deleteImageHandler = (e, id) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setImageUploading(true);
//     deleteImageOrVideo({ cartId: cartId ? cartId : state.cartId, id });
//   };

//   const deleteVideoHandler = (e, id) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setVideoUploading(true);
//     deleteImageOrVideo({ cartId: cartId ? cartId : state.cartId, id });
//   };

//   return (
//     <>
//       <div className="fae--service-attributes-page-container dpt dpb">
//         <div className="fae--service-attributes-page-wrapper">
//           <FAETitle
//             label={serviceName}
//             logo={getFileSrcFromPublicFolder("title_logo.svg")}
//           />
//           {loading && (
//             <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
//           )}
//           {!loading && (
//             <form
//               onSubmit={handleSubmit}
//               className="fae--service-attributes-page-attributes-form"
//             >
//               {Children.toArray(
//                 serviceAttributes.map((attribute) => {
//                   const {
//                     attributeTypeName,
//                     attributeKey,
//                     attributeID,
//                     options = [],
//                     isRequired,
//                   } = attribute;
//                   const fieldType = attributeTypeName.toLowerCase();
//                   return (
//                     <>
//                       {fieldType === "select" && (
//                         <FAESelect
//                           label={attributeKey}
//                           primary
//                           shadowBoxProps={{ primary: true }}
//                           values={faeFormDataParser(options)}
//                           required={isRequired}
//                           isRequired={isRequired}
//                           getSelectedValue={(value) =>
//                             handleChangefieldValue(attributeID, value)
//                           }
//                         />
//                       )}
//                       {fieldType === "textbox" && (
//                         <FAETextField
//                           label={attributeKey}
//                           primary
//                           shadowBoxProps={{ primary: true }}
//                           placeholder={attributeKey}
//                           required={isRequired}
//                           isRequired={isRequired}
//                           getValue={(value) =>
//                             handleChangefieldValue(attributeID, value)
//                           }
//                         />
//                       )}
//                       {fieldType === "checkbox" && (
//                         <FAECheckBoxGroup
//                           label={attributeKey}
//                           values={faeFormDataParser(options)}
//                           primary
//                           shadowBoxProps={{ primary: true }}
//                           error={(values) =>
//                             isRequired && values.length < 1
//                               ? handleCheckBoxError({
//                                   isRequired,
//                                   id: attributeID,
//                                   error: true,
//                                 })
//                               : handleCheckBoxError({
//                                   isRequired,
//                                   id: attributeID,
//                                   error: false,
//                                 })
//                           }
//                           errorMessage="Select at least 1"
//                           isRequired={isRequired}
//                           getSelectedValues={(values) =>
//                             handleChangefieldValue(
//                               attributeID,
//                               values.toString()
//                             )
//                           }
//                         />
//                       )}
//                       {fieldType === "radiobutton" && (
//                         <FAERadioGroup
//                           label={attributeKey}
//                           values={faeFormDataParser(options)}
//                           primary
//                           shadowBoxProps={{ primary: true }}
//                           isRequired={isRequired}
//                           required={isRequired}
//                           getSelectedValue={(value) =>
//                             handleChangefieldValue(attributeID, value)
//                           }
//                         />
//                       )}
//                     </>
//                   );
//                 })
//               )}
//               <FAEShadowBox>
//                 <FAETextField
//                   label="Add Text Notes"
//                   placeholder="Notes..."
//                   primary
//                   shadowBoxProps={{
//                     primary: true,
//                   }}
//                   value={textNotes}
//                   getValue={(value) => setTextNotes(value)}
//                 />
//               </FAEShadowBox>
//               <FAEShadowBox
//                 className="fae--service-attributes-page-notes-wrapper"
//                 padding
//                 primary
//                > 
//                 <div className="fae--service-attributes-page-image-or-video-notes-wrapper">
//                   <div className="fae--service-attributes-page-add-wrapper">
//                     <label htmlFor="video-upload" className="pointer">
//                       <FAEText className="fae--service-attributes-uploading-image-or-video-button">
//                         <img
//                           src={videoUploadIcon}
//                           alt="video_upload_icon"
//                           width="40px"
//                           height="40px"
//                         />
//                         Add Video Notes
//                       </FAEText>
//                     </label>
//                     <input
//                       type="file"
//                       accept="video/*"
//                       name="image-upload"
//                       id="video-upload"
//                       onChange={videoHandler}
//                       style={{ display: "none" }}
//                     />
//                   </div>
//                   <div className="fae--service-attributes-page-add-wrapper">
//                     <label htmlFor="image-upload" className="pointer">
//                       <FAEText className="fae--service-attributes-uploading-image-or-video-button">
//                         <img
//                           src={imageUploadIcon}
//                           alt="image_upload_icon"
//                           width="40px"
//                           height="40px"
//                         />
//                         Add Image Notes
//                       </FAEText>
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       name="image-upload"
//                       id="image-upload"
//                       onChange={imageHandler}
//                       style={{ display: "none" }}
//                       // multiple
//                     />
//                   </div>
//                 </div>
//               </FAEShadowBox>
//               <FAEShadowBox
//                 padding
//                 primary
//                 style={{ flexDirection: "column", gap: "10px" }}
//               >
//                 <div className="fae--service-attributes-uploaded-images-or-videos-wrapper line-break">
//                   <FAEText subHeading>Videos</FAEText>
//                   <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
//                     {!videoUploading ? (
//                       uploadedVideos.map(({ filePath, id }) => (
//                         <div className="fae--service-attributes-custom-image-or-video-wrapper-main-container">
//                           <a
//                             className="fae--service-attributes-custom-image-or-video-wrapper"
//                             target="_blank"
//                             href={filePath}
//                             rel="noreferrer"
//                           >
//                             <div className="fae--service-card-image-container">
//                               <video
//                                 src={filePath}
//                                 alt={filePath}
//                                 width="100%"
//                                 height="100%"
//                                 type="video/mp4"
//                                 key={id}
//                               />
//                             </div>
//                           </a>
//                           <div
//                             onClick={(e) => {
//                               deleteVideoHandler(e, id);
//                              }}
//                             className="fae--addresses-delete-icon-wrapper pointer"  >
//                             <div className="fae--addresses-delete-stroke"></div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <FAELoading
//                         loaderImage={loaderImage}
//                         height="200px"
//                         type="svg"
//                       />
//                     )}
//                   </div>
//                 </div>
//                 <div className="fae--service-attributes-uploaded-images-or-videos-wrapper">
//                   <FAEText subHeading>Images</FAEText>
//                   <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
//                     {!imageUploading ? (
//                       uploadedImages.map(({ id, filePath }) => (
//                         <div className="fae--service-attributes-custom-image-or-video-wrapper-main-container">
//                           <a
//                             className="fae--service-attributes-custom-image-or-video-wrapper"
//                             target="_blank"
//                             href={filePath}
//                             rel="noreferrer"
//                           >
//                             <FAEImage
//                               placeholder={placeholder}
//                               src={filePath}
//                               alt={filePath}
//                               key={id}
//                               width="100%"
//                               height="100%"
//                             />
//                           </a>
//                           <div
//                             onClick={(e) => {
//                               deleteImageHandler(e, id);
//                             }}
//                             className="fae--addresses-delete-icon-wrapper pointer"  >
//                             <div className="fae--addresses-delete-stroke"></div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <FAELoading
//                         loaderImage={loaderImage}
//                         height="200px"
//                         type="svg"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </FAEShadowBox>
//               <FAEButton
//                 type="submit"
//                 className="fae--service-attributes-button" >
//                 Next
//               </FAEButton>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// const mapStateToProps = ({
//   serviceAttributesPageReducer: {
//     error,
//     loading,
//     serviceAttributes,
//     nextPageAttributes,
//     videoUploadedResponse,
//     uploadedImages,
//     uploadedVideos,
//     isDeletedResponse,
//   },
//   addressSelectionPageReducer: { bookingId, cartId },
//   dateTimeSelectionPageReducer: { nextPageDateTimeSelection },
// }) => ({
//   error,
//   loading,
//   serviceAttributes,
//   nextPageAttributes,
//   videoUploadedResponse,
//   bookingId,
//   cartId,
//   uploadedImages,
//   uploadedVideos,
//   isDeletedResponse,
//   nextPageDateTimeSelection,
// });

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(
//     {
//       getServiceAttributesData,
//       makeServiceAttributesNextPageFalse,
//       saveServiceAttributes,
//       uploadBookingVideo,
//       saveAddress,
//       makeVideoUploadedResponseEmpty,
//       makeNextPageFalse,
//       getBookingVideoAndImages,
//       deleteImageOrVideo,
//       makeIsDeletedResponseEmpty,
//       makeDateTimeNextPageFalse,
//       saveBookingDateAndTime,
//     },
//     dispatch
//   );
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ServiceAttributesPage);
