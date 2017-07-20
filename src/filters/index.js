import moment from 'moment'
const urlParser = document.createElement('a')

export function domain (url) {
  urlParser.href = url
  return urlParser.hostname
}

export function count (arr) {
  return arr.length
}

export function prettyDate (date) {
  var a = new Date(date)
  return a.toDateString()
}

export function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }

  return time + label + 's'
}

exports.date = (date, format) => {
  if (!date) {
    return ''
  }
  let dateFormat = moment(date)
  return (format) ? dateFormat.format(format) : dateFormat.fromNow()
}

exports.img = (url = 'http://we-kin.com/public/images/default-profile.png') => {
  if (url && url.substring(0, 4) !== 'http') {
    return `http://we-kin.com${url}`
  }
  return url
}
