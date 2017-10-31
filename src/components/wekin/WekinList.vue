<template>
  <section class="content">
    <div class="row center-block">
      <label for="serach">검색어</label>
      <input type="text" id="search" v-model="searchWord">
      <div class="col-md-12">
        <div class="box">
          <div class="box-body">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 7%;">엑티키</th>
                        <th style="width: 10%;">메이커</th>
                        <th style="width: 15%;">위킨 제목</th>
                        <th style="width: 10%;">활동 시작 일시</th>
                        <th style="width: 10%;">활동 종료 일시</th>
                        <th style="width: 7%;">종료까지</th>
                        <th style="width: 7%;">신청인원</th>
                        <th style="width: 7%;">조회수</th>
                        <th style="width: 9%;">예약자확인</th>
                        <th style="width: 7%;">디테일</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(item, index) in items" v-show="item.title.includes(searchWord) || item.Host.name.includes(searchWord) || String(item.activity_key).includes(searchWord) ">
                        <td>{{ item.activity_key }}</td>
                        <td>{{ item.Host.name }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.start_date | date('L') }}</td>
                        <td>{{ item.end_date | date('L') }}</td>
                        <td>{{ endList[index] > 0 ? endList[index] + '일 남음' : '종료'}}</td>
                        <td>{{ item.wekinnew_count }}</td>
                        <td>{{ item.count }}</td>
                        <td><router-link :to="{ name: 'WekinOrder', params: { key: item.activity_key, item: item } }"><button class="btn btn-warning">확인</button></router-link></td>
                        <td><router-link :to="{ name: 'ActivityDetail', params: { key: item.activity_key } }"><button class="btn btn-primary">보기</button></router-link></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment'

export default {
  components: { },
  name: 'WekinList',
  data () {
    return {
      items: null,
      searchWord: ''
    }
  },
  updated () {
  },
  computed: {
    endList: function () {
      let endList = []
      for (let i = 0; i < this.items.length; i++) {
        endList.push(moment(this.items[i].end_date).diff(moment(), 'days'))
      }
      return endList
    }
  },
  methods: {
    fetchData () {
      this.$http.get('/activity/admin')
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
</style>
