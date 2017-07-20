<template>
  <section class="content">

    <div class="row center-block">
      <!--점검 및 논의사항-->
      <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <h4><i class="icon fa fa-check"></i>점검사항</h4>
        모든 액티비티 보여줄지? // right join or left join // 활동중인것만 보는건지?
      </div>
      <!--끝. 점검 및 논의사항-->
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="data_table_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="data_table_length" class="dataTables_length">

                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table id="data_table" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 10px;" class="sorting_asc">ID</th>
                        <th style="width: 150px;">메이커</th>
                        <th style="width: 500px;" class="sorting">위킨제목</th>
                        <th style="width: 30px;" class="sorting">신청일</th>
                        <th style="width: 30px;" class="sorting">노출일</th>
                        <th style="width: 30px;" class="sorting">결과</th>
                        <th style="width: 30px;" class="sorting">보기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td class="sorting_1">{{item.activity_key}}</td>
                        <td>{{item.Host.host_name}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.create_date | date('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td>{{item.confirm_date | date('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td><Category :text="wekin[item.status].status" :color="wekin[item.status].color"></Category></td>
                        <td><router-link :to="'/activity/' + item.activity_key"><button class="btn btn-primary">보기</button></router-link></td>
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
import { wekinStatus } from '../../config'

export default {
  components: { Category },
  name: 'ActivityList',
  data () {
    return {
      items: [],
      wekin: wekinStatus
    }
  },
  updated () {
    this.$nextTick(() => {
      $('#data_table').DataTable({
        'order': [[0, 'desc']]
      })
    })
  },
  methods: {
    fetchData () {
      this.$http.get('/activity')
      .then(res => {
        console.log(res.data)
        this.items = res.data
      })
      .catch(err => console.log(err))
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
