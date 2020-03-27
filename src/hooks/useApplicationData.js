import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(state => ({ ...state, appointments }));
        Promise.all([axios.get(`http://localhost:8001/api/days`)]).then(
          ([days]) => {
            setState(prev => ({
              ...prev,
              days: days.data
            }));
          }
        );
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(state => ({ ...state, appointments }));

        console.log("Hello");
        Promise.all([axios.get(`http://localhost:8001/api/days`)]).then(
          ([days]) => {
            console.log("Days--> ", days);
            setState(prev => ({
              ...prev,
              days: days.data
            }));
          }
        );
      });
  }

  //This modifies the whole bit of the state based on the selected - change the whole day
  //can modify more at once
  //Day:day = day

  const setDay = day => setState({ ...state, day });

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
        setState({
          ...state,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        });
      })
      .catch(err => {
        // console.log(err);
        console.error(err);
      });
    // api could return empty list so you have to have a default value
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
