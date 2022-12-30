 import { getFileSrcFromPublicFolder } from "../../utils"
import "../chelsfordCSS.css"             
     const PicContainer = () => {
  return (
    <div className="main__Image__Container">
      {/* <video
        autoPlay
        // controls
        loop
        src={"../chelsford-index-banner-video.mp4"}
        style={{ width: "100%" }}
      /> */}
      <video 
                      className="main__Image__Container"
                        muted
                        style={{ cursor: "pointer" }}
                        autoPlay
                        loop
                        playsInline
                        type="video/mp4"
                        width="100%"
                        height="100%"
                        src={getFileSrcFromPublicFolder("../chelsford-index-banner-video.mp4")}
                        alt={"alt"}
                      />
                      
      {/* <video className="main__Image__Container" autoPlay loop   type="video/mp4" width="100%" height="100%" src="../chelsford-index-banner-video.mp4"
       alt="https://1864597015.rsc.cdn77.org/Uploads/CustomerPages/b1246d780ddd4ea7bbcca5a11084ffaa.mp4" ></video> */}
      <div className="bannerContent2">
        <div className="form__container">
          <h2 className="form__heading">Get in Touch</h2>
          <form action="" className="form__elements">
            <div className="inputDiv">
              <input
                className="form__inputs"
                type="text"
                placeholder="Name"
              />
              <input
                className="form__inputs"
                type="text"
                placeholder="Email"
              />
              <input
                className="form__inputs"
                type="number"
                placeholder="Number"
              />
              <input
                className="form__inputs"
                type="text"
                name="massage"
                id="massage"
                placeholder="Message"
              ></input>
            </div>
            <div className="send__msg__div">
              <div className="send__button__div">
                <span className="msg__text">Send Massage</span>
                <button className="send__msg__btn">
                  <span>→</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PicContainer
