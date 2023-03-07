//libs
import { FAEContainer, FAEText, FAETitle } from "@findanexpert-fae/components";
import React from "react";

//src
import { getFileSrcFromPublicFolder } from "../../utils";

//scss
import "./AboutUsPage.scss";

const aboutUsFirstImage = getFileSrcFromPublicFolder("about_us_1.png");
const aboutUsSecondImage = getFileSrcFromPublicFolder("about_us_2.png");
const aboutUsThirdImage = getFileSrcFromPublicFolder("about_us_3.png");
const aboutUsIndustryOne = getFileSrcFromPublicFolder(
  "about_us_industry_1.svg"
);
const aboutUsIndustryTwo = getFileSrcFromPublicFolder(
  "about_us_industry_2.svg"
);
const aboutUsIndustryThree = getFileSrcFromPublicFolder(
  "about_us_industry_3.svg"
);

const AboutUsPage = () => {
  document.title = "Expert | About Us";
  return (
    <>
      <FAEContainer>
        <div className="fae--about-us-main-container dpt dpb">
            <FAETitle
              label={
                <FAEText className="fae-about-header" subHeading bold>
                  <span   style={{color: "#d9bd3e"}} > About </span>  <span   style={{color: "#1f105a"}}>Us</span>
                </FAEText>
              }
              logo={getFileSrcFromPublicFolder("title_logo.svg")}
            />
    <FAEText tertiary >
          Chelsford Institute of Higher Education is a leading provider of internationally recognised academic qualifications in the UK, having been offering its education to students for over a decade. We have more than 100 courses with full time, part-time, evening and online options to suit every student. <br/> <br/> 

Chelsford has stood the test of quality education, allowing every individual to excel and make a difference in this world. We do not merely cram one's mind with information, but we also nurture the character and integrity of each student so that they can stand on their own feet by starting their own venture or become the best employee. <br/> <br/> 

Believe that strength lies in growing from the ground up, hence our motto, "One cannot fly without roots." We let you decide the best way to learn and grow by offering part-time, evening, full-time, and online courses. Our funded and private courses are an affordable route to helping you achieve your goals and fulfil your potential no matter what subject area you wish to study. With a dedicated Academic Support Team and flexible, fully recognised qualifications, we have a range of options for you, whatever your educational background or goals.<br/> <br/> 

If you're an international student thinking of studying abroad in the UK, Chelsford Institute's Visa & Immigration Service will help you easily navigate the UK's visa application process and achieve your dream of higher education.<br/> <br/> 

We believe every individual has something to offer this world. That's why we tailor our courses and facilities around your needs so that you can reach your full potential and make the grade in your own personal way. <br/> <br/> 

Come over to our sparkling new facility and see how Chelseford can change your future.
          </FAEText>
           
        </div>
      </FAEContainer>
    </>
  );
};

export default AboutUsPage;
