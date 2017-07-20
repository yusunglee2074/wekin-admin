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
                  <th style="width: 50px">#</th>
                  <th>위킨명</th>
                  <th>메이커명</th>
                  <th>시간</th>
                  <th>인원</th>
                  <th>가격</th>
                  <th>확정인원</th>
                </tr>
                <tr v-if="activity">
                  <td>{{activity.wekin_key}}</td>
                  <td>{{activity.Activity.title}}</td>
                  <td>{{activity.Activity.Host.name}}</td>
                  <td>{{activity.start_date | date('YYYY-MM-DD')}} ~ {{activity.end_date | date('YYYY-MM-DD')}}</td>
                  <td>{{ activity.min_user }} / {{activity.max_user}}</td>
                  <td>{{activity.Activity.price}}</td>
                  <td>{{ activity.current_user || 0 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
      <div class="col-md-4">
        <button class="btn btn-lg btn-danger" style="margin-top: 30px;" @click="finishConfirm">위킨 종료 확인</button>
      </div>


      <div class="col-md-12">
        <div class="box">
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="ex ample1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table aria-describedby="example1_info" role="grid" id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-label="데이터 고유 key" class="sorting">ID</th>
                        <th aria-label="분류" >회원아이디</th>
                        <th aria-label="분류" >회원이름</th>
                        <th aria-label="제목" class="sorting">전화번호</th>
                        <th aria-label="작성일" class="sorting">이메일</th>
                        <th aria-label="작성일" class="sorting">인원</th>
                        <th aria-label="자세히 보기" class="sorting">주문상태</th>
                        <th aria-label="자세히 보기" class="sorting">보기</th>
                        <th aria-label="자세히 보기" class="sorting">취소</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, index) in items">
                        <td class="sorting_1">{{item.order_key}}</td>
                        <td>{{item.user_key}}</td>
                        <td>{{item.user_name}}</td>
                        <td>{{item.user_phone}}</td>
                        <td>{{item.user_email}}</td>
                        <td>{{item.wekin_amount}}</td>
                        <td><Category :text="status[item.status].text" :color="status[item.status].color"></Category></td>
                        <td>
                          <router-link :to="'/order/' + item.order_key">
                            <button class="btn btn-primary">주문정보 보기</button>
                          </router-link>
                        </td>
                        <td><button v-if="(item.status != 'paid') && (item.status != 'reqRef')" class="btn btn-danger" @click="cancellOrder(item, index)">주문 취소</button></td>
                      </tr>
                    </tbody>
                  </table>
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
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs'
import Category from '../Category'
import { orderStatus } from '../../config'

export default {
  components: { Category },
  name: 'DocList',
  data () {
    return {
      items: null,
      activity: null,
      key: this.$route.params.key,
      pick: 0,
      status: orderStatus
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    'key': 'fetchData'
  },
  methods: {
    cancellOrder (item, index) {
      if (window.confirm('정말로 취소하시겠습니까?')) {
        this.$http.put(`/order/refund/${item.order_key}`)
        .then(r => {
          this.items[index].status = 'reqRef'
        })
      }
    },
    fetchData () {
      this.$http.get(`/order/order/${this.key}`)
      .then(res => {
        this.items = res.data
        console.log(this.items)
        this.dataTable('#example1')
        return this.$http.get(`/wekin/${this.key}`)
      })
      .then(v => {
        this.activity = v.data
        console.log(v.data)
      })
      .catch(err => console.log(err))
    },
    dataTable (name) {
      this.$nextTick(() => {
        $(name).DataTable()
      })
    },
    finishConfirm () {
      if (window.confirm('위킨을 종료하시겠습니까?')) {
        this.$http.post(`/wekin/finish/${this.activity.wekin_key}`)
        .then(r => {
          window.alert('종료 완료')
          this.$router.push('/wekin/finish')
        })
        .catch(e => { if (e.response.status === 400) { window.alert('주문을 먼저 정리해주세요') } })
      }
    }
  },
  updated () {
    this.dataTable('#example1')
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
