<template>
  <div v-if="item">
    <section class="content">

      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header">
              <!-- title row -->
              <div class="row">
                <div class="col-xs-12">
                  <h2 class="page-header">
                    <i class="fa fa-won"></i> 주문관리
                    <small class="pull-right"></small>
                  </h2>
                </div>
                <!-- /.col -->
              </div>
            </div>


            <div class="box-body">
              <!-- 회원결제 내역 -->
              <div class="row">
                <div class="col-xs-8 col-xs-offset-2 table-responsive">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th>회원 ID</th>
                      <th>회원 이름</th>
                      <th>회원 전화</th>
                      <th>회원 email</th>
                      <th>신청일시</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{{item.user_key}}</td>
                      <td>{{item.user_name}}</td>
                      <td>{{item.user_phone}}</td>
                      <td>{{item.user_email}}</td>
                      <td>{{item.created_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
              <br />
              <!-- 주문정보 내역 -->
              <div class="row">
                <div class="col-xs-8 col-xs-offset-2 table-responsive">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th>주문 번호</th>
                      <th>주문 상태</th>
                      <th>결제 수단</th>
                      <th>신청 금액</th>
                      <th>입금금액</th>
                      <th>신청취소</th>
                      <th>미수금</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{{item.order_id}}</td>
                      <td><Category :text="status[item.status].text" :color="status[item.status].color"></Category></td>
                      <td>{{item.order_pay_method}}</td>
                      <td>{{item.order_total_price}}</td>
                      <td>{{item.order_pay_price}}</td>
                      <td>{{item.order_refund_price}}</td>
                      <td>{{item.order_pay_price - item.order_total_price}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
              <br />
              <!-- 신청 목록 -->
              <div class="row">
                <div class="col-xs-8 col-xs-offset-2 table-responsive">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th>위킨ID</th>
                      <th>시작일시</th>
                      <th>위킨명</th>
                      <th>메이커명</th>
                      <th>신청인원</th>
                      <th>가격</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{{item.wekin_key}}</td>
                      <td>{{item.WekinNew.start_date | date('YYYY-MM-DD HH:mm:ss')}}</td>
                      <td>{{item.wekin_name}}</td>
                      <td>{{item.wekin_host_name}}</td>
                      <td>{{item.wekin_amount}}</td>
                      <td>{{item.wekin_price}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
              <br />
              <!-- 환불 목록 -->
              <div class="row" v-if="item.refund_info != null">
                <div class="col-xs-8 col-xs-offset-2 table-responsive">
                  <p class="lead">환불 계좌 정보</p>
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th>예금주</th>
                      <th>은행</th>
                      <th>계좌번호</th>
                      <th>요청일</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{{item.refund_info.name}}</td>
                      <td>{{item.refund_info.bank}}</td>
                      <td>{{item.refund_info.account}}</td>
                      <td>{{item.updated_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
              <br />

              <!-- 규정 및 기타정보 -->
              <div class="row" v-if="item.order_extra">
                <!-- /.col -->
                <div class="col-xs-8 col-xs-offset-2">
                  <p class="lead">무통장 정보</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tr>
                        <th>은행</th>
                        <td>{{item.order_extra.vbank_name}}</td>
                      </tr>
                      <tr>
                        <th>예금주</th>
                        <td>{{item.order_extra.vbank_holder}}</td>
                      </tr>
                      <tr>
                        <th>계좌번호</th>
                        <td>{{item.order_extra.vbank_num}}</td>
                      </tr>
                      <tr>
                        <th>입금기한</th>
                        <td>{{item.order_extra.vbank_date | date('YYYY-MM-DD HH:MM')}}</td>
                      </tr>

                    </table>
                  </div>
                </div>
                <!-- /.col -->
                <!-- accepted payments column -->
                <div class="col-xs-8 col-xs-offset-2">
                  <p class="lead">환불 규정:</p>

                  <p class="text-muted well well-sm no-shadow" style="margin-top: 10px; height: 300px;">
                    {{item.order_refund_policy}}
                  </p>
                </div>
                <!-- /.col -->
                <!--<div class="col-xs-8 col-xs-offset-2">
                  <p class="lead">환불 정보</p>

                  <div class="table-responsive">
                    <table class="table">
                      <tr>
                        <th style="width:20%">영수증</th>
                        <td>{{item.receipt_url}}</td>
                      </tr>
                      <tr v-if="item.order_extra">
                        <th>은행</th>
                        <td>{{item.order_extra.refund_bank}}</td>
                      </tr>
                      <tr v-if="item.order_extra">
                        <th>예금주</th>
                        <td>{{item.order_extra.refund_holder}}</td>
                      </tr>
                      <tr v-if="item.order_extra">
                        <th>계좌번호</th>
                        <td>{{item.order_extra.refund_account}}</td>
                      </tr>
                      <tr v-if="item.order_extra">
                        <th>환불사유</th>
                        <td>{{item.order_extra.reason}}</td>
                      </tr>

                    </table>
                  </div>
                </div>-->
                <!-- /.col -->
              </div>
              <!-- /.row -->

              <!-- 환불실행 -->
              <div class="row" v-if="item.status == 'reqRef'">
                <div class="col-xs-8 col-xs-offset-2">
                  <p class="lead">요청:</p>

                  <div class="form-group col-sm-4">
                    <label for="paid">입금 금액</label>
                    <input type="number" class="form-control" id="paid" placeholder="0" disabled="disabled" :value="item.order_pay_price">
                  </div>
                  <div class="form-group col-sm-4" v-if="item.order_pay_method !== 'point'">
                    <label for="refund">환불 금액 입력(현금)</label>
                    <input type="number" class="form-control" id="refund" placeholder="0" v-model="item.order_refund_price">
                  </div>
                  <div class="form-group col-sm-4">
                    <label for="refundpoint">환불 금액 입력(포인트)</label>
                    <input type="number" class="form-control" id="refundpoint" placeholder="0" v-model="refund_point_price">
                  </div>
                  <button class="btn btn-danger" style="margin-top: 25px;" @click="confirmRefund(item.order_pay_price)" v-if="(item.order_refund_price != null) || (item.order_pay_price == 0)">환불 승인</button>


                </div>
              </div>
              <!-- /.row -->


            </div>

          </div>
        </div>
      </div>


    </section>

  </div>
</template>

<script>
import Category from '../Category'
import { orderStatus } from '../../config'

export default {
  components: { Category },
  name: 'ActivityDetail',
  data () {
    return {
      doubleClick: true,
      path: this.$route.params.key,
      item: null,
      refund_point_price: 0,
      status: orderStatus
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get(`/order/${this.path}`)
      .then(res => {
        this.item = res.data
      })
      .catch(err => console.log(err))
    },
    confirmRefund (payPrice) {
      if (payPrice === 0) {
        if (window.confirm(`주문을 취소하시겠습니까?`)) {
          // this.$http.delete(`/order/refund/${this.item.order_key}`)
          this.$http.post(`/order/refund/${this.item.order_key}`, {order_refund_price: this.item.order_refund_price})
          .then(r => {
            this.$router.go(-1)
          })
          .catch(e => {
            window.alert(JSON.stringify(e.response.data))
          })
        }
      } else {
        if (window.confirm(`${this.item.order_refund_price} 원(+ 포인트 ${this.refund_point_price}) 환불하시겠습니까?`)) {
          if (this.refund_point_price < 1) {
            this.$http.post(`/order/refund/${this.item.order_key}`, {order_refund_price: this.item.order_refund_price})
              .then(r => {
                this.$router.go(-1)
              })
              .catch(error => window.alert('에러발생', error))
          } else {
            this.$http.post(`/point/refund/${this.item.order_key}`, { refundAmount: this.refund_point_price })
              .then(result => {
                this.$http.post(`/order/refund/${this.item.order_key}`, {order_refund_price: this.item.order_refund_price})
                  .catch(error => window.alert('에러발생', error))
              })
              .then(r => {
                this.$router.go(-1)
              })
              .catch(error => window.alert('에러발생', error))
          }
        }
      }
    }
  }
}
</script>
