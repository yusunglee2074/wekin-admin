<template>
  <div>
    <br>
  <div>검색 : <input type="text" placeholder="아이디, 이름, 메일주소" v-model="searchWord"></div>
  <br>
  
  <div>
    <input type="number" placeholder="포인트양" v-model="addPoint.point">
    유효기간 <input type="date" v-model="addPoint.due_date">
    한도율 <input type="number" placeholder="0~100" v-model="addPoint.percentage">
    <button @click="earnPoint()">선택회원 포인트 적립</button>
  </div>
  <span>선택회원 리스트 : {{ checkedList }}</span>
  <table>
    <tr>
      <th>체크 <input type="checkbox" @click="checkAll()"></th>
      <th @click="orderingData('id')" >ID</th>
      <th>이름</th>
      <th>이메일</th>
      <th @click="orderingData('company')" style="cursor:n-resize">회사메일</th>
      <th>기업포인트</th>
      <th>일반포인트</th>
      <th>사용한도율</th>
      <th>디테일</th>
    </tr>
    <tr id="row" role="row" v-for="(item, index) in items" v-show="(String(item.user_key).includes(searchWord) || String(item.name).includes(searchWord) || String(item.email).includes(searchWord) || String(item.email_company).includes(searchWord))">
      <td><input type="checkbox" :value="item.user_key" v-model="checkedList"></td>
      <td>{{ item.user_key }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.email }}</td>
      <td>{{ item.email_company || "정보없음" }}</td>
      <td>{{ item.point.point_special }}</td>
      <td>{{ item.point.point }}</td>
      <td> 100 %</td>
      <td><button @click="showDetail(item)">상세</button></td>
    </tr>
  </table>
  <div id="detail" v-if="detailPopup" @click="showDetail()">
    <h3>유저정보</h3>
    <div id="content">
      <p>이름: {{ detailUser.name }}</p>
      <p>회사메일: {{ detailUser.email_company || "정보 없음" }}</p>
      <p>일반포인트: {{ detailUser.point.point }}</p>
      <p>회사포인트: {{ detailUser.point.point_special }}</p>
      <p>기업포인트 적립 내역</p>
      <div v-for="tran in detailUser.transaction">
        <div v-if="tran.type === 20">
          <span>적립: {{ tran.point_change }} 적립일: {{ tran.created_at }} 만료일: {{ tran.due_date_be_written_days }}</span>
        </div>
      </div>
      <p>기업포인트 사용 내역</p>
      <div v-for="tran in detailUser.transaction">
        <div v-if="tran.type === 21">
          <span>사용: {{ tran.point_change }} 사용일: {{ tran.created_at }}</span>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'UserList',
  data () {
    return {
      items: [],
      searchWord: '',
      toggleSwitch: {
        orderingById: false
      },
      checkedList: [],
      addPoint: {
        due_date: null,
        percentage: null,
        point: null
      },
      detailPopup: false,
      detailUser: null
    }
  },
  methods: {
    fetchData () {
      this.$http.get('/user')
        .then(res => {
          this.items = res.data
        })
        .catch(err => console.log(err))
    },
    orderingData (type) {
      switch (type) {
        case 'id':
          if (this.toggleSwitch.orderingById === false) {
            this.toggleSwitch.orderingById = true
            this.items.sort((a, b) => {
              return a.user_key - b.user_key
            })
          } else {
            this.toggleSwitch.orderingById = false
            this.items.sort((a, b) => {
              return b.user_key - a.user_key
            })
          }
          break
        case 'company':
          if (this.toggleSwitch.orderingByCompany === false) {
            this.toggleSwitch.orderingByCompany = true
            this.items.sort((a, b) => {
              let nameA = a.email_company === null ? '' : a.email_company.toUpperCase()  // ignore upper and lowercase
              let nameB = b.email_company === null ? '' : b.email_company.toUpperCase()  // ignore upper and lowercase
              if (nameA < nameB) {
                return 1
              }
              if (nameA > nameB) {
                return -1
              }
              return 0
            })
          } else {
            this.toggleSwitch.orderingByCompany = false
            this.items.sort((a, b) => {
              let nameA = a.email_company === null ? '' : a.email_company.toUpperCase()  // ignore upper and lowercase
              let nameB = b.email_company === null ? '' : b.email_company.toUpperCase()  // ignore upper and lowercase
              if (nameA < nameB) {
                return 1
              }
              if (nameA > nameB) {
                return -1
              }
              return 0
            })
          }
      }
    },
    checkAll () {
      let elements = document.querySelectorAll(
        'tr#row:not([style*="display:none"]):not([style*="display: none"])'
      )
      for (let i = 0; i < elements.length; i++) {
        let indexNumber = this.checkedList.indexOf(Number(elements[i].cells[1].innerText))
        if (indexNumber > -1) {
          this.checkedList.splice(indexNumber, 1)
        } else {
          this.checkedList.push(Number(elements[i].cells[1].innerText))
        }
      }
    },
    earnPoint () {
      // 선택한 인원들 포문 돌면서 한명씩 적립해준다.
      for (let i = 0; i < this.checkedList.length; i++) {
        let body = {
          user_key: this.checkedList[i],
          value: this.addPoint.point,
          percentage: this.addPoint.percentage,
          due_date: moment(this.addPoint.due_date).toDate(),
          type: 1
        }
        this.$http.post('/point/create', body)
          .then(response => {
            console.log(response)
          })
      }
    },
    showDetail (item) {
      if (item === undefined) {
        this.detailPopup = !this.detailPopup
        return
      }
      this.detailUser = item
      this.$http.get(`/point/detail/${item.user_key}/1`)
        .then(response => {
          this.detailPopup = !this.detailPopup
          this.detailUser.transaction = response.data
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 90%;
}

td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

#detail {
  position: fixed;
  width: 500px;
  height: auto;
  left: 30%;
  top: 16%;
  background-color: white;

}
</style>
