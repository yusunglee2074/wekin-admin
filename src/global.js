import firebase from 'firebase'

export default {
  firebase,
  setAccessTokenOnLocalStorageAndHttpHeader (httpDefaultOption) {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken(true).then(token => {
            window.localStorage.setItem('token', token)
            console.log(typeof httpDefaultOption)
            console.log(httpDefaultOption, 'http')
            httpDefaultOption.headers.common['x-access-token'] = window.localStorage.getItem('token')
            resolve(token)
          })
          .catch(error => reject(error))
        }
      })
    })
  }
}
