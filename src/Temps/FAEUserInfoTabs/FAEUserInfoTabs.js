//libs
import React, { Children } from "react";

//src
import { FAEText } from "@findanexpert-fae/components";

//scss
import "./FAEUserInfoTabs.scss";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";

export const FAEUserInfoTabs = ({
  className = "",
  tabs = [],
  renderOption,
  activeTab = "",
  ...rest
}) => {
  const selectedTab = (value) => {
    return value.toLowerCase() === activeTab.toLowerCase() ? "active-tab" : "";
  };
  return (
    <>
      <div
        className={`fae--user-info-tabs-main-container ${className}`}
        {...rest}
      >
        {Children.toArray(
          tabs.map((tab, index) => {
            const { label, href = "", className, icon, svgIconSrc, ...rest } = tab;
            return href === "" ? (
             <> 
           
             <FAEText
                tertiary={selectedTab(label) === "active-tab" ? false : true}
                {...rest}
                className={`fae--user-info-tab ${selectedTab(
                  label
                )} ${className}`}  >
                {!svgIconSrc=="" && <FAEImage className="fae-sidebar-icon" src={svgIconSrc} />}
                {!icon=="" && <div className="fae-sidebar-icon"> {icon}  </div>}
                 {renderOption ? renderOption(tab) : label}
              </FAEText>
              </>
            ) : (
              <a
                className={`fae--user-info-tab ${className}`}
                target="_blank"
                href={href}
                rel="noreferrer"
                {...rest}
              >
                <FAEText>{renderOption ? renderOption(tab) : label}</FAEText>
              </a>
            );
          })
        )}
      </div>
    </>
  );
};
