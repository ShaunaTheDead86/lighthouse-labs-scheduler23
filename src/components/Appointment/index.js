import React from 'react'
import 'components/Appointment/styles.scss'
import Status from './Status'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Confirm from './Confirm'
import Error from './Error'
import useVisualMode from 'components/hooks/useVisualMode'

export default function Appointment (props) {
  const EMPTY = 'EMPTY'
  const SHOW = 'SHOW'
  const CREATE = 'CREATE'
  const SAVE = 'SAVE'
  const CONFIRM = 'CONFIRM'
  const DELETE = 'DELETE'
  const EDIT = 'EDIT'
  const SAVE_ERROR = 'SAVEERROR'
  const DELETE_ERROR = 'DELETEERROR'

  function save (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVE)
    props
			.bookInterview(props.id, interview)
			.then(() => transition(SHOW))
			.catch(error => transition(SAVE_ERROR, true))
  }

  function cancelInterview () {
    transition(DELETE)
    props
			.delete(props.id)
			.then(() => transition(EMPTY))
			.catch(error => transition(DELETE_ERROR, true))
  }

  const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	)

  return (
    <div data-testid='appointment'>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
				/>}
      {mode === CREATE &&
      <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
				/>}
      {mode === EDIT &&
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
				/>}
      {mode === SAVE && <Status message={`Saving`} />}
      {mode === DELETE && <Status message={`Deleting`} />}
      {mode === CONFIRM &&
      <Confirm
        onCancel={() => transition(SHOW)}
        onConfirm={cancelInterview}
				/>}
      {mode === SAVE_ERROR &&
      <Error message='Could not save appointment' onClose={() => back()} />}
      {mode === DELETE_ERROR &&
      <Error
        message='Could not delete appointment'
        onClose={() => transition(SHOW, true)}
				/>}
    </div>
  )
}
