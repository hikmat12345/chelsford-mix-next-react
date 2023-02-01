//libs
import React from "react";
import { FAEText, FAETabs } from "@findanexpert-fae/components";
import { useParams } from "react-router-dom";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import history from "../../history";
import ComposeEmail from "../ComposeEmail";

//scss
import "./EmailsPage.scss";

const EmailsPage = () => {
  const { emailtype } = useParams();
  return (
    <>
      <UserInfoPageLayout>
        <div className="fae-bookings-page-main-container">
          <FAEText heading>Your Bookings</FAEText>
          <FAETabs
            tabs={[
              {
                label: "Inbox",
                value: "inbox",
              },
              {
                label: "Outbox",
                value: "outbox",
              },
              {
                label: "Compose",
                value: "compose",
              },
            ]}
            tabWidth="31%"
            value={emailtype}
            getSelectedTab={(value) => history.push(`/your-emails/${value}`)}
          />
          {emailtype === "compose" && <ComposeEmail />}
        </div>
      </UserInfoPageLayout>
    </>
  );
};

export default EmailsPage;
