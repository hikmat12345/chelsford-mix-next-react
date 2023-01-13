import picMainDiv from "../../components/images/main-div-pic.png"
 import "../chelsfordCSS.css"      
  import { useState } from "react"
import aniPic1 from "../../components/images/anipic1.png"
const About = () => {
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(true)
  function myFunction() {
    document.getElementById("div1").style.display = "none"
  }
  return (
    <>
    <div className="home__section__3">
      <div className="home__section__3__row">
        <h2 className="section3__row__h2 mt-4">
          Chelsford Institute of Higher Education
        </h2>
        <p className="section__row__text">
          Chelsford Institute of Higher Education is a leading provider of
          internationally recognised qualifications in the UK, helping students
          excel and make a difference in this world. We have more than 100
          courses with full time, part-time, evening and online options to suit
          every student. Our funded and private courses are an affordable route
          to helping you achieve your goals and fulfil your potential. If you're
          an international student thinking of studying abroad in the UK,
          Chelsford Institute's Visa & Immigration Service will help you easily
          navigate the UK's visa application process and achieve your dream of
          higher education.
        </p>
      </div>

      {/* <div className={home.main_div}>
        <div className={home.main_div__animation__1}>
          <div className={home.animation__box__1}>
            <div className={home.content_box_animation}>
              <div className={home.image_part}>
                <img className={home.aboutPic} src={picMainDiv} />
              </div>
              <div className={home.text__part__1}>
                <h3 className={home.text__part__heading__home__section}>
                  Legal requirements satisfied
                </h3>
                <p className={home.text__part__text__home__section}>
                  Backed by UK’s top awarding bodies, we offer qualifications
                  that satisfy insurance & other legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={home.main_div2}>
        <div className={home.main_div__animation__2}>
          <div className={home.animation__box__2}>
            <div className={home.content_box_animation2}>
              <div className={home.image_part2}>
                <img className={home.aboutPic2} src={picMainDiv} />
              </div>
              <div className={home.text__part__2}>
                <h3 className={home.text__part__heading__home__section2}>
                  Legal requirements satisfied
                </h3>
                <p className={home.text__part__text__home__section2}>
                  Backed by UK’s top awarding bodies, we offer qualifications
                  that satisfy insurance & other legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="flip__card">
        <div className="flip__card__inner">
          <div className="front__end">
            <div className="content_box_animation">
              <div className="image_part">
                <img className="aboutPic" src={picMainDiv} />
              </div>
              <div className="text__part__1">
                <h3 className="text__part__heading__home__section">
                  Legal requirements satisfied
                </h3>
                <p className="text__part__text__home__section">
                  Backed by UK’s top awarding bodies, we offer qualifications
                  that satisfy insurance & other legal requirements.
                </p>
              </div>
            </div>
          </div>
          <div className="back__end">
            <div className="content_box_animation2">
              <div className="image_part2">
                <img className="aboutPic2" src={aniPic1} />
              </div>
              <div className="text__part__2">
                <h3 className="text__part__heading__home__section2">
                  Quality is our hallmark
                </h3>
                <p className="text__part__text__home__section2">
                  At Chelsford, we promise quality-based education to fast-track
                  your career through our intense courses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* // <!-- what next  --> */}
    <div className="container-fluid content-feature-courses content-feature-courses-update">
        <div className="row">
            <div className="headerContainer">
                <h2>What’s Next </h2>
            </div>
            <div className="coursesContainer">
                
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div><h3>CPD MICRONEEDLING DIPLOMA.</h3>
                    <p>Learn how to improve Scarring, Blemishes & Collagen</p>
                    <a href="/services/cpd-microneedling-diploma">Explore More</a>
                </div>
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div><h3>CPD ADVANCED PLASMA FIBROBLAST</h3>
                    <p>Learn Plasma Non-Surgical Eye Lift procedure & Wrinkle Removal.</p>
                    <a href="/services/cpd-advanced-plasma-fibroblast">Explore More</a>
                </div>
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div>
                    <h3>CPD ADVANCED CHEMICAL PEELS</h3>
                    <p>Learn to use Chemical Peels to treat various skin conditions.</p>
                    <a href="/services/cpd-advanced-chemical-peels">Explore More</a>
                </div>
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div>
                    <h3>VTCT LEVEL 4 SKIN BLEMISH REMOVAL</h3>
                    <p>Learn Advanced techniques to remove Skin tags, Milia & Veins.</p>
                    <a href="/services/level-4-laser-and-blemish-removal">Explore More</a>
                </div>
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div>
                    <h3>VTCT LEVEL 2 AND 3 NVQ BEAUTRY THERAPY</h3>
                    <p>Necessary Qualification to enter the world of Lasers & IPL.</p>
                    <a href="/services/VTCT-Level-2-and-3-NVQ-Beauty-Therapy">Explore More</a>
                </div>
                
            </div>
        </div>
    </div>

    {/* // {{-- content page section 6 --}} */}

    <div className="container-fluid learn-more" >
        <div className="row get-qualified">
              <div className="col-md-7">
                <div className="coursesDiscriptionCol">
                    <h2>Get Qualified and Start Today</h2>
                    <p className="description">We'll ensure that you reach a high standard of education and are competent in your chosen subject of study so you can move straight into the job industry. Enrol Today!</p> 
                </div> 
              </div>
            <div className="col-md-2"> </div>
            <div className="col-md-3">
                <div className="bookingContainer">
                    {/* <button type="button" className="btn btn-default" style={{background: "#D9BD3E",borderRadius: "5px",top: "35px",bottom: 0,position: "relative"}}><a href="{{ url('course/booking/'.$product['slug'] ) }}"  style={{color:" #fff", fontSize: "22px",fontWeight: 500}}>View Dates & Book</a></button> */}
                </div>
            </div>
        </div>
    </div> 
  </>
  )
}

export default About
