// libs
import React, { useState, useRef } from "react";
import Popover from "@material-ui/core/Popover";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// src
import { FAEText } from "@findanexpert-fae/components";

// css
import "./FAEDropdown.scss";
import { getFileSrcFromPublicFolder } from "../../../utils";


export const FAEDropdown = ({
  isLogin,
  label,
  icon,
  list = [],
  userProfileImage,
  userProfileAvatarImage,
  userName,
  userStatus,
  userStatusSignedInLabel = "Sign In",
  userStatusSignedOutLabel = "Log Out",
  userAccountDeleteLabel = "Delete Your Account",
  userStatusSignedInIcon = <ExitToAppIcon />,
  userStatusSignedOutIcon = <ExitToAppIcon />,
  signInClicked,
  signOutClicked,
  deleteAccountClicked,
  primary,
  userCompleteName
}) => {
  const accountDropdown = useRef();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const logInStates = list?.some((val)=> val?.label === "Logout" )
  return (
    <>
      <div
        className="fae--account-dropdown-container"
        style={{ display: "flex" }} >
        <span
          className="fae--account-dropdown"
          onClick={handleClick}
          ref={accountDropdown}
          aria-describedby={id} >
            <FAEText primary={primary}>{label}</FAEText>
            {icon}
        </span>
        <Popover
        className="fae-mobile-popover"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          onClick={handleClose}
        >
          <div className="fae--account-dropdown-list">
           {  window.screen.width < 600 &&
                <div className="fae-mobile-menue fae-mob-header"> 
                    {logInStates?<img src={userProfileImage} className="fae-mob-pic" alt="expertlogoimage"/>
                   : <img src={ userProfileAvatarImage} alt="expertlogoimage" className="userprofile-img"/> }
                   <div className="fae-user-name">{userCompleteName}</div>
               </div>
           }
           <div className="fae-mobile-menue-list-container">
              {list.map((item, index) => { 
                const { label, icon, href = "", ...rest } = item;
                  return (
                    window.screen.width < 600  ?
                    label !=="SignUp" && label !=="Login" &&
                      <> 
                      <div
                        key={index}
                          className="fae--account-dropdown-list-item"
                          {...rest}
                        >
                          {icon}
                          <FAEText
                            subHeading={window.screen.width > 600 ? false : true}
                          >
                          {label}
                        </FAEText>
                      </div> 
                  </>
                :
                href === "" ? 
                    <div
                        key={index}
                        className="fae--account-dropdown-list-item"
                        {...rest}  >
                         {icon}
                        <FAEText
                          subHeading={window.screen.width > 600 ? false : true} >
                          {label}
                        </FAEText>
                    </div>
                  : 
                    <a
                      key={index}
                      className="fae--account-dropdown-list-item"
                      target="_blank"
                      href={href}
                      rel="noreferrer"
                    >
                      {icon}
                      <FAEText
                        subHeading={window.screen.width > 600 ? false : true}
                      >
                        {label}
                      </FAEText>
                    </a> 
                 );
                })
                
                }

               <div className="fae-login-signup-btns">
                  {list.map((item, index) => { 
                    const { label, icon, href = "", ...rest } = item;
                    return (
                      window.screen.width < 600 &&  (label ==="SignUp" || label ==="Login")  &&
                        <div
                          key={index}
                          className={` ${label}`}
                          {...rest} >
                          {icon}
                          <FAEText
                            subHeading={window.screen.width > 600 ? false : true}
                          >
                            {label}
                          </FAEText>
                        </div> 
                    );
                  })}
                   {/* {list.map((item, index) => { 
                    const { label, icon, href = "", ...rest } = item;
                  return (
                    window.screen.width < 600 && label ==="Delete Your Account"  &&
                    label !=="SignUp" && label !=="Login" && 
                      <div
                          key={index}
                            className="fae--account-dropdown-list-item"
                            {...rest}
                          >
                            {icon}
                            <FAEText subHeading={window.screen.width > 600 ? false : true} >
                            {label}
                          </FAEText>
                        </div>
                      );
                    })} */}
              </div>


              </div> 
            {userStatus ? (
              !isLogin ? (
                <div
                  onClick={signInClicked}
                  className="fae--account-dropdown-list-item fae--account-dropdown-btn"
                >
                  {userStatusSignedInIcon}
                  <FAEText>{userStatusSignedInLabel}</FAEText>
                </div>
              ) : (
                <>
                  <div
                    onClick={signOutClicked}
                    className="fae--account-dropdown-list-item fae--account-dropdown-btn"
                  >
                    {userStatusSignedOutIcon}
                    <FAEText>{userStatusSignedOutLabel}</FAEText>
                  </div>
                  
                  <div
                    onClick={deleteAccountClicked}
                    className="fae--account-dropdown-list-item fae--account-dropdown-btn"
                  >
                    {userStatusSignedOutIcon}
                    <FAEText>{userAccountDeleteLabel}</FAEText>
                  </div>
                </>
              )
            ) : (
              ""
            )}
          </div>
        </Popover>
      </div>
    </>
  );
};
