<template>
  <section class="content" v-if="category">

    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <router-link to="/notice/add">
              <button class="btn btn-primary pull-right">새 공지사항 작성</button>
            </router-link>
            <button class="btn btn-primary" data-toggle="modal" @click="modalPopUp">카테고리 추가</button>
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
                        <th style="width: 250px;">카테고리</th>
                        <th style="width: 500px;" class="sorting">제목</th>
                        <th style="width: 142px;" class="sorting">작성일</th>
                        <th style="width: 30px;">수정</th>
                        <th style="width: 30px;">삭제</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, key, index) in items">
                        <td class="sorting_1">{{item.board_key}}</td>
                        <td><Category :text="cateObj[cate].name" :color="cateObj[cate].color" v-for="cate in item.category" v-if="cateObj[cate]"></Category></td>
                        <td>{{item.title}}</td>
                        <td>{{item.created_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td><router-link :to="'/notice/' + item.board_key"><button class="btn btn-primary">수정</button></router-link></td>
                        <td><button class="btn btn-danger" @click="deleteItem(item)">삭제</button></td>
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


    <div id="modal_wrap">
      <div class="modal fade" tabindex="-1" role="dialog" id="category-list">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>-->
              <div class="pull-right">
                <button class="btn btn-primary" @click="categoryAddForm" :disabled="(category.length < 5)? disabled: ''">카테고리 추가</button>
              </div>
              <h4 class="modal-title">카테고리 목록</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="panel panel-default">
                    <table class="table table-bordered">
                      <tr>
                        <th>카테고리 종류</th>
                        <th>색상</th>
                        <th>수정</th>
                        <th>삭제</th>
                      </tr>
                      <tr v-for="item of category">
                        <td>{{item.value.name}}</td>
                        <!--<td><button class="btn" :style="{'background-color': '#'+item.value.color}"></button></td>-->
                        <td><Category :text="item.value.name" :color="item.value.color"></Category></td>
                        <td><button class="btn btn-primary" @click="categoryEditForm(item)">수정</button></td>
                        <td><button class="btn btn-danger" @click="categoryRemove(item)">삭제</button></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

      <div class="modal fade" tabindex="-1" role="dialog" id="category-add">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">카테고리 목록</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-horizontal ">

                  <div class="form-group">
                    <label for="cateName" class="col-sm-2 control-label col-md-offset-1">카테고리명</label>
                    <div class="col-sm-7">
                      <input type="text" class="form-control" id="cateName" placeholder="카테고리명" v-model="cate.value.name">
                    </div>
                    <div class="col-sm-1">
                      <Category text="색상" :color="cate.value.color"></Category>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="cateColor" class="col-sm-2 control-label col-md-offset-1">색상 선택</label>
                    <div class="col-sm-8">
                      <Category :text="item" :color="item" v-for="item of useableColor" @click="setColor(item)"></Category>
                      <!--<button type="button" class="btn" v-for="item of useableColor" :class="item" @click="setColor(item)">버튼</button>-->
                    </div>
                  </div>


                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="commitCategory(item)">Save changes</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->

      <div class="modal fade" tabindex="-1" role="dialog" id="category-edit">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">카테고리 수정</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-horizontal ">

                  <div class="form-group">
                    <label for="cateName" class="col-sm-2 control-label col-md-offset-1">카테고리명</label>
                    <div class="col-sm-7">
                      <input type="text" class="form-control" id="cateName" placeholder="카테고리명" v-model="cate.value.name">
                    </div>
                    <div class="col-sm-1">
                      <Category text="색상" :color="cate.value.color"></Category>
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="cateColor" class="col-sm-2 control-label col-md-offset-1">색상 선택</label>
                    <div class="col-sm-8">
                      <Category :text="item" :color="item" v-for="item of useableColor" @click="setColor(item)"></Category>
                    </div>
                  </div>


                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="categoryEdit(item)">Save changes</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
    </div>

  </section>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs'
import Category from '../Category'
import { categoryColors } from '../../config'

export default {
  name: 'NoticeList',
  data () {
    return {
      items: null,
      category: null,
      cate: {
        env_key: 0,
        value: {
          name: '',
          color: 'ffffff'
        }
      },
      useableColor: categoryColors,
      cateObj: {}
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('/board/notice/')
      .then(res => {
        console.log(res.data)
        this.items = res.data
        return this.$http.get('/env/notice/category')
      })
      .then(res => {
        console.log(res)
        res.data.forEach(v => { this.cateObj[v.env_key] = v.value })
        console.log(this.cateObj)
        this.category = res.data
        this.dataTable('#data_table')
      })
      .catch(err => console.log(err))
    },
    refreshCategory () {
      this.$http.get('/env/notice/category')
      .then(res => {
        this.category = res.data
      })
      .catch(err => console.log(err))
    },
    modalPopUp () {
      window.jQuery('#category-list').modal('show')
    },
    categoryRemove (item) {
      let result = window.confirm('정말 삭제하시겠습니까?')
      if (result) {
        this.$http.delete('/env/notice/category/' + item.env_key)
        .then(val => {
          this.refreshCategory()
        })
      }
    },
    categoryEditForm (item) {
      this.cate = item
      window.jQuery('#category-list').modal('hide')
      window.jQuery('#category-edit').modal('show')
    },
    categoryEdit (item) {
      this.$http.put('/env/notice/category', this.cate)
      .then(_ => this.$http.get('/env/notice/category'))
      .then(val => {
        this.category = val.data
        window.jQuery('#category-edit').modal('hide')
        this.modalPopUp()
        this.cate.env_key = 0
        this.cate.value.name = ''
        this.cate.value.color = ''
      })
      .catch(err => { console.log(err) })
    },
    categoryAddForm () {
      window.jQuery('#category-list').modal('hide')
      window.jQuery('#category-add').modal('show')
    },
    setColor (item) {
      this.cate.value.color = item
    },
    commitCategory () {
      this.$http.post('/env/notice/category', this.cate)
      .then(_ => this.$http.get('/env/notice/category'))
      .then(res => {
        this.category = res.data
        window.jQuery('#category-add').modal('hide')
        window.jQuery('#category-list').modal('show')
        this.cate.color = ''
        this.cate.name = ''
      })
      .catch(err => { console.log(err) })
    },
    deleteItem (item) {
      let flag = window.confirm('정말로 삭제하시겠습니까?')
      if (flag) {
        this.$http.delete('/board/notice/' + item.board_key)
        .then(_ => this.fetchData())
        .catch(err => console.log(err))
      }
    },
    dataTable (name) {
      this.$nextTick(() => {
        setTimeout(_ => {
          $(name).DataTable()
        }, 100)
      })
    }
  },
  components: {
    Category
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
