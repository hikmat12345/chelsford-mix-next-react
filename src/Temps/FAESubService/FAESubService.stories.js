//libs
import React from "react";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";

//src
import { FAESubService } from "./FAESubService";

export default {
  title: "Components/FAESubService",
  component: FAESubService,
};

const Template = (args) => <FAESubService {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: getImageOrVideoSrcFromPublicFolder("sub_service.svg"),
  alt: "Hair Treatment",
  name: "Hair Treatment",
  price: 120,
  currencySymbol: "$",
  shortDescription: "Short Description",
  border: "semiCircle",
  online: true,
};
