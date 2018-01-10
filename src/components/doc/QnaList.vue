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
                  <table aria-describedby="example1_info" role="grid" id="qnatable" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th aria-label="데이터 고유 key" aria-sort="ascending" style="width: 10px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">ID</th>
                        <th aria-label="분류" style="width: 50px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">작성자</th>
                        <th aria-label="분류" style="width: 50px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0">관련메이커</th>
                        <th aria-label="제목" style="width: 50px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">위킨종류</th>
                        <th aria-label="작성일" style="width: 450px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">내용</th>
                        <th aria-label="작성일" style="width: 80px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">작성일</th>
                        <th aria-label="결과" style="width: 20px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">결과</th>
                        <th aria-label="삭제" style="width: 30px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">삭제</th>
                        <th style="width: 30px;" colspan="1" rowspan="1" aria-controls="example1" tabindex="0" class="sorting">답변</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td class="sorting_1">{{item.doc_key}}</td>
                        <td>{{item.User.name}}</td>
                        <td>{{(item.Activity) ? item.Activity.Host.name : ''}}</td>
                        <td>{{item.Activity ? item.Activity.title : ''}}</td>
                        <td>
                          질문 : {{item.content}} <br />
                          답변 : {{item.answer}}
                        </td>
                        <td>{{item.created_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td>
                          <Category text="답변완료" color="009D4D" v-if="item.answer"></Category>
                          <Category text="답변대기" color="DB402C" v-if="!item.answer"></Category>
                        </td>
                        <td><button class="btn btn-danger" @click="btnClick(item)">삭제</button></td>
                        <td><button class="btn btn-primary" @click="answer(item.doc_key, item.content)">답변</button></td>
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
    <answer v-show="answerShow" v-on:cancel="closeAnswer()" :docKey="answerDocKey" :questionText="answerQuestion"></answer>
  </section>
</template>

<script>
// import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs'
import Category from '../Category'
import answer from './Answer'
import { docStatus } from '../../config'

export default {
  components: { Category, answer },
  name: 'DocList',
  data () {
    return {
      items: null,
      status: docStatus,
      answerShow: false,
      answerDocKey: null,
      answerQuestion: null
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    closeAnswer () {
      this.answerShow = false
    },
    answer (docKey, question) {
      this.answerDocKey = docKey
      this.answerQuestion = question
      this.answerShow = true
    },
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
      this.$http.get('/doc/qna/')
      .then(res => {
        this.items = res.data
      })
      .catch(err => console.log(err))
    }
  },
  updated () {
    /*
    $('#qnatable').DataTable({
      'order': [[0, 'desc']]
    })
    */
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
