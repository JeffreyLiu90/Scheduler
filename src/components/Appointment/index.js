import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import InterviewerList from "components/InterviewerList";
import InterviewerListItem from "components/InterviewerListItem";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const ERROR = "ERROR";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
export default function Appointment(props) {
  console.log("AYAYAYYAYAYAYA", props.interviewers);
  const { mode, setMode, transition, back } = useVisualMode(
    props.interviewer ? SHOW : EMPTY
  );
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={() => back()}
          // onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.student}
          interviewer={props.interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
    </article>
  );
}

//   if (props.interviewer) {
//     return (
//       <article className="appointment">
//         <Header time={props.time} />
//         <Show
//           student={props.student}
//           interviewer={props.interviewer}
//           onEdit={props.onEdit}
//           onDelete={props.onDelete}
//         />
//       </article>
//     );
//   }
//   return (
//     <article className="appointment">
//       <Header time={props.time} />
//       <Empty onClick={props.onAdd} />
//     </article>
//   );
// }
