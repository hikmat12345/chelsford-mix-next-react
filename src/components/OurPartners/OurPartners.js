import React from "react";
import { getFileSrcFromPublicFolderSpcialLHR } from "../../utils";
import "./OurPartners.scss";

export default function OurPartners() {
  return (
    <>
      <div id="partners">
        <div className="container">
          <div className="text-center">
            <h2 style={{ fontSize: "30px" }}>
              Our{" "}
              <span className="text-red">
                <strong>Partners</strong>
              </span>
            </h2>
          </div>

          <div className="partens__logo">
            <img src={getFileSrcFromPublicFolderSpcialLHR("vtct-logo-new.png")} />
            <img src={getFileSrcFromPublicFolderSpcialLHR("babtac-logo.png")} />
            <img src={getFileSrcFromPublicFolderSpcialLHR("british-laser-association.png")} />
            <img src={getFileSrcFromPublicFolderSpcialLHR("habia-logo.png")} />
            <img src={getFileSrcFromPublicFolderSpcialLHR("uk-health-center.png")} />
            <img src={getFileSrcFromPublicFolderSpcialLHR("vtct-qualifications.png")} />
          </div>
        </div>

        <div className="courses__videos show-on-mobile">
              <div className="slider">
                <div className="slider_wrapper">
                  <div className="slider__item">
                    <div className="coursesBox">
                      <div className="slider__video">
                       
                          <iframe
                            width="100%"
                            id="feature_video2"
                            height="100%"
                            src="https://www.youtube-nocookie.com/embed/-9PvE23Fdjw"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                            allowFullScreen=""
                          ></iframe>
                        
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-1" className="vedio__container__a">
                          <h3 className="contentContainer__text">
                            Training on Men's Laser Hair Removal
                          </h3>
                        </a>
                        <p className="discription">
                          Students perform Laser Hair Removal on a Male Client.
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
                          src="https://www.youtube-nocookie.com/embed/7WPC9RyGwug"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-2" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/8zj7k1lzF44"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-3" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/BX-NrFqGfEE"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-4" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/HFzxQ5OE5FM"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-5" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/C_NsqwVN5BE"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-6" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/fUVbzRBAH48"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-7" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/Ik-Esn6EoJk"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-8" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/PYT008A-Gcw"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard__write; encrypted__media; gyroscope; picture__in__picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-9" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/PqSGV5SEEQM"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-10" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/OYfSDOKbKmY"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-11" className="vedio__container__a">
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
                          src="https://www.youtube-nocookie.com/embed/oSd1Ze2H2j4"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen=""
                        ></iframe>
                      </div>
                      <div className="contentContainer">
                        <a href="#slide-12" className="vedio__container__a">
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
                  </div>
                </div>
              </div>
        </div>
      </div>
    </>
  );
}
