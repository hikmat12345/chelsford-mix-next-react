import React, { useState } from 'react'
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "./FAEPopup.scss"

export default function FAEPopup({message,openPopUp, popupYesBtnFun, children }) { 
  return (
    <Popup  trigger={children} open={openPopUp}  position="left center">
    {close => (
      <div>
         {message}
        <a className="close" onClick={close}>
          &times;
        </a>
        <buton className='popup-sure-btn' onClick={popupYesBtnFun}>Yes</buton>
      </div>
    )}
  </Popup> 
  )
}
