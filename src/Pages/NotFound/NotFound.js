//libs
import { FAEPageNotFound } from "@findanexpert-fae/components";
import React from "react";

//src
import history from "../../history";
import { getFileSrcFromPublicFolder } from "../../utils";

//scss
import "./NotFound.scss";

const NotFound = ({ message, src }) => {
  return (
    <>
      <div className="not-found-main-container">
        <FAEPageNotFound
          src={src ?? getFileSrcFromPublicFolder("not_found.png")}
          message={message ?? "Page Not Found!"}
          linkText="< Return To Home"
          onClick={() => history.push("/")}
          width={window.screen.width < 700 ? "100%" : "50%"}
        />
      </div>
    </>
  );
};

export default NotFound;
