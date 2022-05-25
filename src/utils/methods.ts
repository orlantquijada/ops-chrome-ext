import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

export function isEarly(startTime: Date, endTime: Date) {
  const midPoint = dayjs(endTime).diff(dayjs(startTime)) / 2
  const now = dayjs(Date()).diff(startTime)

  return midPoint > now
}

export function remainingTime(endTime: Date, finishCb: () => void) {
  const [durationLeft, setDurationLeft] = useState(() => {
    return dayjs(endTime).unix() - dayjs().unix()
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const intervalId = useRef<any>()

  useEffect(() => {
    const id = setInterval(() => setDurationLeft((val) => val - 1), 1000)
    intervalId.current = id

    return () => clearInterval(intervalId.current || id)
  }, [])

  useEffect(() => {
    if (durationLeft <= 0) {
      clearInterval(intervalId.current)
      finishCb()
    }
  }, [durationLeft, finishCb])

  const hour = Math.floor(durationLeft / 60 / 60)
  const minute = Math.floor((durationLeft / 60) % 60)
  const seconds = Math.floor(durationLeft % 60)

  if (durationLeft <= 0) return null

  const timeLeft = `${hour ? hour : ''}:${minute ? minute : ''}:${
    seconds ? seconds : ''
  }`

  return timeLeft
}
