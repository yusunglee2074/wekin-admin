<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h4>모바일 배너관리</h4>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-2">모바일용 배너 광고</div>
                <div class="col-md-3">
                  <div class="input-group input-group-sm">
                    <div id="test">
                      <label for="image">광고 이미지</label>
                      <input type="file" id="image" @change="mainbanner($event)">
                      <label for="name">위부 URL 주소</label>
                      <input type="text" id="name" v-model="newsLink" placeholder="http://we-kin.com">
                    </div>
                    <button @click="submitImage">올려버리기</button>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-12 col-md-offset-2">
                  <div v-for="(item, index) of news">
                    <span>링크주소 : {{ item.value.link}}</span>
                    <br>
                    <img :src="item.value.image" width="540" height="140">
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
      thumbNailUrl: null
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
    submitImage () {
      let param = {
        value: { image: this.thumbNailUrl, link: this.newsLink }
      }
      this.$http.post('/env/mobile/ad', param)
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
      this.$http.get('/env/mobile/ad')
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
