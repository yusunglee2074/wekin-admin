<template>
  <section class="content">
    <div>
      <span>보기 옵션</span><br>
      <input type="radio" id="company"><label for="company">기업메이커</label>
      <input type="radio" id="personal"><label for="personal">개인사업자</label>
      <input type="radio" id="both"><label for="both">모두 보기</label>
    </div>
      <div class="col-md-12">
        <div class="box">
          <div class="box-body">
            <div class="pull-right">
              <!--TODO:excel
              <button @click="excel" class="btn">excel 출력</button>
              -->
            </div>
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="data_table_wrapper">

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table role="grid" id="data_table" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 30px;">메이커#</th>
                        <th style="width: 80px;">메이커명</th>
                        <th style="width: 80px;">개인/사업자</th>
                        <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForDate(items, 'order_at', 'order')">거래금액</th>
                        <th style="width: 200px;">위킨 수수료</th>
                        <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'status')">기타세금(위킨 부가세)</th>
                        <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">최종지급액</th>
                        <th style="width: 80px;cursor: pointer;" class="sorting">디테일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td>{{item.host_key}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.type === 1 ? '기업' : '개인'}}</td>
                        <td>{{item.tradeAmount | won }}</td>
                        <td>{{item.wekinFee | won }}</td>
                        <td>{{item.extraTax | won }}</td>
                        <td>{{item.totalPayback | won }}</td>
                        <td><button class="btn btn-primary" @click="goDetail(key)">보기</button></td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <!-- TODO:페이지 처리 하는 컴포넌트 나중에 다시 확인<Pageable :page="pageing"></Pageable>-->
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
// import Pageable from '../Pageable'
import moment from 'moment'
import global from './../../global'

export default {
  components: {
  },
  name: 'pay-back-to-maker-list',
  data () {
    return {
      items: []
    }
  },
  methods: {
    goDetail (key) {
      this.$router.push({ name: 'payBackToMakerDetail', params: { key: this.items[key].host_key, item: this.items[key] } })
    },
    fetchData () {
      // this.$http.get(`/order/pageing/?${this.serialize(this.$route.query)}`)
      global.setAccessTokenOnLocalStorageAndHttpHeader(this.$http.defaults)
        .then(result => {
          return this.$http.get(`/host/admin/get-hosts-with-all-orders`)
        })
        .then(res => {
          this.items = res.data.data
          for (let i = 0, length = this.items.length; i < length; i++) {
            let maker = this.items[i]
            maker.notPaidOrders = []
            maker.tradeAmount = 0
            maker.wekinFee = 0
            maker.extraTax = 0
            maker.totalPayback = 0
            if (maker.type === 1) {
              // 기업(부가세 신고)
              for (let ii = 0, llength = maker.Orders.length; ii < llength; ii++) {
                let order = maker.Orders[ii]
                if (order.status !== 'paid' && order.order_pay_price !== order.order_refund_price) {
                  // cancelled ORDER! (환불)
                  order.order_receipt_price = order.order_pay_price - order.order_refund_price
                }
                maker.notPaidOrders.push(order)
                if (!order.is_it_paybacked) {
                  maker.tradeAmount += order.order_receipt_price
                  if (order.order_pay_method === 'vbank') {
                    order.vbankFee = 300 | 0
                    order.bugase = order.vbankFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.vbankFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.vbankFee - order.bugase | 0
                    order.wekinBugase = order.order_receipt_price * order.commission * 0.01 * 0.1 | 0
                    maker.wekinFee += order.wekinCommisitionPayback | 0
                    maker.totalPayback += order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase | 0
                  } else if (order.order_pay_method === 'card') {
                    order.paymentFee = 0.032
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wekinBugase = order.order_receipt_price * order.commission * 0.01 * 0.1 | 0
                    maker.wekinFee += order.wekinCommisitionPayback | 0
                    maker.totalPayback += order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase | 0
                    order.totalPayback = (order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase) | 0
                  } else if (order.order_pay_method === 'point') {
                    maker.wekinFee += order.order_receipt_price * 0.15 | 0
                    maker.totalPayback += order.order_receipt_price * 0.85 | 0
                    order.totalPayback = order.order_receipt_price * 0.85 | 0
                  } else {
                    order.paymentFee = 0.018 | 0
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wekinBugase = order.order_receipt_price * order.commission * 0.01 * 0.1 | 0
                    maker.wekinFee += order.wekinCommisitionPayback | 0
                    maker.totalPayback += order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase | 0
                  }
                  maker.extraTax += (order.order_receipt_price * order.commission * 0.01) * 0.1 | 0
                } else {
                  if (order.order_pay_method === 'vbank') {
                    order.vbankFee = 300 | 0
                    order.bugase = order.vbankFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.vbankFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.vbankFee - order.bugase | 0
                    order.wekinBugase = order.order_receipt_price * order.commission * 0.01 * 0.1 | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase | 0
                  } else if (order.order_pay_method === 'card') {
                    order.paymentFee = 0.032
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wekinBugase = order.order_receipt_price * order.commission * 0.01 * 0.1 | 0
                    order.totalPayback = (order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase) | 0
                  } else if (order.order_pay_method === 'point') {
                    order.totalPayback = order.order_receipt_price * 0.85 | 0
                  } else {
                    order.paymentFee = 0.018 | 0
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wekinBugase = order.order_receipt_price * order.commission * 0.01 * 0.1 | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wekinBugase | 0
                  }
                }
              }
            } else {
              // 개인(부가세 신고 X)
              for (let ii = 0, llength = maker.Orders.length; ii < llength; ii++) {
                let order = maker.Orders[ii]
                if (order.status !== 'paid' && order.order_pay_price !== order.order_refund_price) {
                  // cancelled ORDER! (환불)
                  order.order_receipt_price = order.order_pay_price - order.order_refund_price
                }
                maker.notPaidOrders.push(order)
                if (!order.is_it_paybacked) {
                  maker.tradeAmount += order.order_receipt_price
                  if (order.order_pay_method === 'vbank') {
                    order.cardFee = 300
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wonchunjingsu = (order.order_receipt_price - order.cardFee - order.bugase - order.wekinCommisitionPayback) * 0.033 | 0
                    maker.wekinFee += order.wekinCommisitionPayback | 0
                    maker.totalPayback += order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                  } else if (order.order_pay_method === 'card') {
                    order.paymentFee = 0.032
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wonchunjingsu = (order.order_receipt_price - order.cardFee - order.bugase - order.wekinCommisitionPayback) * 0.033 | 0
                    maker.wekinFee += order.wekinCommisitionPayback | 0
                    maker.totalPayback += order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                  } else if (order.order_pay_method === 'point') {
                    maker.wekinFee += order.order_receipt_price * 0.15 | 0
                    maker.totalPayback += order.order_receipt_price * 0.85 | 0
                    order.totalPayback = order.order_receipt_price * 0.85 | 0
                  } else {
                    order.paymentFee = 0.018
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wonchunjingsu = (order.order_receipt_price - order.cardFee - order.bugase - order.wekinCommisitionPayback) * 0.033 | 0
                    maker.wekinFee += order.wekinCommisitionPayback | 0
                    maker.totalPayback += order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                  }
                  maker.extraTax += (order.order_receipt_price * order.commission * 0.01) * 0.1 | 0
                } else {
                  if (order.order_pay_method === 'vbank') {
                    order.cardFee = 300
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wonchunjingsu = (order.order_receipt_price - order.cardFee - order.bugase - order.wekinCommisitionPayback) * 0.033 | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                  } else if (order.order_pay_method === 'card') {
                    order.paymentFee = 0.032
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wonchunjingsu = (order.order_receipt_price - order.cardFee - order.bugase - order.wekinCommisitionPayback) * 0.033 | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                  } else if (order.order_pay_method === 'point') {
                    order.totalPayback = order.order_receipt_price * 0.85 | 0
                  } else {
                    order.paymentFee = 0.018
                    order.cardFee = order.order_receipt_price * order.paymentFee | 0
                    order.bugase = order.cardFee * 0.1 | 0
                    order.wekinPayback = order.order_receipt_price - order.cardFee - order.bugase | 0
                    order.wekinCommisitionPayback = order.commission === 0 ? 0 : order.order_receipt_price * order.commission * 0.01 - order.cardFee - order.bugase | 0
                    order.wonchunjingsu = (order.order_receipt_price - order.cardFee - order.bugase - order.wekinCommisitionPayback) * 0.033 | 0
                    order.totalPayback = order.wekinPayback - order.wekinCommisitionPayback - order.wonchunjingsu | 0
                  }
                }
              }
            }
          }
        })
        .catch(err => {
          window.alert('새로고침 후에도 작동이 안된다면 유성이에게 해당 화면을 보여주세요.' + err + moment().format())
        })
    }
  },
  filters: {
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
