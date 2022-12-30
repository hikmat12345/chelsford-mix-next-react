// libs
import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

// src
import { FAESubIndustries } from "./FAESubIndustries";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";

export default {
  title: "Components/FAESubIndustries",
  Component: FAESubIndustries,
};

const Template = (args) => <FAESubIndustries {...args} />;

export const Default = Template.bind({});
Default.args = {
  subIndustries: [
    {
      id: 1,
      src: getImageOrVideoSrcFromPublicFolder("cleaner.jpg"),
      alt: "Industry",
      label: "Medical 1",
      onClick: () => console.log("sub-industries clicked"),
    },
    {
      id: 2,
      src: getImageOrVideoSrcFromPublicFolder("cleaner.jpg"),
      alt: "Industry",
      label: "Medical 2",
      onClick: () => console.log("sub-industries clicked"),
    },
    {
      id: 3,
      src: getImageOrVideoSrcFromPublicFolder("cleaner.jpg"),
      alt: "Industry",
      label: "Medical 3",
      onClick: () => console.log("sub-industries clicked"),
    },
  ],
  forwardIcon: <ArrowForwardIosIcon />,
  shadowBoxProps: { primary: true },
};
