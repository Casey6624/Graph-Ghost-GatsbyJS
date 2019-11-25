import React, { useEffect } from 'react'

export default function TimedError({ warning, setWarning, DURATION = 2500 }) {
  let timer

  useEffect(() => {
    if (!warning || !setWarning) return
    clearTimeout(timer)
    if (warning === null) return
    timer = setTimeout(() => {
      setWarning(null)
    }, DURATION)
  }, [warning])

  return <p>{warning} </p>
}
