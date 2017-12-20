<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <h2>{{ activity.title }}</h2>
        <h4>호스트명 : {{ activity.Host.name }}</h4>
        <h4>호스트 전화번호: {{ activity.Host.tel }}</h4>
        <h4>호스트 이메일: {{ activity.Host.email }}</h4>
        <div class="box">
          <div class="box-body">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 7%;">위킨키</th>
                        <th style="width: 9%;">활동시각</th>
                        <th style="width: 9%;">최종가격</th>
                        <th style="width: 7%;">예약자</th>
                        <th style="width: 11%;">상태</th>
                        <th style="width: 11%;">주문디테일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="wekin in activity.WekinNews">
                        <td>{{ wekin.wekin_key }}</td>
                        <td>{{ dayPlusTime(wekin.start_date, wekin.start_time) }}</td>
                        <td>{{ wekin.final_price }}</td>
                        <td><router-link :to="{ name: 'UserDetail', params: { key: wekin.User.user_key } }" >{{ wekin.User.name }}</router-link></td>
                        <td>{{ wekin.state }}</td>
                        <td><router-link :to="{ name: 'OrderDetail', params: { key: wekin.Order.order_key } }"><button>디테일</button></router-link></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  components: { },
  name: 'WekinList',
  data () {
    return {
      activity: null
    }
  },
  updated () {
  },
  computed: {
  },
  methods: {
    dayPlusTime (day, time) {
      return moment(day).set('hour', moment(time).get('hour')).add(-9, 'hour').set('minute', moment(time).get('minute')).format('YY-MM-DD LT')
    }
  },
  created () {
    this.activity = this.$route.params.item
  }
}
</script>

<style>
</style>
