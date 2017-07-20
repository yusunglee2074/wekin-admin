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
                    <input type="text" class="form-control" id="inputName" v-model="item.category">
                  </div>
                </div>

                <div class="form-group">
                  <label for="inputName" class="col-sm-2 control-label">위킨명</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputName" placeholder="위킨명" v-model="item.title">
                  </div>
                </div>


                <div class="form-group">
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
                    <input type="text" class="form-control" id="inputName" placeholder="위킨명" v-model="item.price">
                  </div>
                </div>

                <hr >
                <div class="row" v-for="(item, index) in child" :key="item.wekin_key">
                  <div class="col-sm-8 col-sm-offset-2 wekin-object">
                    <div class="form-group">
                      <label for="preparation" class="col-sm-2 control-label">날짜선택</label>
                      <div class="col-sm-4">
                        <input type="datetime-local" class="form-control" id="preparation" v-model="item.start_date" >
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="preparation" class="col-sm-2 control-label">신청마감일시</label>
                      <div class="col-sm-4">
                        <input type="datetime-local" class="form-control" id="preparation" v-model="item.due_date" >
                      </div>
                      <label class="col-sm-1 control-label">수수료</label>
                      <div class="col-sm-2">
                        <div class="input-group input-group-sm">
                          <input type="number" max="100" class="form-control" v-model="child[index].commission" >
                          <span class="input-group-btn">
                              <button type="button" class="btn btn-info btn-flat" @click="adjustCommission(index)" v-if="child[index].commission != modelChild[item.wekin_key]">설정</button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="preparation" class="col-sm-2 control-label">최소 ~ 최대인원</label>
                      <div class="col-sm-2">
                        <input type="preparation" class="form-control" id="preparation" placeholder="최소" v-model="item.min_user" >
                      </div>
                      <div class="col-sm-2">
                        <input type="preparation" class="form-control" id="preparation" placeholder="최소" v-model="item.max_user" >
                      </div>
                      <div class="col-sm-2 col-sm-offset-1">
                        <button class="btn btn-primary" @click="saveWekin(item, index)">저장</button>
                        <button class="btn btn-danger" @click="deleteChildWekin(item, index)">삭제</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-8 col-sm-offset-2">
                    <button class="btn btn-primary" @click="addWekin">add</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <div class="pull-left">
                <button type="button" class="btn btn-primary btn-lg" @click="save">저장</button>
              </div>
              <div class="pull-right">
                <button v-if="item.status != 3" class="btn btn-lg btn-warning" @click="confirmActivity('confirm')"><b>위킨 승인</b></button>
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

export default {
  name: 'ActivityDetail',
  data () {
    return {
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
      filterKoreaList: filterKoreaList
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
      this.$http.get(`/activity/${this.path}`)
      .then(res => {
        this.item = res.data
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
          this.$http.put(`/activity/${this.path}`, this.item)
          .then(_ => this.$http.put(`/activity/approve/${this.path}`))
          .then(r => {
            this.item.status = 3
            window.alert('승인 완료')
            this.$router.push('/approve')
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
    Trumbowyg
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
