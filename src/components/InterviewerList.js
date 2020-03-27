import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  // const [name, setName] = useState("");
  console.log("INTERRRRCONSOLE: ", props);
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}

// export default function InterviewerList(props) {
//   const items = props.interviewers.map(person => (

//     <InterviewerListItem
//       key={person.id}
//       name={person.name}
//       avatar={person.avatar}
//       selected={person.id === props.interviewer}
//       // selected={props.value === person.id}
//       setInterviewer={() => props.setInterviewer(person.id)}
//     />
//   ));
//   return (
//     <section className="interviewers">
//       <h4 className="interviewers__header text--light">Interviewer</h4>
//       <ul className="interviewers__list">{items}</ul>
//     </section>
//   );
// }
