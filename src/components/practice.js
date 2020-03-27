function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.put(`/api/appointments/${id}`, appointment).then(() => {
    setState(state => ({ ...state, appointments }));
    Promise.all([axios.get(`/api/days`)]).then(([days]) => {
      setState(prev => ({
        ...prev,
        days: days.data
      }));
    });
  });
}
function deleteInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
    setState(prev => ({ ...prev, appointments }));
    Promise.all([axios.get(`/api/days`)]).then(([days]) => {
      setState(prev => ({
        ...prev,
        days: days.data
      }));
    });
  });
}

Promise.all([axios.get(`/api/days`)]).then(([days]) => {
  setState(prev => ({
    ...prev,
    days: days.data
  }));
});
