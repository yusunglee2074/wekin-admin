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
                        <th aria-label="데이터 고유 key" class="sorting_asc">ID</th>
                        <th aria-label="분류" >메이커</th>
                        <th aria-label="제목" class="sorting">위킨 제목</th>
                        <th aria-label="작성일" class="sorting">시작일시</th>
                        <th aria-label="탈퇴일" class="sorting">신청인원</th>
                        <th aria-label="자세히 보기" class="sorting">노출일</th>
                        <th aria-label="자세히 보기" class="sorting">결과</th>
                        <th aria-label="자세히 보기" class="sorting">보기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td class="sorting_1">{{item.wekin_key}}</td>
                        <td>{{item.Activity.Host.name}}</td>
                        <td>{{item.Activity.title}} </td>
                        <td>{{item.start_date | date('YYYY-MM-DD') }}</td>
                        <td>{{ (item.Orders) ? item.Orders.length : '0' }}</td>
                        <td>{{item.Activity.confirm_date | date('YYYY-MM-DD HH:mm:ss') }}</td>
                        <td>{{item.status}}</td>
                        <td><router-link :to="'/wekin/finish/' + item.wekin_key"><button class="btn btn-primary">보기</button></router-link></td>
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
    btnClick (itemKey) {
      this.$router.push(`/notice/${itemKey}`)
    },
    fetchData () {
      this.$http.get('/wekin/finish/')
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
