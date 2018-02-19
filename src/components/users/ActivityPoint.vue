<template>
  <div class="activity-point">
    <div class="header">
      <h3>엑티비티 활동 적립율 또는 적립 금액을 설정할 수 있는 페이지입니다.</h3>
      <h4>해당 적립 포인트는 활동일 이후 적립됩니다!!!!</h4>
      <h4 style="color:tomato;">적립율, 적립금액을 둘 다 설정 할 수 없습니다. 둘 중 하나는 0이여야합니다.</h4>
    </div>
    <div class="body">
      <div style="border: 2px solid tomato; padding:20px;">
        <h3>일괄  적용기능같은. 추후 추가할 기능 들어갈 자리</h3>
      </div>
      <div>
        <table id="example1" class="table table-bordered table-striped dataTable">
          <thead>
            <tr role="row">
              <th style="width: 3%;">키</th>
              <th style="width: 10%;">메이커</th>
              <th style="width: 15%;">위킨 제목</th>
              <th style="width: 7%;">적립율</th>
              <th style="width: 7%;">적립금액</th>
              <th style="width: 7%;">유효기간</th>
              <th style="width: 7%;">체크박스</th>
            </tr>
          </thead>
          <tr class="even list-item" role="row" v-for="(item, index) in activities" v-bind:key="item.activity_key">
            <td>{{ item.activity_key }}</td>
            <td>{{ item.Host.name }}</td>
            <td>{{ item.title }}</td>
            <td><input type="text" v-model="item.point_rate.rate">%</td>
            <td><input type="text" v-model="item.point_rate.amount">원</td>
            <td><input type="text" v-model="item.point_rate.due_days">일</td>
            <td><button @click="modifyOne(item)">수정하기</button></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ActivityPoint',
  data () {
    return {
      activities: []
    }
  },
  updated () {
  },
  methods: {
    fetchData () {
      this.$http.get('/activity/admin')
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          this.activities.push(res.data[i])
        }
      })
      .catch(err => console.log(err))
    },
    modifyOne (item) {
      console.log(item.point_rate)
      if ((item.point_rate.rate !== '0' && item.point_rate.amount !== '0')) {
        window.alert('적립율과 적립양 둘 중 하나는 0이여야만 합니다.')
        return
      }
      this.$http.put(`/activity/front/${item.activity_key}`, item)
        .then(result => window.alert('수정완료'))
        .catch(e => {
          window.alert('에러발생')
          console.log(e)
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
.activity-point {
  padding: 20px;
}
</style>
