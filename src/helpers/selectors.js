export function getAppointmentsForDay (state, day) {
  const filteredAppointments = state.days.filter(
		stateDay => stateDay.name === day
	)

  const results = []

  if (filteredAppointments.length > 0) {
    for (const appointmentID of filteredAppointments[0].appointments) {
      if (appointmentID === state.appointments[appointmentID].id) {
        results.push(state.appointments[appointmentID])
      }
    }
  }

  return results
}

export function getInterview (state, interview) {
  const interviewers = state.interviewers
  const appointments = Object.values(state.appointments)

  for (const appointment of appointments) {
    if (appointment.interview) {
      if (appointment.interview === interview) {
        return {
          student: appointment.interview.student,
          interviewer: interviewers[interview.interviewer]
        }
      }
    }
  }

  return null
}

export function getInterviewersForDay (state, day) {
  const results = []
  const interviewerIDs = []
  const appointments = getAppointmentsForDay(state, day)

  if (state.days.includes(day)) {
    return results
  }

  for (const appointment of appointments) {
    if (appointment.interview !== null) {
      interviewerIDs.push(appointment.interview.interviewer)
    }
  }

  for (const interviewer in state.interviewers) {
    if (interviewerIDs.includes(state.interviewers[interviewer].id)) {
      results.push(state.interviewers[interviewer])
    }
  }

  return results
}
