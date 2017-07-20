const API_KEY = 'AIzaSyBmH8xZ6avKGaILXaCLujhU7J3WLL3cwJU'
const DEFAULT_URL = 'http://we-kin.com'

exports.getGeoCode = (address, callback) => {
  return new Promise((resolve, reject) => {
    const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=`

    window.fetch(BASE_URL + address, { method: 'GET' })
    .then(response => {
      return response.json()
    })
    .then(json => {
      resolve(json.results[0])
    })
    .catch(function (error) {
      reject(error)
    })
  })
}
exports.shortUrl = (url) => {
  return new Promise((resolve, reject) => {
    const BASE_URL = 'https://www.googleapis.com/urlshortener/v1/url?key='

    if (url === '') { url = DEFAULT_URL }
    if (url.includes('goo.gl')) {
      resolve(url)
    } else {
      window.fetch(BASE_URL + API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl: url })
      })
        .then(response => response.json())
        .then((json) => {
          resolve(json.id)
        })
        .catch((err) => { reject(err) })
    }
  })
}

exports.staticMap = (address) => {
  return new Promise((resolve, reject) => {
    const BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap'
    let params = {
      center: address,
      zoom: 16,
      size: '600x300',
      maptype: 'roadmap',
      markers: `color:blue|label:W|${address}`
    }
    var esc = encodeURIComponent
    let query = Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&')

    window.fetch(`${BASE_URL}?key=${API_KEY}&${query}`, { method: 'GET' })
    .then(resolve)
    .catch(reject)
  })
}
