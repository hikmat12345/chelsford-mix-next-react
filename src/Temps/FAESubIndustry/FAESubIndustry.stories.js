// libs
import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

// src
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";
import { FAESubIndustry } from "./FAESubIndustry";

export default {
  title: "Components/FAESubIndustry",
  component: FAESubIndustry,
};

const Template = (args) => <FAESubIndustry {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: getImageOrVideoSrcFromPublicFolder("cleaner.png"),
  alt: "Hair Treatment",
  label: "Hair Treatment",
  icon: <ArrowForwardIosIcon />,
};
