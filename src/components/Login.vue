<template>
  <div class="container container-table">
      <div class="row vertical-10p">
        <div class="container">
          <img src="/static/img/logo.png" class="center-block logo">
          <div class="text-center col-md-4 col-sm-offset-4">
            <!-- login form -->
            <form class="ui form loginForm"  @submit.prevent="checkCreds">

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input class="form-control" name="username" placeholder="Username" type="text" v-model="username">
              </div>

              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                <input class="form-control" name="password" placeholder="Password" type="password" v-model="password">
              </div>
              <button type="submit" v-bind:class="'btn btn-primary btn-lg ' + loading">Submit</button>
            </form>

            <!-- errors -->
            <div v-if=response class="text-red"><p>{{response}}</p></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { adminList } from '../config'

export default {
  name: 'Login',
  data (router) {
    return {
      section: 'Login',
      loading: '',
      username: '',
      password: '',
      response: ''
    }
  },
  mounted  () {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        this.$router.push('/')
      }
    })
  },
  methods: {
    checkCreds () {
      const {username, password} = this
      if (username === 'wekintm' && password === 'wekintm') {
        this.$router.push('/tm')
        return
      }
      firebase.auth().signInWithEmailAndPassword(username, password)
        .then(r => {
          if (adminList.includes(r.uid)) {
            this.$router.push('/')
          } else {
            window.alert('관리자 계정만 접근 가능합니다.')
            firebase.auth().signOut()
          }
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            window.alert('비밀번호가 일치하지 않습니다.')
          } else {
            window.alert(error + '에러 위킨 개발자에게 문의바랍니다.')
          }
        })
    }
  }
}
</script>

<style>
html, body, .container-table {
  height: 100%;
  background-color: #282B30 !important;
}
.container-table {
    display: table;
    color: white;
}
.vertical-center-row {
    display: table-cell;
    vertical-align: middle;
}
.vertical-20p {
  padding-top: 20%;
}
.vertical-10p {
  padding-top: 10%;
}
.logo {
  width: 15em;
  padding: 3em;
}
.loginForm .input-group {
  padding-bottom: 1em;
  height: 4em;
}
.input-group input {
  height: 4em;
}
</style>
