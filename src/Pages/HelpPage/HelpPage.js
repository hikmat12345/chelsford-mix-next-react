//libs
import React, { useEffect, Children, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  FAEContainer,
  FAEText,
  FAETitle,
  FAELoading,
} from "@findanexpert-fae/components";

//src
import { getFaqs } from "../../redux/actions/helpPageActions";
import { getFileSrcFromPublicFolder } from "../../utils";

//scss
import "./HelpPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const HelpPage = ({help, error, loading, faqs, userCountry, getFaqs }) => {
  document.title = "Expert | Need Help";
  useEffect(() => {
    if (userCountry !== "") {
      getFaqs({ userCountry, pageNumber: 1 });
    }
  }, [getFaqs, userCountry]);

  return (
    <>
      <FAEContainer>
        <div className={`faqs-wrapper dpb dpt`}>
          <FAETitle
            label={help ==undefined?"Help": ""}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="630px" />
          )}
          {!loading && (
            <Fragment>
              {Children.toArray(
                faqs.map((faq, index) => {
                  const { question, answer } = faq;
                  return (
                    <Accordion key={index} className="faq--accordion">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <FAEText>{question}</FAEText>
                      </AccordionSummary>
                      <AccordionDetails>
                        <FAEText className="faq--page-answers" tertiary>
                          <div dangerouslySetInnerHTML={{ __html: answer }} />
                        </FAEText>
                      </AccordionDetails>
                    </Accordion>
                  );
                })
              )}
            </Fragment>
          )}
        </div>
      </FAEContainer>
    </>
  );
};

const mapStateToProps = ({
  helpPageReducer: { error, loading, faqs },
  defaultReducer: { userCountry },
}) => ({
  error,
  loading,
  faqs,
  userCountry,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getFaqs }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HelpPage);
