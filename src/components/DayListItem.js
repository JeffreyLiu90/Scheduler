import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

const formatSpots = spots => {
  if (spots === 0) {
    return "no spots remaining";
  } else if (spots === 1) {
    return spots + " spot remaining";
  } else return spots + " spots remaining";
};

export default function DayListItem(props) {
  const DayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  //   return (
  //     <li onClick={() => props.setDay(props.name)}>
  //       <h2 classname={dayClass}>{props.name}</h2>
  //       <h3 classname={dayClass}>{props.spots}</h3>
  //     </li>
  //   );
  // }

  //props.name - just the name of the day
  return (
    <li
      className={DayClass}
      onClick={() => {
        props.setDay(props.name);
      }}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
