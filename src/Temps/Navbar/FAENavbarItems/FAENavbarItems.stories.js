// libs
import React from "react";

// src
import { FAENavbarItems } from "./FAENavbarItems";

export default {
  title: "Components/FAENavbarItems",
  component: FAENavbarItems,
};

const Template = (args) => <FAENavbarItems {...args} />;

export const Default = Template.bind({
  itemsList: [
    {
      label: "Become an Expert",
      onclick: "",
    },
    {
      label: "Offers",
      onclick: "/offers",
    },
    {
      label: "Referral",
      onclick: "/referral",
    },
    {
      label: "Watchlist",
      onclick: "/watchlist",
    },
    {
      label: "About",
      onclick: "/about",
    },
    {
      label: "Blogs",
      onclick: "/blogs",
    },
    {
      label: "Help",
      onclick: "/help",
    },
  ],
});
