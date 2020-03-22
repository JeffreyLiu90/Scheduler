export function getAppointmentsForDay(state, day) {
  let resultArray = [];
  const filterNameDays = state.days.filter(key => key.name === day);
  if (filterNameDays.length === 0) {
    return [];
  }
  let appointmentArray = filterNameDays[0].appointments;
  for (let element of appointmentArray) {
    resultArray.push(state.appointments[element]);
  }
  return resultArray;
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

export function getInterviewersForDay(state, day) {
  let filteredDays = state.days.filter(stateDay => day === stateDay.name);
  if (!(filteredDays !== [] && day && filteredDays[0])) {
    return [];
  }
  const { appointments } = filteredDays[0];
  const interviewers = [];
  console.log("filtered days: ", filteredDays);
  for (let appointment of Object.values(state.appointments)) {
    if (!appointments.includes(appointment.id) && appointment.interview) {
      let interviewer = appointment.interview.interviewer.toString();
      if (!interviewers.includes(state.interviewers[interviewer])) {
        interviewers.push(state.interviewers[interviewer]);
      }
    }
  }
  return interviewers;
}

// const obj = { a:1}
// const newObj = {...obj, b: 2, a: 3}
// export function getAppointmentsForDay(state, day) {

//   state.map((day, index) => {
// const

//   }

//   )

// }

// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

// const [day, setDay] = useState([]);
//   const [currentDay, setCurrentDay] = useState({});
//   console.log("currentDay: ", currentDay);

//   useEffect(() => {
//     axios.get("http://localhost:8001/api/days").then(response => {
//       console.log("response.data is: ", response.data);
//       const days = response.data;
//       setDay(days);
//       // api could return empty list so you have to have a default value

//       setCurrentDay(days);
//     });
//   }, []);

//   const appointmentSlots = appointments.map(appointment => {
//     if (appointment.interview) {
//       return (
//         <Appointment
//           key={appointment.id}
//           id={appointment.id}
//           time={appointment.time}
//           interviewer={appointment.interview.interviewer.name}
//           student={appointment.interview.student}
//         />
//       );
//     }

//     return <Appointment key={appointment.id} {...appointment} />;
//   });

//   return (
//     <main className="layout">
//       <section className="sidebar">
//         <img
//           className="sidebar--centered"
//           src="images/logo.png"
//           alt="Interview Scheduler"
//         />
//         <hr className="sidebar__separator sidebar--centered" />
//         <nav className="sidebar__menu">
//           <DayList days={day} setCurrentDay={setCurrentDay} />
//         </nav>
//         <img
//           className="sidebar__lhl sidebar--centered"
//           src="images/lhl.png"
//           alt="Lighthouse Labs"
//         />
//       </section>
//       <section className="schedule">{appointmentSlots}</section>
//     </main>
//   );
// }
