//libs
import React from "react";

//src
import { FAEContainer } from "../FAEContainer/FAEContainer";
import { FAELoading } from "../FAELoading/FAELoading";
import { FAELocationCard } from "../FAELocationCard/FAELocationCard";

//scss
import "./FAELocationSelection.scss";

export const FAELocationSelection = ({
  justify,
  align,
  className = "",
  inHouseDetails,
  inClinicDetails,
  onlineDetails,
  inHouse,
  inClinic,
  online,
  border,
  loading,
  loaderProps,
  shadowBoxProps,
  ...rest
}) => {
  const inHouseInfo = { label: "My Place", ...inHouseDetails };
  const inClinicInfo = { label: "Expert Center", ...inClinicDetails };
  const onlineInfo = { label: "Online", ...onlineDetails };
  return (
    <FAEContainer justify={justify} align={align}>
      {loading ? (
        <FAELoading {...loaderProps} />
      ) : (
        <div
          className={`fae--location-selection-main-container ${className}`}
          {...rest}
        >
          {inHouse && (
            <FAELocationCard
              src={inHouseInfo.icon}
              alt="in-house-icon"
              label={inHouseInfo.label}
              shortDescription={inHouseInfo.shortDescription}
              shadowBoxProps={shadowBoxProps}
              {...inHouseInfo}
            />
          )}
          {inClinic && (
            <FAELocationCard
              src={inClinicInfo.icon}
              alt="in-clinic-icon"
              label={inClinicInfo.label}
              shortDescription={inClinicInfo.shortDescription}
              shadowBoxProps={shadowBoxProps}
              {...inClinicInfo}
            />
          )}
          {online && (
            <FAELocationCard
              src={onlineInfo.icon}
              alt="online-icon"
              label={onlineInfo.label}
              shortDescription={onlineInfo.shortDescription}
              shadowBoxProps={shadowBoxProps}
              {...onlineInfo}
            />
          )}
        </div>
      )}
    </FAEContainer>
  );
};
