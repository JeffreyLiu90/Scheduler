//Helper functions

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
