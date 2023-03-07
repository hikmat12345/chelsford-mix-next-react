 import FooterLogo1 from "../images/footerLogo1.png"
import { TiSocialYoutubeCircular } from "react-icons/ti"
import { CiMail, CiTwitter } from "react-icons/ci"
import { BiPhone } from "react-icons/bi"
import { FaMapMarkerAlt, FaInstagram } from "react-icons/fa"
import { SlSocialFacebook } from "react-icons/sl"
import "../chelsfordCSS.css"               
import { Link } from "react-router-dom"
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
                    <Link to="/" className="link__social__icons">
                      <i>
                        <SlSocialFacebook className="icons__all" />
                      </i>
                    </Link>
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
                 
               
                <li className="footer__container__2__course__list">
                    <Link
                      to="/course/vtct-level-4-laser-and-ipl-treatments"
                        className="footer__container__2__course__list__link" >
                      VTCT NVQ Level 4 Laser and IPL Training
                    </Link>
                  </li>
                  <li className="footer__container__2__course__list">
                    <Link
                      to="/course/level-4-laser-and-blemish-removal"
                      className="footer__container__2__course__list__link"
                      >
                        Level 4 Laser and Blemish Removal
                      </Link>
                  </li>
                  <li className="footer__container__2__course__list">
                    <Link
                      to="/course/laser-practitioner-diploma-vtct"
                      className="footer__container__2__course__list__link"
                    >
                    Laser Practitioner Diploma VTCT
                    </Link>
                  </li> 
                  <li className="footer__container__2__course__list">
                    <Link to="/course/level-5-laser-tattoo-removal"
                      className="footer__container__2__course__list__link" >
                      Level 5 Laser Tattoo Removal
                      </Link>
                  </li>
                  <li className="footer__container__2__course__list">
                    <Link
                      to="/course/advanced-laser-diploma"
                      className="footer__container__2__course__list__link"
                    > 
                        Advanced Laser Diploma
                    </Link>
                  </li>
                  <li className="footer__container__2__course__list">
                    <Link
                      to="/course/fat-freeze-and-body-sculpting"
                      className="footer__container__2__course__list__link"
                    >
                      Fat Freeze and Body Sculpting 
                    </Link>
                  </li>
                  <li className="footer__container__2__course__list">
                    <Link
                      to="/course/level-4-laser-hair-removal"
                      className="footer__container__2__course__list__link"
                    >
                      Level 4 Laser Hair Removal 
                    </Link>
                  </li>
                  <li className="footer__container__2__course__list">
                      <Link  className="footer__container__2__course__list__link"
                        to="/course/laser-core-of-knowledge" >
                        Laser Core of Knowledge
                      </Link>
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
              <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-2-nvq-beauty-therapy"
                    className="footer__container__2__course__list__link"
                  >
                    NVQ Level 2 Beauty Therapy
                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-3-nvq-beauty-therapy"
                    className="footer__container__2__course__list__link" >
                    NVQ Level 3 Beauty Therapy
                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/fast-track-vtct-level-3-nvq-beauty-therapy"
                    className="footer__container__2__course__list__link"
                  >
                     Fast Track VTCT Level 3 NVQ Beauty Therapy
                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-2-and-3-nvq-beauty-therapy"
                    className="footer__container__2__course__list__link"
                  >
                     VTCT Level 2 and 3 NVQ Beauty Therapy
                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-2-3-and-4-nvq-beauty-and-laser"
                    className="footer__container__2__course__list__link"
                  >
                     VTCT Level 2, 3 and 4 NVQ Beauty & Laser
                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-2-award-facial-and-skincare"
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 2 Award Facials

                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-3-in-epilation"
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 3 in Epilation

                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-3-facial-electrotherapy"
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 3 Facial Electrotherapy
                  </Link>
                </li>
                
                  <li className="footer__container__2__course__list">
                  <Link
                    to="/course/vtct-level-4-skin-blemish-removal"
                    className="footer__container__2__course__list__link"
                  >
                    VTCT Level 4 Skin Blemish Removal
                  </Link>
                </li>
               
                
               
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/cpd-advanced-chemical-peels"
                    className="footer__container__2__course__list__link"
                  >
                    CPD Advanced Chemical Peels
                  </Link>
                </li>
               
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/cpd-advanced-plasma-fibroblast"
                    className="footer__container__2__course__list__link"
                  >
                    CPD Advanced Plasma Fibroblast
                  </Link>
                </li>
                
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/cpd-microneedling-diploma"
                    className="footer__container__2__course__list__link" >
                      CPD-Microneedling-Diploma
                  </Link>
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
               
              <li className="footer__container__2__course__list">
                  <Link
                    to="/course/Medical-Aesthetics-Diploma"
                    className="footer__container__2__course__list__link"
                  >
                    Medical Aesthetics Diploma 
                  </Link>
                </li>
                {/* <li className="footer__container__2__course__list">
                  <Link
                    to="/course/foundation-botox-and-dermal-fillers"
                    className="footer__container__2__course__list__link"
                  >
                    Foundation Botox & Dermal Fillers 
                  </Link>
                </li> */}
                {/* <li className="footer__container__2__course__list">
                  <Link
                    to="/course/advanced-botox-and-dermal-fillers"
                    className="footer__container__2__course__list__link"
                  >
                    Advanced Botox & Dermal Fillers
                  </Link>
                </li> */}
                <li className="footer__container__2__course__list">
                    <Link
                     className="footer__container__2__course__list__link"
                      to="/course/advanced-dermal-fillers" >
                      Advanced Dermal Fillers
                    </Link>
                  </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/prp-advanced-treatments"
                    className="footer__container__2__course__list__link" >
                     PRP Advanced Treatments 
                  </Link>
                </li>
                
                 
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/laser-skin-resurfacing-training"
                    className="footer__container__2__course__list__link"
                  >
                    Laser Skin Resurfacing Training
                  </Link>
                </li>
                <li className="footer__container__2__course__list">
                  <Link
                    to="/course/intimate-laser-rejuvenation"
                    className="footer__container__2__course__list__link"
                  >
                     Intimate Laser Rejuvenation Training 
                  </Link>
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
                       <span className="address">50 Mark Lane (First Floor)<br />
                       London EC3R 7QR  </span>
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
