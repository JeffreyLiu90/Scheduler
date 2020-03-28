import DayList from "components/DayList";
import "components/Application.scss";
import React from "react";
import Appointment from "components/Appointment";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  //import state and functions from UseApplication.js
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const functionArray = getAppointmentsForDay(state, state.day);
  const appointments = Object.values(functionArray);
  const interviewers = getInterviewersForDay(state, state.day);

  const appointmentSlots = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    //above function = 2": {id: 2, time: "1pm", interview: { student: "Chad Takahashi", interviewer: 2 },
    //then the interview part after, interviews = state.interviewers[interview.interviewer]
    //State.interviewers returns a list of interviewers with their id and name, using the bracket, which in this case line 130 interview.interviewer = 2, this will return the interviewer whose id matches, and we want to return that person's name to the list
    // console.log("appointment: ", appointment)-   //returns   "2": {id: 2, time: "1pm", interview: { student: "Chad Takahashi", interviewer: 2 }
    // console.log("appointment.interview:", appointment.interview); returns {student: "Chad Takahashi", interviewer: 2}
    // console.log("state.interviewers: ", state.interviewers); - returns list of interviewers with their id and name and avatar
    // console.log("interview: ", interview) - returns { student: "Chad Takahashi", interviewer: {id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"}
    if (appointment.interview) {
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interviewer={interview.interviewer}
          student={appointment.interview.student}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }

    return (
      <Appointment
        key={appointment.id}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        interviewers={interviewers}
        {...appointment}
      />
    );
  });

  //days = the whole array of days / day listed on the sidebar
  //setDay = the onclick function, where set the day based on Name of day (props.name) from DaylistItem
  //setDay = setState(props.name/day)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList day={state.day} days={state.days} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentSlots}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
