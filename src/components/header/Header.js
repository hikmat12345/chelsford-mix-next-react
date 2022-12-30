 import myHeader from "../../components/images/Rectangle.png"
import cart from "../../components/images/cart-icon.png"
import phone from "../../components/images/phone.png"
 import "../chelsfordCSS.css"           
 import { FaBars } from "react-icons/fa"
import { useState } from "react"
import { FcPhone } from "react-icons/fc"
import { Link } from "react-router-dom"
function Modal({ children, shown, close }) {
  return shown ? (
    <div
      className="modal__backdrop"
      onClick={() => {
        // close modal when outside of modal is clicked
        close()
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation()
        }}
      >
        <button onClick={close}>Close</button>
        {children}
      </div>
    </div>
  ) : null
}
const Header = () => {
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [toggle3, setToggle3] = useState(false)
  const [toggle4, setToggle4] = useState(false)
  const [toggle5, setToggle5] = useState(false)
  const [toggle6, setToggle6] = useState(false)

  return (
    <div className="header__main">
      <div className="header__img">
        <Link to="/">
          <img
            className="header__logo"
            src={myHeader}
            alt="header logo"
            width="314.1px"
            height="91.89px"
          />
        </Link>
      </div>
      <div className="short_tab">
        <div className="courses__tab__container">
          <div className="courses__tab">
            <div onClick={() => setToggle3(!toggle3)}>
              <span className="short__heading">Courses</span>
            </div>
          </div>
          <div className="portal__tab">
            <a href="/" className="portal__nav__link">
              <span className="portal__short__heading">Portal</span>
            </a>
          </div>
        </div>
      </div>
      {/* <button
        className="short_tab_line_button"
        onClick={() => setToggle(!toggle)} >
        <div className="short_tab_button">
          <span className="shot_tab_span">
            <i>
              <FaBars />
            </i>
          </span>
        </div>
      </button> */}
      {toggle && (
        <div id="myDiv" className="short_tab_expand">
          <ul className="short_tab_ul">
            <li className="short_tab_li">
              <a className="short_a_li" href="/about">
                About
              </a>
            </li>
            <li className="short_tab_li">
              <a className="short_a_li" href="/contact-us">
                Contact
              </a>
            </li>
          </ul>
          <ul className="short_tab_ul">
            <li className="short_tab_li">
              <a className="short_a_li" href="tel:0800 955 0054">
                <i className="short__i__phone">
                  <FcPhone />
                  0800 955 0054
                </i>
              </a>
            </li>
            <li className="short_tab_li">
              <a
                className="short_a_li"
                href="https://chelsford.com/login/student"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
      <div>
        <div className="sub__headers">
          {/* <button className="portal__button">Portal</button>
          <img
            className="cart__img"
            src={cart}
            alt="header logo"
            width="19px"
            height="17.01px"
            Top="-0.05px"
          /> */}
        </div>
        <ul className="hover__div">
          {toggle1 && (
            <div className="hover__container">
              <div className="hover__row">
                <div className="hover__colomn">
                  <h3 className="hover__heading">Laser</h3>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/laser-practitioner-diploma-vtct"
                    >
                      Laser Practitioner Diploma VTCT
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-4-laser-and-ipl-treatments"
                    >
                      VTCT Level 4 Laser &amp; IPL Treatments
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/level-4-laser-and-blemish-removal"
                    >
                      Level 4 Laser &amp; Blemish Removal
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/level-5-laser-tattoo-removal"
                    >
                      Level 5 Laser Tattoo Removal
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/laser-core-of-knowledge"
                    >
                      Laser Core of Knowledge
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/advanced-laser-diploma"
                    >
                      Advanced Laser Diploma
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/fat-freeze-and-body-sculpting"
                    >
                      Fat Freeze &amp; Body Sculpting
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/level-4-laser-hair-removal"
                    >
                      Level 4 Laser Hair Removal
                    </a>
                  </li>
                </div>
                <div className="hover__colomn">
                  <h3 className="hover__heading">Beauty</h3>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-2-and-3-nvq-beauty-therapy"
                    >
                      VTCT Level 2 &amp; 3 NVQ Beauty Therapy
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-2-nvq-beauty-therapy"
                    >
                      VTCT Level 2 NVQ Beauty Therapy
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-3-nvq-beauty-therapy"
                    >
                      VTCT Level 3 NVQ Beauty Therapy
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/fast-track-vtct-level-3-nvq-beauty-therapy"
                    >
                      Fast Track VTCT Level 3 NVQ Beauty Therapy
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-2-3-and-4-nvq-beauty-and-laser"
                    >
                      VTCT Level 2, 3 &amp; 4 NVQ Beauty &amp; Laser
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-2-award-facial-and-skincare"
                    >
                      VTCT Level 2 Award Facial &amp; Skincare
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-3-facial-electrotherapy"
                    >
                      VTCT Level 3 Facial Electrotherapy
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-4-skin-blemish-removal"
                    >
                      VTCT Level 4 Skin Blemish Removal
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/level-3-anatomy-and-physiology-vtct"
                    >
                      Level 3 Anatomy &amp; Physiology VTCT
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/vtct-level-3-in-epilation"
                    >
                      VTCT Level 3 in Epilation
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/cpd-advanced-chemical-peels"
                    >
                      CPD Advanced Chemical Peels
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/cpd-microneedling-diploma"
                    >
                      CPD Microneedling Diploma
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/cpd-advanced-plasma-fibroblast"
                    >
                      CPD Advanced Plasma Fibroblast
                    </a>
                  </li>
                </div>
                <div className="hover__colomn">
                  <h3 className="hover__heading">Medical</h3>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/medical-aesthetics-diploma"
                    >
                      Medical Aesthetics Diploma
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/foundation-botox-and-dermal-fillers"
                    >
                      Foundation Botox &amp; Dermal Fillers
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/advanced-botox-and-dermal-fillers"
                    >
                      Advanced Botox &amp; Dermal Fillers
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/advanced-dermal-fillers"
                    >
                      Advanced Dermal Fillers
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/prp-advanced-treatments"
                    >
                      PRP Advanced Treatments
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/intimate-laser-rejuvenation"
                    >
                      Intimate Laser Rejuvenation
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/laser-skin-resurfacing"
                    >
                      Laser Skin Resurfacing
                    </a>
                  </li>
                  <h3 className="hover__heading">Online</h3>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/laser-core-of-knowledge"
                    >
                      Laser Core of Knowledge
                    </a>
                  </li>
                  <li className="hover__item">
                    <a
                      className="hover__linka"
                      href="https://chelsford.com/course/level-3-anatomy-and-physiology-vtct"
                    >
                      Level 3 Anatomy &amp; Physiology VTCT
                    </a>
                  </li>
                </div>

                <div className="hover__colomn">
                  <img
                    src="https://chelsford.com/public/homeImages/chelsford home icons-09.png"
                    alt=""
                    srcset=""
                  />
                </div>
              </div>
            </div>
          )}
        </ul>
        {toggle3 && (
          <div className="mobile__navbar">
            <div className="mobile_navbar_container">
              <div className="mobile_navbar_row">
                <div className="mobile_navbar_button__section">
                  <button onClick={() => setToggle2(!toggle2)}>
                    <a
                      className="navBar2_buttons"
                      href="#"
                      id="laserBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                      aria-expanded="true"
                    >
                      Laser
                    </a>
                  </button>
                  <button onClick={() => setToggle4(!toggle4)}>
                    <a
                      className="navBar2_buttons"
                      href="#"
                      id="beautyBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                      aria-expanded="true"
                    >
                      Beauty
                    </a>
                  </button>
                  <button onClick={() => setToggle5(!toggle5)}>
                    <a
                      className="navBar2_buttons"
                      href="#"
                      id="medicalBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                      aria-expanded="true"
                    >
                      Medical
                    </a>
                  </button>
                  <button onClick={() => setToggle6(!toggle6)}>
                    <a
                      className="navBar2_buttons"
                      href="#"
                      id="medicalBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                      aria-expanded="true"
                    >
                      Online
                    </a>
                  </button>
                </div>
                <div className="mobile_navbar_column">
                  {toggle2 && (
                    <ul className="dropdown_laser_menu_mob_ul">
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/laser-practitioner-diploma-vtct"
                        >
                          Laser Practitioner Diploma VTCT
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-4-laser-and-ipl-treatments"
                        >
                          VTCT Level 4 Laser &amp; IPL Treatments
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/level-4-laser-and-blemish-removal"
                        >
                          Level 4 Laser &amp; Blemish Removal
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/level-5-laser-tattoo-removal"
                        >
                          Level 5 Laser Tattoo Removal
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/laser-core-of-knowledge"
                        >
                          Laser Core of Knowledge
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/advanced-laser-diploma"
                        >
                          Advanced Laser Diploma
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/fat-freeze-and-body-sculpting"
                        >
                          Fat Freeze &amp; Body Sculpting
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/level-4-laser-hair-removal"
                        >
                          Level 4 Laser Hair Removal
                        </a>
                      </li>
                    </ul>
                  )}
                  {toggle4 && (
                    <ul className="dropdown_laser_menu_mob_ul">
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-2-and-3-nvq-beauty-therapy"
                        >
                          VTCT Level 2 &amp; 3 NVQ Beauty Therapy
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-2-nvq-beauty-therapy"
                        >
                          VTCT Level 2 NVQ Beauty Therapy
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-3-nvq-beauty-therapy"
                        >
                          VTCT Level 3 NVQ Beauty Therapy
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/fast-track-vtct-level-3-nvq-beauty-therapy"
                        >
                          Fast Track VTCT Level 3 NVQ Beauty Therapy
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-2-3-and-4-nvq-beauty-and-laser"
                        >
                          VTCT Level 2, 3 &amp; 4 NVQ Beauty &amp; Laser
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-2-award-facial-and-skincare"
                        >
                          VTCT Level 2 Award Facial &amp; Skincare
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-3-facial-electrotherapy"
                        >
                          VTCT Level 3 Facial Electrotherapy
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-4-skin-blemish-removal"
                        >
                          VTCT Level 4 Skin Blemish Removal
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/level-3-anatomy-and-physiology-vtct"
                        >
                          Level 3 Anatomy &amp; Physiology VTCT
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/vtct-level-3-in-epilation"
                        >
                          VTCT Level 3 in Epilation
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/cpd-advanced-chemical-peels"
                        >
                          CPD Advanced Chemical Peels
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/cpd-microneedling-diploma"
                        >
                          CPD Microneedling Diploma
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/cpd-advanced-plasma-fibroblast"
                        >
                          CPD Advanced Plasma Fibroblast
                        </a>
                      </li>
                    </ul>
                  )}
                  {toggle5 && (
                    <ul className="dropdown_laser_menu_mob_ul">
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/medical-aesthetics-diploma"
                        >
                          Medical Aesthetics Diploma
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/foundation-botox-and-dermal-fillers"
                        >
                          Foundation Botox &amp; Dermal Fillers
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/advanced-botox-and-dermal-fillers"
                        >
                          Advanced Botox &amp; Dermal Fillers
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/advanced-dermal-fillers"
                        >
                          Advanced Dermal Fillers
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/prp-advanced-treatments"
                        >
                          PRP Advanced Treatments
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/intimate-laser-rejuvenation"
                        >
                          Intimate Laser Rejuvenation
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/fat-freeze-and-body-sculpting"
                        >
                          Fat Freeze &amp; Body Sculpting
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/laser-skin-resurfacing"
                        >
                          Laser Skin Resurfacing
                        </a>
                      </li>
                    </ul>
                  )}
                  {toggle6 && (
                    <ul className="dropdown_laser_menu_mob_ul">
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/laser-core-of-knowledge"
                        >
                          Laser Core of Knowledge
                        </a>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <a
                          className="custom_mob_nav_link"
                          href="https://chelsford.com/course/level-3-anatomy-and-physiology-vtct"
                        >
                          Level 3 Anatomy &amp; Physiology VTCT
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="sub__header2">
          <ul className="navbar">
            <a onClick={(e) => {e.preventDefault(); setToggle1(!toggle1)}} className="courses__text">Courses</a>
               

           <a href="/about-us"  className="courses__text">About Us</a>
            
           <a href="/contact-us" className="courses__text">Contact</a>
             
           {/* <a href="/listing"  className="courses__text">Models</a> */}
             
            <div className="phone__logo__No">
              <img
                className="phone__logo"
                src={phone}
                alt="header logo"
                width="15.99px"
                height="15.99px"
              />
              <p className="phone__no">0800 955 0054</p>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
