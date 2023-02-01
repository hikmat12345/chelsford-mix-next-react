import { videos } from "./videos"
import { getFileSrcFromPublicFolder, getFileSrcFromPublicFolderSpcialLHR } from "../../utils"
import "../chelsfordCSS.css"            
    const VideoContainer = () => {
  return (
    <div className="main__container">
      <div className="sub__main__row">
        <div className="headerContainer">
          <h2 className="headerContainer__heading">
            What you’ll get at Chelsford?
          </h2>
          <p className="headerContainer__text">
            We are the UK’s best aesthetic training institute providing our
            students with the most up-to-date knowledge &amp; training required
            in the market. Here’s what we provide!
          </p>
        </div>
        <div className="popular__Course">
          <div className="Feature_vid_Div">
            <div className="img__container__Feature">
            <video
              id="my-video"
              class="video-js"
              controls={true}
              style={{width:"100%"}}
              data-setup="{}"
              poster={getFileSrcFromPublicFolderSpcialLHR("./thumbnail.PNG")}
            >
              <source src={getFileSrcFromPublicFolderSpcialLHR("./videoplayback.mp4")} type="video/mp4" />
              <source src="MY_VIDEO.webm" type="video/webm" />
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="https://videojs.com/html5-video-support/" target="_blank"
                  >supports HTML5 video</a
                >
              </p>
            </video>
              {/* <iframe
                width="100%"
                id="feature_video"
                height="504px"
                src="https://www.youtube.com/embed/HFzxQ5OE5FM"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                allowFullScreen=""
              ></iframe> */}
            </div>
          </div>
          <div className="courses__videos">
            <div className="slider">
              <div className="slider_wrapper">
              {videos?.map((video)=>{
                return (
                 <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      {/* <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/-9PvE23Fdjw"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe> */}
                       <video
                          id="slide-video"
                          class="video-js"
                          controls={true} 
                          data-setup="{}"
                        >
                          <source src={video?.videoSrc} type="video/mp4" />
                          <source src="MY_VIDEO.webm" type="video/webm" />
                          <p class="vjs-no-js">
                            To view this video please enable JavaScript, and consider upgrading to a
                            web browser that
                            
                          </p>
                        </video>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="link__tag__a2">
                        <h3 className="contentContainer__text">
                          {video.title}
                        </h3>
                      </a>
                      <p className="discription">
                         {video?.detail}
                      </p>
                    </div>
                  </div>
                </div>)
                 }
                )}
                {/* <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/7WPC9RyGwug"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="link__tag__a2">
                        <h3 className="contentContainer__text">
                          Training on Laser Hair Removal on Asian Skin
                        </h3>
                      </a>
                      <p className="discription">
                        Students learn how to treat dark skin with Laser Hair
                        Removal.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/8zj7k1lzF44"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="link__tag__a2">
                        <h3 className="contentContainer__text">
                          Training on Face Test Patch
                        </h3>
                      </a>
                      <p className="discription">
                        Students learn how to perform Laser Hair Removal Patch
                        test on Face
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/BX-NrFqGfEE"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Laser Hair Removal Theory
                        </h3>
                      </a>
                      <p className="discription">
                        Learning the theory behind Laser is important when it
                        comes to practical.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/HFzxQ5OE5FM"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Laser Paper Exercise
                        </h3>
                      </a>
                      <p className="discription">
                        Students practice Laser technique on Black paper card
                        before treating real clients.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/C_NsqwVN5BE"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Laser Hair Removal on Face
                        </h3>
                      </a>
                      <p className="discription">
                        Students learn to use the laser to treat clients face.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/fUVbzRBAH48"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Acne &amp; Acne Scarring
                        </h3>
                      </a>
                      <p className="discription">
                        Students assess the skin to check the grade of Acne.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/Ik-Esn6EoJk"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on IPL Photo Rejuvenation
                        </h3>
                      </a>
                      <p className="discription">
                        The students use an intense pulse light system to
                        provide a Rejuvenation Facial.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/PYT008A-Gcw"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Facial Veins
                        </h3>
                      </a>
                      <p className="discription">
                        Student performing a Face Vein treatment using a
                        Vascular hand piece.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/PqSGV5SEEQM"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Red Blood Spots / Cherry Angiomas
                        </h3>
                      </a>
                      <p className="discription">
                        Training on Red Blood Spots/Cherry Angiomas/Campbell de
                        Morgan Spots.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/OYfSDOKbKmY"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Sunspots &amp; Freckles on Back
                        </h3>
                      </a>
                      <p className="discription">
                        Training on Sunspots/Freckles on Back.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="slider__item">
                  <div className="coursesBox">
                    <div className="slider__video">
                      <iframe
                        width="100%"
                        id="feature_video2"
                        height="100%"
                        src="https://www.youtube.com/embed/oSd1Ze2H2j4"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen=""
                      ></iframe>
                    </div>
                    <div className="contentContainer">
                      <a href="" className="vedio__container__a">
                        <h3 className="contentContainer__text">
                          Training on Laser Skin Tightening
                        </h3>
                      </a>
                      <p className="discription">
                        Energy of the Long Pulsed Ndyag is delivered deep into
                        the dermis.
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoContainer
