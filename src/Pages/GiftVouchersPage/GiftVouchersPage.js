//libs 
import { FAEButton,FAEText} from "@findanexpert-fae/components";
  
import React, { Children, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import history from "../../history";
import Popup from 'reactjs-popup';
//src
import {
  getGiftVouchers,
  makeGiftVoucherResponseToEmpty,
  sendGiftVoucher,
} from "../../redux/actions/giftVouchersPageActions"; 
import FAEVoucherCard from "../../Temps/FAEVoucherCard/FAEVoucherCard";
import { getFileSrcFromPublicFolder, getUniqueData, validateInput } from "../../utils";
//scss
import "./GiftVouchersPage.scss";
import { FAETextField } from "@findanexpert-fae/components/dist/stories/FAETextField/FAETextField";
import { FAEAddressCard } from "@findanexpert-fae/components/dist/stories/FAEAddressCard/FAEAddressCard";
//image
const VoucherServiceCard2 = getFileSrcFromPublicFolder("VoucherServiceCard2.png");
const clickHandle=()=>{
  history.push("/your-vouchers/gift-voucher-detail")
}

const GiftVouchersPage = ({
  getGiftVouchers,
  giftVouchers=[]
}) => { 
  const [open, setOpen] = useState(false);
  const[secPopupOpen, setsecPopupOpen]=useState(false)
  const [state, setState]= useState()
  const [errorFileds, setErrorFields] = useState([]);
  const [fieldAnswers, setFieldAnswers] = useState([]); 
  const [typeVoucher, setTypeVoucher] = useState()
  const submitAddVoucher =()=>{
     alert("dos")
  }
  useEffect(()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("https://paymentapi-dev.findanexpert.net/api/Voucher/GetVoucherByUserId?id=4902", requestOptions)
      .then(response => response.text())
      .then(result => setState(result))
      .catch(error => console.log('error', error));
  }, [])
  const VoucherGiftBg= getFileSrcFromPublicFolder("gift-voucher-bg.png");

  const handleChangefieldValue = ({ value, regex, id, fieldType, label }) => {
    setTypeVoucher(value.replaceAll("-", "").trim());  
    value !== "" &&
     setErrorFields(
       getUniqueData(
         [
           { fieldId: id, error: !validateInput(regex, value) },
           ...errorFileds,
         ],
         "fieldId"
       )
     );
 };

 const field= { 
  errorMessage: "invalid email",
  field: "Email"  ,
  inputField: "",
  isEmailVerified: false,
  isEnabled: true,
  isRequired: true, 
  label: "Email",
  maxLength: 200,
  minLength: 5,
  priority: 44,
  regex: "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]", 
  type: "EMAIL" 
} 
const { type, regex, isRequired, errorMessage, label, id,  } = field; 
const fieldType = type.toLowerCase();
  return (
    <>
      <div className="fae--gift-vouchers-page-main-container">
          <div className="fae-serviceVouchersPageTopbtn">
            {/* <FAEButton className="fae-add-voucher" 
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true); 
              }}
            >Add New Voucher </FAEButton> */}
         <Popup open={open} id="fae-add-voucher-popup"  position="top left">
            {close => (
              <div className="fae-add-voucher-container" >
                <FAEText className="fae-voucher-popup-title">Create Voucher</FAEText>
                   <FAEText className="fae-voucher-popup-fields">Title</FAEText>
                     <FAETextField
                          autoComplete="new-password"
                          className="fae-signin-input"
                          placeholder={"label"}
                          primary
                          required={true}
                          type={"text"}
                          error={(value) =>  value !== "" && !validateInput("regex", value) }
                          errorMessage={"errorMessage"}
                          getValue={(value) =>
                            handleChangefieldValue({
                              value,
                              regex,
                              id,
                              fieldType,
                              label,
                            })
                          }
                          shadowBoxProps={{
                            primary: true,
                          }}
                        />
                       <div className="fae-voucher-poup-row">
                            <div className="fae-voucher-popup-grid-col">
                                <FAEText className="fae-voucher-popup-fields">Select Voucher</FAEText>
                                <FAETextField
                                    autoComplete="new-password"
                                    className="fae-signin-input"
                                    placeholder={"label"}
                                    primary
                                    required={true}
                                    type={"text"}
                                    error={(value) =>  value !== "" && !validateInput("regex", value) }
                                    errorMessage={"errorMessage"}
                                    getValue={(value) =>
                                      handleChangefieldValue({
                                        value,
                                        regex,
                                        id,
                                        fieldType,
                                        label,
                                      })
                                    }
                                    shadowBoxProps={{
                                      primary: true,
                                    }}
                                  />
                            </div>
                            <div className="fae-voucher-popup-grid-col">
                                <FAEText className="fae-voucher-popup-fields">Expire date</FAEText>
                                <FAETextField
                                    autoComplete="new-password"
                                    className="fae-signin-input"
                                    placeholder={"label"}
                                    primary
                                    required={true}
                                    type={"text"}
                                    error={(value) =>  value !== "" && !validateInput("regex", value) }
                                    errorMessage={"errorMessage"}
                                    getValue={(value) =>
                                      handleChangefieldValue({
                                        value,
                                        regex,
                                        id,
                                        fieldType,
                                        label,
                                      })
                                    }
                                    shadowBoxProps={{
                                      primary: true,
                                    }}
                                  />
                            </div>
                        </div>
                        <FAEText className="fae-voucher-popup-assign">Assign with</FAEText>
                        <div className="fae-voucher-poup-row fae-voucher-space"> 
                            <div className="fae-voucher-popup-grid-col ">  
                                <FAEText className="fae-voucher-popup-fields">Name</FAEText>
                                <FAETextField
                                    autoComplete="new-password"
                                    className="fae-signin-input"
                                    placeholder={"label"}
                                    primary
                                    required={true}
                                    type={"text"}
                                    error={(value) =>  value !== "" && !validateInput("regex", value) }
                                    errorMessage={"errorMessage"}
                                    getValue={(value) =>
                                      handleChangefieldValue({
                                        value,
                                        regex,
                                        id,
                                        fieldType,
                                        label,
                                      })
                                    }
                                    shadowBoxProps={{
                                      primary: true,
                                    }}
                                  />
                            </div>
                            <div className="fae-voucher-popup-grid-col">
                                <FAEText className="fae-voucher-popup-fields">Email ID</FAEText>
                                <FAETextField
                                    autoComplete="new-password"
                                    className="fae-signin-input"
                                    placeholder={"label"}
                                    primary
                                    required={true}
                                    type={"text"}
                                    error={(value) =>  value !== "" && !validateInput("regex", value) }
                                    errorMessage={"errorMessage"}
                                    getValue={(value) =>
                                      handleChangefieldValue({
                                        value,
                                        regex,
                                        id,
                                        fieldType,
                                        label,
                                      })
                                    }
                                    shadowBoxProps={{
                                      primary: true,
                                    }}
                                  />
                            </div>
                        </div>
                        <div className="fae-voucher-popup-btns"> 
                              <button className="fae-voucher-popup-buttons" onClick={()=>setOpen(false)}>
                                  Cancel
                              </button>
                              <button className="fae-voucher-popup-buttons" onClick={()=>{setsecPopupOpen(true); setOpen(false)}}>
                                  Create
                              </button>
                        </div>
                   </div>
                )}
        </Popup> 
        <Popup open={secPopupOpen} id="fae-add-voucher-popup"  position="top left">
            {close => (
              <div className="fae-add-voucher-container" >
                <FAEText className="fae-voucher-popup-title">Success</FAEText>
                <FAEText className="fae-voucher-popup-para">You have successfully added new voucher</FAEText>
                <div class="fae-voucher-card">
                <img src={VoucherServiceCard2} alt="Avatar" className='fae-VoucherService-img' style={{width:'100%', height:'150px'}}/>
                <div class="fae-voucher-container">
                    <div className='fae-VoucherCard-titlesett'>
                    <FAEText className="fae-VoucherCard-title">
                    Created on 24 Apr 2021
                    </FAEText>
                    </div> 
                  <div className='fae-VoucherCard-text-open'>
                    <FAEText className="fae-vouchercard-textopen">Open</FAEText>
                  </div>
                </div>
                </div>
                <div className="fae-voucher-popup-formcontainer">
                  <div className="fae-voucher-popup-formname">
                    <FAEText className="fae-voucher-popup-form">Form</FAEText>
                    <FAEText className="fae-voucher-popup-name">Junaid Ahmed Khan</FAEText>
                  </div>
                  <hr/>
                  <div className="fae-voucher-popup-formname">
                    <FAEText className="fae-voucher-popup-form">Create Date</FAEText>
                    <FAEText className="fae-voucher-popup-name">24 Apr 2021</FAEText>
                  </div>
                  <hr/>
                  <div className="fae-voucher-popup-formname">
                    <FAEText className="fae-voucher-popup-form">Voucher</FAEText>
                    <FAEText className="fae-voucher-popup-name">£90</FAEText>
                  </div>
                   <FAEButton className="fae-voucher-popup-button" onClick={()=>setsecPopupOpen(false)}>Done</FAEButton>
                </div>
                </div>
            )}
            </Popup>
          </div>
          <div className="fae-flexcardslist"> 
          <div className="voucher-not-found">
            Not Found
          </div>
                {/* <FAEVoucherCard
                    Url={VoucherGiftBg}
                    Title="Exp: 24 Oct 2020"
                    Button="Redeem" 
                    isService={false}
                    code="2382382389xs"
                    date="Exp 12th Nov, 2023" 
                    price={25} 
                    currency={"$"} 
                    onClick={clickHandle}
                  />  */}
            </div> 
      </div>
      
    </>
  );
};

const mapStateToProps = ({
  giftVouchersPageReducer: { },
  giftVouchersPageReducer:{giftVouchers, loading}
}) => ({ 
  giftVouchers,
  loading
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getGiftVouchers, 
      sendGiftVoucher, 
      makeGiftVoucherResponseToEmpty,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GiftVouchersPage);
