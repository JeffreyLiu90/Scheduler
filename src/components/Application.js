import DayList from "components/DayList";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from "axios";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

//Set day???
export default function Application(props) {
  // const [day, setDay] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  //This modifies the whole bit of the state based on the selected - change the whole day
  //can modify more at once
  //Day:day = day

  const setDay = day => setState({ ...state, day });
  console.log("SetDay day: ", setDay);
  useEffect(() => {
    const allDays = "http://localhost:8001/api/days";
    const allAppointments = "http://localhost:8001/api/appointments";
    const allInterviewers = "http://localhost:8001/api/interviewers";

    // axios.get(days, appointments).then(response => {
    //   console.log("response.data is: ", response.data);
    const promiseDays = axios.get(allDays);
    const promiseAppointments = axios.get(allAppointments);
    const promiseInterviewers = axios.get(allInterviewers);
    Promise.all([
      Promise.resolve(promiseDays),
      Promise.resolve(promiseAppointments),
      Promise.resolve(promiseInterviewers)
    ])
      .then(all => {
        console.log("all: ", all);
        setState({
          ...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
        console.log("interviewers from axios: ", all[2].data);
        console.log("appointments from axios: ", all[1].data);
      })
      .catch(err => {
        console.error(err);
      });
    // api could return empty list so you have to have a default value
  }, []);

  // // getAppointmentsForDay(state, state.day);
  const functionArray = getAppointmentsForDay(state, state.day);
  const appointments = Object.values(functionArray);
  const interviewers = getInterviewersForDay(state, state.day);
  console.log("APPOIINTMENTS: ", appointments);

  console.log("interviewerss all: ", interviewers);

  const appointmentSlots = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    //above function = 2": {id: 2, time: "1pm", interview: { student: "Chad Takahashi", interviewer: 2 },
    //then the interview part after, interviews = state.interviewers[interview.interviewer]
    //State.interviewers returns a list of interviewers with their id and name, using the bracket, which in this case line 130 interview.interviewer = 2, this will return the interviewer whose id matches, and we want to return that person's name to the list
    // console.log("appointment: ", appointment)-   //returns   "2": {id: 2, time: "1pm", interview: { student: "Chad Takahashi", interviewer: 2 }
    // console.log("appointment.interview:", appointment.interview); returns {student: "Chad Takahashi", interviewer: 2}
    // console.log("state.interviewers: ", state.interviewers); - returns list of interviewers with their id and name and avatar
    // console.log("interview: ", interview) - returns { student: "Chad Takahashi", interviewer: {id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png"}
    console.log("appointment mapp: ", appointment);
    if (appointment.interview) {
      console.log("INTERVIWERS: ", interviewers);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interviewer={interview.interviewer.name}
          student={appointment.interview.student}
          interviewers={interviewers}
        />
      );
    }

    return <Appointment key={appointment.id} {...appointment} />;
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
//L:123 - days = state.days = setting the days based on api request
//setDay handler- when going into daylist item, lets you modify day individually
//prop drilling- drill down all the way to daylist item with these props
