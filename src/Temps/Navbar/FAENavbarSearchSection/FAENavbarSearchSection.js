// libs
import React from "react";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// src
// import { FAESearchBar } from "../FAESearchBar/FAESearchBar";

// scss
import "./FAENavbarSearchSection.scss";
import { FAEText, FAEAutoComplete } from "@findanexpert-fae/components";
import { Fragment } from "react"; 

export const FAENavbarSearchSection = ({
  placeholder,
  barIcon,
  expertLogo,
  expertLogoClicked,
  signInClicked,
  signUpClicked,
  isLogin,
  userCountry,
  getSearchValue = () => {},
  searchResults = [],
  getSelectedValue = () => {},
  renderOption,
}) => {
  return (
    <>
      <div className="fae--navbar-search-section-container">
        <div className="fae--navbar-logo-wrapper">
          <h1>
            <img
              style={{ cursor: "pointer" }}
              onClick={expertLogoClicked}
              src={expertLogo}
              alt="Expert"
              width="auto"
              height="auto"
            />
          </h1> 
          <FAEText bold style={{ fontSize: "12px" }} paragraph primary>
            {userCountry}
          </FAEText>
        </div>
        <div className="fae--navbar-search-section-search-container">
          <div className="fae--navbar-search-section-search">
            <FAEAutoComplete
              type="search"
              onChange={(e) => getSearchValue(e.target.value)}
              primary
              placeholder={placeholder}
              values={searchResults}
              shadowBoxProps={{
                className: "auto-complete-search-bar",
              }}
              getSelectedValue={(value) => getSelectedValue(value)}
              value={{ label: "" }}
              renderOption={renderOption}
            />
            {/* <ShoppingCartIcon /> */}
          </div>
        </div>
        {isLogin === true ? (
          <div className="fae--navbar-search-section-user-signed-in">
            <div>
              <FAEText paragraph primary>
                Service To
              </FAEText>
              <FAEText bold primary>
                London
              </FAEText>
            </div>
            <LocationOnIcon />
          </div>
        ) : (
          <div className="fae--navbar-search-section-auth">
            <FAEText
              onClick={signInClicked}
              className="fae--navbar-search-section-auth-item"
              primary
            >
              Sign In
            </FAEText>
            <span className="fae--navbar-search-section-auth-divider"></span>
            <FAEText
              onClick={signUpClicked}
              className="fae--navbar-search-section-auth-item"
              primary
            >
              Sign Up
            </FAEText>
          </div>
        )}
      </div>
    </>
  );
};
