// libs
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

// src
import { FAENavbarSearchSection } from "./FAENavbarSearchSection";

export default {
  title: "Components/FAENavbarSearchSection",
  component: FAENavbarSearchSection,
};

const Template = (args) => <FAENavbarSearchSection {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "What services are you looking for",
  barIcon: <SearchIcon />,
  expertLogoClicked: () => console.log("expert-logo-clicked"),
};
