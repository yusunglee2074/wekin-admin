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
                  <td>위킨찾기</td>
                  <td colspan="4"><input v-model="query.wekin_key"></td>
                </tr>
                <tr>
                  <td>주문상태</td>
                  <td><input v-model="query.status" type="radio" value=""><label> 전체</label></td>
                  <td><input v-model="query.status" type="radio" value="reqRef"><label> 환불요청</label></td>
                  <td><input v-model="query.status" type="radio" value="cancelled"><label> 환불완료</label></td>
                </tr>
                <tr>
                  <td>결제수단</td>
                  <td><input v-model="query.order_pay_method" type="radio" value=""><label> 전체</label></td>
                  <td><input v-model="query.order_pay_method" type="radio" value="card"><label> 신용카드</label></td>
                  <td><input v-model="query.order_pay_method" type="radio" value="vbank"><label> 가상계좌</label></td>
                  <td><input v-model="query.order_pay_method" type="radio" value="trans"><label> 계좌이체</label></td>
                  <td colspan="2"><input v-model="query.order_pay_method" type="radio" value="phone"><label> 휴대폰</label></td>
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
                        <th style="width: 10px;">주문번호</th>
                        <th style="width: 50px;">예금주</th>
                        <th style="width: 20px;">은행</th>
                        <th style="width: 80px;">계좌번호</th>
                        <th style="width: 80px;">요청일</th>
                        <th style="width: 80px;">결제수단</th>
                        <th style="width: 80px;">회원이름</th>
                        <th style="width: 30px;">연락처</th>
                        <th style="width: 30px;">관리</th>
                        <th style="width: 30px;">주문정보</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td>{{item.order_key}}</td>
                        <td>{{(item.order_extra) ? item.order_extra.refund_holder : ''}} </td>
                        <td>{{(item.order_extra) ? item.order_extra.refund_bank : ''}} </td>
                        <td>{{(item.order_extra) ? item.order_extra.refund_account : '' }}</td>
                        <td>{{item.order_at}} </td>
                        <td>{{item.order_pay_method}}</td>
                        <td>{{item.user_name}}</td>
                        <td>{{item.user_phone}}</td>
                        <Category :text="orderStatus[item.status].text" :color="orderStatus[item.status].color"></Category>
                        <td><router-link :to="'/order/' + item.order_key"><button class="btn btn-primary">보기</button></router-link></td>
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
import { orderStatus } from '../../config'
import Pageable from '../Pageable'
// import moment from 'moment'

export default {
  components: { Category, Pageable },
  name: 'OrderList',
  data () {
    return {
      items: [],
      pageing: [],
      orderStatus: orderStatus,
      query: {
        status: '',
        order_pay_method: '',
        start: '',
        end: '',
        wekin_key: ''
      }
    }
  },
  watch: {
    '$route.query': 'fetchData',
    'query.status': 'buildQuery',
    'query.start': 'buildQuery',
    'query.end': 'buildQuery',
    'query.order_pay_method': 'buildQuery',
    'query.wekin_key': 'buildQuery'
  },
  methods: {
    excel () {
      window.jQuery('#data_table').table2excel({
        exclude: '.noExl',
        name: 'Results',
        filename: 'data.xls'
      })
    },
    fetchData () {
      this.$http.get(`/order/refund/?${this.serialize(this.$route.query)}`)
      .then(res => {
        this.pageing = res.data
        this.items = res.data.content
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
        status: this.query.status,
        method: this.query.order_pay_method,
        start: this.query.start,
        end: this.query.end,
        wekin_key: this.query.wekin_key
      }
      })
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
