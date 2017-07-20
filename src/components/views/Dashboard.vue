<template>
  <!-- Main content -->
  <section class="content">
    <!-- Info boxes -->
    <div class="row" v-if="dashboard">

      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <!--<span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>-->
          <span class="info-box-icon bg-aqua"><i class="ion ion-ios-people-outline"></i></span>

          <router-link to="/user">
            <div class="info-box-content">
              <span class="info-box-text">회원수</span>
              <span class="info-box-number">{{dashboard.userCount}}</span>
            </div>
          </router-link>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <!--<span class="info-box-icon bg-red"><i class="fa fa-google-plus"></i></span>-->
          <span class="info-box-icon bg-red"><i class="ion ion-ios-people-outline"></i></span>

          <router-link to="/user">
            <div class="info-box-content">
              <span class="info-box-text">신규 회원수</span>
              <span class="info-box-number">{{dashboard.todaysUser}}</span>
            </div>
          </router-link>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->

      <!-- fix for small devices only -->
      <div class="clearfix visible-sm-block"></div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <!--<span class="info-box-icon bg-green"><i class="ion ion-ios-cart-outline"></i></span>-->
          <span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>

          <router-link to="/wekin">
            <div class="info-box-content">
              <span class="info-box-text">활성 위킨수</span>
              <span class="info-box-number">{{dashboard.todayActivateWekin}}</span>
            </div>
          </router-link>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <!--<span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>-->
          <span class="info-box-icon bg-green"><i class="ion ion-ios-cart-outline"></i></span>

          <router-link to="/order">
            <div class="info-box-content">
              <span class="info-box-text">금일 주문건수</span>
              <span class="info-box-number">{{dashboard.todaysOrderCount}}</span>
            </div>
          </router-link>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->

    <div class="row">
      <div class="col-xs-6">
        <div class="box">
          <div class="box-header width-border">
            <h3 class="box-title"></h3>
            <div class="box-body">
              <div class="col-xs-12">
                <p class="text-center">
                  <strong>위킨 승인 요청</strong>
                </p>
                <!-- /.box-header -->
                <div class="box-body no-padding table-responsive">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th style="width: 10px">#</th>
                        <th>Task</th>
                        <th style="width: 40px">Label</th>
                      </tr>
                      <tr v-for="item in homeWekinRequest">
                        <td>{{item.activity_key}}</td>
                        <td>{{`메이커 ${item.Host.name} 님이 위킨(${item.title}) ${wekinRequest[item.status].status }요청을 했습니다.`}}</td>
                        <td><span class="badge" v-bind:class="wekinRequest[item.status].style">{{wekinRequest[item.status].status}}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.box-body -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-6">
        <div class="box">
          <div class="box-header width-border">
            <h3 class="box-title"></h3>
            <div class="box-body">
              <div class="col-xs-12">
                <p class="text-center">
                  <strong>메이커 승인 요청</strong>
                </p>
                <!-- /.box-header -->
                <div class="box-body no-padding table-responsive">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th style="width: 10px">#</th>
                        <th>Task</th>
                      </tr>
                      <tr v-for="item in homeHostRequest">
                        <td>{{item.host_key}}</td>
                        <td>{{`회원 [ ${item.name} ] 님이 메이커 승인요청을 했습니다.`}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.box-body -->
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-xs-6">
        <div class="box">
          <div class="box-header width-border">
            <h3 class="box-title"></h3>
            <div class="box-body">
              <div class="col-xs-12">
                <p class="text-center">
                  <strong>환불 요청</strong>
                </p>
                <!-- /.box-header -->
                <div class="box-body no-padding table-responsive">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th style="width: 10px">#</th>
                        <th>Task</th>
                      </tr>
                      <tr v-for="(item, index, key) in homeRefuneRequest">
                        <td>{{index}}</td>
                        <td>{{`회원 ${item.user_name} 님이 환불요청을 했습니다.`}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.box-body -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="box">
          <div class="box-header width-border">
            <h3 class="box-title"></h3>
            <div class="box-body">
              <div class="col-xs-12">
                <p class="text-center">
                  <strong>최근 피드&후기</strong>
                </p>
                <!-- /.box-header -->
                <div class="box-body no-padding table-responsive">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th style="width: 10px">#</th>
                        <th>Time</th>
                        <th>Task</th>
                        <th style="width: 40px">Label</th>
                      </tr>
                      <tr v-for="item in homeRecentlyDocument">
                        <td>{{item.doc_key}}</td>
                        <td>{{item.created_at | date('MM-DD HH:mm:ss') }}</td>
                        <td>{{`회원 ${item.User.name} 님이 ${wekinDocument[item.type].category} 작성`}}</td>
                        <td><span class="badge" v-bind:class="wekinDocument[item.type].style">{{wekinDocument[item.type].category}}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.box-body -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /.content -->
</template>

<script>
import { wekinStatus, docStatus } from '../../config'
import { storage } from '../../util/google/firebase'

export default {
  data () {
    return {
      dashboard: null,
      homeWekinRequest: null,
      homeHostRequest: null,
      homeRefuneRequest: null,
      homeRecentlyDocument: null,
      wekinRequest: wekinStatus,
      wekinDocument: docStatus
    }
  },
  methods: {
    upload (event) {
      storage(event.target.files[0], pro => {
        console.log(pro)
      })
      .then(url => {
        console.log(url)
      })
    },
    fetchData () {
      this.$http.get('/dashboard/')
      .then(r => {
        this.dashboard = r.data
        return this.$http.get('/dashboard/activity')
      })
      .then(r => {
        this.homeWekinRequest = r.data
        return this.$http.get('/dashboard/host')
      })
      .then(r => {
        this.homeHostRequest = r.data
        return this.$http.get('/dashboard/doc')
      })
      .then(r => {
        this.homeRecentlyDocument = r.data
        return this.$http.get('/dashboard/refund')
      })
      .then(r => {
        this.homeRefuneRequest = r.data
      })
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>
<style>
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
}
.fullCanvas {
  width: 100%;
}
</style>
