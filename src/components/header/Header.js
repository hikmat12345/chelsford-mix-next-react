 import myHeader from "../../components/images/Rectangle.png"
import cart from "../../components/images/cart-icon.png"
import phone from "../../components/images/phone.png"
 import "../chelsfordCSS.css"           
 import { FaBars } from "react-icons/fa"
import { useState , useRef, useEffect } from "react"
import { FcPhone } from "react-icons/fc"
import { Link, useLocation } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
  document?.querySelector(".fae--navbar-items-section-container")?.addEventListener("click", ()=>{
    console.log("clicked")
    // document.querySelector(".hover__div").style.display=="none"? document.querySelector(".hover__div").style.display="none": document.querySelector(".hover__div").style.display="none";
    setToggle3(false)
  })
 

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setToggle1(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  const location = useLocation();

  useEffect(() => {
    console.log('Location changed', toggle1);
    // change the navbar view state here
    if(toggle1==true){
      setToggle1(!toggle1)
    }
    if(toggle2 || toggle4 || toggle5 || toggle6){ 
      setToggle2(false)
      setToggle5(false)
      setToggle6(false)
      setToggle4(false)
    }
   }, [location]);
  return (
    <div className="header__main" ref = {menuRef}>
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
            <div onClick={() =>{  document.querySelector(".hover__div").style.display=="none"? document.querySelector(".hover__div").style.display="initial": document.querySelector(".hover__div").style.display="none"; setToggle3(!toggle3)}}>
              <span className="short__heading">Courses</span>
            </div>
          </div>
          <div className="portal__tab">
            {/* <a href="/" className="portal__nav__link">
              <span className="portal__short__heading">Portal</span>
            </a> */}
          </div>
        </div>
      </div> 
      {toggle && (
        <div id="myDiv" className="short_tab_expand">
          <ul className="short_tab_ul">
            <li className="short_tab_li">
             <a  className="short_a_li" href="/about">
                About
              </a>
            </li>
            <li className="short_tab_li">
              <Link className="short_a_li" href="/contact-us">
                Contact
              </Link>
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
                href="https://chelsford.com/login/student" >
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
      <div className="header-secion" style={{width:"100%", position:"relative"}}>
        <div className="sub__headers">
         
        </div>
        <ul className="hover__div">
          {toggle1 && (
            <div className="hover__container">
              <div className="hover__row">
                <div className="hover__colomn">
                  <h3 className="hover__heading">Laser</h3>
                   <li className="hover__item">
                    <Link
                      to="/course/vtct-level-4-laser-and-ipl-treatments"
                        className="hover__linka" >
                      VTCT NVQ Level 4 Laser and IPL Training
                    </Link>
                  </li>
                  <li className="hover__item">
                    <Link
                      to="/course/level-4-laser-and-blemish-removal"
                      className="hover__linka"
                      >
                        Level 4 Laser and Blemish Removal
                      </Link>
                  </li>
                  <li className="hover__item">
                    <Link
                      to="/course/laser-practitioner-diploma-vtct"
                      className="hover__linka"
                    >
                    Laser Practitioner Diploma VTCT
                    </Link>
                  </li> 
                  <li className="hover__item">
                    <Link to="/course/level-5-laser-tattoo-removal"
                      className="hover__linka" >
                      Level 5 Laser Tattoo Removal
                      </Link>
                  </li>
                  <li className="hover__item">
                    <Link
                      to="/course/advanced-laser-diploma"
                      className="hover__linka"
                    > 
                        Advanced Laser Diploma
                    </Link>
                  </li>
                  <li className="hover__item">
                    <Link
                      to="/course/fat-freeze-and-body-sculpting"
                      className="hover__linka"
                    >
                      Fat Freeze and Body Sculpting 
                    </Link>
                  </li>
                  <li className="hover__item">
                    <Link
                      to="/course/level-4-laser-hair-removal"
                      className="hover__linka"
                    >
                      Level 4 Laser Hair Removal 
                    </Link>
                  </li>
                  <li className="hover__item">
                      <Link  className="hover__linka"
                        to="/course/laser-core-of-knowledge" >
                        Laser Core of Knowledge
                      </Link>
                  </li>
                </div>

 
                <div className="hover__colomn">
                  <h3 className="hover__heading">Beauty</h3>
                  <li className="hover__item">
                  <Link
                    to="/course/vtct-level-2-nvq-beauty-therapy"
                    className="hover__linka"
                  >
                    NVQ Level 2 Beauty Therapy
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/vtct-level-3-nvq-beauty-therapy"
                    className="hover__linka" >
                    NVQ Level 3 Beauty Therapy
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/fast-track-vtct-level-3-nvq-beauty-therapy"
                    className="hover__linka"
                  >
                     Fast Track VTCT Level 3 NVQ Beauty Therapy
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/vtct-level-2-and-3-nvq-beauty-therapy"
                    className="hover__linka"
                  >
                     VTCT Level 2 and 3 NVQ Beauty Therapy
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/vtct-level-2-3-and-4-nvq-beauty-and-laser"
                    className="hover__linka"
                  >
                     VTCT Level 2, 3 and 4 NVQ Beauty & Laser
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/vtct-level-2-award-facial-and-skincare"
                    className="hover__linka"
                  >
                    VTCT Level 2 Award Facials

                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/vtct-level-3-in-epilation"
                    className="hover__linka"
                  >
                    VTCT Level 3 in Epilation

                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/vtct-level-3-facial-electrotherapy"
                    className="hover__linka"
                  >
                    VTCT Level 3 Facial Electrotherapy
                  </Link>
                </li>
                
                  <li className="hover__item">
                  <Link
                    to="/course/vtct-level-4-skin-blemish-removal"
                    className="hover__linka"
                  >
                    VTCT Level 4 Skin Blemish Removal
                  </Link>
                </li>
               
                
               
                <li className="hover__item">
                  <Link
                    to="/course/cpd-advanced-chemical-peels"
                    className="hover__linka"
                  >
                    CPD Advanced Chemical Peels
                  </Link>
                </li>
               
                <li className="hover__item">
                  <Link
                    to="/course/cpd-advanced-plasma-fibroblast"
                    className="hover__linka"
                  >
                    CPD Advanced Plasma Fibroblast
                  </Link>
                </li>
                
                <li className="hover__item">
                  <Link
                    to="/course/cpd-microneedling-diploma"
                    className="hover__linka" >
                      CPD-Microneedling-Diploma
                  </Link>
                </li>
                </div>






                <div className="hover__colomn">
                  <h3 className="hover__heading">Medical</h3>
                  <li className="hover__item">
                  <Link
                    to="/course/Medical-Aesthetics-Diploma"
                    className="hover__linka"
                  >
                    Medical Aesthetics Diploma 
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/foundation-botox-and-dermal-fillers"
                    className="hover__linka"
                  >
                    Foundation Botox & Dermal Fillers 
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/advanced-botox-and-dermal-fillers"
                    className="hover__linka"
                  >
                    Advanced Botox & Dermal Fillers
                  </Link>
                </li>
                <li className="hover__item">
                    <Link
                     className="hover__linka"
                      to="/course/advanced-dermal-fillers" >
                      Advanced Dermal Fillers
                    </Link>
                  </li>
                <li className="hover__item">
                  <Link
                    to="/course/prp-advanced-treatments"
                    className="hover__linka" >
                     PRP Advanced Treatments 
                  </Link>
                </li>
                
                 
                <li className="hover__item">
                  <Link
                    to="/course/laser-skin-resurfacing-training"
                    className="hover__linka"
                  >
                    Laser Skin Resurfacing Training
                  </Link>
                </li>
                <li className="hover__item">
                  <Link
                    to="/course/intimate-laser-rejuvenation"
                    className="hover__linka"
                  >
                     Intimate Laser Rejuvenation Training 
                  </Link>
                </li>
                
                <div className="hover__colomn">
                  <h3 className="hover__heading">Online</h3> 
                    <li className="hover__item">
                      <Link
                        to="/course/laser-core-of-knowledge"
                      className="hover__linka" >
                        Laser Core Of Knowledge 
                      </Link>
                    </li>
                    <li className="hover__item">
                      <Link
                        to="/course/level-3-anatomy-and-physiology-vtct"
                      className="hover__linka" >
                        Level 3 Anatomy & Physiology VTCT
                      </Link>
                    </li> 
                </div>
              </div>
              {/* <div className="hover__colomn">
                  <img
                    src="https://chelsford.com/public/homeImages/chelsford home icons-09.png"
                    alt=""
                    srcset=""
                  />
                </div> */}
              </div>
            </div>
          )}
        </ul>
        {toggle3 && (
          <div className="mobile__navbar">
            <div className="mobile_navbar_container">
              <div className="mobile_navbar_row">
                <div className="mobile_navbar_button__section">
                  <button onClick={() =>{
                     setToggle4(false)
                     setToggle5(false)
                     setToggle6(false)
                     setToggle2(!toggle2)}}>
                    <div
                      className="navBar2_buttons"
                      id="laserBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                     
                    >
                      Laser
                    </div>
                  </button>
                  <button onClick={() =>{
                    setToggle2(false)
                    setToggle5(false)
                    setToggle6(false)
                    setToggle4(!toggle4)}}>
                    <div
                      className="navBar2_buttons"
                      id="beautyBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                      aria-expanded="true" >
                      Beauty
                    </div>
                  </button>
                  <button onClick={() => {
                    setToggle2(false)
                    setToggle4(false) 
                    setToggle6(false) 
                    setToggle5(!toggle5)}}>
                  <div
                      className="navBar2_buttons"
                      id="medicalBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                      aria-expanded="true"
                    >
                      Medical
                    </div>
                  </button>
                  <button onClick={() =>{
                  setToggle2(false)
                  setToggle4(false)
                  setToggle5(false)
                  setToggle6(!toggle6)
                }}>
                    <div
                      className="navBar2_buttons"
                      id="medicalBtnTab"
                      data-toggle="collapse"
                      data-target=".dropdown-laser-menu-mobile"
                      aria-expanded="true"
                    >
                      Online
                    </div>
                  </button>
                </div>
                <div className="mobile_navbar_column">
                  {toggle2 && (
                    <ul className="custom_mob_nav_sub_item dropdown_laser_menu_mob_ul">
                       <h3 className="hover__heading">Laser</h3>
                   
                  
                 

                      <li className="custom_mob_nav_link">
                          <Link
                            to="/course/vtct-level-4-laser-and-ipl-treatments"
                              className="custom_mob_nav_link" >
                            VTCT NVQ Level 4 Laser and IPL Training
                          </Link>
                        </li>
                        <li className="custom_mob_nav_link">
                          <Link
                            to="/course/level-4-laser-and-blemish-removal"
                            className="custom_mob_nav_link"
                            >
                              Level 4 Laser and Blemish Removal
                            </Link>
                        </li>
                        <li className="custom_mob_nav_link">
                          <Link
                            to="/course/laser-practitioner-diploma-vtct"
                            className="custom_mob_nav_link"
                          >
                          Laser Practitioner Diploma VTCT
                          </Link>
                        </li> 
                        <li className="custom_mob_nav_link">
                          <Link to="/course/level-5-laser-tattoo-removal"
                            className="custom_mob_nav_link" >
                            Level 5 Laser Tattoo Removal
                            </Link>
                        </li>
                        <li className="custom_mob_nav_link">
                          <Link
                            to="/course/advanced-laser-diploma"
                            className="custom_mob_nav_link"
                          > 
                              Advanced Laser Diploma
                          </Link>
                        </li>
                        <li className="custom_mob_nav_link">
                          <Link
                            to="/course/fat-freeze-and-body-sculpting"
                            className="custom_mob_nav_link"
                          >
                            Fat Freeze and Body Sculpting 
                          </Link>
                        </li>
                        <li className="custom_mob_nav_link">
                          <Link
                            to="/course/level-4-laser-hair-removal"
                            className="custom_mob_nav_link"
                          >
                            Level 4 Laser Hair Removal 
                          </Link>
                        </li>
                        <li className="custom_mob_nav_link">
                            <Link  className="custom_mob_nav_link"
                              to="/course/laser-core-of-knowledge" >
                              Laser Core of Knowledge
                            </Link>
                        </li>
                      </ul>
                    )}
                  {toggle4 && (
                      <ul className="dropdown_laser_menu_mob_ul">
                            <h3 className="hover__heading">Beauty</h3>
                            <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-2-nvq-beauty-therapy"
                          className="custom_mob_nav_link"
                        >
                          NVQ Level 2 Beauty Therapy
                        </Link>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-3-nvq-beauty-therapy"
                          className="custom_mob_nav_link" >
                          NVQ Level 3 Beauty Therapy
                        </Link>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/fast-track-vtct-level-3-nvq-beauty-therapy"
                          className="custom_mob_nav_link"
                        >
                          Fast Track VTCT Level 3 NVQ Beauty Therapy
                        </Link>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-2-and-3-nvq-beauty-therapy"
                          className="custom_mob_nav_link"
                        >
                          VTCT Level 2 and 3 NVQ Beauty Therapy
                        </Link>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-2-3-and-4-nvq-beauty-and-laser"
                          className="custom_mob_nav_link"
                        >
                          VTCT Level 2, 3 and 4 NVQ Beauty & Laser
                        </Link>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-2-award-facial-and-skincare"
                          className="custom_mob_nav_link"
                        >
                          VTCT Level 2 Award Facials

                        </Link>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-3-in-epilation"
                          className="custom_mob_nav_link"
                        >
                          VTCT Level 3 in Epilation

                        </Link>
                      </li>
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-3-facial-electrotherapy"
                          className="custom_mob_nav_link"
                        >
                          VTCT Level 3 Facial Electrotherapy
                        </Link>
                      </li>
                      
                        <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/vtct-level-4-skin-blemish-removal"
                          className="custom_mob_nav_link"
                        >
                          VTCT Level 4 Skin Blemish Removal
                        </Link>
                      </li>
                     
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/cpd-advanced-chemical-peels"
                          className="custom_mob_nav_link"
                        >
                          CPD Advanced Chemical Peels
                        </Link>
                      </li>
                    
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/cpd-advanced-plasma-fibroblast"
                          className="custom_mob_nav_link"
                        >
                          CPD Advanced Plasma Fibroblast
                        </Link>
                      </li>
                      
                      <li className="custom_mob_nav_sub_item">
                        <Link
                          to="/course/cpd-microneedling-diploma"
                          className="custom_mob_nav_link" >
                            CPD-Microneedling-Diploma
                        </Link>
                      </li>        
                      </ul>
                    )}
                    {toggle5 && (
                      <ul className="dropdown_laser_menu_mob_ul">
                        <h3 className="hover__heading">Medical</h3>

                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/Medical-Aesthetics-Diploma"
                            className="custom_mob_nav_link"
                          >
                            Medical Aesthetics Diploma 
                          </Link>
                        </li>
                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/foundation-botox-and-dermal-fillers"
                            className="custom_mob_nav_link"
                          >
                            Foundation Botox & Dermal Fillers 
                          </Link>
                        </li>
                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/advanced-botox-and-dermal-fillers"
                            className="custom_mob_nav_link"
                          >
                            Advanced Botox & Dermal Fillers
                          </Link>
                        </li>
                        <li className="custom_mob_nav_sub_item">
                            <Link
                            className="custom_mob_nav_link"
                              to="/course/advanced-dermal-fillers" >
                              Advanced Dermal Fillers
                            </Link>
                          </li>
                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/prp-advanced-treatments"
                            className="custom_mob_nav_link" >
                            PRP Advanced Treatments 
                          </Link>
                        </li>
                        
                        
                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/laser-skin-resurfacing-training"
                            className="custom_mob_nav_link"
                          >
                            Laser Skin Resurfacing Training
                          </Link>
                        </li>
                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/intimate-laser-rejuvenation"
                            className="custom_mob_nav_link"
                          >
                            Intimate Laser Rejuvenation Training 
                          </Link>
                        </li>
 
                   </ul>
                  )}
                  {toggle6 && (
                    <ul className="dropdown_laser_menu_mob_ul">
                       <h3 className="hover__heading">Online</h3>
                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/laser-core-of-knowledge"
                            className="custom_mob_nav_link" >
                            Laser Core Of Knowledge 
                          </Link>
                        </li>
                        <li className="custom_mob_nav_sub_item">
                          <Link
                            to="/course/level-3-anatomy-and-physiology-vtct"
                            className="custom_mob_nav_link" >
                            Level 3 Anatomy & Physiology VTCT
                          </Link>
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
            <button onClick={(e) => {e.preventDefault(); setToggle1(!toggle1)}} className="courses__text">Courses</button>
               

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
