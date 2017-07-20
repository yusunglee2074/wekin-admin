<template>
  <section class="content">

    <div class="row center-block">
      <div class="col-md-8">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">위킨 리스트</h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body no-padding table-responsive">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <!--<td>메이커 찾기</td>-->
                  <!--<td colspan="2"><input v-model="query.host_key"></td>-->
                  <td>위킨찾기</td>
                  <td colspan="2"><input v-model="query.wekin_key"></td>
                  <td>메이커찾기</td>
                  <td colspan="2"><input v-model="query.host_key"></td>
                </tr>
                <tr>
                  <td>주문일자</td>
                  <td colspan="6"><input type="date" max="2999-12-31" v-model="query.start"> ~ <input type="date" max="2999-12-31" v-model="query.end"></td>
                </tr>

              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
      </div>


      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
          </div>
          <!-- /.box-header -->
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
                        <th style="width: 10px;">#</th>
                        <th style="width: 50px;">주문일</th>
                        <th style="width: 50px;">주문자</th>
                        <th style="width: 10px;">주문수</th>
                        <th style="width: 20px;">주문합계</th>
                        <th style="width: 20px;">가상계좌</th>
                        <th style="width: 20px;">계좌이체</th>
                        <th style="width: 20px;">카드입금</th>
                        <th style="width: 20px;">휴대폰</th>
                        <th style="width: 20px;">페이</th>
                        <th style="width: 20px;">주문취소</th>
                        <th style="width: 20px;">미수금</th>
                        <th style="width: 20px;">수수료비율</th>
                        <th style="width: 20px;">수수료</th>
                        <th style="width: 20px;">정산금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, index) in items" :key="item.order_key">
                        <td>{{item.order_key}}</td>
                        <td>{{item.order_at | date('YYYY-MM-DD HH:mm')}}</td>
                        <td>{{item.user_name}}</td>
                        <td>{{item.wekin_amount}} </td>
                        <td>{{item.order_total_price}}</td>
                        <td>{{(item.order_pay_method == 'vbank') ? item.order_pay_price : 0 }} </td>
                        <td>{{(item.order_pay_method == 'trans') ? item.order_pay_price : 0 }} </td>
                        <td>{{(item.order_pay_method == 'card') ? item.order_pay_price : 0 }} </td>
                        <td>{{(item.order_pay_method == 'phone') ? item.order_pay_price : 0 }} </td>
                        <td>{{(item.order_pay_method == 'samsung') ? item.order_pay_price : 0 }} </td>
                        <td style="color: red;">{{(item.order_refund_price != null) ? item.order_refund_price: 0 }} </td>
                        <td style="color: red;">{{item.order_pay_price - item.order_total_price}}</td>
                        <td style="color: red;">{{item.commission}}</td>
                        <td style="color: red;">{{ratePrice(index)}}</td>
                        <td style="color: red;">{{resultPrice(index)}}</td>
                      </tr>
                    </tbody>
                  </table>
                  <Pageable :page="pageing"></Pageable>
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
import Category from '../Category'
import { hostStatus } from '../../config'
import Pageable from '../Pageable'
import moment from 'moment'

export default {
  components: { Category, Pageable },
  name: 'OrderList',
  data () {
    return {
      items: [],
      pageing: [],
      status: hostStatus,
      query: {
        start: moment(this.now).format('YYYY-MM-DD'),
        end: moment(this.now).format('YYYY-MM-DD'),
        wekin_key: '',
        host_key: ''
      },
      month: moment(this.now).format('MM'),
      year: moment(this.now).format('YYYY')
    }
  },
  watch: {
    '$route.query': 'fetchData',
    'query.start': 'buildQuery',
    'query.end': 'buildQuery',
    'query.wekin_key': 'buildQuery',
    'query.host_key': 'buildQuery'
  },
  methods: {
    ratePrice (index) {
      let t = this.items[index]
      t.order_total_price
      let rate = t.commission / 100
      return t.order_total_price * rate
    },
    resultPrice (index) {
      let t = this.items[index]
      t.order_total_price
      let rate = t.commission / 100
      return t.order_total_price - (t.order_total_price * rate)
    },
    excel () {
      window.jQuery('#data_table').table2excel({
        exclude: '.noExl',
        name: 'Results',
        filename: 'data.xls'
      })
    },
    byMonth () {
      this.query.start = moment(this.month, 'MM').format('YYYY-MM-DD')
      this.query.end = moment(this.month, 'MM').add('months', 1).date(0).format('YYYY-MM-DD')
    },
    byYear () {
      this.query.start = moment(this.year, 'YYYY').format('YYYY-MM-DD')
      this.query.end = moment(this.year, 'YYYY').add('years', 1).date(0).format('YYYY-MM-DD')
    },
    fetchData () {
      this.$http.get(`/order/pageing/?${this.serialize(this.$route.query)}`)
      .then(res => {
        this.pageing = res.data
        this.items = res.data.content
        // return this.$http.get(`/host`)
      })
      .catch(err => console.log(err))
    },
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
        start: this.query.start,
        end: this.query.end,
        wekin_key: this.query.wekin_key,
        host_key: this.query.host_key
      }})
    }
  },
  mounted () {
    this.buildQuery()
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
