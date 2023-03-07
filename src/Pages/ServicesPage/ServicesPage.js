//libs
import React, { useEffect } from "react";
import {
  FAEVerticalScrollServices,
  FAETitle,
  // FAESubServices,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

//src
import { addSpaces, getFileSrcFromPublicFolder } from "../../utils";
import { getServices } from "../../redux/actions/servicesPageActions";
import { faeServicesParser } from "../../parsers";

//scss
import "./ServicesPage.scss";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";
import { FAELoading } from "@findanexpert-fae/components/dist/stories/FAELoading/FAELoading";
import  ChelsFordTrainingCard  from "../../components/trainings/ChelsFordTrainingCard";
 
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholder = getFileSrcFromPublicFolder("placeholder.jpg");

export const ServicesPage = ({
  getServices,
  services = [],
  loading,
  error,
  userCountryId,
  propsCountryId,
  propsIndustryName,
  con_padding_props
}) => {
  const { industry } = useParams();
  const industryName = addSpaces(propsIndustryName, "-");
  document.title = `Chelsford | ${industryName}`;
  console.log(propsIndustryName, 'propsIndustryName')
  useEffect(() => {
    if (propsCountryId !== "") {
      getServices({ industryName:industryName, userCountryId: propsCountryId });
    }
  }, [getServices, industryName, userCountryId]);
  if (loading) {
    return <FAELoading type="svg" loaderImage={loaderImage} height="630px" />;
  } 
  const doPadding= services?.length<4 ?(services.length==1 ? 254: 220):  254
  return (
    <>
      <div className="fae--services-page-container dpb"  style={{paddingBottom:con_padding_props?con_padding_props:doPadding}}>
          {/* <FAETitle
            label={industryName}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />  */}
          {!loading && 
             <> 
              <FAEVerticalScrollServices
                className="fae--services-page-services-container"
                loading={loading}
                loaderProps={{
                  loaderImage,
                  height: "200px",
                  type: "video",
                }}
                services={faeServicesParser(services.slice(0,4))}
                primary
                placeholder={placeholder}
              />
            <div className="cfd-courses-list">
            <FAEVerticalScrollServices
                className="fae--services-page-services-container"
                loading={loading}
                loaderProps={{
                  loaderImage,
                  height: "200px",
                  type: "video",
                }}
                services={faeServicesParser(services.slice(4,19))}
                primary
                placeholder={placeholder}
              />
            </div>
           {!loading && Array.isArray(services) ? (services?.length !==0? "":<FAEText className="ResultEmpty" subHeading style={{textAlign: "center"}}><img src={getFileSrcFromPublicFolder("result not found-img.png")} /></FAEText>):"" }
       
          </>
        }
      </div>
    </>
  );
};

const mapStateToProps = ({
  servicesPageReducer: { error, loading, services },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  services,
  userCountryId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getServices,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);
