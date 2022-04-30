import dayjs from 'dayjs'

export function isEarly(startTime: Date, endTime: Date) {
  const midPoint = dayjs(endTime).diff(dayjs(startTime)) / 2
  const now = dayjs(Date()).diff(startTime)

  return midPoint > now
}
