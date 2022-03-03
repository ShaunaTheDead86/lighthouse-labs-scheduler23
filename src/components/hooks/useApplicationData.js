import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useApplicationData () {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  })

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, [])

  const setDay = day => {
    setState(prev => ({ ...prev, day }))
  }

  function updateSpots (id, addSpot) {
    const currentDay = state.days.filter(day => {
      return day.name === state.day
    })

    for (const id in state.appointments) {
      const appointment = state.appointments[id]

      if (currentDay[0].appointments.includes(id)) {
        if (appointment.interview === null) {
          currentDay[0].spots++
        } else {
          currentDay[0].spots--
        }
      }
    }

    if (addSpot) {
      currentDay[0].spots++
    } else {
      currentDay[0].spots--
    }
  }

  function bookInterview (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const putPromise = axios
			.put(`/api/appointments/${1}`, { interview })
			.then(res => setState(prev => ({ ...prev, appointments })))
			.then(updateSpots(id, false))
			.catch(err => console.log('error', err))

    return putPromise
  }

  function cancelInterview (id) {
    return axios.delete(`/api/appointments/${id}`).then(updateSpots(id, true))
  }

  return { state, setDay, bookInterview, cancelInterview, updateSpots }
}
