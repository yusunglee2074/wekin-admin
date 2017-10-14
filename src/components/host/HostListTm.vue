<template>
  <section class="content">

    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="data_table_wrapper">

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table role="grid" id="data_table" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 10px;" class="sorting_asc">ID</th>
                        <th style="width: 50px;">프로필</th>
                        <th style="width: 20px;" class="sorting">구분</th>
                        <th style="width: 80px;" class="sorting">이름</th>
                        <th style="width: 80px;" class="sorting">이메일</th>
                        <th style="width: 80px;" class="sorting">연락처</th>
                        <th style="width: 80px;" class="sorting">주소</th>
                        <th style="width: 80px;" class="sorting">결과</th>
                        <th style="width: 30px;">보기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td class="sorting_1">{{item.host_key}}</td>
                        <td><img :src="item.profile_image | img" width="50" height="50"></td>
                        <td><Category v-if="item.type != null" :text="hostType[item.type].text" :color="hostType[item.type].color"></Category></td>
                        <td>{{item.name }}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.tel}}</td>
                        <td>{{item.address}}</td>
                        <td><Category :text="status[item.status].status" :color="status[item.status].color"></Category></td>
                        <td><router-link :to="'/tm/hosttm/' + item.host_key"><button class="btn btn-primary">보기</button></router-link></td>
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
import { hostStatus, hostType } from '../../config'

export default {
  components: { Category },
  name: 'HostList',
  data () {
    return {
      items: [],
      status: hostStatus,
      hostType: hostType
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
      this.$http.get('/host')
      .then(res => {
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

