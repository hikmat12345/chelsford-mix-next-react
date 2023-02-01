// libs
import React from "react";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";

// src
import { FAENavbarItems } from "../FAENavbarItems/FAENavbarItems";
import { FAEDropdown } from "../FAEDropdown/FAEDropdown";
import { FAEText } from "@findanexpert-fae/components";

// scss
import "./FAENavbarItemsSection.scss";

export const FAENavbarItemsSection = ({
  isLogin,
  dropDownInfo = {},
  itemsList,
  userName = "Guest",
  ordersClicked,
  userNameClicked,
  notificationsList = [],
  expertLogoClicked,
  expertLogo,
  userCountry,
  mobileMenu,
}) => {
  const {
    list,
    userStatus,
    label,
    icon,
    userStatusSignedInLabel,
    userStatusSignedOutLabel,
    userStatusSignedInIcon,
    userStatusSignedOutIcon,
    signInClicked,
    signOutClicked,
    deleteAccountClicked,
  } = dropDownInfo;
  return (
    <>
      <div className="fae--navbar-items-section-container">
        <div
          onClick={userNameClicked}
          className="fae--navbar-items-section-greeting"
        >
          <FAEText primary>Hello {userName}</FAEText>
        </div>
        <div className="fae--navbar-items-section-items-container">
          <div className="fae--navbar-items-section-items">
            <FAENavbarItems itemsList={itemsList} />
          </div>
        </div>
        <div className="fae--navbar-items-section-dropdown-items">
          <FAEDropdown
            primary
            isLogin={isLogin}
            list={list}
            label={label}
            userStatus={userStatus}
            icon={icon}
            userStatusSignedInIcon={userStatusSignedInIcon}
            userStatusSignedInLabel={userStatusSignedInLabel}
            userStatusSignedOutIcon={userStatusSignedOutIcon}
            userStatusSignedOutLabel={userStatusSignedOutLabel}
            signInClicked={signInClicked}
            signOutClicked={signOutClicked}
            deleteAccountClicked={deleteAccountClicked}
          />
          {isLogin && (
            <FAEDropdown
              primary
              list={notificationsList}
              icon={<NotificationsIcon style={{ fontSize: "20px" }} />}
            />
          )}
          <span className="fae--navbar-items-divider"></span>
          {/* <p
            onClick={ordersClicked}
            className="fae--navbar-items-section-dropdown-items-item"
          >
            <FAEText primary>Orders</FAEText>
          </p> */}
        </div>
      </div>
      <div className="fae--nav-bar-items-for-mobile-container">
        <div className="fae--navbar-items-for-mobile-wrapper">
          <div className="fae--navbar-items-logo-for-mobile-wrapper">
            <img
              style={{ cursor: "pointer" }}
              onClick={expertLogoClicked}
              src={expertLogo}
              alt="Expert"
              width="100px"
              height="auto"
            />
            <FAEText bold style={{ fontSize: "9px" }} paragraph primary>
              {userCountry}
            </FAEText>
          </div>
          <div className="fae--mobile-nav-bar-actions-wrapper">
            {isLogin && (
              <FAEDropdown
                primary
                list={notificationsList}
                icon={
                  <NotificationsIcon
                    style={{ fontSize: "20px", color: "white" }}
                  />
                }
              />
            )}
            <FAEDropdown
              primary
              list={mobileMenu}
              icon={<MenuIcon style={{ fontSize: "20px", color: "white" }} />}
            />
            
          </div>
        </div>
      </div>
    </>
  );
};
