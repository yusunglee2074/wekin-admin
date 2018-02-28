<template>
  <section class="content">

    <div class="row center-block">
      <Excel 
        firstRow="유저키, 이름, 이메일, 연락처, 성별, 가입일, 정보수정일 , 탈퇴일" 
        keys='["user_key", "name", "email", "phone", "gender", "created_at", "updated_at", "deleted_at"]'
        :htmlTable="items" 
        fileName="유저관리"></Excel>
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
                        <th style="width: 10px;"  class="sorting_desc">ID</th>
                        <th style="width: 50px;"  >프로필</th>
                        <th style="width: 40px;"  class="sorting">이름</th>
                        <th style="width: 142px;" class="sorting">이메일</th>
                        <th style="width: 100px;" class="sorting">연락처</th>
                        <th style="width: 50px;"  class="sorting">성별</th>
                        <th style="width: 100px;" class="sorting">가입일</th>
                        <th style="width: 100px;" class="sorting">정보수정일</th>
                        <th style="width: 100px;" class="sorting">탈퇴일</th>
                        <th style="width: 40px;"  >보기</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td class="sorting_1">{{item.user_key}}</td>
                        <td><img :src="item.profile_image | img" class="img-responsive" alt="User profile picture" width="69px" height="69px"/></td>
                        <td>{{item.name}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.phone}}</td>
                        <td><span v-if="item.gender != null" class="badge" v-bind:class="gender[item.gender].style">{{gender[item.gender].text}}</span></td>
                        <td>{{item.created_at | date('YYYY-MM-DD HH:mm:ss') }}</td>
                        <td>{{item.last_login_date | date('YYYY-MM-DD HH:mm:ss') }}</td>
                        <td>{{item.deleted_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td><button class="btn btn-primary" @click="btnClick(item.user_key)">보기</button></td>
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
import { userGender } from '../../config'
import Excel from './../ToXls'

export default {
  components: { Excel },
  name: 'UserList',
  data () {
    return {
      items: [],
      gender: userGender
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
    btnClick (itemKey) {
      this.$router.push(`/user/${itemKey}`)
    },
    fetchData () {
      this.$http.get('/user')
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
