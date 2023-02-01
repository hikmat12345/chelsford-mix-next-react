//libs
import React from "react";

//src
import { FAEText } from "@findanexpert-fae/components";
import { FAEShadowBox } from "@findanexpert-fae/components";
import { FAEPrice } from "@findanexpert-fae/components";
import { FAELoading } from "@findanexpert-fae/components";

//scss
import "./FAESubService.scss";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import { FAEVideo } from "@findanexpert-fae/components/dist/stories/FAEVideo/FAEVideo";
import { getFileSrcFromPublicFolder } from "../../utils";

export const FAESubService = ({
  name,
  src,
  alt,
  type,
  currencySymbol,
  price,
  discountedPrice,
  shortDescription,
  className = "",
  border,
  loading,
  loaderProps,
  shadowBoxProps,
  online,
  percentageDiscount,
  placeholder,
  ...rest
}) => {

  return (
    <FAEShadowBox
      className="fae--sub-service-main-container"
      {...shadowBoxProps}
    >
      {loading ? (
        <FAELoading {...loaderProps} />
      ) : (
        <>
          <div className="fae--sub-service-online-and-discount-wrapper">
            {percentageDiscount > 0 && (
              <FAEText className="fae--sub-service-discount-text" primary>
                {percentageDiscount}% Off
              </FAEText>
            )}
            {online && (
              <FAEText className="fae--sub-service-online-text" primary>
                Online Only
              </FAEText>
            )}
          </div>
          <div className={`fae--sub-service-container ${className}`} {...rest}>
            <div className="fae--sub-service-wrapper">
              {/* <img src={src} alt={alt} height="auto" width="auto" /> */}
              {type !== "video" ? (
                <>
                  <FAEImage
                    className="fae--offer-service-card-image"
                    src={src}
                    alt={alt}
                    placeholder={placeholder}
                    // textOnImage={textOnImage}
                    // textPosition={textPosition}
                  />
                </>
              ) : (
                <FAEVideo
                  className="fae--service-card-image-or-video"
                  src={src}
                  alt={alt}
                  placeholder={placeholder}
                />
              )}
              <div className="fae--sub-service-card-content">
                <FAEText>{name}</FAEText>
                <FAEText paragraph tertiary>
                  {shortDescription}
                </FAEText>
              </div>
            </div>
            <div className="fae--sub-service-price-and-online-button">
              <FAEPrice
                discountedPrice={discountedPrice}
                price={price}
                currencySymbol={currencySymbol}
              />
            </div>
          </div>
        </>
      )}
    </FAEShadowBox>
  );
};
