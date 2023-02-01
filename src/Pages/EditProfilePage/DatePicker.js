//libs
import React, { useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import {
  FAEContainer,
  FAEShadowBox,
  FAEText,
} from "@findanexpert-fae/components";

//scr
// import { FAEContainer } from "../FAEContainer/FAEContainer";
// import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";
// import { FAEText } from "../FAEText/FAEText";

//scss
// import "./DatePicker.scss";

export const DatePickerC = ({
  justify,
  align,
  className = "",
  shadowBoxProps,
  todayClassName = "",
  label = "",
  primary,
  getSelectedDate = () => {},
  dateFormat = () => {},
  value = null,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState(value);

  const formatInputValue = () => {
    if (!selectedDate) return "";
    if (dateFormat) return dateFormat(selectedDate);
    return `Day: ${selectedDate.day}     Month: ${selectedDate.month}     Year: ${selectedDate.year}`;
  };

  const handleChangeDate = (date) => {
    setSelectedDate(date);
    getSelectedDate(date);
  };

  return (
    <>
      <FAEContainer justify={justify} align={align}>
        {primary ? (
          <FAEShadowBox
            style={{ overflow: "inherit" }}
            {...shadowBoxProps}
            padding={true}
          >
            <div className="fae--date-picker-container">
              <FAEText tertiary>{label}</FAEText>
              <DatePicker
                value={selectedDate}
                onChange={handleChangeDate}
                inputPlaceholder="Select a date"
                formatInputText={formatInputValue}
                inputClassName="fae--date-picker-input-primary"
                shouldHighlightWeekends
                calendarClassName={className}
                colorPrimary="#dc0000"
                calendarTodayClassName={`fae--custom-today-day ${todayClassName}`}
                {...rest}
              />
            </div>
          </FAEShadowBox>
        ) : (
          <div className="fae--date-picker-container">
            <FAEText tertiary>{label}</FAEText>
            <DatePicker
              value={selectedDate}
              onChange={handleChangeDate}
              inputPlaceholder="Select a date"
              formatInputText={formatInputValue}
              inputClassName="fae--date-picker-input"
              shouldHighlightWeekends
              calendarClassName={className}
              colorPrimary="#dc0000"
              calendarTodayClassName={`fae--custom-today-day ${todayClassName}`}
              {...rest}
            />
          </div>
        )}
      </FAEContainer>
    </>
  );
};
