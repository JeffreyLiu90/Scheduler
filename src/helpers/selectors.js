export function getAppointmentsForDay(state, dayName) {
  const day = state.days.find(key => key.name === dayName);
  return day ? day.appointments.map(id => state.appointments[id]) : [];
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    return {
      ...interview,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
}

export function getInterviewersForDay(state, dayName) {
  const day = state.days.find(key => key.name === dayName);
  return day ? day.interviewers.map(id => state.interviewers[id]) : [];
}

// export function getInterviewersForDay(state, day) {
//   let filteredDays = state.days.filter(stateDay => day === stateDay.name);
//   if (!(filteredDays !== [] && day && filteredDays[0])) {
//     console.log("get interviewers for day: null clause");
//     return [];
//   }
//   const { appointments } = filteredDays[0];
//   const interviewers = [];
//   for (let appointment of Object.values(state.appointments)) {
//     if (!appointments.includes(appointment.id) && appointment.interview) {
//       let interviewer = appointment.interview.interviewer.toString();
//       if (!interviewers.includes(state.interviewers[interviewer])) {
//         interviewers.push(state.interviewers[interviewer]);
//       }
//     }
//   }
//   // console.log("get interviewers for day: ", interviewer);
//   return interviewers;
// }
