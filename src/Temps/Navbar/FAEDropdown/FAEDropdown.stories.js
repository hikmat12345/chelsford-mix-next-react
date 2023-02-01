// libs
import React from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";

// src
import { FAEDropdown } from "./FAEDropdown";

export default {
  title: "Components/FAEDropdown",
  component: FAEDropdown,
};

const Template = (args) => <FAEDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLogin: false,
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
    {
      label: "Become an Expert",
      icon: <PersonIcon />,
      href: "pro.findanexpert.net",
    },
  ],
  userStatus: true,
};
