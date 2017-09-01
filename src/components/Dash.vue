<template>
  <div :class="['wrapper', 'classes']" v-if="currentUser">
    <header class="main-header">
      <a href="/" class="logo">
      <!--<img src="/static/img/logo-main.png" alt="Logo" class="img-responsive">-->
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini"><img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive center-block"></span>
        <!-- logo for regular state and mobile devices -->
        <div class="logo-lg">
          <img src="/static/img/copilot-logo-white.svg" alt="Logo" class="img-responsive">
          <span>WEKIN</span>
        </div>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">

            <!-- User Account Menu -->
            <li class="dropdown user user-menu" @click="signOut">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img v-bind:src="currentUser.photoURL" class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">{{ currentUser.displayName }}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <!-- Left side column. contains the logo and sidebar -->
    <sidebar />

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Home</a></li>
          <li class="active">{{$route.name.toUpperCase()}}</li>
        </ol>
      </section>

      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; <a href="javascript:;">CoPilot</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import Sidebar from './Sidebar'
import 'hideseek'
import firebase from 'firebase'
import { adminList } from '../config'

export default {
  name: 'Dash',
  components: {
    Sidebar
  },
  data: function () {
    return {
      currentUser: {},
      fireAuth: firebase.auth()
    }
  },
  methods: {
    signOut () {
      window.alert('sign out')
      this.fireAuth.signOut()
      this.$router.push('/login')
    }
  },
  created () {
    this.fireAuth.onAuthStateChanged(u => {
      if (u) {
        this.currentUser = u
        console.log(u.uid)
        if (adminList.includes(u.uid)) {
          u.getIdToken().then(r => {
            this.$http.defaults.headers.common['x-access-token'] = r
            window.localStorage.setItem('token', r)
            console.log(r)
          })
        } else {
          this.fireAuth.signOut()
        }
      } else {
        this.$router.push('/login')
      }
    })
    this.$http.defaults.headers.common['x-access-token'] = window.localStorage.getItem('token')
  }
}
</script>

<style lang="scss">
.wrapper.fixed_layout {
  .main-header {
    position: fixed;
    width: 100%;
  }

  .content-wrapper {
    padding-top: 50px;
  }

  .main-sidebar {
    position: fixed;
    height: 100vh;
  }
}

.wrapper.hide_logo {
  @media (max-width: 767px) {
    .main-header .logo {
      display: none;
    }
  }
}

.logo-mini, .logo-lg {
  text-align: left;

  img {
    padding: .4em;
  }
}

.logo-lg {
  img {
    display: -webkit-inline-box;
    width: 25%;
  }
}
.user-panel {
  height: 4em;
}

hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
