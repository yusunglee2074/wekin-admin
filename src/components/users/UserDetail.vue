<template>
  <div>
    <section class="content">
      <div class="row">
        <!--점검 및 논의사항-->
        <div class="alert alert-success alert-dismissible">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
          <h4><i class="icon fa fa-check"></i>점검사항</h4>
          이메일 인증
        </div>
        <!--끝. 점검 및 논의사항-->
        <div class="col-md-6">
          <div class="box box-primary">
            <div class="box-header">
              <div class="col-sm-4">
                <img :src="item.profile_image | img" class="img-responsive" alt="User profile picture" width="152px" height="152px"/>
              </div>
            </div>
            <div class="box-body">
              <div class="form-horizontal">
                <div class="form-group">
                  <label for="inputName" class="col-sm-2 control-label">이름</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputName" placeholder="이름" v-model="item.name">
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail" class="col-sm-2 control-label">성별</label>

                  <div class="col-sm-8">
                    <span v-if="item.gender != null" class="badge" v-bind:class="gender[item.gender].style">{{gender[item.gender].text}}</span>
                  </div>
                </div>
                <div class="form-group">
                  <label for="introduce" class="col-sm-2 control-label">소개</label>

                  <div class="col-sm-8">
                    <textarea class="form-control" id="introduce" placeholder="소개" v-model="item.introduce" rows="5"></textarea>
                  </div>
                </div>
                <hr />
                <div class="form-group" :class="emailClass.style">
                  <label for="email" class="col-sm-2 control-label">이메일</label>
                  <div class="col-sm-8">
                    <input type="email" class="form-control" id="email" placeholder="admin@we-kin.com" :value="item.email">
                    <span class="help-block">{{emailClass.text}}</span>
                  </div>
                </div>

                <hr />
                <div class="form-group" :class="phoneClass.style">
                  <label for="inputPhone" class="col-sm-2 control-label">전화번호</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputPhone" placeholder="pohne" v-model="item.phone">
                    <span class="help-block">{{phoneClass.text}}</span>
                    <input type="checkbox" v-model="item.phone_valid">전화번호 인증
                  </div>
                </div>

                <hr />
                <div class="form-group">
                  <label for="notiCheck" class="col-sm-2 control-label">알림설정</label>
                  <div class="col-sm-8">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" v-model="item.push_noti"> 웹, 모바일, 태블릿 등 알림받기
                      </label>
                    </div>
                  </div>
                </div>

                <hr />
                <div class="col-sm-offset-1 col-sm-10">
                  <table class="table table-bordered">
                    <tbody><tr>
                      <th>가입일</th>
                      <th>정보수정일</th>
                      <th>탈퇴일</th>
                    </tr>
                    <tr>
                      <td>{{item.created_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                      <td>{{item.last_login_date | date('YYYY-MM-DD HH:mm:ss')}}</td>
                      <td>{{item.deleted_at | date('YYYY-MM-DD HH:mm:ss')}}</td>
                    </tr>
                  </tbody></table>
                </div>
              </div>
            </div>
            <div class="box-footer">
              <button @click="save()">저장하기</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { userGender } from '../../config'

export default {
  name: 'UserDetail',
  data () {
    return {
      gender: userGender,
      oubleClick: true,
      phoneClass: {
        status: false,
        style: 'has-error',
        text: '전화번호 인증이 되어있지 않습니다.'
      },
      emailClass: {
        status: false,
        style: 'has-error',
        text: '이메일이 인증이 되어있지 않습니다.'
      },
      path: this.$route.params.key,
      item: {
        id: null,
        profile_image: null,
        name: null,
        email: null,
        phone: null,
        gender: null,
        createDate: null,
        lastModDate: null,
        outDate: null,
        email_valid: null,
        phone_valid: null
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    save () {
      console.log(this.item)
      this.$http.put(`/user/front/${this.path}`, {
        name: this.item.name,
        introduce: this.item.introduce,
        profileImage: this.item.profile_image,
        gender: this.item.gender,
        email_noti: this.item.email_noti,
        push_noti: this.item.push_noti,
        phone: this.item.phone,
        phone_valid: this.item.phone_valid,
        sms_noti: this.item.sms_noti,
        email_valid: this.item.email_valid
      })
        .then(result => {
          window.alert('수정성공!')
        })
        .catch(e => console.log(e))
    },
    fetchData () {
      this.$http.get(`/user/${this.path}`)
      .then(res => {
        this.item = res.data
        if (this.item.phone_valid) {
          this.phoneClass.style = ''
          this.phoneClass.status = true
          this.phoneClass.text = '전화번호 인증 완료'
        }
        if (this.item.email_valid) {
          this.emailClass.style = ''
          this.emailClass.status = true
          this.emailClass.text = '이메일 인증 완료'
        }
      })
      .catch(err => console.log(err))
    },
    submit () {
      if (this.doubleClick) {
        this.doubleClick = false
      }
    }
  }
}
</script>
