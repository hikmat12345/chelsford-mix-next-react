//libs
import React from "react";
import { getImageOrVideoSrcFromPublicFolder } from "../../utils";

//src
import { FAELocationCard } from "./FAELocationCard";

export default {
  title: "Components/FAELocationCard",
  component: FAELocationCard,
};

const Template = (args) => <FAELocationCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: getImageOrVideoSrcFromPublicFolder("sub_service.svg"),
  alt: "Hair Treatment",
  label: "In House",
  shadowBoxProps: { border: "semiCircle", padding: true },
  shortDescription: "Short Description",
};
