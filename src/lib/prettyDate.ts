export function prettyDate(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date)
  }

  if (typeof date === 'undefined') return ''

  // Seconds elapsed between the date and now
  const difference = Math.floor((Date.now() - date.getTime()) / 1000)
  let output = ``
  if (difference < 60) {
      // Less than a minute has passed:
      output = ago(difference, 'second')
  } else if (difference < 3600) {
      // Less than an hour has passed:
      output = ago(Math.floor(difference / 60), 'minute')
  } else if (difference < 86400) {
      // Less than a day has passed:
      output = ago(Math.floor(difference / 3600), 'hour')
  } else if (difference < 2620800) {
      // Less than a month has passed:
      output = ago(Math.floor(difference / 86400), 'day')
  } else if (difference < 31449600) {
      // Less than a year has passed:
      output = ago(Math.floor(difference / 2620800), 'month')
  } else {
      // More than a year has passed:
      output = ago(Math.floor(difference / 31449600), 'year')
  }

  return output
}

function ago(count: number, unit: string) {
  return `${count} ${unit}${count === 1 ? '' : 's'} ago`
}