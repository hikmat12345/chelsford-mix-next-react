// libs
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

// src
import { FAENavbarSearchSection } from "../FAENavbarSearchSection/FAENavbarSearchSection";
import { FAENavbarItemsSection } from "../FAENavbarItemsSection/FAENavbarItemsSection";

import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuIcon from "@material-ui/icons/Menu";

// src

import { FAEDropdown } from "../FAEDropdown/FAEDropdown";
import { FAEText } from "@findanexpert-fae/components";

// scss
import "./FAENavbar.scss";
import { FAEAutoComplete } from "../FAEAutoComplete/FAEAutoComplete";

export const FAENavbar = ({
  isLogin,
  dropDownInfo,
  expertLogo,
  itemsList,
  userName,
  userNameClicked,
  expertLogoClicked,
  signInClicked,
  signUpClicked,
  ordersClicked,
  userCountry,
  notificationsList,
  searchResults = [],
  getSearchValue = () => {},
  getSelectedValue = () => {},
  renderOption,
  mobileMenu = [],
  expertMobileLogo,
  userProfileImage="",
  userProfileAvatarImage,
  userCompleteName, 

}) => {  
  return (
    <>
      <div className="fae--navbar">
        <FAENavbarSearchSection
          placeholder="What services are you looking for..."
          barIcon={<SearchIcon />}
          expertLogo={expertLogo}
          expertLogoClicked={expertLogoClicked}
          signInClicked={signInClicked}
          signUpClicked={signUpClicked}
          isLogin={isLogin}
          userCountry={userCountry}
          searchResults={searchResults}
          getSearchValue={(value) => getSearchValue(value)}
          getSelectedValue={(value) => getSelectedValue(value)}
          renderOption={renderOption}
        />
        <FAENavbarItemsSection
          isLogin={isLogin}
          dropDownInfo={dropDownInfo}
          itemsList={itemsList}
          userName={userName}
          userNameClicked={userNameClicked}
          ordersClicked={ordersClicked}
          notificationsList={notificationsList}
          expertLogo={expertLogo}
          expertLogoClicked={expertLogoClicked}
          userCountry={userCountry}
          mobileMenu={mobileMenu}
        />
      </div>
      {/* mobile */}
      <div className="fae--nav-bar-items-for-mobile-container">
        <div className="fae--navbar-items-for-mobile-wrapper">
          {/* <div className="fae--navbar-items-logo-for-mobile-wrapper">
            <img
              style={{ cursor: "pointer" }}
              onClick={expertLogoClicked}
              src={expertMobileLogo}
              alt="Expert"
              width="30px"
              height="auto"
            />
            <FAEText bold style={{ fontSize: "9px" }} paragraph primary>
              {userCountry}
            </FAEText>
          </div> */}
          <div className="fae--navbar-search-section-search">
            {/* <FAEAutoComplete
              type="search"
              onChange={(e) => getSearchValue(e.target.value)}
              primary
              placeholder="What services are you looking for..."
              values={searchResults}
              shadowBoxProps={{
                className: "auto-complete-search-bar",
              }}
              getSelectedValue={(value) => getSelectedValue(value)}
              value={{ label: "" }}
              renderOption={renderOption}
            /> */}
            {/* <ShoppingCartIcon /> */}
          </div>
          <div className="fae--mobile-nav-bar-actions-wrapper">
            {/* {isLogin && (
              <FAEDropdown
                primary
                list={notificationsList}
                icon={
                  <NotificationsIcon
                    style={{ fontSize: "30px", color: "white" }}
                  />
                }
              />
            )} */}
            <FAEDropdown
              primary
              userName={userName}
              userCompleteName={userCompleteName}
              userProfileImage={userProfileImage} 
              userProfileAvatarImage={userProfileAvatarImage}
              list={mobileMenu}
              icon={<MenuIcon style={{marginTop:"13px", fontSize: "30px", color: "black" }} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};
