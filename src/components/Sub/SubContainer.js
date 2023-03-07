import logo1 from "../../components/images/logo1.png"
import logo2 from "../../components/images/medical.png"
import logo3 from "../../components/images/beauty.png"
 import "../chelsfordCSS.css"             
    const SubContainer = () => {
  return (
    <div className="sub__container">
      <div className="sub__container__main">
        <span className="sub__container__main__text"><strong>10%</strong></span><span style={{color: "#1e185f", top: "5px",  fontSize: "20px", position: "relative"}}>OFF</span>
        <span className="sub__container__main__text1" style={{color: "#1e185f", marginTop:"8px", paddingTop: "5px",  fontSize: "20px",}}>All Courses</span>
      </div>
      <div className="sub__container2">
        <div className="boxVContainer">
          <div className="boxV__top">
            <img src={logo1}   />
            <h2 className="pt-2 boxV__top__h2">Laser</h2>
          </div>
          <div className="information">
            <p className="information__text">
              Experts in Aesthetic Laser training since 2008
            </p>
          </div>
        </div>
        <div className="boxVContainer">
          <div className="boxV__top">
            <img src={logo2}   />
            <h2 className="pt-2 boxV__top__h2">Medical</h2>
          </div>
          <div className="information">
            <p className="information__text">
              Get trained by Expert Doctors in Aesthetic treatments
            </p>
          </div>
        </div>
        <div className="boxVContainer">
          <div className="boxV__top">
            <img src={logo3}   />
            <h2 className="pt-2 boxV__top__h2">Beauty</h2>
          </div>
          <div className="information">
            <p className="information__text">
              Accredited Beauty courses for all levels
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubContainer
