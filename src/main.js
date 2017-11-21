// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize, date, img } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

// firebase 기본설정
import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyB7lOHTi4hfDs8U36kN6f7nA8slYKBoDwY',
  authDomain: 'wekin-9111d.firebaseapp.com',
  databaseURL: 'https://wekin-9111d.firebaseio.com',
  projectId: 'wekin-9111d',
  storageBucket: 'wekin-9111d.appspot.com',
  messagingSenderId: '698686828109'
}
firebase.initializeApp(config)
// firebase end

// Axios 기본설정
import axios from 'axios'

Vue.prototype.$http = axios.create({
  // baseURL: 'http://localhost:8888/v1/'
  // baseURL: 'https://wekin-api-dev-dot-wekinproject.appspot.com/v1/'
  baseURL: 'https://wekin-api-prod-dot-wekinproject.appspot.com/v1/'
})
// axios end

// vue-tables-2
import { ServerTable } from 'vue-tables-2'

Vue.use(ServerTable, {}, false, null)

// end vue-tables-2

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)
Vue.filter('date', date)
Vue.filter('img', img)

Vue.use(VueRouter)

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
  if (to.auth && (to.router.app.$store.state.token === 'null')) {
    console.log('Not authenticated')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

sync(store, router)

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

// Check local storage to handle refreshes
if (window.localStorage) {
  var localUserString = window.localStorage.getItem('user') || 'null'
  var localUser = JSON.parse(localUserString)

  if (localUser && store.state.user !== localUser) {
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

// import dynamo from './util/aws/dynomo/initTable'
// dynamo.initData()
