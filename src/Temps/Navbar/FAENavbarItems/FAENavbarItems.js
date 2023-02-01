// libs
import React from "react";

// src
import { FAEText } from "@findanexpert-fae/components";

// scss
import "./FAENavbarItems.scss";

export const FAENavbarItems = ({ itemsList = [] }) => {
  return (
    <>
      <div className="fae--navbar-items-container">
        {itemsList.map((item, index) => {
          const { label, href = "", ...rest } = item;
          return href === "" ? (
            <div key={index}>
              <p {...rest} className="fae--navbar-items-item">
                <FAEText primary>{label}</FAEText>
              </p>
              {index !== itemsList.length - 1 && (
                <span className="fae--navbar-items-divider"></span>
              )}
            </div>
          ) : (
            <div key={index}>
              <a
                className="fae--navbar-items-item"
                target="_blank"
                href={href}
                rel="noreferrer"
              >
                <FAEText primary>{label}</FAEText>
              </a>
              {index !== itemsList.length - 1 && (
                <span className="fae--navbar-items-divider"></span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
