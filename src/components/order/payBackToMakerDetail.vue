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
              <td>123</td>
              <td>i123</td>
              <td>123</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>정산 리스트</h2>
        <table role="grid" id="data_table" class="table table-bordered table-striped dataTable">
          <thead>
            <tr role="row">
              <th style="width: 20px;">회원명</th>
              <th style="width: 50px;cursor: pointer;" class="sorting" @click="sortingMachineForDate(items, 'order_at', 'order')">상품명</th>
              <th style="width: 60px;">위킨가격</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'status')">거래금액</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">결제방식</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">카드수수료</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">수수료부가세</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">실수금금액</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">위킨 수수료</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">위킨 부가세</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">최종 지급액</th>
              <th style="width: 80px;cursor: pointer;" class="sorting" @click="sortingMachineForString(items, 'order_pay_method')">정산여부</th>
            </tr>
          </thead>
          <tbody>
            <tr class="even" role="row" v-for="(item, key, index) in item.notPaidOrders">
              <td>{{item.user_name}}</td>
              <td>{{item.wekin_name}}</td>
              <td>{{item.wekin_price}}</td>
              <td>{{item.order_receipt_price}}</td>
              <td>{{item.order_pay_method}}</td>
              <td>{{item.cardFee || 300}}</td>
              <td>{{item.bugase || 30}}</td>
              <td>{{item.wekinPayback}}</td>
              <td>{{item.wekinCommisitionPayback}}</td>
              <td>{{item.wekinBugase}}</td>
              <td>{{item.totalPayback}}</td>
              <td>{{item.is_it_paybacked}}</td>
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

export default {
  name: 'PaybackTomakerDetail',
  data () {
    return {
      item: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.item = this.$route.params.item
    }
  }
}
</script>
