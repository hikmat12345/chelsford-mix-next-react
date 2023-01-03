//libs
import React from "react";
import { FAEText, FAETabs } from "@findanexpert-fae/components";
import { useParams } from "react-router-dom";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import UpcomingBookingsPage from "../UpcomingBookingsPage";
import CompletedBookinsgPage from "../CompletedBookinsgPage";
import SessionBookingsPage from "../SessionBookingsPage";
import history from "../../history";

//scss
import "./BookingsPage.scss";

const BookingsPage = () => {
  const { jobtype } = useParams();
  return (
    <>
      <UserInfoPageLayout>
        <div className="fae-bbokings-page-main-container">
          <FAEText heading>Your Bookings</FAEText>
          <FAETabs
            tabs={[
              {
                label: "Upcoming",
                value: "upcoming",
              },
              // {
              //   label: "Session",
              //   value: "session",
              // },
              {
                label: "Completed",
                value: "completed",
              },
            ]}
            tabWidth="33%"
            value={jobtype}
            getSelectedTab={(value) => history.push(`/your-bookings/${value}`)}
          />
          {jobtype === "upcoming" && <UpcomingBookingsPage />}
          {jobtype === "completed" && <CompletedBookinsgPage />}
          {/* {jobtype === "session" && <SessionBookingsPage />} */}
        </div>
      </UserInfoPageLayout>
    </>
  );
};

export default BookingsPage;
