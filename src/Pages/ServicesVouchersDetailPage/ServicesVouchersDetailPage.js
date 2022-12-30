//libs

import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import React, { Children, useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { bindActionCreators } from "redux"; 
import history from "../../history";
//src
import { getServicesVouchers } from "../../redux/actions/servicesVocuhersPageActions";
import { addSpaces, getCookies, getFileSrcFromPublicFolder, replaceSpaces } from "../../utils";
//scss
import "./ServicesVouchersDetailPage.scss";
 
const ServicesVouchersDetailPage = ({ 
  loading, 
  servicesVouchers
}) => { 
  const {state}=useLocation()
  const {services}= state
console.log(state,services, 'state') 
const {amount,currencySymbol, serviceName, voucherCode} =state.services

useEffect(()=>{
     
    // getServicesVouchers(getCookies("userId"))
  },[])
  const serviceHandler = (serviceName, eachService) =>{ 
  const  mainServiceId=eachService?.mainServiceId ==0 ? eachService?.serviceId: eachService?.mainServiceId;
    
    console.log(eachService,  {...eachService, mainServiceId:mainServiceId }, 'eachService')
    const serviceNameUrl=replaceSpaces(serviceName, "-")
    history.push({state:{...eachService, mainServiceId:mainServiceId }, pathname :`/services/${serviceNameUrl}`})
     
  } 
  return (
    <>
      <div className="fae--services-vouchers-page-main-container"> 
           <div className="fae-recommended-services-container">
             <FAEImage className="fae-voucher-detail-banner-img" src={getFileSrcFromPublicFolder("service_voucher_backgorund.png")} />
              <div className="fae-voucher-detail-banner-stuff">
                 <div>VOUCHER CODE: {voucherCode} </div> 
                 <div>Price: <span className="fae-voucher-service-detail-price">{amount}{currencySymbol}</span></div>  
                 <div>{serviceName}</div>  
              </div>
              <div className="fae-serviceVouchers-ExpireVoucher"><p className="fae--text fae-expiredvouchertext    undefined">Recommended Services</p><p className="fae--text fae-resultvouchertext    undefined">{services?.services?.length} Results found</p></div>
               <div className="fae-recommended-services">
                {services?.services?.map((eachService)=>{
                  return  (<FAEButton onClick={()=>serviceHandler(eachService.serviceName, eachService)} className="fae-recom-services-names">{eachService?.serviceName}</FAEButton>)
                 })}
              </div>
           </div> 
       </div>
    </>
  );
};

const mapStateToProps = ({
  servicesVouchersPageReducer: { error, loading, servicesVouchers },
  
}) => ({
  error,
  loading,
  servicesVouchers,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  
   }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesVouchersDetailPage);
