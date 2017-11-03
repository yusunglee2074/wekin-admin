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
                        <th style="width: 10px;" class="sorting">ID</th>
                        <th style="width: 50px;" class="sorting">작성자</th>
                        <th style="width: 50px;" class="sorting">위킨태그</th>
                        <th style="width: 450px;" class="sorting">내용</th>
                        <th style="width: 80px;" class="sorting">작성일</th>
                        <th style="width: 20px;" class="sorting">상태</th>
                        <th style="width: 30px;" class="sorting">삭제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td class="sorting_1">{{item.doc_key}}</td>
                        <td>{{item.User === null ? '탈퇴회원' : item.User.name }}</td>
                        <td>{{item.Activity ? item.Activity.title : ''}}</td>
                        <td>
                          {{item.content}} <br />
                          <div style="overflow-x: scroll; white-space:nowrap; max-width: 600px;">
                            <img style="display: inline-block;" :src="img" v-for="img in item.image_url" v-if="item.image_url" height="100px;">
                          </div>
                          <div v-if="item.medias">
                            {{item.medias.video}}
                          </div>
                        </td>
                        <td>{{item.created_at | date('YY-MM-DD HH:mm:ss')}}</td>
                        <td><Category :text="status[item.type].status" :color="status[item.type].color"></Category></td>
                        <td><button class="btn btn-danger" @click="btnClick(item)">삭제</button></td>
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
import { docStatus } from '../../config'

export default {
  components: { Category },
  name: 'DocList',
  data () {
    return {
      items: null,
      status: docStatus
    }
  },
  mounted () {
    this.fetchData()
    this.$nextTick(() => {
    //   $('#data_table').DataTable()
    })
  },
  methods: {
    btnClick (item) {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        this.$http.delete(`/doc/${item.doc_key}`)
        .then(r => {
          window.alert(r.data.res)
          this.fetchData()
        })
      }
    },
    fetchData () {
      this.$http.get('/doc/')
      .then(res => {
        this.items = res.data
      })
      .catch(err => console.log(err))
    }
  },
  updated () {
    $('#data_table').DataTable({
      'order': [[0, 'desc']]
    })
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
