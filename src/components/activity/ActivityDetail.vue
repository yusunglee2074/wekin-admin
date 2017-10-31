<template>
  <div v-if="item">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header">

            </div>
            <div class="box-body">
              <div class="form-horizontal">


                <div class="form-group">
                  <label class="col-sm-2 control-label">메인 이미지()</label>
                  <div class="col-sm-3">
                    <div class="input-group input-group-sm">
                      <input type="file" class="form-control" v-on:change="mainImage">
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-8 col-sm-offset-2" style="">
                    <div style="overflow-x: scroll; white-space:nowrap">

                      <div v-for="(img, index) in item.main_image.image" style="display: inline-block; position: relative;">
                        <button style="position: absolute; right: 10px; top: 10px;" class="btn btn-danger" @click="deleteImage(index)">delete</button>
                        <img :src="img" style="display: inline-block;" height="300">
                      </div>

                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="category" class="col-sm-2 control-label">카테고리</label>
                  <div class="col-sm-3">
                    <select v-model="item.category" class="ui dropdown" style="width: 300px;">
                      <option value="" disabled>카테고리</option>
                      <option value="투어/여행">투어/여행</option>
                      <option value="익스트림 (레저)">익스트림 (레저)</option>
                      <option value="스포츠 (구기종목)">스포츠 (구기종목)</option>
                      <option value="음악">음악</option>
                      <option value="댄스">댄스</option>
                      <option value="뷰티">뷰티</option>
                      <option value="요리">요리</option>
                      <option value="아트">아트</option>
                      <option value="힐링">힐링</option>
                      <option value="아웃도어">아웃도어</option>
                      <option value="요가/피트니스">요가/피트니스</option>
                      <option value="소품제작">소품제작</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputName" class="col-sm-2 control-label">위킨명</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputName" placeholder="위킨명" v-model="item.title">
                  </div>
                </div>

                <div class="form-group" v-for="(data, i, y) in item.detail_question" :key="y">
                  <label for="inputName" class="col-sm-2 control-label">{{ tmpQuestions[y] }}</label>
                  <div class="col-sm-8">
                    <textarea id="" name="" cols="60" style="float:left;" rows="6" v-model="data.text"></textarea>
                    <div style="margin: 16px 8px;width:100px;height:100px;z-index:222; float:left;" v-if="image" v-for="(image, index) in data.images" :key="index">
                      <img style="width:100%;height:100%" :src="image">
                    </div>
                  </div>
                </div>

                

                <div class="form-group">
                  <p style="color:red;">* 위의 5가지 질문과 사진을 그냥 합쳐서 상세 소개에 때려박습니다. 실제로 프로덕트에서는 아래 상세 설명이 보여집니다.</p>
                  <label for="intro_detail" class="col-sm-2 control-label">상세 소개</label>

                  <div class="col-sm-8">
                    <Trumbowyg :content="item.intro_detail" @tbwchange="update"></Trumbowyg>
                  </div>
                </div>

                <div class="form-group">
                  <label for="schedule" class="col-sm-2 control-label">세부 일정</label>

                  <div class="col-sm-8">
                    <textarea class="form-control" id="schedule" placeholder="세부 일정" v-model="item.schedule" rows="5"></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <label for="inclusion" class="col-sm-2 control-label">포함 / 불포함 사항</label>

                  <div class="col-sm-8">
                    <textarea class="form-control" id="inclusion" placeholder="포함 / 불포함 사항" v-model="item.inclusion" rows="5"></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <label for="preparation" class="col-sm-2 control-label">준비물</label>
                  <div class="col-sm-8">
                    <input type="preparation" class="form-control" id="preparation" placeholder="준비물" v-model="item.preparation">
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">집결지 주소</label>
                  <div class="col-sm-5">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" v-model="item.address_detail.meet_area">
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-info btn-flat" @click="googleMapMeet">위치 설정</button>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">활동지 주소</label>
                  <div class="col-sm-5">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" v-model="item.address">
                      <span class="input-group-btn">
                        <button type="button" class="btn btn-info btn-flat" @click="googleMap">위치 설정</button>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group" v-if="item.address_detail.location">
                  <label for="preparation" class="col-sm-2 control-label">위치</label>
                  <div class="col-sm-2">
                    <input type="preparation" class="form-control" id="preparation" placeholder="준비물" v-model="item.address_detail.location.lat">
                  </div>
                  <div class="col-sm-2">
                    <input type="preparation" class="form-control" id="preparation" placeholder="준비물" v-model="item.address_detail.location.lng">
                  </div>
                </div>


                <div class="form-group">
                  <label for="inclusion" class="col-sm-2 control-label">상세 위치</label>

                  <div class="col-sm-8">
                    <textarea class="form-control" id="inclusion" placeholder="상세 위치" v-model="item.address_detail.text" rows="5"></textarea>
                    <br >
                    <img :src="mapImage || item.address_detail.mapImg" width="600" >
                  </div>
                </div>

                <div class="form-group">
                  <label for="refund_policy" class="col-sm-2 control-label">환불규정</label>
                  <div class="col-sm-8">
                    <textarea class="form-control" id="schedule" placeholder="환불규정" v-model="item.refund_policy" rows="5"></textarea>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" v-model="policy.value" @click="policyBtn"> 위킨 환불규정 입력
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">가격</label>
                  <div class="col-sm-3">
                    <input type="text" class="form-control" id="inputName" placeholder="위킨명" v-model="item.base_price">
                  </div>
                </div>

                <hr >

                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">등록 시작 날짜</label>
                  <div class="col-sm-3">
                  <datepicker 
                    v-model="item.start_date" 
                    id="datepickerId" 
                    wapper-class="form-control" 
                    language="ko" 
                    format="MMM dd(D), yyyy"
                    placeholder="날짜선택">
                  </datepicker>
                </div>
                </div>

                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">등록 만료 날짜</label>
                  <div class="col-sm-3">
                  <datepicker 
                    v-model="item.end_date" 
                    id="datepickerId" 
                    wapper-class="ui input styled primary left icon" 
                    language="ko" 
                    format="MMM dd(D), yyyy"
                    placeholder="날짜선택">
                  </datepicker>
                </div>
                </div>

                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">몇 일전에 접수 마감 시킬까요?</label>
                  <div class="col-sm-3">
                    <input type="number" class="form-control" id="inputName" placeholder="숫자만 입력"  v-model="item.due_date"> 
                  </div>
                </div>

                <hr>
                

                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">선택요일</label>
                  <div class="col-sm-5">
      <input type="checkbox" v-model="checkedDays" value="Mo">월요일
      <input type="checkbox" v-model="checkedDays" value="Tu">화요일
      <input type="checkbox" v-model="checkedDays" value="We">수요일
      <input type="checkbox" v-model="checkedDays" value="Th">목요일
      <input type="checkbox" v-model="checkedDays" value="Fr">금요일
      <input type="checkbox" v-model="checkedDays" value="Sa">토요일
      <input type="checkbox" v-model="checkedDays" value="Su">일요일
                  </div>
                </div>

<table>
  <tr>
    <th>분류</th>
    <th>월</th>
    <th>화</th>
    <th>수</th>
    <th>목</th>
    <th>금</th>
    <th>토</th>
    <th>일</th>
  </tr>
  <tr>
    <td>최소인원</td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Mo'].min_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Tu'].min_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['We'].min_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Th'].min_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Fr'].min_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Sa'].min_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Su'].min_user"></td>
  </tr>
  <tr>
    <td>최대인원</td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Mo'].max_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Tu'].max_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['We'].max_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Th'].max_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Fr'].max_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Sa'].max_user"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Su'].max_user"></td>
  </tr>
  <template v-for="i in [0,1,2]">
  <tr>
    <td>시각</td>
    <td><input style="width:104px;" type="time" v-model="item.base_week_option['Mo'].start_time[i]"></td>
    <td><input style="width:104px;" type="time" v-model="item.base_week_option['Tu'].start_time[i]"></td>
    <td><input style="width:104px;" type="time" v-model="item.base_week_option['We'].start_time[i]"></td>
    <td><input style="width:104px;" type="time" v-model="item.base_week_option['Th'].start_time[i]"></td>
    <td><input style="width:104px;" type="time" v-model="item.base_week_option['Fr'].start_time[i]"></td>
    <td><input style="width:104px;" type="time" v-model="item.base_week_option['Sa'].start_time[i]"></td>
    <td><input style="width:104px;" type="time" v-model="item.base_week_option['Su'].start_time[i]"></td>
  </tr>
  <tr>
    <td>시각 추가가격</td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Mo'].price_with_time[i]"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Tu'].price_with_time[i]"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['We'].price_with_time[i]"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Th'].price_with_time[i]"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Fr'].price_with_time[i]"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Sa'].price_with_time[i]"></td>
    <td><input style="width:90px;" type="number" v-model="item.base_week_option['Su'].price_with_time[i]"></td>
  </tr>
</template>
</table>
                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">영업 휴무일</label>
                  <div class="col-sm-3" v-for="(data, index) in item.close_dates">
                    <input type="" v-model="item.close_dates[index]">
                  </div>
                </div>

                <hr>
                

                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">추가 코스 옵션</label>
                  <div class="col-sm-3" v-for="(data, index) in item.base_price_option">
                    <input type="" v-model="item.base_price_option[index].name">
                    <input type="" v-model="item.base_price_option[index].price">
                  </div>
                </div>

<hr>

                <div class="form-group">
                  <label for="price" class="col-sm-2 control-label">추가 결제 옵션</label>
                  <div class="col-sm-3" v-for="data in item.base_extra_price_option">
                    <input type="" v-model="data.name">
                    <input type="" v-model="data.price">
                </div>
                  </div>

              </div>
            </div>
            <div class="box-footer">
              <div class="pull-right">
                <button v-if="item.status === 1 " class="btn btn-lg btn-warning" @click="confirmActivity('confirm')"><b>위킨 승인</b></button>
                <button v-if="item.status === 9 || item.status === 3" class="btn btn-lg btn-warning" @click="confirmActivity('modify')"><b>위킨 수정</b></button>
                <button v-if="item.status != 3" class="btn btn-lg btn-danger" @click="confirmActivity('reject')"><b>위킨 반려</b></button>
                <button v-if="item.status == 3" class="btn btn-lg btn-danger" @click="confirmActivity('delete')"><b>위킨 삭제</b></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Trumbowyg from '../Trumbowyg'
import { getGeoCode, staticMap } from '../../util/google/map'
import fireHelper from '../../util/google/firebase/storage'
import { filterKoreaList } from '../../config'
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'ActivityDetail',
  data () {
    return {
      tmpQuestions: [
        '메이커님의 활동을 간단히 소개해주세요',
        '메이커님의 활동을 하면 어떤 점이 좋나요',
        '활동은 어떻게 진행되나요',
        '해당 활동에 대해서 메이커님의 꿀팁이 있나요',
        '업로드 파일 선택 어떤분들에게 좋은 활동일까요'
      ],
      child: null,
      doubleClick: true,
      path: this.$route.params.key,
      item: null,
      mapImage: null,
      requestMail: {
        name: '',
        target: '',
        message: ''
      },
      hostInfo: { User: { name: '' } },
      policy: {
        value: false,
        text: '위킨 기본 환불규정',
        temp: ''
      },
      modelChild: {},
      filterKoreaList: filterKoreaList,
      checkedDays: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    deleteImage (index) {
      this.item.main_image.image.splice(index, 1)
    },
    adjustCommission (index) {
      let targetObj = this.child[index]
      this.$http.put(`/wekin/approve/${targetObj.wekin_key}`, {commission: targetObj.commission})
      .then(_ => this.$http.get(`/wekin/${targetObj.wekin_key}`))
      .then(r => {
        this.modelChild[r.data.wekin_key] = r.data.commission
        this.child.splice(index, 1, r.data)
      })
    },
    fetchData () {
      this.$http.get(`/activity/front/${this.path}`)
      .then(res => {
        this.item = res.data
        for (let week in this.item.base_week_option) {
          if (this.item.base_week_option[String(week)].min_user > 0) {
            this.checkedDays.push(String(week))
          }
        }
        // 질문 5개 모아서 intro_detail에 때려박아야함
        if (this.item.intro_detail === 'false') {
          this.item.intro_detail = ''
          let question = this.item.detail_question
          for (let index in question) {
            for (let i = 0; i < question[index].images.length; i++) {
              let tmpImage = '<img src=' + question[index].images[i] + '><br>'
              this.item.intro_detail += tmpImage
            }
            this.item.intro_detail += '<p>' + question[index].text + '</p>'
          }
        }
        return this.$http.get(`/env/conf/policy`)
      })
      .then(r => {
        this.policy.text = r.data[0].value.body
        return this.$http.get(`/activity/wekin/${this.path}`)
      })
      .then(r => {
        this.child = r.data.map(v => {
          let tmp = v
          tmp.start_date = moment(v.start_date).locale('ko').format('YYYY-MM-DDTHH:mm')
          tmp.due_date = moment(v.due_date).locale('ko').format('YYYY-MM-DDTHH:mm')
          return tmp
        })
        r.data.forEach(v => {
          this.modelChild[v.wekin_key] = v.commission
        })
      })
      .catch(err => console.log(err))
    },
    save () {
      this.$http.put(`/activity/${this.path}`, this.item)
      .then(r => {
        window.alert('저장 완료')
      })
    },
    googleMap () {  // 활동지
      getGeoCode(this.item.address)
      .then(v => {
        this.item.address = v.formatted_address.replace('대한민국 ', '')              // 주소
        let tmp = this.item.address.substring(0, 2)           // 지역

        if (this.filterKoreaList.includes(tmp)) {
          this.item.address_detail.area = tmp
        } else if (tmp === '부산' || tmp === '대구' || tmp === '울산') {
          this.item.address_detail.area = '경상'
        } else if (tmp === '인천') {
          this.item.address_detail.area = '경기'
        } else if (tmp === '광주') {
          this.item.address_detail.area = '전라'
        } else if (tmp === '대전') {
          this.item.address_detail.area = '충청'
        } else {
          this.item.address_detail.area = '해외'
        }
      })
      .catch(e => { console.log(e) })
    },
    googleMapMeet () {  // 집결지
      getGeoCode(this.item.address_detail.meet_area)
      .then(v => {
        this.item.address_detail.location = {
          lat: v.geometry.location.lat,
          lng: v.geometry.location.lng
        }
        return staticMap(`${v.geometry.location.lat},${v.geometry.location.lng}`)
      })
      .then(v => {
        this.item.address_detail.mapImg = v.url
        this.mapImage = v.url
      })
      .catch(e => { console.log(e) })
    },
    update (content) {
      this.item.intro_detail = content
    },
    confirmActivity (param) {
      if (param === 'confirm') {
        if (window.confirm('위킨을 승인 하시겠습니까?')) {
          this.item.host_key = this.item.Host.host_key
          this.$http.put(`/activity/front/${this.path}`, this.item)
          .then(_ => this.$http.put(`/activity/approve/${this.path}`))
          .then(r => {
            this.item.status = 3
            window.alert('승인 완료')
            this.$router.push('/approve')
          })
          .catch(e => {
            console.log(e)
            window.alert(moment().format() + '유성이에게 해당 화면을 보여주세요')
          })
        }
      } else if (param === 'modify') {
        if (window.confirm('수정을 승인하시겠습니까?')) {
          this.item.host_key = this.item.Host.host_key
          let originalAcitivityKey = this.item.category_two
          this.$http.put(`/activity/front/${originalAcitivityKey}`, this.item)
          .then(_ => this.$http.put(`/activity/approve/${originalAcitivityKey}`))
          .then(r => {
            this.$http.delete(`/activity/admin/${this.item.activity_key}`)
              .then(result => {
                this.item.status = 3
                window.alert('수정 승인 완료')
                this.$router.push('/approve')
              })
              .catch(e => {
                console.log(e)
                window.alert(moment().format() + '유성이에게 해당 화면을 보여주세요')
              })
          })
          .catch(e => {
            console.log(e)
            window.alert(moment() + '유성이에게 해당 화면을 보여주세요')
          })
        }
      } else if (param === 'delete') {
        if (window.confirm('위킨을 삭제 하시겠습니까?')) {
          this.$http.delete(`/activity/approve/${this.path}`)
          .then(v => {
            this.item.status = 4
            window.alert('위킨을 삭제 완료')
            this.$router.push('/approve')
          })
          .catch(e => {
            if (e.response) {
              if (e.response.status === 403) { window.alert(e.response.data.msg) }
            } else if (e.request) {
              window.alert('서버가 응답하지 않습니다.')
            }
          })
        }
      } else if (param === 'reject') {
        if (window.confirm('위킨을 반려 하시겠습니까?')) {
          this.$http.post(`/activity/approve/${this.path}`)
          .then(v => {
            this.item.status = 2
            window.alert('위킨 반려 완료')
            this.$router.go(-1)
          })
          .catch(e => {
            if (e.response) {
              if (e.response.status === 403) { window.alert(e.response.data.msg) }
            } else if (e.request) {
              window.alert('서버가 응답하지 않습니다.')
            }
          })
        }
      }
    },
    policyBtn () {
      if (this.policy.value) {
        this.policy.temp = this.item.refund_policy
        this.item.refund_policy = this.policy.text
      } else {
        this.item.refund_policy = this.policy.temp
      }
    },
    mainImage (event) {
      fireHelper.imageUpload(event.target.files[0], task => {
        let url = task.snapshot.downloadURL
        let img = url.substring(0, url.indexOf('token') - 1)
        this.item.main_image.image.push(img)
      }, prg => {})
    },
    deleteChildWekin (item, index) {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        this.$http.delete(`/wekin/${item.wekin_key}`)
        .then(v => {
          window.alert('삭제완료')
          this.child.splice(index, 1)
        })
        .catch(e => {
          if (e.response) {
            if (e.response.status === 403) {
              window.alert(e.response.data.msg)
            }
          } else if (e.request) {
            window.alert('서버가 응답하지 않습니다.')
          }
        })
      }
    },
    saveWekin (item, index) {
      let current = this.child[index]
      this.$http.put(`/wekin/${current.wekin_key}`, {
        due_date: moment(current.due_date),
        start_date: moment(current.start_date),
        commission: current.commission,
        min_user: current.min_user,
        max_user: current.max_user
      })
      .then(r => {
        window.alert('저장 완료')
      })
      .catch(e => {
      })
    },
    addWekin () {
      let activityKey = this.item.activity_key
      this.$http.post(`/wekin/`, {activity_key: activityKey})
      .then(r => {
        this.child.push(r.data)
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
  components: {
    Trumbowyg,
    Datepicker
  }
}
</script>

<style scoped>
.wekin-object {
  border: 1px solid green;
  border-radius: 30px;
  margin-bottom: 10px;
}

</style>
