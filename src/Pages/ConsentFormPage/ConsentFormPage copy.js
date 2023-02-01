 
import React, {useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux"; 
import {
  FAEText, 
  FAEButton,
  FAELoading, 
  FAEShadowBox,
  FAEImage,FAETextField,  FAERadioGroup , FAETitle, FAECheckBoxGroup,   FAESelect
} from "@findanexpert-fae/components";
import { faeFormDataParser  } from "../../parsers"; 
import jsonToFormData from "json-form-data";
// other library
import SignaturePad from 'react-signature-canvas'
//scss
import "./ConsentFormPage.scss"; 
import { consetFormGetQuestions, consetFormPostQuestions, GetServiceQuestionsAction, SaveServiceQuestionsAnswersAction, UploadServiceConsentSignatureAction } from "../../redux/actions/ConsentFormPageActions";
import { eighteenYearsBackDate, getCookies, getFileSrcFromPublicFolder, getUniqueData, NoResult, dataURLtoFile} from "../../utils";
import { deleteImageOrVideo,  uploadBookingVideo } from "../../redux/actions/serviceAttributesPageActions";
import { useLocation } from "react-router-dom";
import { getProductVideoAndImages } from "../../redux/actions/productActions";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import history from "../../history";
import { FAEDatePicker } from "@findanexpert-fae/components/dist/stories/FAEDatePicker/FAEDatePicker";
  const ConsentFormPage = ({
    consetFormGetQuestions,
    loading,
    questions=[],
    uploadBookingVideo,
    getProductVideoAndImages,
    productVideoAndImage=[],
    deleteImageOrVideo,
    consetFormPostQuestions,

    GetServiceQuestionsAction,
    SaveServiceQuestionsAnswersAction,
    UploadServiceConsentSignatureAction,
    getQuestions=[],
    saveAnswersResponse="",
    saveSignatureImageRespon="",
  })=>{
    const loaderImage = getFileSrcFromPublicFolder("loader.GIF"); 
    const [errorFileds, setErrorFields] = useState([]);
    const [imageUploading, setImageUploading] = useState(false);
    const [showImgInp, setShowImgInp]= useState('No')  
    const [fieldAnswers, setFieldAnswers] = useState([]);
    const [open, setOpen] = useState(false); 
    const [ optionListState, setOptionList]=useState([])
    // get questions 
    useEffect(()=>{
      GetServiceQuestionsAction(serviceTypeId, bookingId, preState?.state?.sessionId) 
    },[])
  // signature  
    const [stateTrimmedDataURL ,setTrimmedDataURL]=useState({trimmedDataURL:null})
    let sigPad = useRef({})
    const preState= useLocation() 

    useEffect( async ()=>{
      if(cartid=="" || cartid==undefined || cartid==null){
          await history.push({ 
            pathname: `/your-bookings/upcoming`, 
          })
        } 
         setImageUploading(false);
       // await consetFormGetQuestions(preState?.state?.saveState?.serviceTypeId)
        await  getProductVideoAndImages(cartid ?  cartid : "");
    }, [imageUploading])
   
 
    const { bookingId, serviceTypeId}=preState.state.saveState 
    const cartid = preState?.state?.productcartId  
    const {dob, firstName, gender, lastName, message, questionList, signatureUrl }=getQuestions
    const doPadding= questions?.length<4 ?(questions.length==1 ?{paddingBottom: 354}:{paddingBottom: 350}): {paddingBottom: 40}
  
    
   const handleChangefieldValue= (id,value ,radioOption, optionList)=>{ 
      if(radioOption==true) {
        setShowImgInp(value);
        setOptionList(optionList) 
      }
        setFieldAnswers(getUniqueData([{ questionId:id, answer:value }, ...fieldAnswers], "id"));  
    } 

    const  handleSubmit= async(e)=>{
      await e.preventDefault()    
      //await consetFormPostQuestions(cartid,fieldAnswers, bookingId, preState?.state?.sessionId) 
      await SaveServiceQuestionsAnswersAction({
        cartId:    cartid,
        bookingId: bookingId,
        sessionId: preState?.state?.sessionId,
        userId:    getCookies("userId"),
        signatureImageUrl: stateTrimmedDataURL.trimmedDataURL,
        answers: fieldAnswers,
        consentDate: `${new Date().getFullYear()}-${
                      `${new Date().getMonth() + 1}`.length === 1
                        ? `0${new Date().getMonth() + 1}`
                        : new Date().getMonth() + 1
                    }-${
                      `${new Date().getDate()}`.length === 1
                        ? `0${new Date().getDate()}`
                        : new Date().getDate()
                    }`,
        consentTime: `${
                      `${new Date().getHours()}`.length === 1
                        ? `0${new Date().getHours()}`
                        : new Date().getHours()
                    }:${
                      `${new Date().getMinutes()}`.length === 1
                        ? `0${new Date().getMinutes()}`
                        : new Date().getMinutes()
                    }:${
                      `${new Date().getSeconds()}`.length === 1
                        ? `0${new Date().getSeconds()}`
                        : new Date().getSeconds()
                    }`,
      })  
      // await history.push({ 
      //     pathname: `${preState?.state?.path}`,
      //     state: preState?.state?.saveState,
      // })
    }

   const handleCheckBoxError = ({ isRequired, id, error }) => {
     isRequired === true &&
      setErrorFields(getUniqueData([{ id, error }, ...errorFileds], "id"));
       return error;
    }; 
    // delete images and video 
   const deleteImageHandler = (e, id) => {
      e.stopPropagation();
      e.preventDefault();
      setImageUploading(true);
      deleteImageOrVideo({ 
        cartId: cartid ? cartid : "",
          id 
        }) ;
    };
    // upload images and video 
   const imageHandler = (e) => { 
      e.preventDefault();
      setImageUploading(true); 
      if (e.target.files[0]) { 
         uploadBookingVideo({ 
            cartId: cartid ? cartid : "",
          // userId,
            src: e.target.files[0],
            filetype: "I",
          });  
      }
    alert('uploaded');
  };   
   
  const  userCookiesData = getCookies("customer_details"); 
  const genderList=[
    {
        "id": 1,
        "value": "Male",
        "isActive": false,
        "isDeleted": false,
        "signupList": []
    },
    {
        "id": 2,
        "value": "Female",
        "isActive": false,
        "isDeleted": false,
        "signupList": []
    }
]
  
 const trim = async(e) => {
      e.preventDefault()  
    // await setTrimmedDataURL({trimmedDataURL: sigPad.getTrimmedCanvas().toDataURL('image/png', '1.5')})
     var file = dataURLtoFile(sigPad.getTrimmedCanvas().toDataURL('image/png', '1.5'));
     const formData = {
      SaveConsentFile: file,
    }; 
   await UploadServiceConsentSignatureAction(jsonToFormData(formData))
    
    //   SaveSignatureConsent(file, (res) => {
    //     const { code, message, path } = res;
    //     if (code === 0) { 
    //       setTrimmedDataURL({trimmedDataURL: path});
    //          setOpen(false) 
    //     } else {
    //         setOpen(false) 
    //         alert(message);
    //     }
    //  }); 
  }   
 
useEffect(async()=>{
  const {code, path} =saveSignatureImageRespon
   await setTrimmedDataURL({trimmedDataURL: path});
   await setOpen(false) 
}, [saveSignatureImageRespon.path])
 
//   const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
//  const SaveSignatureConsent = (file, response) => {
//     const formData = {
//       SaveConsentFile: file,
//     }; 
//     let url = APP_BASE_URL + "/Question/UploadServiceConsentSignature"; 
//     const requestOptions = {
//       method: "POST",
//       body: jsonToFormData(formData),
//     };
//     fetch(url, requestOptions)
//       .then((res) => res.json())
//       .then((res) => response(res))
//       .catch((err) => alert(err));
//     };   
   return (
     <> 
       <div className="fae--cart-page-container  dpt dpb" style={doPadding}>
          <form
              onSubmit={handleSubmit}
              className="fae--consent-form">
               <div className="fae--cart-page-wrapper"> 
                  {loading  &&   <FAELoading type="svg" loaderImage={loaderImage} height="200px" /> } 
                  { <div className="fae-noresult-container"> { NoResult(loading, questionList, "No data found")}</div>}
                        {!loading  && 
                                  <div
                                      style={{ alignItems: "center" }}
                                      primary
                                      className="fae-user-data"
                                     >  
                                      <div id={"fae-profile-data"} className='fae-question-field'> 
                                        <FAEText className="fae-consent-lable">First name</FAEText>
                                        <FAETextField  
                                              className=""
                                              primary
                                              value={firstName !=="" ?firstName :userCookiesData?.firstName}
                                              shadowBoxProps={{ primary: true }}
                                              inputProps={{
                                                readOnly: true,
                                              }} 
                                            />  
                                        </div>
                                     <div id={"fae-profile-data"} className='fae-question-field'>
                                     <FAEText className="fae-consent-lable">Last name</FAEText>
                                        <FAETextField 
                                            primary
                                            inputProps={{
                                              readOnly: true,
                                            }}
                                            value={lastName !=="" ?lastName :userCookiesData?.lastName}
                                            shadowBoxProps={{ primary: true }} 
                                            // getValue={(value) =>
                                            //   handleChangefieldValue(111, value)
                                            // }
                                        /> 
                                     </div> 
                                    <div id={"fae-profile-data"} className='fae-consent-dob-field fae-question-field'>
                                      <FAEText className="fae-consent-lable">DOB</FAEText>
                                      <FAEDatePicker  
                                            primary
                                            shadowBoxProps={{
                                              className: "fae--edit-profile-page-field",
                                            }} 
                                            required
                                            dateFormat={(date) =>
                                              `${date.year}-${
                                                `${date.month}`.length === 2
                                                  ? date.month
                                                  : `0${date.month}`
                                              }-${
                                                `${date.day}`.length === 2
                                                  ? date.day
                                                  : `0${date.day}`
                                              }`
                                            }
                                            value={
                                              dob !== ""&& {
                                                year: parseInt(dob?.split("-")[0]),
                                                day: parseInt(dob?.split("-")[2]),
                                                month: parseInt(dob?.split("-")[1]),
                                              }
                                              // :
                                              // {
                                              //   year: parseInt(userCookiesData.dob?.split("-")[0]),
                                              //   day: parseInt(userCookiesData.dob?.split("-")[2]),
                                              //   month: parseInt(userCookiesData.dob?.split("-")[1]),
                                              // } 
                                            }  
                                            maximumDate={eighteenYearsBackDate()}
                                        /> 
                                        </div>
                                        <div id={"fae-gender-field"} className='fae-question-field'>
                                          <FAEText className="fae-consent-lable">Gender</FAEText>
                                          <FAERadioGroup
                                              className="fae-gender-field" 
                                              value={gender !=="" ?gender :userCookiesData?.gender}
                                              values={faeFormDataParser(genderList && genderList !==null && genderList.length !==0? genderList:[])}
                                              primary
                                              props={{
                                                readOnly: true,
                                              }}
                                              shadowBoxProps={{ primary: true }} 
                                           />
                                         </div>
                                   </div>    
                                 }
                                <div className="fae-http-data-section">
                                    {!loading    && questionList?.length !==0 && questionList !==null ? questionList?.map((questiondata, index)=>{
                                      const { countryID , hasOptions, hasSubQsuestions, id, isRequired,  optionId, optionList, options, question, regex, type, typeId, subQuestionList }=questiondata
                                     
                                      const fieldType = type.toLowerCase();  
                                      return (
                                          <div id={index} className='fae-question-field'>  
                                            {type == 'TEXT' &&  
                                              <FAETextField
                                                      label={question}
                                                      primary
                                                      shadowBoxProps={{ primary: true }}
                                                      values={""}
                                                      placeholder={question}
                                                      required={isRequired}
                                                      isRequired={isRequired}
                                                      getValue={(value) =>
                                                        handleChangefieldValue(id, value, hasOptions)
                                                      }
                                                  /> 
                                              }
                                              {type == 'LABEL' &&
                                                <FAEShadowBox
                                                  style={{ alignItems: "center" }}
                                                  primary
                                                  className="fae--consent-label"
                                                >
                                                  <FAEText paragraph> {question} </FAEText>
                                                </FAEShadowBox> 
                                              }
                                              { type == 'RADIO' &&  
                                              <FAERadioGroup
                                                  label={question}
                                                  values={faeFormDataParser(optionList && optionList !==null && optionList.length !==0? optionList:[])}
                                                  primary
                                                  shadowBoxProps={{ primary: true }}
                                                  isRequired={isRequired}
                                                  required={isRequired}
                                                  getSelectedValue={(value) =>
                                                    handleChangefieldValue(id, value, hasOptions, (optionList && optionList !==null && optionList.length !==0)? optionList:[])
                                                  }
                                                /> 
                                            } 
                                            { type == 'SELECT' &&  
                                              <FAESelect
                                                  key={index}
                                                  label={question}
                                                  primary
                                                  shadowBoxProps={{ primary: true }}
                                                  values={faeFormDataParser(options)}
                                                  required={isRequired}
                                                  isRequired={isRequired}
                                                  getSelectedVialue={(value) =>
                                                      handleChangefieldValue(id, value, hasOptions)
                                                  } 
                                              /> 
                                            }
                                          
                                            { type =="CHECKBOX" &&
                                                <FAECheckBoxGroup
                                                    label={question}
                                                    values={faeFormDataParser(optionList)}
                                                    primary
                                                    shadowBoxProps={{ primary: true }}
                                                    error={(values) =>
                                                      isRequired && values.length < 1
                                                        ? handleCheckBoxError({
                                                            isRequired,
                                                            id: id,
                                                            error: true,
                                                          })
                                                        : handleCheckBoxError({
                                                            isRequired,
                                                            id: id,
                                                            error: false,
                                                          })
                                                      }
                                                    errorMessage="Select at least 1"
                                                    isRequired={isRequired}
                                                    getSelectedValues={(values) => handleChangefieldValue( id, values.toString()  ,hasOptions ) }
                                                  />
                                              } 
                                          </div>  
                                        )
                                      }):""
                                      } 
                                      
                                     {showImgInp =='yes' ?
                                        optionListState?.subQuestionList?.map((optionsData)=>{
                                          const { id, isRequired, optionList, hasOptions ,question,type  }=optionsData
                                         
                                          return( 
                                          <>
                                           {type== "DOC" && (
                                              <div className="fae-consent-se">
                                                  <div className="fae--service-attributes-page-add-wrapper">
                                                        <label htmlFor="image-upload" className="pointer">
                                                          <FAEText  className='fae-consent-add-video'>
                                                            <FAEText subHeading >Add Image</FAEText>
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
                                                 <div  className="fae--consent-img-container"> 
                                                     {!imageUploading && productVideoAndImage.images ? (
                                                       productVideoAndImage.images?.map(({ id, filePath }, index) => (
                                                        <div>
                                                          <a id={index} className=" "
                                                                target="_blank"
                                                                href={filePath}
                                                                rel="noreferrer" >
                                                                <FAEImage
                                                                  placeholder={'placeholder'}
                                                                  src={filePath}
                                                                  alt={filePath}
                                                                  key={id}
                                                                  width="100%"
                                                                  height="100%"
                                                                />
                                                              </a>
                                                          <div
                                                            onClick={(e) => {
                                                              deleteImageHandler(e, id);
                                                            }}
                                                            className="fae--addresses-delete-icon-wrapper pointer" >
                                                              <div className="fae--addresses-delete-stroke"><span>x</span></div>
                                                          </div>
                                                        </div>
                                                    ))
                                              ) : (
                                                  <FAELoading
                                                    loaderImage={loaderImage}
                                                    height="200px"
                                                    type="svg" />
                                               )  }  
                                          </div>
                                          </div>)}
                                        
                                          {type=="RADIO" && 
                                          <FAERadioGroup
                                              label={question}
                                              values={faeFormDataParser(optionList && optionList !==null && optionList.length !==0? optionList:[])}
                                              primary
                                              shadowBoxProps={{ primary: true }}
                                              isRequired={isRequired}
                                              required={isRequired}
                                              getSelectedValue={(value) =>
                                                handleChangefieldValue(id, value, hasOptions, optionList && optionList !==null && optionList.length !==0? optionList:[])
                                              }
                                        /> }
                                   </>
                                  )
                                  })
                                  : ""
                                 }
                                {/* signature section  */}
                                {!loading &&
                                      <div className="fae-signature-container">
                                        <div className="fae-signature-sigContainer ">
                                          {stateTrimmedDataURL.trimmedDataURL
                                            ? <> 
                                                <img className="fae-signature-sigImage"
                                                  src={stateTrimmedDataURL.trimmedDataURL} />
                                                  {/* <button className="fae-signature-remove" onClick={()=> setTrimmedDataURL({trimmedDataURL: null})}>
                                                    <img src={getFileSrcFromPublicFolder("close.svg")} />
                                                  </button> */}
                                              </>
                                            : <div className="fae-tap-sign-container ">
                                                <button onClick={()=>setOpen(true)}>Tap here to sign</button>
                                             </div>}
                                              <Popup open={open} id="fae-consent-popup"  position="top left">
                                                    {close => (
                                                      <div >
                                                        <FAEText className="fae-draw-sign-text">Draw signature with your finger or mouse</FAEText>
                                                        <SignaturePad canvasProps={{className:  "fae-signature-sigPad"}}
                                                            ref={(re)=>{sigPad=re}}
                                                          />
                                                          <div className="fae-sig-btns"> 
                                                            <button className="fae-signature-buttons" onClick={()=>setOpen(false)}>
                                                                <img src={getFileSrcFromPublicFolder("close.svg")} />
                                                            </button>
                                                            <button className="fae-signature-buttons" onClick={()=>sigPad.clear()}>
                                                                <img src={getFileSrcFromPublicFolder("refresh.svg")} />
                                                            </button>
                                                            <button className="fae-signature-buttons" onClick={trim}>
                                                                <img src={getFileSrcFromPublicFolder("done.svg")} />
                                                            </button>
                                                          </div>
                                                      </div>
                                                    )}
                                              </Popup> 
                                        </div> 
                                      </div>
                                      }
                                </div>  
                            </div>
                   {!loading && questionList?.length !==0 && (<FAEButton  type="submit" className="add-consent-btn"  >Save</FAEButton>)}
             </form>
        </div>
     </>
   )
}; 


const mapStateToProps = ({
  consentPageReducer: {
    loading,
    questions,
    getQuestions,
    saveAnswersResponse, 
  }, 
  productsReducer:{
    productVideoAndImage
  },
  consentPageImageReducer:{
    saveSignatureImageRespon
  }  
}) => ({ 
  loading,
  questions, 
  productVideoAndImage,
  getQuestions,
  saveAnswersResponse,
  saveSignatureImageRespon,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      consetFormGetQuestions, 
      uploadBookingVideo,
      getProductVideoAndImages,
      deleteImageOrVideo,
      consetFormPostQuestions, 
      GetServiceQuestionsAction,
      SaveServiceQuestionsAnswersAction,
      UploadServiceConsentSignatureAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsentFormPage);
