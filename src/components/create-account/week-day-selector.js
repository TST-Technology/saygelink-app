import React from "react";
import {
  StyleCard,
  StyleWeekdayContainer,
} from "../../style-component/createAccount/weekday-selector";

const WeekdaySelector = ({ items, selectedItemLabel, onClick, addedItems }) => {
  return (
    <StyleWeekdayContainer>
      {items &&
        items.map((item) => {
          return (
            <StyleCard
              key={item}
              selected={item === selectedItemLabel}
              added={addedItems.includes(item)}
              onClick={() => {
                onClick(item);
              }}
            >
              <p className="weekdayText">
                {item ? item.charAt(0).toUpperCase() : ""}
              </p>
            </StyleCard>
          );
        })}
    </StyleWeekdayContainer>
  );
};

export default WeekdaySelector;
