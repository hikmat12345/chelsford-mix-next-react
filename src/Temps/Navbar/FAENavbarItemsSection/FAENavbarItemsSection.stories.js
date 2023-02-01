// libs
import React from "react";

// src
import { FAENavbarItemsSection } from "./FAENavbarItemsSection";

export default {
  title: "Components/FAENavbarItemsSection",
  component: FAENavbarItemsSection,
};

const Template = (args) => <FAENavbarItemsSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  isLogin: false,
};
