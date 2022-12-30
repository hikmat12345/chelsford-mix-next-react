// libs
import React from "react";

// src
import { FAEText } from "@findanexpert-fae/components";
import { FAELoading } from "@findanexpert-fae/components";
import { FAEShadowBox } from "@findanexpert-fae/components";

// css
import "./FAESubIndustry.scss";
import { FAEImage } from "@findanexpert-fae/components";
import { getFileSrcFromPublicFolder } from "../../utils";
 
export const FAESubIndustry = ({
  src,
  alt,
  label,
  icon,
  loading,
  loaderProps,
  shadowBoxProps,
  ...rest
}) => {
  return (
    <>
      <FAEShadowBox {...shadowBoxProps}>
        {loading ? (
          <FAELoading {...loaderProps} />
        ) : (
          <div className="fae--sub-industry" {...rest}>
            <div className="fae--sub-industry-content">
              <FAEImage
                src={src}
                alt={alt}
                placeholder={getFileSrcFromPublicFolder("placeholder.jpg")}
                width={window.screen.width > 599 ? "250px" : "200px"} 
              />
              {/* <img
                src={src}
                alt={alt}
                width={window.screen.width > 599 ? "250px" : "200px"}
              /> */}
              <FAEText>{label}</FAEText>
            </div>
            {window.screen.width > 799 && (
              <div className="fae--sub-industry-icon">{icon}</div>
            )}
          </div>
        )}
      </FAEShadowBox>
    </>
  );
};
