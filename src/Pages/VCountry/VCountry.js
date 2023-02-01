//libs
import {  FAEText } from "@findanexpert-fae/components";
import React, {useState, useEffect} from "react";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
//src
import UserInfoPageLayout from "../UserInfoPageLayout"; 
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//scss
import "./VCountry.scss";
import {  useDispatch, useSelector } from "react-redux";
import { changeULocId } from "../../redux/actions/changeCountryLocId";
import { getFileSrcFromPublicFolder, setCookies } from "../../utils";
import history from "../../history";
 

const VCountry = ( ) => { 
  document.title = `Chelsford | Switch Country`; 
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTow] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  const dispatch= useDispatch()
  const storeData= useSelector(state=>state)
   const clickHandler= (name, id, userCurrencyCode)=>{ 
      setCookies("switched_country",name)
      setCookies("switched_id",id,)
      setCookies("switched_userCurrencyCode",userCurrencyCode,)
      dispatch(changeULocId(id,  name, userCurrencyCode))
      setOpen(false)
      setOpenTow(false) 
      setOpenThree(false)
      setOpenFour(false)
      history.push("/")
   }
   
   const clickHandlerShow= (flag)=>{ 
     if(flag==171) {
       setOpen(true)
       setOpenTow(false)
       setOpenThree(false)
       setOpenFour(false)
       
     }else if(flag==2) {
       setOpen(false)
       setOpenTow(true)
       setOpenThree(false)
       setOpenFour(false)
    }  
    else if(flag==238) {
       setOpen(false)
       setOpenTow(false)
       setOpenThree(true)
       setOpenFour(false)
    } 
    else if(flag==252) {
       setOpen(false)
       setOpenTow(false)
       setOpenThree(false)
       setOpenFour(true)
    } 
   }
   useEffect(() => { 
 }, [open, openTwo, openThree, openFour]);

  
  return (
    <>
      <UserInfoPageLayout>
        <div className="fae-vouchers-page-main-container">
          <FAEText heading>Switch Country</FAEText>
          
            <buton onClick={()=>clickHandlerShow(2)}  className="change-country-tab"><img src={getFileSrcFromPublicFolder("uk-flag.PNG")} className='' />  United Kingdom <span className="change-icon">{storeData.defaultReducer.userCountryId==1 &&  <VerifiedUserIcon /> }</span></buton>
            <Popup open={openTwo} style={{height: "initial !important"}}  position="top left">
                  {close => (
                    <div className="fae-change-country-popup">
                      Are you sure? You want to switch Country.
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                      <buton className='popup-sure-btn' onClick={()=>clickHandler('GB',1, 'GBP') }>Yes</buton>
                    </div>
                  )}
             </Popup> 
             <buton onClick={()=>clickHandlerShow(238)}  className="change-country-tab"><img src={getFileSrcFromPublicFolder("us-flag.PNG")} className='' />  United States <span className="change-icon">{storeData.defaultReducer.userCountryId==238 &&  <VerifiedUserIcon /> }</span></buton>
            <Popup style={{height: "initial !important"}}  open={openThree}  position="top left">
                  {close => (
                    <div className="fae-change-country-popup">
                      Are you sure? You want to switch Country.
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                      <buton className='popup-sure-btn' onClick={()=>clickHandler('US',238, 'USD') }>Yes</buton>
                    </div>
                  )}
             </Popup> 
             <buton onClick={()=>clickHandlerShow(252)}  className="change-country-tab"><img src={getFileSrcFromPublicFolder("global-flag.PNG")} className='' />  Global Services <span className="change-icon">{storeData.defaultReducer.userCountryId==252 &&  <VerifiedUserIcon /> }</span></buton>
            <Popup style={{height: "initial !important"}}  open={openFour}  position="top left">
                  {close => (
                    <div className="fae-change-country-popup">
                      Are you sure? You want to switch Country.
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                      <buton className='popup-sure-btn' onClick={()=>clickHandler('Global',252, 'USD') }>Yes</buton>
                    </div>
                  )}
             </Popup>
             <buton onClick={()=>clickHandlerShow(171)}  className="change-country-tab"><img src={getFileSrcFromPublicFolder("pk-flag.PNG")} className='' /> Pakistan <span className="change-icon">{storeData.defaultReducer.userCountryId==171 &&  <VerifiedUserIcon />  }</span></buton>
            <Popup style={{height: "initial !important"}}  open={open}  position="top left">
                {close => (
                  <div className="fae-change-country-popup">
                    Are you sure? You want to switch Country.
                    <a className="close" onClick={close}>
                      &times;
                    </a>
                    <buton className='popup-sure-btn' onClick={()=>clickHandler('PK',171, 'RS') }>Yes</buton>
                  </div>
                )}
              </Popup> 
        </div>
      </UserInfoPageLayout>
    </>
  );
};
 
export default VCountry
