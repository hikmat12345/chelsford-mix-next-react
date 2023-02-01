import React from 'react'
import { getFileSrcFromPublicFolder, getFileSrcFromPublicFolderSpcialLHR } from '../../utils'
import ContactUsPage from '../ContactUsPage'
import HelpPage from '../HelpPage'
 import Carousel from 'react-grid-carousel' 
import { FAQs, mainFeature } from './constant'
import "./SpecialLaserHRPage.scss"
import history from '../../history'
import FAEServiceVideoMonitor from '@findanexpert-fae/components/dist/stories/FAEServiceVideoMonitor/FAEServiceVideoMonitor'
 
function SpecialLaserHRPage() {
     const goToBooking =()=>{
          history.push("/booking/Laser-Hair-Removal/sub-services/true/0/1")
     }
  return (
    <>
       {/************************************  Top Banner section ****************************************/}
       <section className='expertBanner' style={{ backgroundImage: `url(${getFileSrcFromPublicFolderSpcialLHR("expertBanner.JPG")})`}}>
        <img src={getFileSrcFromPublicFolderSpcialLHR(`mobile-banner.JPG`)} className='top-banner' alt="expert service Logo" width={100} height={100} />
          <div className='banner-overlay'>
            <div className="row">
              <div className="column left" >
                <div style={{ width: "100%" }}></div>
              </div>
              <div className="column middle" style={{ margin: "70px 0px 0px 0px", padding: "0px 0px 0px 40px" }}>
                {/* <p className="banner-text-one" style={{ fontSize: "32px", margin: "0px", fontWeight: "600", wordSpacing: "15px", letterSpacing: "9px", textTransform: "uppercase" }}>Book All your</p>
                <p className='topBanner_p'>Laser Hair Removal</p>
                <div className="banner-logo" style={{ display: "flex", margin: "10px, 10px" }}>
                  <p style={{ margin: "3px 10px 0px 0px", wordSpacing: "7px", letterSpacing: "0px", fontSize: "25px", fontWeight: 500 }}>TREATMENTS ON</p>
                  <img src={getFileSrcFromPublicFolderSpcialLHR("expertLogo.PNG")} alt="Vercel Logo" width={140} height={40} />
                </div> */}
              </div>
              {/* <div className="column right" style={{ padding: "250px 50px 0px 0px" }}>
                <p>Download the app</p>
                <a target="_blank" className='cursor_pointer' href="https://play.google.com/store/apps/details?id=com.findanexpert"><img src={getFileSrcFromPublicFolderSpcialLHR("appGoogle.PNG")} alt="Vercel Logo" width={140} height={40} /></a>
                <a target="_blank" className='cursor_pointer' href='https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1'><img src={getFileSrcFromPublicFolderSpcialLHR("appApple.PNG")} alt="Vercel Logo" width={140} height={40} /></a>
              </div> */}
              {/* <div style={{ textAlign: "center" }}>
                <button onClick={goToBooking} className='buttonBookedNow'>Book Now</button>
            </div> */}
            </div>
          </div>
          <div className='hidden-on-desktop' style={{ textAlign: "center", marginBottom:"20px" }}>
                <button onClick={goToBooking} className='buttonBookedNow'>Book Now</button>
            </div>
            <div className='fae-bellow-banner-text hidden-on-desktop'>Want Smooth, soft, clear, silky, hair-free skin? Book Expert’s Laser Hair Removal and enjoy hair-free, care-free skin.</div>
            <div className='fae-bellow-banner-text hidden-on-desktop'>We cover all types of hair removal for all genders. The treatment is for every type of skin, from black to light.</div>
        </section>

        <div className="main">
          {/************************************  Why Choose Expert Section ****************************************/}
          <div>
            <h2 style={{ textAlign: "center", color: "#565656", fontSize: "17px", padding: "15px 10px 7px" }}>
              Why Choose <span style={{ color: "#eb1e27" }}>Expert?</span>
            </h2>
            <div className="grid">
              {mainFeature.map((item, i) => (
                <div className="mainInfo" key={i}>
                  <img src={getFileSrcFromPublicFolderSpcialLHR(item.imageName)} alt="Vercel Logo" width={30} height={30} />
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/************************************  call-to-action-section Section ****************************************/}
          <section className="call-to-action-section" style={{backgroundImage: `url(${getFileSrcFromPublicFolderSpcialLHR("subBanner.png")})`}}>
            <div className="row">
              <div className="column left">   </div>
              <div className="column middle"><img src={getFileSrcFromPublicFolderSpcialLHR("lady.PNG")} alt="Expert lady"  /><div className='fae-want-to-speek-container'><div className='fae-want-to-speek'>Want to speak </div><div className='fae-text-bold'> to our <strong style={{ fontSize: "36px" }} className="Aestheticians">Aestheticians</strong></div><div className='last-aesthetci-text'> before <strong style={{ color: "red", fontSize: "32px" }} className="fae-ladnding-booking-text">Booking?</strong></div></div> </div>
              <div className="column right">
                <ul className="action-btns-icon" style={{ backgroundImage: `url(${getFileSrcFromPublicFolderSpcialLHR("mobile_gradient_img.jpg")})`}}>
                  <a href="tel:+442070997738"><img src={getFileSrcFromPublicFolderSpcialLHR("call.PNG")} alt="Vercel Logo" width={60} height={60} /><div className='fae-grey-text'>Call</div></a>
                  <a href="tel:+442070997738"><img src={getFileSrcFromPublicFolderSpcialLHR("whatsup.PNG")} alt="Vercel Logo" width={60} height={60} /> <div className='fae-grey-text'>WhatsApp</div></a>
                  <a  href="mailto:contact@expert.one"><img src={getFileSrcFromPublicFolderSpcialLHR("Email.PNG")} alt="Vercel Logo" width={60} height={60} /><div className='fae-grey-text'>E-mail</div></a>
                  <a target="_blank" href="expert.one/chat-page"><img src={getFileSrcFromPublicFolderSpcialLHR("chat.PNG")} alt="Vercel Logo" width={60} height={60} /><div className='fae-grey-text'>Chat</div></a>
                </ul>
              </div>
            </div>
          </section>
          {/***********************  vedio section */}

          <div className="vedioSection">
            <ul>
              <li>You can now book Laser Hair Removal treatment instantly</li>
              <li>Manage your appointemtn , edit and cancel anytime you want</li>
              <li>Rest assured you'll book with the best clinics and Expert</li>
              <li>Most affordable Laser Hair Removal Prices</li>
              <li>Suitable for Men, Women, all skin and Hair Types</li>
              <li>Reduction of ingrown Hairs, pigment spots, shavng bumps</li>
            </ul>

            <div className="vedioFram">
            <FAEServiceVideoMonitor
                video={"https://1864597015.rsc.cdn77.org/Uploads/CustomerPages/B891B2FCEA2443A69933C9208B6380E5.mp4"}
                width={window.screen.width < 799 ? "98%" : "92%"}
                videoStand={getFileSrcFromPublicFolder("iMac_stand.webp")}
              />
              </div>
          </div>

          {/***********************  Last Banner section */}
          <section className='featureBox' style={{  backgroundImage: `url(${getFileSrcFromPublicFolderSpcialLHR("feature.jpg")})`}}>
            <div className="row">
              <div className="column left">
                <div className='featureText'>
                  Do You <strong  style={{color: "#7c7c7c"}}>Need </strong> All <strong style={{  color: "red" }}>Services</strong> at your <strong style={{ color: "red",  }}>Fingertips</strong>
                </div>
                <div className="column right" style={{ padding: "0px 0px 0px 80px" }}>
                  <p style={{ marginBottom: "10px", whiteSpace: "nowrap" }}>Download the <strong>Expert App </strong> Now!</p>
                  <div style={{ display: "flex" }} className="fae-landing-feature-text">
                    <a target="_blank" className="cursor_pointer" href="https://play.google.com/store/apps/details?id=com.findanexpert"><img src={getFileSrcFromPublicFolderSpcialLHR("appGoogle.PNG")} alt="Vercel Logo" width={140} height={40} /> </a>
                    <a target="_blank" className="cursor_pointer" href='https://apps.apple.com/us/app/find-an-expert/id1468090965?ls=1'> <img src={getFileSrcFromPublicFolderSpcialLHR("appApple.PNG")} alt="Vercel Logo" width={140} height={40} /> </a>
                  </div>
                </div>
              </div>
              <div className="column right" >
              </div>
            </div>
            <div className='featureTextp' style={{color: "#a1a1a1"}}>At Expert, we use the latest medical-grade Nd: YAG and Alexandrite Lasers that give absolute gold standard results.  We’ve developed our own bespoke protocols for treatments and tailor each one according to your hair and skin type.<br/><br/> You will get results from your very first session.  However, for lasting results, we recommend 6-8 sessions.  The process is painless and based on delivering a beam of highly concentrated light onto the follicles. <br/><br/> The pigments immerse this particular light in the follicles and results in disabling the hair growth mechanism.  The follicles are heated up and damaged without affecting the surrounding areas of the skin. After the initial consultation, the laser practitioner will carry out a patch test.<br/><br/> This will help our specialists determine whether your skin is suitable for laser treatment or not.</div>
            <div style={{ textAlign: "center" }}>
              <button onClick={goToBooking} className='buttonBookedNow'>Book Now</button>
            </div>
          </section>

          {/*********************** Before and after section */}

          <section className='beforeAndAfter'>
            <h2 style={{ textAlign: "center" }}>Before & After</h2>

            <div className="row">
              <div className="column left" >
                <img src={getFileSrcFromPublicFolderSpcialLHR("changeOne.jpg")} alt="Vercel Logo" width={350} height={160} />
              </div>
              <div className="column middle" >
                <img src={getFileSrcFromPublicFolderSpcialLHR("changeTwo.jpg")} alt="Vercel Logo" width={350} height={160} />
              </div>

              <div className="column right">
                <img src={getFileSrcFromPublicFolderSpcialLHR("changeThree.jpg")} alt="Vercel Logo" width={350} height={160} />
              </div>
            </div>
            <br/><br/> 
              <div className="fae-explain-2nd-text" style={{ margin: "0px 20px", color: "#a1a1a1"}}>
                 Secondly, it helps the practitioner set the laser at the most effective setting for the best results and minimal side effects. A patch test will be done for all areas to be treated as the hair and skin aren't the same on all body parts. It will take a minimum of 6 sessions every 4-6 weeks. The number of ses- sions depends on your skin and hair type. After the sessions, you will see a significant improvement. We recommend more sessions on the facial areas. You will require maintenance sessions once you have completed your laser course. You should also purchase a package of treatments to ensure optimal results.
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={goToBooking} className='buttonBookedNow'>Book Now</button>
            </div>
          </section>

          {/* testomonial */}
          <section className='testimonial-section' style={{ background: "#edf0f5", marginTop: "30px" }}>
            <h1 style={{ textAlign: "center", paddingTop:"10px" }}>Testomonial</h1>
            <div className="testomonialSec">
              <Carousel autoplay={5000} mobileBreakpoint = {900} cols={1} rows={1} gap={40} width="33%">
                <Carousel.Item style={{ textAlign: "center" }}>
                  <p>“ This is probably one of the best laser clinics that I have been to and I have been to a few. Everything here is 10/10 from the service to the treatment to the cost. I have nothing that I can fault about this place. I am on my third session and I noticed results from my first session. I am so pleased with the service that I have referred two of my closest friends who have both attended and will begin treatments over the next few days. The clinic is spotless, the service is exceptional and all the staff I have encountered have always been friendly and helpful. ”</p>
                  <div className="imgCenter"><img src={getFileSrcFromPublicFolderSpcialLHR("customerIcon.png")} alt="Vercel Logo" width={30} height={30} />
                  </div>
                  <h3 className="imgCenter">Goarge Balley</h3>
                </Carousel.Item>
                <Carousel.Item style={{ textAlign: "center" }}>
                  <p>“ I have had the best experience at this clinic. THe facilities are amazing and my therapist made me feel comfortable whilst giving me my treatment. I had a medical extraction facial and it was a birthday treat. I received a complimentary gold mask. I will definitely be coming back here, the staff are so lovely. ”</p>
                  <div className="imgCenter"><img src={getFileSrcFromPublicFolderSpcialLHR("user.png")} alt="Vercel Logo" width={30} height={30} />
                  </div>
                  <h3 className="imgCenter">Tom Joe</h3>
                </Carousel.Item>

                <Carousel.Item style={{ textAlign: "center" }}>
                  <p>“ I've been doing Laser Hair Removal for many years and never had good results, one session at Expert Centre and it's been 9 weeks and no regrowth". I feel like I've wasted my time tomorrow. ”</p>
                  <div className="imgCenter"><img src={getFileSrcFromPublicFolderSpcialLHR("customerIcon.png")} alt="Vercel Logo" width={30} height={30} />
                  </div>
                  <h3 className="imgCenter">Christ Rogers</h3>
                </Carousel.Item>
              </Carousel>
            </div>
          </section>


              {/* ************************************  Frequently ask Question ********************************* */}
              <section  className='fae-landing-faq'>
                <h2 style={{ textAlign: "center", marginBottom: "0px", marginTop: "20px", padding: "0px 9px" }}>Frequently Asked <span style={{ color: "red" }}>Questions</span></h2>
            <div className='faqSection'>
               <HelpPage help="Frequently asked questions" />
             <div style={{ textAlign: "center" }}>
                <button onClick={goToBooking} className='buttonBookedNow'>Book Now</button>
              </div>
            </div>
          </section>

    {/***********************  Question request section **************************/}
        <div className='fae-landing-contact'>
            <ContactUsPage />
          </div> 
        </div>
    </>
  )
}

export default SpecialLaserHRPage
