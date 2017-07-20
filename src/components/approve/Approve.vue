<template>
  <section class="content">

    <div class="row center-block">

      <div class="col-md-12">
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs">
            <li class="active"><a href="#activity" data-toggle="tab" @click="fetchActivityData">위킨 승인</a></li>
            <li><a href="#timeline" data-toggle="tab" @click="fetchHostData">메이커 승인</a></li>
          </ul>
          <div class="tab-content">
            <div class="active tab-pane" id="activity">



              <div class="dataTables_wrapper form-inline dt-bootstrap" id="data_table_wrapper">
                <div class="row">
                  <div class="col-sm-6">
                    <div id="data_table_length" class="dataTables_length">

                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <table role="grid" id="data_table" class="table table-bordered table-striped dataTable">
                      <thead>
                        <tr role="row">
                          <th style="width: 10px;" class="sorting_asc">ID</th>
                          <th style="width: 150px;" >작성자</th>
                          <th style="width: 400px;" class="sorting">위킨제목</th>
                          <th style="width: 150px;" class="sorting">등록일</th>
                          <th style="width: 50px;">결과</th>
                          <th style="width: 50px;">보기</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="even" role="row" v-for="(item, key, index) in items">
                          <td class="sorting_1">{{item.activity_key}}</td>
                          <td>{{item.Host.name}}</td>
                          <td>{{item.title}}</td>
                          <td>{{item.created_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                          <td><Category :text="wekin[item.status].status" :color="wekin[item.status].color"></Category></td>
                          <td><router-link :to="'/activity/' + item.activity_key"><button class="btn btn-primary">보기</button></router-link></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>




            </div>
            <!-- /.tab-pane -->
            <div class="tab-pane" id="timeline">


              <div class="dataTables_wrapper form-inline dt-bootstrap" id="host_wrapper">
                <div class="row">
                  <div class="col-sm-6">
                    <div id="host_length" class="dataTables_length">

                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <table role="grid" id="host" class="table table-bordered table-striped dataTable">
                      <thead>
                        <tr role="row">
                          <th style="width: 10px;" class="sorting_asc">ID</th>
                          <th style="width: 50px;">프로필</th>
                          <th style="width: 20px;" class="sorting">구분</th>
                          <th style="width: 80px;" class="sorting">이름</th>
                          <th style="width: 80px;" class="sorting">이메일</th>
                          <th style="width: 80px;" class="sorting">연락처</th>
                          <th style="width: 200px;" class="sorting">메이커 소개</th>
                          <th style="width: 30px;" class="sorting">보기</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="even" role="row" v-for="(item, key, index) in hosts">
                          <td class="sorting_1">{{item.host_key}}</td>
                          <td><img :src="item.profile_image | img" width="50" height="50"></td>
                          <td><Category v-if="item.type != null" :text="hostType[item.type].text" :color="hostType[item.type].color"></Category></td>
                          <td>{{item.name}}</td>
                          <td>{{item.User.email}}</td>
                          <td>{{item.tel}}</td>
                          <td>{{item.introduce}}</td>
                          <td><router-link :to="'/host/' + item.host_key"><button class="btn btn-primary">보기</button></router-link></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>





            </div>
            <!-- /.tab-pane -->
          </div>
          <!-- /.tab-content -->
        </div>
        <!-- /.nav-tabs-custom -->
      </div>


    </div>
  </section>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs'
import Category from '../Category'
import { hostType, wekinStatus } from '../../config'

export default {
  name: 'WekinList',
  data () {
    return {
      items: [],
      hosts: [],
      wekin: wekinStatus,
      hostType: hostType
    }
  },
  updated () {
    this.dataTable('#data_table')
  },
  methods: {
    btnClick (itemKey) {
      this.$router.push(`/notice/${itemKey}`)
    },
    fetchData () {
      this.$http.get('/activity/approve')
      .then(res => {
        this.items = res.data
      })
      .catch(err => console.log(err))
    },
    fetchHostData () {
      this.$http.get('/host/approve/')
      .then(res => {
        this.hosts = res.data
        this.dataTable('#host')
      })
      .catch(err => console.log(err))
    },
    fetchActivityData () {
      this.$http.get('/activity/approve/')
      .then(res => {
        this.items = res.data
        this.dataTable('#data_table')
      })
      .catch(err => console.log(err))
    },
    dataTable (name) {
      this.$nextTick(() => {
        $(name).DataTable()
      })
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    Category
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

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
