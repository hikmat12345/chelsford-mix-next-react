import { FAEText } from "@findanexpert-fae/components";
import history from "./history";
import { getFileSrcFromPublicFolder, replaceSpaces } from "./utils";

//banners-parser
export const faeBannersParser = (data) => {
  const parsedData = data.map(
    ({
      imagePath,
      bannerTypeName,
      serviceName,
      extension,
      redirectionType,
      redirectURL,
    }) => {
      const redirectType =
        redirectionType !== null ? redirectionType.toLowerCase() : "";
      const redirectPath =
        redirectType === ""
          ? ""
          : redirectType === "detailpage"
          ? `/services/${replaceSpaces(serviceName, "-")}`
          : redirectType === "refferalpage"
          ? "/referral"
          : redirectType === "subservicepage"
          ? `/booking/${replaceSpaces(serviceName, "-")}/sub-services`
          : redirectType === "legal"
          ? "/privacy-policy"
          : "";
      return {
        src: imagePath,
        alt: imagePath,
        type:
          extension.toLowerCase() === "mp4" ||
          extension.toLowerCase() === "webm"
            ? "video"
            : bannerTypeName,
        onClick: () => {
          redirectURL !== null && redirectURL !== ""
            ? window.open(redirectURL, "_blank")
            : history.push({
                pathname: redirectPath,
              });
        },
      };
    }
  );

  return parsedData;
};

//carousel-parser
export const faeBannersCarouselParser = (data) => {
  const parsedData = data.map(
    ({
      imagePath,
      bannerTypeName,
      serviceName,
      extension,
      redirectionType,
      redirectURL,
    }) => {
      const redirectType =
        redirectionType !== null ? redirectionType.toLowerCase() : "";
      const redirectPath =
        redirectType === ""
          ? ""
          : redirectType === "detailpage"
          ? `/services/${replaceSpaces(serviceName, "-")}`
          : redirectType === "refferalpage"
          ? "/referral"
          : redirectType === "subservicepage"
          ? `/booking/${replaceSpaces(serviceName, "-")}/sub-services`
          : redirectType === "legal"
          ? "/privacy-policy"
          : "";
      return {
        src: imagePath,
        alt: imagePath,
        type:
          extension.toLowerCase() === "mp4" ||
          extension.toLowerCase() === "webm"
            ? "video"
            : bannerTypeName,
        onClick: () => {
          redirectURL !== null && redirectURL !== ""
            ? window.open(redirectURL, "_blank")
            : history.push({
                pathname: redirectPath,
              });
        },
      };
    }
  );

  return parsedData;
};

//service-parser
export const faeServicesParser = (data) => {  
  const parsedData = data.map(
    ({
      imagePath,
      bannerTypeName,
      price,
      serviceName,
      currencySymbol,
      maxPrice,
      hasSubServices,
      appliedPercentage = 0,
    }) => ({
      name: serviceName,
      src: imagePath,
      price: maxPrice,
      currencySymbol: currencySymbol,
      discountedPrice: appliedPercentage !== 0 ? price : 0,
      type: bannerTypeName,
      textOnImage: appliedPercentage !== 0 ? `-${appliedPercentage}%` : "",
      textPosition: "top-right",
      onClick: () =>
        history.push({
          pathname:
            // hasSubServices
            //   ? `/${replaceSpaces(serviceName, "-")}/services`
            //   :
            `/course/${replaceSpaces(serviceName, "-")}`,
        }),
    })
  );

  return parsedData;
};
// all services for home page parser
export const faeAllServicesParser =(data)=>{ 
  
  const allServicesData=data?.map(
    ({imagePath, 
    actualPrice,
    serviceName,
    currencySymbol,  
    percentDiscount,
    discountedPrice
  }) => ({
    name: serviceName,
    src: imagePath,
    price:  actualPrice,
    currencySymbol: currencySymbol,
    discountedPrice:   (discountedPrice >= actualPrice )  ? 0: discountedPrice, 
    textOnImage: percentDiscount !== 0  ? `${percentDiscount}%` : "",
    textPosition: "top-right",
    onClick: () =>
      history.push({
        pathname: 
          `/services/${replaceSpaces(serviceName, "-")}`,
      }),
   }) 
  );
  return allServicesData 
}
// end of all services for home page parser
export const faeOnlyForYouServicesParser = (data) => {
  const parsedData = data.map(
    ({
      imageVideoPath,
      bannerTypeName,
      discountedPrice,
      serviceTypeName,
      currencySymbol,
      maxPrice,
    }) => ({
      name: serviceTypeName,
      src: imageVideoPath,
      price: maxPrice,
      currencySymbol: currencySymbol,
      discountedPrice: discountedPrice,
      type: bannerTypeName,
      onClick: () =>
        history.push({
          pathname: `/services/${replaceSpaces(serviceTypeName, "-")}`,
        }),
    })
  );

  return parsedData;
};

//industries-parser
export const faeIndustriesParser = (data) => {
  const parsedData = data.map(
    ({ imagePath, industryId, industryName, hasChilds }) => ({
      id: industryId,
      src: imagePath,
      alt: industryName,
      label: industryName,
      onClick: () =>
        hasChilds === true
          ? history.push(`/${replaceSpaces(industryName, "-")}/sub-industries`)
          : history.push(`/${replaceSpaces(industryName, "-")}/services`),
    })
  ); 
  return parsedData;
};

//sub-industries-parser
export const faeSubIndustriesParser = (data) => {
  const parsedData = data.map(
    ({ imagePath, industryId, industryName, hasSubIndustries }) => ({
      id: industryId,
      src: imagePath,
      alt: industryName,
      label: industryName,
      onClick: () =>
        hasSubIndustries === true
          ? history.push(`/${replaceSpaces(industryName, "-")}/sub-industries`)
          : history.push(`/${replaceSpaces(industryName, "-")}/services`),
    })
  );

  return parsedData;
};

//slots-parser
export const faeBookingTimeSlotsParser = (data) => {
  const parsedData = data.map(({ availablefrom, availableto }) => ({
    value: availablefrom,
    label: `${availablefrom} - ${availableto}`,
  }));

  return parsedData;
};

//fae-form-data-parser
export const faeFormDataParser = (data) => {
  const parsedData = data?.map(({ value }) => ({
    value: value,
    label: value,
  }));
  return parsedData;
};

//fae-form-address-parser
export const faeAddressParser = (data) => {
  const parsedData = data.map(({ line1, line2, townCity, postalCode, id }) => ({
    address: `${line2 && `${line2},`} ${line1} ${
      postalCode && `,${postalCode}`
    } ${townCity && `,${townCity}`}`,
    id,
  }));
  return parsedData;
};
const forEmptyPage= getFileSrcFromPublicFolder("placeholder.jpg")
//fae-sub-services-parser
export const faeSubServicesParser = (data) => {
  const parsedData = data?.map(
    ({
      serviceId,
      imagePath,
      serviceName,
      description,
      currencySymbol,
      hasAttributes,
      isInClinic,
      isInHouse,
      price,
      maxPrice,
      hasSubservice,
      duration,
      hasSession,
      percentDiscount,
      isTraining,
      isOnline,
    }) => ({
      id: serviceId,
      // src: imagePath !==""?imagePath: forEmptyPage,
      className:window.screen.width<600 && "fae-img-empty-plc",
      src: window.screen.width>600 && forEmptyPage,
      name: serviceName,
      price: isTraining ? "" : maxPrice,
      discountedPrice: isTraining ? "" : percentDiscount !== 0 ? price : 0,
      currencySymbol: isTraining ? "" : currencySymbol,
      shortDescription: description,
      isInClinic: isInClinic,
      isInHouse: isInHouse,
      hasAttributes: hasAttributes,
      hasSubservice: hasSubservice,
      duration: duration,
      hasSession: hasSession,
      isTraining,
      isOnline,
      online: isOnline && !isInClinic && !isInHouse,
      percentageDiscount: percentDiscount,
    })
  ); 
  return parsedData;
};

//card-list-parser
export const cardListParser = (data) => {
  const parsedData = data.map(({ card: { last4 }, id }) => ({
    label: `**** **** **** ${last4}`,
    value: id,
  }));
  return parsedData;
};

//address-parser
export const addressSuggestionsParser = (data) => {
  const parsedData = data.map(({ description, place_id }) => ({
    label: description,
    value: place_id,
  }));
  return parsedData;
};

//address-parser
export const notificationsParser = (data) => {
  const getListOfNotification= data.length ===0? [{notificationtitle: "Notification not available"}]: data
  const parsedData = getListOfNotification.map(
    ({ notificationtitle, notificationbody, bookingid }) => ({
      label: (
        <>
          <FAEText bold>{notificationtitle}</FAEText>
          <FAEText paragraph tertiary>
            {notificationbody}
          </FAEText>
        </>
      ),
      // onClick: () =>
      //   history.push({
      //     pathname: `/your-bookings/${replaceSpaces("services", "-")}/details`,
      //     state: { bookingId: bookingid },
      //   }),
    })
  );
  return parsedData;
};

//searchServicesDataParser
export const searchServicesParser = (data) => {
  const parsedData = data.map(({ servicename }) => ({
    label: servicename,
    value: servicename,
  }));
  return parsedData;
};

//voucherParser
export const voucherParser = (data) => {
  const parsedData = data.map(({ voucherCode, amount, currencySymbol }) => ({
    label: `${voucherCode} - ${
      currencySymbol !== undefined ? currencySymbol : ""
    }${amount}`,
    value: voucherCode,
  }));
  return parsedData;
};
