<template>
  <div v-if="wekin">
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <div class="box-header">

            </div>
            <div class="box-body">
              <div class="form-horizontal">


                <div class="form-group">
                  <label class="col-sm-2 control-label">위킨 메인 이미지</label>
                  <div class="col-sm-3">
                    <div class="input-group input-group-sm">
                      <input type="file" class="form-control">
                      <span class="input-group-btn">
                          <button type="button" class="btn btn-info btn-flat">이미지 업로드</button>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-8 col-sm-offset-2">
                    <!-- TODO: 이미지 갯수에 따른 표시 -->
                    <img class="media-object" src="http://placehold.it/100x100" style="display: inline-block;">
                    <img class="media-object" src="http://placehold.it/100x100" style="display: inline-block;">
                    <img class="media-object" src="http://placehold.it/100x100" style="display: inline-block;">
                    <img class="media-object" src="http://placehold.it/100x100" style="display: inline-block;">
                    <img class="media-object" src="http://placehold.it/100x100" style="display: inline-block;">
                    <img class="media-object" src="http://placehold.it/100x100" style="display: inline-block;">
                    <img class="media-object" src="http://placehold.it/100x100" style="display: inline-block;">
                  </div>
                </div>


                <div class="form-group">
                  <label for="inputName" class="col-sm-2 control-label">위킨명</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="inputName" placeholder="위킨명" :value="item.title">
                  </div>
                </div>


                <div class="form-group">
                  <label for="intro_summary" class="col-sm-2 control-label">간단 소개</label>

                  <div class="col-sm-8">
                    <textarea class="form-control" id="intro_summary" placeholder="소개" :value="item.intro_summary" rows="5"></textarea>
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
                    <textarea class="form-control" id="schedule" placeholder="세부 일정" :value="item.schedule" rows="5"></textarea>
                  </div>
                </div>

                <div class="form-group">
                  <label for="inclusion" class="col-sm-2 control-label">포함 / 불포함 사항</label>

                  <div class="col-sm-8">
                    <textarea class="form-control" id="inclusion" placeholder="포함 / 불포함 사항" :value="item.inclusion" rows="5"></textarea>
                  </div>
                </div>

                  <div class="form-group">
                    <label for="preparation" class="col-sm-2 control-label">준비물</label>
                    <div class="col-sm-8">
                      <input type="preparation" class="form-control" id="preparation" placeholder="준비물" :value="item.preparation">
                    </div>
                  </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">집결지 주소</label>
                  <div class="col-sm-5">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control" :value="item.address_exp">
                      <span class="input-group-btn">
                          <button type="button" class="btn btn-info btn-flat" @click="googleMap">이미지 업로드</button>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-8 col-sm-offset-2">
                    <img v-if="mapImage" class="media-object" :src="mapImage" style="display: inline-block;">
                  </div>
                </div>

                <div class="form-group">
                  <label for="refund_policy" class="col-sm-2 control-label">환불규정</label>
                  <div class="col-sm-8">
                    <textarea class="form-control" id="schedule" placeholder="환불규정" :value="item.refund_policy" rows="5"></textarea>
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" v-model="item.notification"> 위킨 환불규정 입력
                      </label>
                    </div>
                  </div>
                </div>


                <hr />
                <div>
                  <div class="form-group">
                    <label for="preparation" class="col-sm-2 control-label">날짜선택</label>
                    <div class="col-sm-4">
                      <input type="preparation" class="form-control" id="preparation" placeholder="준비물" :value="wekin.start_date">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="preparation" class="col-sm-2 control-label">신청마감일시</label>
                    <div class="col-sm-4">
                      <input type="preparation" class="form-control" id="preparation" placeholder="준비물" :value="wekin.end_date">
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="preparation" class="col-sm-2 control-label">최대 / 최소인원</label>
                    <div class="col-sm-4">
                      <input type="preparation" class="form-control" id="preparation" placeholder="준비물" :value="wekin.min_user + '/' + wekin.max_user">
                    </div>
                  </div>
                </div>


              </div>
            </div>
            <div class="box-footer">
              <div class="pull-left">
                <button type="button" class="btn btn-primary btn-lg">미리보기</button>
                <button type="button" class="btn btn-primary btn-lg">저장</button>
              </div>
              <div class="pull-right">
                <button type="button" class="btn btn-danger btn-lg">삭제하기</button>
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
import { staticMap } from '../../util/google/map'

export default {
  name: 'ActivityDetail',
  data () {
    return {
      doubleClick: true,
      path: this.$route.params.key,
      wekin: null,
      item: null,
      mapImage: null
    }
  },
  created () {
    this.fetchData()
    .then(r => { console.log(r) })
    .catch(e => { console.log(e) })
  },
  methods: {
    fetchData () {
      this.$http.get(`/wekin/${this.path}`)
      .then(res => {
        console.log(res.data)
        this.wekin = res.data
        this.item = res.data.Activity
      })
      .catch(err => console.log(err))
    },
    submit () {
      if (this.doubleClick) {
        this.doubleClick = false
        console.log(this.item)
      }
    },
    googleMap () {
      staticMap(this.item.address_exp)
      .then(v => { this.mapImage = v.url })
      .catch(e => { console.log(e) })
    },
    update (content) {
      this.item.intro_detail = content
    }
  },
  components: {
    Trumbowyg
  }
}
</script>

