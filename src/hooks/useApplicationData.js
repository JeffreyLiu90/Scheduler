import { useState, useEffect } from "react";
import axios from "axios";

//Default state
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  //To book a new interview, makes an axios.put request to edit, and returns the updated day list & appointments
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

  //To delete an interview, makes an axios.delete request to remove, and returns the updated day list & appointments
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

  const setDay = day => setState({ ...state, day });

  //axios to retrieve information from database to render
  useEffect(() => {
    const allDays = "http://localhost:8001/api/days";
    const allAppointments = "http://localhost:8001/api/appointments";
    const allInterviewers = "http://localhost:8001/api/interviewers";

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
        console.error(err);
      });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
