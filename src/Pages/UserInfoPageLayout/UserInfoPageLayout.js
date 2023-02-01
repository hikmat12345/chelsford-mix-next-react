//libs
import React from "react";
import {  FAEContainer } from "@findanexpert-fae/components";
import { useLocation } from "react-router-dom";
import CachedIcon from '@material-ui/icons/Cached';
//src
import { addSpaces, getFileSrcFromPublicFolder } from "../../utils";
import history from "../../history";
import {FAEUserInfoTabs} from "../../Temps/FAEUserInfoTabs/FAEUserInfoTabs"
//scss
import "./UserInfoPageLayout.scss";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
 
const userInfoTabs = [
  {
    label: "Profile",
    svgIconSrc:  getFileSrcFromPublicFolder("icons/profileIcon.svg"),
    onClick: () => history.push("/profile"),
  },
  {
    label: "Your Bookings",
    svgIconSrc:  getFileSrcFromPublicFolder("icons/bookingGreyColor.svg"),
    onClick: () => history.push("/your-bookings/upcoming"),
  }, 
  // {
  //   label: "Your Addresses",
  //   svgIconSrc:  getFileSrcFromPublicFolder("icons/locationgrey.svg"),
  //   onClick: () => history.push("/your-addresses"),
  // }, 
  {
    label: "Payment Details",
    svgIconSrc:  getFileSrcFromPublicFolder("icons/paymentgreyicons.svg"),
    onClick: () => history.push("/payment-details"),
  },
  // {
  //   label: "Switch Country",
  //   svgIconSrc:  getFileSrcFromPublicFolder("icons/swithc-country.svg"),
  //   onClick: () => history.push("/switch-country"),
  // }, 
  // {
  //   label:  "Your Vouchers", 
  //   svgIconSrc:  getFileSrcFromPublicFolder("icons/vouchergrey.svg"),
  //   onClick: () => history.push("/your-vouchers/service-voucher"),
  // }, 
];

const getActiveTab = (value) => {

  return userInfoTabs.find(
    (tab) =>
      addSpaces(value, "-").includes(tab.label.toLocaleLowerCase()) === true
  ).label;
};
 
const UserInfoPageLayout = ({ childWidth, children, paddingTop }) => {
  const location = useLocation();
 
  const activeTab = getActiveTab(location.pathname);
  
  return (
    <>
      <div className="fae--user-info-page-layout-main-container">
        <FAEUserInfoTabs
          tabs={userInfoTabs}
          activeTab={activeTab}
          className="side-tabs-user-info"
        />
        <div
          className={`fae--user-info-page-layout-pages-data dpb ${
            paddingTop ?? ""
          }`}
        >
          <FAEContainer className="fae-page-classname">
            <div style={{ width: childWidth ?? "100%" }}> {children}</div>
          </FAEContainer>
        </div>
      </div>
    </>
  );
};

export default UserInfoPageLayout;
