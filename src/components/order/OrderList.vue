<template>
  <section class="content">

    <div class="row center-block">
      <div class="col-md-8">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">주문 필터</h3>
          </div>
          <div class="box-body no-padding table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td>주문상태</td>
                  <td><input id="status1" v-model="query.status" type="radio" value=""><label for="status1"> 전체</label></td>
                  <td><input id="status2" v-model="query.status" type="radio" value="ready"><label for="status2"> 입금대기</label></td>
                  <td><input id="status3" v-model="query.status" type="radio" value="paid"><label for="status3"> 입금완료</label></td>
                  <td><input id="status4" v-model="query.status" type="radio" value="cancelled"><label for="status4"> 취소</label></td>
                  <td><input id="status5" v-model="query.status" type="radio" value="failed"><label for="status5"> 결제실패</label></td>
                  <td><input id="status6" v-model="query.status" type="radio" value="reqRef"><label for="status6"> 환불신청</label></td>
                </tr>
                <tr>
                  <td>결제수단</td>
                  <td><input id="method1" v-model="query.order_pay_method" type="radio" value=""><label for="method1"> 전체</label></td>
                  <td><input id="method2" v-model="query.order_pay_method" type="radio" value="card"><label for="method2"> 신용카드</label></td>
                  <td><input id="method3" v-model="query.order_pay_method" type="radio" value="vbank"><label for="method3"> 가상계좌</label></td>
                  <td><input id="method4" v-model="query.order_pay_method" type="radio" value="trans"><label for="method4"> 계좌이체</label></td>
                </tr>
                <tr>
                  <td>주문일자</td>
                  <td colspan="6"><input type="date" max="2020-12-31" v-model="query.start"> ~ <input type="date" max="2020-12-31" v-model="query.end"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
      </div>


      <div class="col-md-12">
        <div class="box">
          <div class="box-body">
            <div class="pull-right">
              <button @click="excel" class="btn">excel 출력</button>
            </div>
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="data_table_wrapper">

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table role="grid" id="data_table" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 60px;">주문#</th>
                        <th style="width: 80px;">회원명</th>
                        <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForDate(items, 'order_at', 'order')">주문일</th>
                        <th style="width: 200px;">위킨제목</th>
                        <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'status')">주문상태</th>
                        <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">결제수단</th>
                        <th style="width: 80px;">회원전화</th>
                        <th style="width: 80px;">신청금액</th>
                        <th style="width: 80px;">입금금액</th>
                        <th style="width: 80px;">신청취소</th>
                        <th style="width: 80px;">미수금</th>
                        <th style="width: 30px;">보기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items" v-show="isInDate(item.order_at) && (query.status === '' ? true : query.status == item.status) && (query.order_pay_method === '' ? true : query.order_pay_method === item.order_pay_method)">
                        <td>{{item.order_key}}</td>
                        <td>{{item.User.name}}</td>
                        <td>{{item.order_at | formatTime }}</td>
                        <td>{{item.wekin_name}} </td>
                        <td>{{item.status }}</td>
                        <td>{{item.order_pay_method}} </td>
                        <td>{{item.user_phone}}</td>
                        <td>{{item.order_total_price}}</td>
                        <td>{{item.order_pay_price}}</td>
                        <td>{{item.order_refund_price }}</td>
                        <td>{{item.order_pay_price - item.order_total_price}}</td>
                        <td><router-link :to="'/order/' + item.order_key"><button class="btn btn-primary">보기</button></router-link></td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <!-- TODO:페이지 처리 하는 컴포넌트 나중에 다시 확인<Pageable :page="pageing"></Pageable>-->
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { hostStatus } from '../../config'
// import Pageable from '../Pageable'
import moment from 'moment'
import global from './../../global'

export default {
  components: {
  },
  name: 'OrderList',
  data () {
    return {
      items: [],
      // pageing: [],
      status: hostStatus,
      query: {
        status: '',
        order_pay_method: '',
        start: moment(this.now).set('days', -10).format('YYYY-MM-DD'),
        end: moment(this.now).format('YYYY-MM-DD'),
        wekin_key: ''
      },
      toggleSwitch: {
        order: false,
        status: false,
        order_pay_method: false
      }
    }
  },
  /*
  watch: {
    '$route.query': 'fetchData',
    'query.status': 'buildQuery',
    'query.start': 'buildQuery',
    'query.end': 'buildQuery',
    'query.order_pay_method': 'buildQuery',
    'query.wekin_key': 'buildQuery'
  },
  */
  methods: {
    sortingMachineForString (list, sortingValue) {
      this.toggleSwitch[sortingValue] = !this.toggleSwitch[sortingValue]
      if (this.toggleSwitch[sortingValue] === true) {
        list.sort(function (a, b) {
          if (a[sortingValue] === null) {
            return 1
          } else if (b[sortingValue] === null) {
            return -1
          }
          let nameA = a[sortingValue].toUpperCase() // ignore upper and lowercase
          let nameB = b[sortingValue].toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
      } else {
        list.sort(function (a, b) {
          let nameA = a[sortingValue] ? a[sortingValue].toUpperCase() : a[sortingValue] // ignore upper and lowercase
          let nameB = b[sortingValue] ? b[sortingValue].toUpperCase() : b[sortingValue] // ignore upper and lowercase
          if (nameA > nameB) {
            return -1
          }
          if (nameA < nameB) {
            return 1
          }
          return 0
        })
      }
    },
    sortingMachineForDate (list, sortingValue, sortingValueName) {
      if (this.toggleSwitch[sortingValueName] === true) {
        this.toggleSwitch[sortingValueName] = !this.toggleSwitch[sortingValueName]
        list.sort((a, b) => {
          return moment(a[sortingValue]) - moment(b[sortingValue])
        })
      } else {
        this.toggleSwitch[sortingValueName] = !this.toggleSwitch[sortingValueName]
        list.sort((a, b) => {
          return moment(b[sortingValue]) - moment(a[sortingValue])
        })
      }
    },
    isInDate (day) {
      let orderDay = moment(day)
      if (orderDay.isSameOrBefore(this.query.end, 'day') && orderDay.isSameOrAfter(this.query.start, 'day')) {
        return true
      }
      return false
    },
    excel () {
      window.jQuery('#data_table').table2excel({
        exclude: '.noExl',
        name: 'Results',
        filename: 'data.xls'
      })
    },
    /*
    byMonth () {
      this.query.start = moment(this.month, 'MM').format('YYYY-MM-DD')
      this.query.end = moment(this.month, 'MM').add('months', 1).date(0).format('YYYY-MM-DD')
    },
    byYear () {
      this.query.start = moment(this.year, 'YYYY').format('YYYY-MM-DD')
      this.query.end = moment(this.year, 'YYYY').add('years', 1).date(0).format('YYYY-MM-DD')
    },
    */
    fetchData () {
      // this.$http.get(`/order/pageing/?${this.serialize(this.$route.query)}`)
      global.setAccessTokenOnLocalStorageAndHttpHeader(this.$http.defaults)
        .then(result => {
          return this.$http.get(`/order/pageing/`)
        })
        .then(res => {
          res.data.data.sort(function (a, b) {
            return moment(b.order_at) - moment(a.order_at)
          })
          this.items = res.data.data
        })
        .catch(err => {
          window.alert('새로고침 후에도 작동이 안된다면 유성이에게 해당 화면을 보여주세요.' + err + moment().format())
        })
    }
    /*
    serialize (obj) {
      let str = []
      for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${decodeURIComponent(obj[p])}`)
        }
      }
      return str.join('&')
    },
    buildQuery () {
      this.$router.push({query: {
        sort: 'order_key,desc',
        size: 10,
        status: this.query.status,
        method: this.query.order_pay_method,
        start: this.query.start,
        end: this.query.end,
        wekin_key: this.query.wekin_key
      }
      })
    }
    */
  },
  filters: {
    formatTime: function (value) {
      return moment(value).format('L')
    }
  },
  mounted () {
    this.fetchData()
  }
}
</script>

<style>
@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
