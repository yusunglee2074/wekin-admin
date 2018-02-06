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
              <span class="info-box-number">{{dashboard.numberOfUser}}</span>
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
              <span class="info-box-number">{{dashboard.NumberOfTodayUser}}</span>
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
              <span class="info-box-number">{{dashboard.numberOfActiveActivity}}</span>
            </div>
          </router-link>
          <!-- /.info-box-content -->
        </div>
        <!-- /.info-box -->
      </div>
      <!-- /.col -->
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box" style="max-height:90px;">
          <!--<span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>-->
          <span class="info-box-icon bg-green"><i class="ion ion-ios-cart-outline"></i></span>

          <router-link to="/order">
            <div class="info-box-content">
              <span class="info-box-text">최근 일주일 주문건수</span>
              <span class="info-box-number" style="font-size:16px;">{{dashboard.todayNumberOfPaid}}</span>
              <span class="info-box-number" style="font-size:16px;">{{dashboard.totalPaidAmount | won}}원</span>
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
                  <strong>위킨/메이커 승인 요청</strong>
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
                      <tr v-for="item in dashboard.toBeConfirmedActivities">
                        <td>{{item.activity_key}}</td>
                        <td>{{`${item.Host.name} 님이 위킨(${item.title}) ${wekinRequest[item.status].status }요청을 했습니다.`}}</td>
                        <td><span class="badge" v-bind:class="wekinRequest[item.status].style">{{wekinRequest[item.status].status}}</span></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr v-for="item in dashboard.toBeConfirmedMakers">
                        <td>{{item.host_key}}</td>
                        <td>{{`${item.name ? item.name : '이름없음' } 님이 메이커 승인 요청을 했습니다.`}}</td>
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
                  <strong>종료 임박 위킨</strong>
                </p>
                <!-- /.box-header -->
                <div class="box-body no-padding table-responsive">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th style="width: 20px">#</th>
                        <th>위킨명</th>
                        <th>종료까지</th>
                        <th>문자전송</th>
                      </tr>
                      <tr v-for="item in dashboard.activityThatEndsSoon">
                        <td>{{ item.activity_key }}</td>
                        <td><router-link :to="{ name: 'HostDetail', params: { key: item.host_key }}">{{ item.title }}</router-link></td>
                        <td>{{ calculateLeftDays(item) }}일</td>
                        <td><button>준비중</button></td>
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
                  <strong>최근 결제정보 내역</strong>
                </p>
                <!-- /.box-header -->
                <div class="box-body no-padding table-responsive">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <th style="width: 10px">#</th>
                        <th>정보</th>
                      </tr>
                      <tr v-for="item in dashboard.recentWekinNew">
                        <td>{{ item.wekin_key }}</td>
                        <td>{{`${item.User ? item.User.name : '이름정보없음' } 님이 ${ item.state } 했습니다.`}}</td>
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
                      <tr v-for="item in dashboard.recentDoc">
                        <td>{{item.doc_key}}</td>
                        <td>{{item.created_at | date('MM-DD HH:mm') }}</td>
                        <td>{{`회원 ${item.User ? item.User.name : '이름정보없음'} 님이 ${wekinDocument[item.type].category} 작성`}}</td>
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
import moment from 'moment'

export default {
  data () {
    return {
      dashboard: {
        NumberOfTodayUser: null,
        activityThatEndsSoon: null,
        numberOfActiveActivity: null,
        numberOfUser: null,
        recentDoc: null,
        recentWekinNew: null,
        toBeConfirmedActivities: null,
        toBeConfirmedMakers: null,
        todayNumberOfPaid: null
      },
      homeWekinRequest: null,
      homeHostRequest: null,
      homeRefuneRequest: null,
      homeRecentlyDocument: null,
      wekinRequest: wekinStatus,
      wekinDocument: docStatus
    }
  },
  methods: {
    calculateLeftDays (item) {
      return moment(item.end_date).diff(moment(), 'days')
    },
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
          this.dashboard = r.data.data
          var countPaid = 0
          var totalPaidAmount = 0
          for (let i = 0; i < this.dashboard.recentWekinNew.length; i++) {
            let wekin = this.dashboard.recentWekinNew[i]
            if (wekin.state === 'paid' && moment(wekin.updated_at) > moment().add(-7, 'days')) {
              countPaid += wekin.pay_amount
              totalPaidAmount += wekin.final_price
            }
          }
          this.dashboard.todayNumberOfPaid = countPaid
          this.dashboard.totalPaidAmount = totalPaidAmount
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created () {
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
