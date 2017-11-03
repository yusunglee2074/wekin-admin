<template>
  <section class="content">
    <div class="row center-block">
      <label for="serach">검색어</label>
      <input type="text" id="search" v-model="searchWord">
      <button style="margin-left: 20px;" @click="showEnd = !showEnd">활동/종료 전환 버튼</button>
      <span style="font-size: 19px;margin-left: 20px;">{{ showEnd ? '종료 리스트' : '활동 중 리스트' }}</span>
      <p style="font-size: 12px;margin-left: 20px; color:red;">데이터를 옮기는 과정에서 기술적인 문제로 종료 위킨은 '종료까지 X일' 기능이 작동하지 않습니다. 새로운 엑티비티 등록을 이용해서 등록하면 다시 작동합니다</p>
      <div class="col-md-12">
        <div class="box">
          <div class="box-body">
              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table id="example1" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th style="width: 3%;">키</th>
                        <th style="width: 10%;">메이커</th>
                        <th style="width: 15%;">위킨 제목</th>
                        <th style="width: 10%;">등록 시작일</th>
                        <th style="width: 10%;">등록 종료일</th>
                        <th style="width: 8%; cursor: pointer;" @click="ordering('toEnd')">종료까지</th>
                        <th style="width: 8%; cursor: pointer;" @click="ordering('paidPeople')">신청인원</th>
                        <th style="width: 7%;">조회수</th>
                        <th style="width: 7%;">예약자</th>
                        <th style="width: 7%;">디테일</th>
                      </tr>
                    </thead>
                      <transition-group name="list" tag="tbody" v-if="!showEnd">
                      <tr class="even list-item" role="row" v-for="(item, index) in items" v-show="item.title.includes(searchWord) || item.Host.name.includes(searchWord) || String(item.activity_key).includes(searchWord)" v-bind:key="item.activity_key">
                        <td>{{ item.activity_key }}</td>
                        <td>{{ item.Host.name }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.start_date | date('L') }}</td>
                        <td>{{ item.end_date | date('L') }}</td>
                        <td>{{ endList[index] > 0 ? endList[index] + '일 남음' : '종료임박'}}</td>
                        <td>{{ item.wekinnew_count }}</td>
                        <td>{{ item.count }}</td>
                        <td><router-link :to="{ name: 'WekinOrder', params: { key: item.activity_key, item: item } }"><button class="btn btn-warning">확인</button></router-link></td>
                        <td><router-link :to="{ name: 'ActivityDetail', params: { key: item.activity_key } }"><button class="btn btn-primary">보기</button></router-link></td>
                      </tr>
                      </transition-group>
                      <transition-group name="list" tag="tbody" v-if="showEnd">
                      <tr class="even list-item" role="row" v-for="(item, index) in doneItems" v-show="item.title.includes(searchWord) || item.Host.name.includes(searchWord) || String(item.activity_key).includes(searchWord)" v-bind:key="item.activity_key">
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
                      </transition-group>
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
      items: [],
      doneItems: [],
      searchWord: '',
      showEnd: false
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
        let length = res.data.length
        for (let i = 0; i < length; i++) {
          let item = res.data[i]
          if (item.status === 3) {
            this.items.push(item)
          } else {
            this.doneItems.push(item)
          }
        }
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
.list-item {
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
