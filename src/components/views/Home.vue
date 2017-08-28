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
                <div id="test">
                  <label for="main">메인 배너</label>
                  <input type="file" id="main" @change="mainbanner($event)">
                  <label for="detail">디테일 이미지</label>
                  <input type="file" id="detail" @change="mainbannerdetail($event)">
                  <label for="detail">디테일 이미지 제목</label>
                  <input type="text" id="description" v-model="mainbannerdescription">
                  <button @click="submitImage()">업로드</button>
                </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-md-12 col-md-offset-2">

                    <div v-for="(item, index) of mainBanner">
                      <span>{{ index + 1 }} 번째 배너   </span>
                      <img :src="item.value.url" width="300" height="100"/>
                      <img :src="item.value.detailUrl" width="300" height="300"/>
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
      mainBanner: [],
      mainbannerdescription: '',
      temp: {
        env_key: null,
        value: {}
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    mainbanner (event) {
      fireHelper.imageUploadOne(event.target.files[0], url => {
        this.temp.value.url = url.substring(0, url.indexOf('token') - 1)
        /*
        this.$http.post('/env/main/banner', mock)
        .then(v => {
          this.mainBanner.push(mock)
        })
        */
      })
    },
    mainbannerdetail (event) {
      fireHelper.imageUploadOne(event.target.files[0], url => {
        this.temp.value.detailUrl = url.substring(0, url.indexOf('token') - 1)
        /*
        this.$http.post('/env/main/banner', mock)
        .then(v => {
          this.mainBanner.push(mock)
        })
        */
      })
    },
    submitImage () {
      this.temp.description = this.mainbannerdescription
      this.$http.post('/env/main/banner', this.temp)
        .then(v => {
          this.mainBanner.push(this.temp)
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
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
        console.log(r)
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
