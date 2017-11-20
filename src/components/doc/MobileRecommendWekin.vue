<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h4>모바일용 추천 위킨관리</h4>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-2">모바일용 추천 위킨</div>
                <div class="col-md-3">
                  <div class="input-group input-group-sm">
                    <div id="test">
                      <label for="image">메인 이미지</label>
                      <input type="file" id="image" @change="mainbanner($event)">
                      <label for="image">디테일 이미지</label>
                      <input type="file" id="image" @change="mainbanner2($event)">
                      <label for="name">관련 엑티비티들 </label>
                      <input type="text" id="name" v-model="newsLink">
                      * 올릴 엑티비티들의 번호를 [1,2,3,4,5...] 형식으로 올려주세요
                    </div>
                    <button @click="submitImage">올려버리기</button>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-12 col-md-offset-2">
                  <div v-for="(item, index) of news">
                    <span>관련 엑티비티: {{ item.value.activity_list}}</span>
                    <br>
                    <img :src="item.value.image" width="340" height="140">
                    <button class="btn btn-warning" @click="deleteImage(item, index)">delete</button>
                    <br>
                    <br>
                    <br>
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
import fireHelper from '../../util/google/firebase/storage'

export default {
  name: 'Home',
  data () {
    return {
      news: [],
      newsTitle: '',
      newsLink: '',
      thumbNailUrl: null,
      thumbNailDetailUrl: null
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    mainbanner (event) {
      fireHelper.imageUploadOne(event.target.files[0], url => {
        this.thumbNailUrl = url.substring(0, url.indexOf('token') - 1)
      })
    },
    mainbanner2 (event) {
      fireHelper.imageUploadOne(event.target.files[0], url => {
        this.thumbNailDetailUrl = url.substring(0, url.indexOf('token') - 1)
      })
    },
    submitImage () {
      let param = {
        value: { image: this.thumbNailUrl, detailImage: this.thumbNailDetailUrl, activity_list: this.newsLink }
      }
      this.$http.post('/env/mobile/recommend', param)
        .then(result => {
          this.news.push(this.news)
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteImage (item, index) {
      this.$http.delete(`/news/delete/${item.env_key}`)
        .then(_ => { this.news.splice(index, 1) })
    },
    fetchData () {
      this.$http.get('/env/mobile/recommend')
      .then(r => {
        console.log('야호', r)
        this.news = r.data
      })
      .catch(e => { console.log(e) })
    }
  }
}
</script>

<style>

#test input {
  height: 20px;
  margin-bottom: 8px;
}

</style>
