import picMainDiv from "../../components/images/main-div-pic.png"
 import "../chelsfordCSS.css"      
  import { useState } from "react"
import aniPic1 from "../../components/images/anipic1.png"
import InstituteSwiperCard from "../InstituteSwiperCard/InstituteSwiperCard"
const About = () => {
  const [toggle, setToggle] = useState(false)
  const [toggle1, setToggle1] = useState(true)
  function myFunction() {
    document.getElementById("div1").style.display = "none"
  }
  return (
    <>
    <div className="mb-5 home__section__3">
      <div className="home__section__3__row">
        <h2 className="mt-4 section3__row__h2">
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
      <div className="col-md-12">
         <InstituteSwiperCard />
      </div>
    </div>
 
  </>
  )
}

export default About
