import React from 'react'
//src
import { FAEText } from "../FAEText/FAEText";
import { FAEPrice } from "../FAEPrice/FAEPrice";
import { FAELoading } from "../FAELoading/FAELoading";
import { FAEImage } from "../FAEImage/FAEImage"; 

//scss
import "./FAEServiceCard.scss";

export const FAEProductCard = ({
  src,
  label,
  price,
  primary,
  discountedPrice,
  currencySymbol,
  className = "",
  type,
  alt,
  loading,
  loaderProps,
  onclick,
  placeholder,
  textOnImage,
  textPosition,
  ...rest
}) => {
  const mode = primary ? "primary" : "";

  return (
    <>
      {loading ? (
        <FAELoading {...loaderProps} />
      ) : (
        <div {...rest} className={`fae--service-card ${className}`}>
           <FAEImage
                className="fae--service-card-image-or-video"
                src={src}
                alt={alt}
                placeholder={placeholder}
                textOnImage={textOnImage}
                textPosition={textPosition}
              /> 
           <div className={`fae--card-content ${mode}`}>
            <FAEText
              style={{ marginBottom: mode === "" && "4px" }}
              className="fae--service-card-text-mobile"
              light >
              {label}
            </FAEText>
            <FAEPrice
              discountedPrice={discountedPrice}
              price={price}
              currencySymbol={currencySymbol}
            />
          </div>
        </div>
      )}
    </>
  );
};



export default FAEProductCard
