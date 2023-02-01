//libs
import { FAETextField } from "@findanexpert-fae/components";
import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";
import React from "react";

//src
import { getCookies } from "../../utils";

//scss
import "./ComposeEmail.scss";

const email = getCookies("customer_details").email;

const ComposeEmail = () => {
  return (
    <>
      <form className="fae--compose-email-main-container">
        <FAETextField
          type="email"
          label="To"
          primary
          placeholder="email"
          isRequired
          required
          shadowBoxProps={{ backgroundColor: "#F9F9F9" }}
        />
        <FAETextField
          type="email"
          label="From"
          primary
          placeholder="email"
          value={email}
          inputProps={{
            readOnly: true,
          }}
          isRequired
          required
          shadowBoxProps={{ backgroundColor: "#F9F9F9" }}
        />
        <FAETextField
          type="text"
          label="Subject"
          primary
          placeholder="subject"
          isRequired
          required
          shadowBoxProps={{ backgroundColor: "#F9F9F9" }}
        />
        <FAETextField
          type="textarea"
          label="Your Message"
          primary
          placeholder="message"
          isRequired
          required
          shadowBoxProps={{ backgroundColor: "#F9F9F9" }}
          className="fae--compose-mail-message-field"
        />
        <FAEButton className="fae--compose-mail-send-button">
          Send Mail
        </FAEButton>
      </form>
    </>
  );
};

export default ComposeEmail;
