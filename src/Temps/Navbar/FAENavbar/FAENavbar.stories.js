// libs
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";

// src
import { FAENavbar } from "./FAENavbar";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";

export default {
  title: "Components/FAENavbar",
  component: FAENavbar,
};

const Template = (args) => <FAENavbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLogin: false,
  dropDownInfo: {
    label: "Account",
    icon: <ArrowDropDownIcon />,
    list: [
      {
        label: "Profile",
        icon: <PersonIcon />,
        onClick: () => console.log("profile"),
      },
      {
        label: "Profile",
        icon: <PersonIcon />,
        onClick: () => console.log("profile"),
      },
      {
        label: "Profile",
        icon: <PersonIcon />,
        onClick: () => console.log("profile"),
      },
      { label: "Become an Expert", icon: <PersonIcon />, href: "/" },
    ],
    signInClicked: () => console.log("sign-in"),
    signOutClicked: () => console.log("sign-out"),
    userStatus: true,
  },
  expertLogo: getImageOrVideoSrcFromPublicFolder("expert-logo-black.png"),
  itemsList: [
    {
      label: "Become an Expert",
      href: "/",
    },
    {
      label: "Offers",
      onClick: () => console.log("offers"),
    },
    {
      label: "Referral",
      onClick: () => console.log("Referral"),
    },
    {
      label: "Watchlist",
      onClick: () => console.log("Watchlist"),
    },
    {
      label: "About",
      onClick: () => console.log("About"),
    },
    {
      label: "Blogs",
      href: "/",
    },
    {
      label: "Help",
      onClick: () => console.log("Help"),
    },
  ],
  expertLogoClicked: () => console.log("expert-logo"),
  signInClicked: () => console.log("sign-in"),
  signUpClicked: () => console.log("sign-up"),
  ordersClicked: () => console.log("orders"),
  userNameClicked: () => console.log("userNameClicked"),
  userCountry: "PK",

  searchResults: [
    {
      label: "asdasd",
      value: "1",
    },
    {
      label: "asdasd",
      value: "2",
    },
    {
      label: "asdasd",
      value: "3",
    },
    {
      label: "asdasd",
      value: "4",
    },
  ],
  notificationsList: [
    {
      label: "Offers",
      onClick: () => console.log("offers"),
    },
    {
      label: "Referral",
      onClick: () => console.log("Referral"),
    },
    {
      label: "Watchlist",
      onClick: () => console.log("Watchlist"),
    },
  ],
  renderOption: (value) => {
    return (
      <div>
        asdasda
        <div>{value.value}</div>
      </div>
    );
  },
  mobileMenu: [
    {
      label: "Offers",
      onClick: () => console.log("offers"),
    },
    {
      label: "Referral",
      onClick: () => console.log("Referral"),
    },
    {
      label: "Watchlist",
      onClick: () => console.log("Watchlist"),
    },
  ],
  expertMobileLogo: getImageOrVideoSrcFromPublicFolder(
    "mobile_expert_logo.png"
  ),
};
