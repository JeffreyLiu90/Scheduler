import React from "react";

//Deleting... component once something has been deleted
export default function Saving(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">Deleting...</h1>
    </main>
  );
}
