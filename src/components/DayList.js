import React, { useEffect } from "react";

//The day list on the left side of nav w/ appointments and info
import DayListItem from "components/DayListItem";
export default function DayList(props) {
  useEffect(() => {});

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
