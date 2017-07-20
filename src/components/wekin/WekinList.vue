<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
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
                        <th aria-label="데이터 고유 key" aria-sort="ascending" style="width: 10px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">ID</th>
                        <th aria-label="분류" style="width: 50px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">메이커</th>
                        <th aria-label="제목" style="width: 450px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">위킨 제목</th>
                        <th aria-label="작성일" style="width: 100px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">시작일시</th>
                        <th aria-label="탈퇴일" style="width: 100px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">신청인원</th>
                        <th aria-label="자세히 보기" style="width: 100px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">노출일</th>
                        <th aria-label="자세히 보기" style="width: 30px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">결과</th>
                        <th aria-label="자세히 보기" style="width: 30px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">예약자확인</th>
                        <th aria-label="자세히 보기" style="width: 30px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">보기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, index) in items">
                        <td class="sorting_1">{{item.wekin_key}}</td>
                        <td>{{item.Activity.Host.name}}</td>
                        <td>{{item.Activity.title}} </td>
                        <td>{{item.start_date | date('YYYY-MM-DD') }}</td>
                        <td>{{ getOrderCount(index) }} / {{ item.max_user }}</td>
                        <td>{{item.Activity.confirm_date | date('YYYY-MM-DD HH:mm:ss') }}</td>
                        <td><Category :text="wekinStatus[item.Activity.status].status" :color="wekinStatus[item.Activity.status].color"></Category></td>
                        <td><router-link :to="'/wekin/order/' + item.wekin_key"><button class="btn btn-warning">확인</button></router-link></td>
                        <td><router-link :to="'/activity/' + item.Activity.activity_key"><button class="btn btn-primary">보기</button></router-link></td>
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
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'
import Category from '../Category'
import { wekinStatus } from '../../config'

export default {
  components: { Category },
  name: 'WekinList',
  data () {
    return {
      items: [],
      hosts: [],
      wekinStatus: wekinStatus
    }
  },
  updated () {
    this.$nextTick(() => {
      $('#example1').DataTable({
        'order': [[0, 'desc']]
      })
    })
  },
  methods: {
    getOrderCount (index) {
      let count = 0
      this.items[index].Orders.forEach(v => {
        let possible = ['order', 'ready', 'paid']
        if (possible.includes(v.status)) {
          count += v.wekin_amount
        }
      })
      return count
    },
    btnClick (itemKey) {
      this.$router.push(`/notice/${itemKey}`)
    },
    fetchData () {
      this.$http.get('/wekin/')
      .then(res => {
        this.items = res.data
      })
      .catch(err => console.log(err))
    },
    fetchHostData () {
      this.$http.get('/host/')
      .then(res => {
        this.hosts = res.data
        this.dataTable()
      })
      .catch(err => console.log(err))
    },
    dataTable () {
      this.$nextTick(() => {
        $('#host').DataTable()
      })
    }
  },
  created () {
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
