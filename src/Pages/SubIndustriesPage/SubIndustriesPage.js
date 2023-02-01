//libs
import React, { useEffect } from "react";
import {  FAETitle } from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

//src
import { addSpaces, getFileSrcFromPublicFolder } from "../../utils";
import { getSubIndustries } from "../../redux/actions/subIndustriesPageActions";
import { faeSubIndustriesParser } from "../../parsers";

//scss
import "./SubIndustriesPage.scss";
import { FAEText } from "@findanexpert-fae/components";
import { FAELoading } from "@findanexpert-fae/components";
import { FAESubIndustries } from "../../Temps/FAESubIndustries/FAESubIndustries";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const SubIndustriesPage = ({
  getSubIndustries,
  subIndustries = [],
  loading,
  userCountryId,
  error,
}) => {
  const { industry } = useParams();
  const industryName = addSpaces(industry, "-");
  document.title = `Chelsford | ${industryName}`;
  useEffect(() => {
    if (userCountryId !== "") {
      getSubIndustries({ industryName, userCountryId });
    }
  }, [getSubIndustries, industryName, userCountryId]);
  const doPadding= subIndustries?.length<4 ?(subIndustries.length==1 ?{paddingBottom: 354}:{paddingBottom: 350}): {paddingBottom: 40}
  
  if (loading) {
    return <FAELoading type="svg" loaderImage={loaderImage} height="630px" />;
  } 
  return (
    <>
      <div className="fae--sub-industries-page-container dpt dpb" style={doPadding} >
        <div className="fae--sub-industries-page-wrapper">
          <FAETitle
            label={industryName}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          <FAESubIndustries
            loading={loading}
            loaderProps={{
              loaderImage,
              height: "150px",
              type: "video",
            }}
            subIndustries={faeSubIndustriesParser(subIndustries)}
            shadowBoxProps={{ primary: true }}
          />
          { !loading && Array.isArray(subIndustries)? (subIndustries.length ==0? <FAEText className="ResultEmpty" subHeading style={{textAlign: "center"}}> <img src={getFileSrcFromPublicFolder("result not found-img.png")} /></FAEText>:""):""
          } 
         </div>
      </div>
    </>
  );
};

const mapStateToProps = ({
  subIndustriesPageReducer: { error, loading, subIndustries },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  subIndustries,
  userCountryId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSubIndustries,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SubIndustriesPage);
