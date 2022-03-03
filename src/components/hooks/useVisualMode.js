import { useState } from 'react'

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])

  function transition (newMode, replace) {
    if (replace) {
      const currentHistory = history.slice(0, history.length - 1)
      setHistory(currentHistory)
      setMode(newMode)
    } else {
      setHistory(prev => [...prev, newMode])
      setMode(newMode)
    }
  }

  function back () {
    const newHistory = history.slice(0, history.length - 1)

    setHistory(newHistory)

    if (newHistory.length !== 0) {
      setMode(newHistory[newHistory.length - 1])
    } else {
      setMode(history[0])
    }
  }

  return { mode, transition, back }
}
