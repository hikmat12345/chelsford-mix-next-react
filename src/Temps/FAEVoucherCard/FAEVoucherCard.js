import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton';
import { FAEText } from '@findanexpert-fae/components/dist/stories/FAEText/FAEText';
import React from 'react';
import "./FAEVoucherCard.scss";

function FAEVoucherCard({
  id,
  Url,
  isService,
  code,
  date,
  Title,
  price,
  TitleAsign,
  onClick,
  Button,
  currency
}) {
  return (
    <>
        <div class="fae-voucher-card" id={id} onClick={onClick} >
            <div className='fae-VoucherService-img' style={{backgroundImage: `url(${Url})`}}>
               <div className={`${isService?"service-card-data":"gift-card-data"}`}>
                  <ul>
                     <li><span>Code : {code}</span></li>
                     <li><span>{date}</span></li>
                  </ul>
                  <span className='fae-service-prices'>{currency}{price}</span>
               </div>
            </div>
            <div class="fae-voucher-container">
                <div className='fae-VoucherCard-titlesett'>
                <FAEText className="fae-VoucherCard-title">
                 {Title}
                </FAEText>
                <FAEText className="fae-VoucherCard-titleasign">
                 {TitleAsign}
                </FAEText>
                </div> 
              {/* <FAEButton onClick={onClick} className="fae-VoucherCard-Btn"><span className='fae-VoucherCard-text'>{Button}</span></FAEButton> */}
            </div>
        </div>
    </>
  )
}

export default FAEVoucherCard