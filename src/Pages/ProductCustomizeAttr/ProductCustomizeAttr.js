import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'; 
import 'react-toastify/dist/ReactToastify.css';
import './ProductCustomizeAttr.scss'
// expert components 
import {FAEButton , FAETextField, FAEText, FAERadioGroup , FAETitle, FAECheckBoxGroup,  FAELoading, FAESelect } from '@findanexpert-fae/components'
import { ProductAttribute, getProductVideoAndImages, AtrributProductToCart, addToCart } from '../../redux/actions/productActions'
import { faeFormDataParser  } from "../../parsers";
import { getFileSrcFromPublicFolder, getUniqueData} from "../../utils";
import { deleteImageOrVideo, uploadBookingVideo } from '../../redux/actions/serviceAttributesPageActions';
import { FAEImage } from '@findanexpert-fae/components/dist/stories/FAEImage/FAEImage'; 
import history from '../../history';
import FAEPopup from '../../Temps/FAEPopup/FAEPopup';

function ProductCustomizeAttr(props) {
  const loaderImage = getFileSrcFromPublicFolder("loader.GIF"); 
  const preState= props.location.state  

  const [fieldAnswers, setFieldAnswers] = useState([]);
  const [errorFileds, setErrorFields] = useState([]);
  const [videoUploading, setVideoUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const reduxStore= useSelector(state=>state)
  const [openPopUpValue, setOpenPopups]=useState(false)
  const attributsRedux= reduxStore.productsReducer 
  const dispatch= useDispatch() 
  //  new code  
  const getCartId =preState?.productcartId
  !getCartId  &&  history.push('/')
  useEffect( async ()=>{
    setVideoUploading(false);
    setImageUploading(false);
    await dispatch(ProductAttribute(preState?.productid?preState.productid:0))
    await  dispatch(getProductVideoAndImages(
      preState?.productcartId ?  preState?.productcartId : ""
      ));
  }, [videoUploading, imageUploading])

   const handleCheckBoxError = ({ isRequired, id, error }) => {
     isRequired === true &&
      setErrorFields(getUniqueData([{ id, error }, ...errorFileds], "id"));
     return error;
   };
  const handleChangefieldValue = (id, value) => {
    setFieldAnswers(getUniqueData([{ id, value }, ...fieldAnswers], "id"));
  };

  const deleteVideoHandler = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setVideoUploading(true);
      dispatch(deleteImageOrVideo(
        { cartId: preState?.productcartId ? preState?.productcartId : "", id }
      ));
  };
 
  const videoHandler = (e) => {
    e.preventDefault();
    setVideoUploading(true);
    if (e.target.files[0]) {
    dispatch(uploadBookingVideo({ 
        cartId: preState?.productcartId ? preState?.productcartId : "",
      // userId,
        src: e.target.files[0],
        filetype: "V",
      })); 
    }
    alert('uploaded');
  };
  const imageHandler = (e) => {
    e.preventDefault();
    setImageUploading(true);
    if (e.target.files[0]) {
      dispatch(uploadBookingVideo({ 
        cartId: getCartId,
      //  userId,
        src: e.target.files[0],
        filetype: "I",
      }));
    }
    alert('uploaded');
  };
  const deleteImageHandler = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setImageUploading(true);
    dispatch(deleteImageOrVideo({ 
        cartId: preState?.productcartId ? preState?.productcartId : "",
        id 
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(errorFileds.some((field) => field.error === true)){
         return toast.error(`Please fill required fields`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })}else {
               await  dispatch(AtrributProductToCart(0,preState?.productcartId, preState?.productid, preState?.productQuantiry, preState?.bookingId, fieldAnswers))
               await  dispatch(addToCart(preState?.productid, preState?.productcartId, preState?.productQuantiry, false))
               await  history.push({pathname:`/product-list:${preState?.location}`, state:{cartId:preState?.productcartId}})
            }
      };
      const uploadedVideos=attributsRedux?.productVideoAndImage?.video
      const uploadedImages= attributsRedux?.productVideoAndImage?.images 
      
     useEffect(()=>{
      setOpenPopups(false) 
     }, [openPopUpValue])
      const clickHandlePopu= async(e, id)=>{
        await deleteImageHandler(e, id) 
        await setOpenPopups(true)  
        
      }
    return (
        <>
          <div className="fae--cart-page-container  dpt dpb">
            <form
              onSubmit={handleSubmit}
              className="fae--service-attributes-page-attributes-form" >
            <div className="fae--cart-page-wrapper"> 
                { reduxStore?.productsReducer?.loading && (
                <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
                )}   
               {!reduxStore?.productsReducer?.loading &&
                 <>
                    <FAETitle
                      label={`${attributsRedux?.attributTypeProduct?.productName}`}
                      logo={getFileSrcFromPublicFolder("title_logo.svg")}
                      />
                    {attributsRedux?.attributTypeProduct?.attributesList?.map((AttributeItem, index)=>{
                      const {
                        attributeTypeName,
                        attributeKey,
                        attributeID,
                        options = [],
                        isRequired,
                      } = AttributeItem;
                    const  optionsValue=  options==null?[]:options
                   
                      return (
                        <>
                        {AttributeItem?.attributeTypeName === "select" && (
                         <> 
                            <FAESelect
                              key={index}
                              label={attributeKey}
                              primary
                              shadowBoxProps={{ primary: true }}
                              values={faeFormDataParser(optionsValue)}
                              required={isRequired}
                              isRequired={isRequired}
                              getSelectedValue={(value) =>
                                handleChangefieldValue(attributeID, value)
                              } 
                             />
                            </>
                          )}
                         {AttributeItem?.attributeTypeName=="CheckBox" &&
                             (
                              <FAECheckBoxGroup
                                label={attributeKey}
                                values={faeFormDataParser(optionsValue)}
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
                          {AttributeItem?.attributeTypeName=="RadioButton" &&
                             (
                               <FAERadioGroup
                                  label={attributeKey}
                                  values={faeFormDataParser(optionsValue)}
                                  primary
                                  shadowBoxProps={{ primary: true }}
                                  isRequired={isRequired}
                                  required={isRequired}
                                  getSelectedValue={(value) =>
                                    handleChangefieldValue(attributeID, value)
                                  }
                               />
                              )}
                        {AttributeItem?.attributeTypeName=="TextBox"  &&
                           (
                             <>
                              <FAETitle  label="Notes"
                                logo={getFileSrcFromPublicFolder("title_logo.svg")} />
                               <FAEText paragraph tertiary className='fae-notes-text'>Please Enter Text Notes</FAEText>
                               <FAEText paragraph className='fae-add-text-label'> Add Text Notes </FAEText>
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
                             </>
                            )
                          } 
                       </>
                      )
                    })}
                    {/* notes section  */}
                    <div className='fae-notes-from'> 
                    {/* service attributr media copied */}
                     <div  className="fae--service-attributes-page-notes-wrapper">
                        <FAETitle  label="Vidoe or Image Notes"
                                logo={getFileSrcFromPublicFolder("title_logo.svg")} />
                               <FAEText paragraph tertiary className='fae-notes-text'>Please Upload Image or Video Notes</FAEText>
                           <div className="fae--service-attributes-page-image-or-video-notes-wrapper">
                              <div className="fae--service-attributes-page-add-wrapper">
                                 <label htmlFor="video-upload" className="pointer">
                                    <FAEText  className='fae-add-video'>
                                      <AddIcon/><FAEText paragraph >Add Video Notes</FAEText>
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
                              <FAEText  className='fae-add-video'>
                                <AddIcon/><FAEText paragraph >Add Image Notes</FAEText>
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
                      </div>
                      <div className='fae-space'
                        style={{ flexDirection: "column", gap: "10px" }}  >
                        <div className="fae--service-attributes-uploaded-images-or-videos-wrapper line-break">
                          <FAEText >Videos</FAEText>
                          <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
                            {!videoUploading && uploadedVideos ? (
                              uploadedVideos.map(({ filePath, id }, index) => (
                                <div id={index} className="fae--service-attributes-custom-image-or-video-wrapper-main-container">
                                  <a  className="fae--service-attributes-custom-image-or-video-wrapper"
                                      target="_blank"
                                      href={filePath}
                                      rel="noreferrer"  >
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
                                      deleteVideoHandler(e, id);
                                    }}
                                    className="fae--addresses-delete-icon-wrapper pointer"  >
                                    <div className="fae--addresses-delete-stroke"></div>
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
                          <FAEText>Images</FAEText>
                          <div className="fae--services-attributes-page-already-uploaded-images-and-videos">
                            {!imageUploading && uploadedImages ? (
                              uploadedImages?.map(({ id, filePath }, index) => (
                                <div id ={index} className="fae--service-attributes-custom-image-or-video-wrapper-main-container">
                                 <a  className="fae--service-attributes-custom-image-or-video-wrapper"
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
                                   <FAEPopup openPopUp={openPopUpValue} popupYesBtnFun={(e)=>clickHandlePopu(e, id)}  message={"Are you sure you want to delet this image."}>
                                      <div 
                                          className="fae--addresses-delete-icon-wrapper pointer" >
                                       <div className="fae--addresses-delete-stroke"></div>
                                    </div>
                                  </FAEPopup> 
                              </div>
                              ))
                            ) : (
                              <FAELoading
                                loaderImage={loaderImage}
                                height="200px"
                                type="svg" />
                            )}
                          </div>
                        </div>
                      </div>
                   <FAEButton  type="submit" className="add-customized-pr-btn"  >Add to Cart</FAEButton>  
                 </div> 
               <ToastContainer/>
             </>}
          </div>
          </form>
       </div>
     </>
   )
}

export default ProductCustomizeAttr
