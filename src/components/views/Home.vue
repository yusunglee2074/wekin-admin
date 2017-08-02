<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
              <div class="box-header">
                  <h4>메인 베너 설정</h4>
              </div>
              <div class="box-body">
                <div class="row">
                    <div class="col-md-2">메인 베너 이미지 추가</div>
                    <div class="col-md-3">
                        <div class="input-group input-group-sm">
                            <input type="file" class="form-control" v-on:change="addImage">
                            <span class="input-group-btn">
                                <button type="button" class="btn btn-info btn-flat" >이미지 업로드</button>
                            </span>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-md-12 col-md-offset-2">

                    <div v-for="(item, index) of mainBanner">
                      <img :src="item.value.url" width="300" height="100"/>
                      <button class="btn btn-warning" @click="deleteImage(item, index)">delete</button>
                    </div>

                  </div>
                </div>


              </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import fireHelper from '../../util/google/firebase/storage'

export default {
  name: 'Home',
  data () {
    return {
      sample: '1sample1',
      photo: null,
      mainBanner: [],
      mobileBanner: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    addImage (event) {
      let mock = {
        env_key: null,
        value: { url: 'http://i.imgur.com/bk2zGaf.jpg' }
      }
      fireHelper.imageUploadOne(event.target.files[0], url => {
        mock.value.url = url.substring(0, url.indexOf('token') - 1)
        this.$http.post('/env/main/banner', mock)
        .then(v => {
          this.mainBanner.push(mock)
        })
      })
    },
    deleteImage (item, index) {
      if (this.mainBanner.length === 1) {
        window.alert('배너가 1개 미만일 수 없습니다.')
      } else {
        this.$http.delete(`/env/main/banner/${item.env_key}`)
        .then(_ => { this.mainBanner.splice(index, 1) })
      }
    },
    fetchData () {
      this.$http.get('/env/main/banner')
      .then(r => {
        this.mainBanner = r.data
      })
      .catch(e => { console.log(e) })
    }
  },
  components: {
    PictureInput
  }
}
</script>
