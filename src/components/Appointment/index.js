import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Saving from "components/Appointment/Saving";
import Deleting from "components/Appointment/Deleting";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
import ErrorDeleting from "components/Appointment/ErrorDeleting";
import ErrorSaving from "components/Appointment/ErrorSaving";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const ERRORSAVING = "ERRORSAVING";
const ERRORDELETING = "ERRORDELETING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interviewer ? SHOW : EMPTY
  );

  //Save button function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    //props.id is the interview id
    //interview is the interview object, i.e. { student: "Chad Takahashi", interviewer: 2 },

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERRORSAVING, true));
  }

  //Delete button function
  function confirm(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERRORDELETING, true));
  }

  const interviewers = props.interviewers ? props.interviewers : [];

  //Different modes
  useEffect(() => {});
  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.student}
          interviewer={props.interviewer.name}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === SAVING && <Saving />}
      {mode === ERRORSAVING && <ErrorSaving onClose={() => back()} />}
      {mode === ERRORDELETING && <ErrorDeleting onClose={() => back()} />}
      {mode === DELETING && <Deleting />}
      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={confirm} />
      )}
      {mode === EDIT && (
        <Form
          name={props.student}
          interviewer={props.interviewer.id}
          bookInterview={props.bookInterview}
          interviewers={interviewers}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
      )}
    </article>
  );
}
