import React, { useEffect, useState } from 'react'
import Shocked from '../assets/images/shockedGhost.svg'
import Sad from '../assets/images/sadGhost.svg'
import Ghost from '../assets/images/ghost.svg'
import useInterval from '../hooks/useInterval'

export default function ChangeableGhost({
  error,
  emailAddress,
  retrievalCode,
}) {
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    clearTimeout(timing)
    const timing = setTimeout(() => {
      setTyping(false)
    }, 2000)
    setTyping(true)
  }, [emailAddress, retrievalCode])

  if (error) {
    return <img src={Sad} />
  }

  if (typing) {
    return <img src={Shocked} />
  }

  return <img src={Ghost} />
}
