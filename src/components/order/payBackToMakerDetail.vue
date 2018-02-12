<template>
  <div>
    <div v-if="item">
      <div>
        <h2>메이커 정보</h2>
        <p>이름 : {{ item.name }}</p>
        <p>전화번호 : {{ item.tel }}</p>
        <p>이메일: {{ item.email }}</p>
        <p>가입일: {{ item.created_at }}</p>
      </div>
      <div>
        <h2>정산 내역</h2>
        <table>
          <thead>
            <tr>
              <td>총 지급금액</td>
              <td>정산 지급금액</td>
              <td>정산 예정금액</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ totalPaybackedAmount + item.totalPayback | won }}</td>
              <td>{{ totalPaybackedAmount | won }}</td>
              <td>{{ item.totalPayback | won }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>정산 리스트</h2>
        <div>
          <button @click="payback(true)">체크된 사람들을 정산 완료로 변경</button>
          <button @click="payback(false)">체크된 사람들을 정산 미완료로 변경</button>
        </div>
        <table role="grid" id="data_table" class="table table-bordered table-striped dataTable">
          <thead>
            <tr role="row">
              <th style="width: 20px;">오더#</th>
              <th style="width: 20px;">회원명</th>
              <th style="width: 50px;cursor: pointer;" class="sorting" @click="sortingMachineForDate(items, 'order_at', 'order')">상품명</th>
              <th style="width: 60px;">위킨가격</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('status')">거래금액</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_at')">주문일</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">결제방식</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">카드수수료</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">수수료부가세</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">실수금금액</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">위킨 수수료</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">위킨 부가세</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">최종 지급액</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString('order_pay_method')">정산여부 <button @click="allSelect()">모두 선택</button></th>
            </tr>
          </thead>
          <tbody>
            <tr class="even" role="row" v-for="(item, index) in orders" :style="{ backgroundColor: check(item.is_it_paybacked, item.order_key) }">
              <td>{{item.order_key }}</td>
              <td>{{item.user_name | won}}</td>
              <td>{{item.wekin_name.length < 15 ? item.wekin_name : item.wekin_name.slice(0, 15)}}</td>
              <td>{{item.wekin_price | won}}</td>
              <td>{{item.order_receipt_price | won}}</td>
              <td>{{item.created_at | formatTime }}</td>
              <td>{{item.order_pay_method | won}}</td>
              <td>{{item.cardFee || 300 | won}}</td>
              <td>{{item.bugase || 30 | won}}</td>
              <td>{{item.wekinPayback || 0 | won}}</td>
              <td>{{item.wekinCommisitionPayback || 0 | won}}</td>
              <td>{{item.wekinBugase || 0 | won}}</td>
              <td>{{item.totalPayback || 0 | won}}</td>
              <td>{{item.is_it_paybacked }} <input type="checkbox" v-model="checkList" :value="item.order_key"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <h1>정상적인 접근이 아닙니다.</h1>
    </div>
  </div>
</template>

<script>
const moment = require('moment')

export default {
  name: 'PaybackTomakerDetail',
  data () {
    return {
      item: null,
      orders: [],
      checkList: [],
      tempAllOrdersKey: [],
      totalPaybackedAmount: 0
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
  },
  filters: {
    formatTime: function (value) {
      return moment(value).format('L')
    }
  },
  mounted () {
    for (let i = 0; i < this.orders.length; i++) {
      let item = this.orders[i]
      this.tempAllOrdersKey.push(item.order_key)
      if (item.is_it_paybacked) this.totalPaybackedAmount += item.order_receipt_price
    }
  },
  methods: {
    allSelect () {
      if (this.checkList.length < this.orders.length) {
        this.checkList = this.tempAllOrdersKey
      } else {
        this.checkList = []
      }
    },
    check (payback, orderKey) {
      let list = this.checkList
      if (payback && list.includes(orderKey)) return 'rgb(133,154,133)'
      if (payback && !list.includes(orderKey)) return 'rgb(163,204,163)'
      if (!payback && list.includes(orderKey)) return 'rgb(190,206,221)'
      if (!payback && !list.includes(orderKey)) return 'rgb(214, 230, 245)'
    },
    payback (type) {
      if (type) {
        this.$http.put(`/order/payback`, { orderList: this.checkList })
          .then(result => {
            result.data.message === 'success' ? window.alert('성공') : window.alert('실패')
          })
          .catch(error => console.log(error))
      }
      if (!type) {
        this.$http.put(`/order/not-payback`, { orderList: this.checkList })
          .then(result => {
            result.data.message === 'success' ? window.alert('성공') : window.alert('실패')
            this.$router.push('/pay-back-to-maker')
          }).catch(error => console.log(error))
      }
    },
    fetchData () {
      this.item = this.$route.params.item
      this.orders = this.item.notPaidOrders
    },
    sortingMachineForString (type) {
      this.orders.sort((a, b) => {
        return moment(a[type]) - moment(b[type]) > 0 ? -1 : 1
      })
    }
  }
}
</script>

<style>

</style>
