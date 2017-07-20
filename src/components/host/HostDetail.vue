<template>
  <div>
    <section class="content" v-if="item">
      <div class="row">

        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header">
              <div class="col-sm-4">
                <img :src="item.profile_image | img" class="img-responsive" alt="User profile picture" width="152px" height="152px"/>
              </div>
            </div>


            <div class="box-body">
              <div class="form-horizontal">
                <!-- 기본 정보 -->
                <div class="row" v-if="item.User">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="inputName" class="col-sm-2 control-label">이름</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" placeholder="이름" :value="item.User.name" disabled="disabled">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="introduce" class="col-sm-2 control-label">메이커 소개</label>

                      <div class="col-sm-8">
                        <textarea class="form-control" id="introduce" placeholder="소개" v-model="item.introduce" rows="5"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="email" class="col-sm-2 control-label">이메일</label>
                      <div class="col-sm-8">
                        <input type="email" class="form-control" id="email" placeholder="admin@we-kin.com" :value="item.User.email" disabled="disabled">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputPhone" class="col-sm-2 control-label">연락처</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputPhone" placeholder="Name" :value="item.User.phone" disabled="disabled">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="introduce" class="col-sm-2 control-label">이력</label>

                      <div class="col-sm-8">
                        <textarea class="form-control" id="introduce" placeholder="소개" v-model="item.history" rows="5"></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="inputName" class="col-sm-3 control-label">업체명</label>
                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" placeholder="이름" v-model="item.name">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="introduce" class="col-sm-3 control-label">업체 전화번호</label>

                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" placeholder="이름" v-model="item.tel">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="introduce" class="col-sm-3 control-label">업체 주소</label>

                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" placeholder="이름" v-model="item.address">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="introduce" class="col-sm-3 control-label">업체 홈페이지</label>

                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" placeholder="이름" v-model="item.home_page">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="introduce" class="col-sm-3 control-label">업체 SNS</label>

                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" placeholder="이름" v-model="item.sns">
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="introduce" class="col-sm-3 control-label">업체 email</label>

                      <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputName" placeholder="이름" v-model="item.email">
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <hr />
                <br />

                <!-- 회원 종류 및 가입정보 -->
                <div class="row">

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="inputName" class="col-sm-2 control-label">메이커 구분</label>
                      <div class="col-sm-8">
                        <input type="radio" value="0" v-model="item.type">
                        <label for="one">일반인</label>
                        <br>
                        <input type="radio" value="1" v-model="item.type">
                        <label for="two">전문가(업체)</label>
                        <br>
                        <input type="radio" value="2" v-model="item.type">
                        <label for="two">전문가(개인)</label>
                        <br>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="inputName" class="col-sm-2 control-label">가입 경로</label>
                      <div class="col-sm-4">
                        <input type="radio" value="지인소개" v-model="item.join_method">
                        <label for="one">지인소개</label>
                        <br>
                        <input type="radio" value="페이스북" v-model="item.join_method">
                        <label for="two">페이스북</label>
                        <br>
                        <input type="radio" value="인스타그램" v-model="item.join_method">
                        <label for="two">인스타그램</label>
                        <br>
                        <input type="radio" value="포털사이트" v-model="item.join_method">
                        <label for="two">포털사이트</label>
                        <br>
                      </div>
                      <div class="col-sm-4">
                        <input type="radio" value="홈페이지(블로그)" v-model="item.join_method">
                        <label for="one">홈페이지(블로그)</label>
                        <br>
                        <input type="radio" value="기타광고" v-model="item.join_method">
                        <label for="two">기타광고</label>
                        <br>
                        <input type="radio" value="제휴업체" v-model="item.join_method">
                        <label for="two">제휴업체</label>
                        <br>
                        <input type="radio" value="Two" v-model="item.join_method">
                        <label for="two">기타</label>
                        <br>
                      </div>
                    </div>
                  </div>

                </div>

                <br />
                <hr />
                <br />

                <!-- 추가 서류들 -->
                <div class="row">
                  <div class="form-group">
                    <label for="inputName" class="col-sm-2 control-label">사업자등록증</label>
                    <div class="col-sm-8">
                      <img :src="item.business_registration" width="300">
                    </div>
                    <div class="col-sm-2">
                      <input type="file" v-on:change="imgReg">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputName" class="col-sm-2 control-label">자격증</label>
                    <!--<div class="col-sm-8">
                      <img :src="item.license" width="300">
                    </div>-->
                    <div class="col-sm-8">
                      <div style="overflow-x: scroll; white-space:nowrap">
                        <div v-for="(img, index) in item.license_list" style="display: inline-block; position: relative;">
                          <button style="position: absolute; right: 10px; top: 10px;" class="btn btn-danger" @click="deleteImage(index)">delete</button>
                          <img :src="img" style="display: inline-block;" height="300">
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <input type="file" v-on:change="imgLicence">
                    </div>
                  </div>

                </div>


              </div>
            </div>


            <div class="box-footer">
              <div class="pull-left">
                <button v-if="item.status != 3" class="btn btn-danger" @click="approve('confirm')"><b>메이커 승인</b></button>
                <button v-if="item.status == 3" class="btn btn-danger" @click="approve('delete')"><b>메이커 삭제</b></button>
              </div>
              <div class="pull-right">
                <button class="btn btn-primary" @click="saveData"><b>저장</b></button>
                <button class="btn btn-warning" @click="mailModal"><b>수정요청 메일 보내기</b></button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>


    <div class="modal fade" tabindex="-1" role="dialog" id="mail-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">메일 전송</h4>
          </div>
          <div class="modal-body">

            <form>
              <div class="form-group">
                <label for="recipient-name" class="control-label">제목:</label>
                <input type="text" class="form-control" id="recipient-name" v-model="mail.title">
              </div>
              <div class="form-group">
                <label for="message-text" class="control-label">내용:</label>
                <textarea class="form-control" id="message-text" rows="20" v-model="mail.body"></textarea>
              </div>
            </form>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="sendMail">Save changes</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


  </div>
</template>

<script>
import { hostType } from '../../config'
import { storage } from '../../util/google/firebase'

export default {
  name: 'HostDetail',
  data () {
    return {
      doubleClick: true,
      key: this.$route.params.key,
      item: null,
      hostType: hostType,
      mail: {
        title: '',
        body: ''
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    deleteImage (index) {
      this.item.license_list.splice(index, 1)
      this.saveData()
    },
    fetchData () {
      this.$http.get(`/host/${this.key}`)
      .then(res => {
        this.item = res.data
        console.log(res.data)
      })
      .catch(err => console.log(err))
    },
    saveData () {
      this.$http.put(`/host/update/${this.key}`, this.item)
      .then(v => {
        window.alert('수정완료')
      })
    },
    approve (param) {
      if (param === 'confirm') {
        if (window.confirm('메이커 승인 하시겠습니까?')) {
          this.$http.put(`/host/approve/${this.key}`, this.item)
          .then(v => {
            this.item.status = 3
            window.alert('승인완료')
            this.$router.push('/host')
          })
        }
      } else if (param === 'delete') {
        if (window.confirm('메이커 삭제 하시겠습니까?')) {
          this.$http.delete(`/host/delete/${this.key}`, this.item)
          .then(v => {
            this.item.status = 4
            window.alert('메이커 삭제 완료')
            this.$router.push('/host')
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
    submit () {
      if (this.doubleClick) {
        this.doubleClick = false
      }
    },
    mailModal () {
      window.jQuery('#mail-modal').modal('show')
    },
    sendMail () {
      this.$http.post(`/util/mail`, {
        target: this.item.email,
        title: this.mail.title,
        message: this.mail.body
      })
      .then(r => {
        window.alert('메일 전송 완료')
      })
    },
    imgReg (e) {
      storage(e.target.files[0], pro => {
      })
      .then(url => {
        this.item.business_registration = url
        this.saveData()
      })
    },
    imgLicence (e) {
      storage(e.target.files[0], pro => {
      })
      .then(url => {
        this.item.license_list.push(url)
        this.saveData()
      })
    }
  }
}
</script>
