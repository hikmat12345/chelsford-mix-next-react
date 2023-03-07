import { getFileSrcFromPublicFolder } from "../../utils"
import "../chelsfordCSS.css"
import { useState } from 'react';
 
const APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const bearer = process.env.REACT_APP_BEARER_TOKEN

const PicContainer = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [subject, setSubject] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const onNameChange = (e) => { setCustomerName(e.target.value) }
  const onEmailChange = (e) => { setEmail(e.target.value) }
  const onNumberChange = (e) => { setSubject(e.target.value) }
  const onMessageChange = (e) => { setMessage(e.target.value) }
  const onSbmit = (e) => {
    e.preventDefault()
    setSuccessMsg("Sending...")
    postRequest({ email, customerName, message, subject , isChelsford: true}).then(res => {
      setSuccessMsg("Message sent, our specialist will contact you shortly.")
      setCustomerName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setTimeout(function(){
        setSuccessMsg("")
    }, 2000);
    })
  }

  const postRequest = async (data) => {
    try {
      const response = await fetch(`${APP_BASE_URL}/Users/contactus`,  
      {
        method: 'POST',
        headers:{ 
          "Content-Type": "application/json",
          mode: "no-cors",
          Authorization: `bearer ${bearer}`,
          "Access-Control-Allow-Origin": "*",
        },
       body: JSON.stringify(data) 
      });
      return response;
    }
    catch (err) {
      // return handleError(err);
    }
  };

  return (
    <div className="main__Image__Container">
      <video
        className="main__Image__Container desktop-video"
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
     <video
        className="main__Image__Container mobile-video"
        muted
        style={{ cursor: "pointer" }}
        autoPlay
        loop
        playsInline
        type="video/mp4"
        width="100%"
        height="100%"
        src={getFileSrcFromPublicFolder("../chelsford-home-loader.mp4")}
        alt={"alt"}
      />

      <div className="bannerContent2">
        <div className="form__container">
          <h1 className="form__heading"><strong>Get in Touch</strong></h1>
          <form onSubmit={onSbmit} className="form__elements">
            <div className="inputDiv">
              <input
                className="form__inputs"
                type="text"
                placeholder="Name"
                onChange={onNameChange}
                value={customerName}
                required
              />
              <input
                className="form__inputs"
                type="email"
                placeholder="Email"
                onChange={onEmailChange}
                value={email}
                required
              />
              <input
                className="form__inputs"
                type="text"
                placeholder="Contact Number"
                onChange={onNumberChange}
                value={subject}
                required
              />
              <input
                className="form__inputs"
                type="text"
                name="massage"
                id="massage"
                placeholder="Message"
                value={message}
                required
                onChange={onMessageChange}
              ></input>
            </div>
            <div className="send__msg__div" >
              <div className="send__button__div">
                <span className="msg__text">Send Message</span>
                <button className="send__msg__btn">
                  <span>→</span>
                </button>
              </div>
            </div>
          </form>
         {successMsg !== "" && <span style={{
          padding: "5px",
          margin: "5px",
          color: "green",
          borderRadius: "5px",
          width: "100%",
          textAlignLast: "center",
          background: "#f7f2f2"
          }}>{successMsg}</span>}
        </div>
      </div>
    </div>
  )
}

export default PicContainer