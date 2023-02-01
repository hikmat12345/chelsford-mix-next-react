//libs
import React from "react";

//src
import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";
import { FAEText } from "../FAEText/FAEText";
import { FAELoading } from "../FAELoading/FAELoading";

//scss
import "./FAELocationCard.scss";

export const FAELocationCard = ({
  src,
  label,
  shortDescription,
  border,
  className = "",
  alt,
  loading,
  loaderProps,
  shadowBoxProps,
  ...rest
}) => {
  return (
    <FAEShadowBox {...shadowBoxProps}>
      {loading ? (
        <FAELoading {...loaderProps} />
      ) : (
        <div
          className={`fae--service-location-card-container ${className}`}
          {...rest}
        >
          <img src={src} alt={alt} width="auto" height="auto" />
          <div className="fae--service-location-card-content">
            <FAEText>{label}</FAEText>
            <FAEText paragraph tertiary>
              {shortDescription}
            </FAEText>
          </div>
        </div>
      )}
    </FAEShadowBox>
  );
};
