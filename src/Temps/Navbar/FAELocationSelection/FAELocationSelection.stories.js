//libs
import React from "react";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";

//src
import { FAELocationSelection } from "./FAELocationSelection";

export default {
  title: "Components/FAELocationSelection",
  component: FAELocationSelection,
};

const Template = (args) => <FAELocationSelection {...args} />;

export const Default = Template.bind({});
Default.args = {
  inHouseDetails: {
    icon: getImageOrVideoSrcFromPublicFolder("sub_service.svg"),
    shortDescription: "short Description",
    onClick: () => console.log("asdsdds"),
  },
  inClinicDetails: {
    icon: getImageOrVideoSrcFromPublicFolder("sub_service.svg"),
    shortDescription: "short Description",
    onClick: () => console.log("asdsdd clinic"),
  },
  onlineDetails: {
    icon: getImageOrVideoSrcFromPublicFolder("sub_service.svg"),
    shortDescription: "short Description",
  },
  inHouse: true,
  inClinic: true,
  online: true,
  shadowBoxProps: { border: "semiCircle", padding: true },
};
