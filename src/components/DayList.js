import React, { useEffect } from "react";
// import "components/Button.scss";
import DayListItem from "components/DayListItem";
export default function DayList(props) {
  //What does the props do here
  //I don't understand the selected
  //I don't understand the setDay

  //Guesses - props because we do not have the data here, we are
  //passing it to the index.js which has it?

  useEffect(() => {
    console.log("props.days: ", props.days);
  });
  return props.days.map((day, index) => (
    <DayListItem
      key={index}
      id={index}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.day}
      setDay={props.setDay}
    />
  ));
}
