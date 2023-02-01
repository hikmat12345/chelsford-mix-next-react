import React from "react";

//src
import { FAEUserInfoTabs } from "./FAEUserInfoTabs";

export default {
  title: "Components/FAEUserInfoTabs",
  component: FAEUserInfoTabs,
};

const Template = (args) => <FAEUserInfoTabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      label: "Profile",
      onClick: () => console.log("Profile"),
    },
    {
      label: "Your Bookings",
      onClick: () => console.log("Your Bookings"),
    },
    {
      label: "Your Expert",
      onClick: () => console.log("Your Expert"),
    },
    {
      label: "Your Addresses",
      onClick: () => console.log("Your Addresses"),
    },
    {
      label: "Your Email",
      onClick: () => console.log("Your Email"),
    },
  ],
  activeTab: "profile",
};
