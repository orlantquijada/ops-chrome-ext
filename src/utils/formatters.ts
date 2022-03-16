import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const DEFAULT_TIME_FORMAT = 'h:mm A'
const DEFAULT_LONG_DATETIME_FORMAT = 'ddd, MMM D h:mm A'

export function formatTime(date: Date) {
  return dayjs(date).format(DEFAULT_TIME_FORMAT)
}

export function formatFromNow(date: Date) {
  return dayjs(date).fromNow()
}

export function formatSchedule(startDateJSON: string, endDateJSON: string) {
  const startDate = dayjs(startDateJSON)
  const endDate = dayjs(endDateJSON)

  if (startDate.isSame(endDate, 'date'))
    return `${startDate.format(
      DEFAULT_LONG_DATETIME_FORMAT
    )} - ${endDate.format(DEFAULT_TIME_FORMAT)}`
  return `${startDate.format(DEFAULT_LONG_DATETIME_FORMAT)} - ${endDate.format(
    DEFAULT_LONG_DATETIME_FORMAT
  )}`
}
