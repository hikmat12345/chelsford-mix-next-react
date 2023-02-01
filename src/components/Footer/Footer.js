 import FooterLogo1 from "../images/footerLogo1.png"
import { TiSocialYoutubeCircular } from "react-icons/ti"
import { CiMail, CiTwitter } from "react-icons/ci"
import { BiPhone } from "react-icons/bi"
import { FaMapMarkerAlt, FaInstagram } from "react-icons/fa"
import { SlSocialFacebook } from "react-icons/sl"
import "../chelsfordCSS.css"               
 const Footer = () => {
 
  return (
    <div className="Footer__main">
      <div className="footer__container">
        <div className="footer__container__row">
          <div className="footer__container__1">
            <div className="footer__container__1__content">
              <div className="footer__container__image__part">
                <img className="footer__img" src={FooterLogo1} />
              </div>
              <div className="footer__icons">
                <ul className="footer__social__icons">
                  <li className="list__social__icons">
                    <a href="https://www.facebook.com/ExpertAppUk" className="link__social__icons">
                      <i>
                        <SlSocialFacebook className="icons__all" />
                      </i>
                    </a>
                  </li>
                  <li className="list__social__icons">
                    <a href="https://www.instagram.com/expertappuk/" className="link__social__icons">
                      <i>
                        <FaInstagram className="icons__all" />
                      </i>
                    </a>
                  </li>
                  <li className="list__social__icons">
                    <a href="https://twitter.com/expertappuk" className="link__social__icons">
                      <i>
                        <CiTwitter className="icons__all" />
                      </i>
                    </a>
                  </li>
                  <li className="list__social__icons">
                    <a href="https://www.youtube.com/channel/UCCr1Cv5QiiGsEztlFYG8OQw" className="link__social__icons">
                      <i>
                        <TiSocialYoutubeCircular className="icons__all" />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__container__2">
            <div className="footer__container__2__content">
              <div className="footer__container__2__header">
                <h3 className="footer__container__2__heading">
                  Laser Training 
                </h3>
              </div>
              <ul className="footer__container__2__course__list">
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Level-5-Laser-Tattoo-Removal"
                    className="footer__container__2__course__list__link"
                  >
                    Level 5 Laser Tattoo Removal
                    </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Advanced-Laser-Diploma"
                    className="footer__container__2__course__list__link"
                   > 
                       Advanced Laser Diploma
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Laser-Practitioner-Diploma-VTCT"
                    className="footer__container__2__course__list__link"
                  >
                   Laser Practitioner Diploma VTCT
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Level-4-Laser-and-Blemish-Removal"
                    className="footer__container__2__course__list__link"
                  >
                    Level 4 Laser and Blemish Removal
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/VTCT-NVQ-Level-4-Laser-and-IPL-Training"
                    className="footer__container__2__course__list__link"
                  >
                     VTCT NVQ Level 4 Laser and IPL Training
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Fat-Freeze-and-Body-Sculpting"
                    className="footer__container__2__course__list__link"
                  >
                    Fat Freeze and Body Sculpting 
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Level-4-Laser-Hair-Removal"
                    className="footer__container__2__course__list__link"
                  >
                     Level 4 Laser Hair Removal 
                  </a>
                </li>
              </ul>
            </div>
          </div> 
 







          <div className="footer__container__2">
            <div className="footer__container__2__content">
              <div className="footer__container__2__header">
                <h3 className="footer__container__2__heading">Beauty Training</h3>
              </div>
              <ul className="footer__container__2__course__list">
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/VTCT-Level-4-Skin-Blemish-Removal"
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 4 Skin Blemish Removal
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/VTCT-Level-2-and-3-NVQ-Beauty-Therapy"
                    className="footer__container__2__course__list__link"
                  >
                     VTCT Level 2 and 3 NVQ Beauty Therapy
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/VTCT-Level-2,-3-and-4-NVQ-Beauty-&-Laser"
                    className="footer__container__2__course__list__link"
                  >
                     VTCT Level 2, 3 and 4 NVQ Beauty & Laser
                  </a>
                </li>
                {/* <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/fast-track-vtct-level-3-nvq-beauty-therapy"
                    className="footer__container__2__course__list__link">
                    Fast Track VTCT Level 3 NVQ Beauty Therapy
                  </a>
                </li> */}
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/VTCT-Level-3-in-Epilation"
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 3 in Epilation

                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/CPD-Advanced-Chemical-Peels"
                    className="footer__container__2__course__list__link"
                  >
                    CPD Advanced Chemical Peels
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/VTCT-Level-2-Award-Facials
                    "
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 2 Award Facials

                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/VTCT-Level-3-Facial-Electrotherapy"
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 3 Facial Electrotherapy
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/CPD-Advanced-Plasma-Fibroblast"
                    className="footer__container__2__course__list__link"
                  >
                    CPD Advanced Plasma Fibroblast
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/nvq-level-2-beauty-therapy"
                    className="footer__container__2__course__list__link"
                  >
                    NVQ Level 2 Beauty Therapy
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/NVQ-Level-3-Beauty-Therapy"
                    className="footer__container__2__course__list__link"
                  >
                    NVQ Level 3 Beauty Therapy
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/cpd-microneedling-diploma"
                    className="footer__container__2__course__list__link"
                  >
                    Cpd Microneedling Diploma
                  </a>
                </li>
              </ul>
            </div>
          </div>

  

          <div className="footer__container__2">
            <div className="footer__container__2__content">
              <div className="footer__container__2__header">
                <h3 className="footer__container__2__heading"> Medical Training </h3>
              </div>
              <ul className="footer__container__2__course__list">
               
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/PRP-Advanced-Treatments"
                    className="footer__container__2__course__list__link"
                  >
                     PRP Advanced Treatments 
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Intimate-Laser-Rejuvenation-Training "
                    className="footer__container__2__course__list__link"
                  >
                     Intimate Laser Rejuvenation Training 
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Laser-Skin-Resurfacing-Training"
                    className="footer__container__2__course__list__link"
                  >
                    Laser Skin Resurfacing Training
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Medical-Aesthetics-Diploma"
                    className="footer__container__2__course__list__link"
                  >
                    Medical Aesthetics Diploma 
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Foundation-Botox-and-Dermal-Fillers"
                    className="footer__container__2__course__list__link"
                  >
                    Foundation Botox and Dermal Fillers 
                  </a>
                </li>
                <li className="footer__container__2__course__list__number">
                  <a
                    href="/services/Advanced-Botox-and-Dermal-Fillers"
                    className="footer__container__2__course__list__link"
                  >
                    Advanced Botox and Dermal Fillers
                  </a>
                </li>
              </ul>
            </div>
          </div>

 
          <div className="footer__container__2">
            <div className="footer__container__2__content">
              <div className="footer__container__2__header">
                <h3 className="footer__container__2__heading">Contact</h3>
              </div>
              <ul className="footer__container__2__course__list">
                <li className="footer__container__2__course__list__number">
                  <p className="footer__container__2__course__list__link">
                    <i className="footer__icons_all">
                      <BiPhone />
                      <a href="tel:0800 955 0054" className="text__a">
                        0800 955 0054
                      </a>
                    </i>
                  </p>
                </li>
                <li className="footer__container__2__course__list__number">
                  <p className="footer__container__2__course__list__link">
                    <i className="footer__icons_all">
                      <CiMail />
                      <a
                        href="mailto:team@chelsford.com"
                        className="text__a"
                      >
                        team@chelsford.com
                      </a>
                    </i>
                  </p>
                </li>
                <li className="footer__container__2__course__list__number">
                  <p className="footer__container__2__course__list__link">
                    <strong></strong>
                    <span className="footer__icons_all">
                      <FaMapMarkerAlt />
                      31-32 Eastcastle Street, <br /> London W1W 8DL
                    </span>
                  </p>
                </li>
                {/* <li className="footer__container__2__course__list__number">
                  <p className="footer__container__2__course__list__link">
                    <strong></strong>
                    <span className="footer__icons_all">
                      <FaMapMarkerAlt />
                      31-32 Eastcastle Street, <br /> London W1W 8DL
                    </span>
                  </p>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
