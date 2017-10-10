<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h4>뉴스 관리</h4>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-2">메인 베너 이미지 추가</div>
                <div class="col-md-3">
                  <div class="input-group input-group-sm">
                    <div id="test">
                      <label for="image">썸네일 이미지</label>
                      <input type="file" id="image" @change="mainbanner($event)">
                      <label for="name">제목</label>
                      <input type="text" id="name" v-model="newsTitle">
                      <br>
                      <label for="link">원본 링크</label>
                      <input type="text" id="link" v-model="newsLink">
                      <button @click="submitImage()">업로드</button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-12 col-md-offset-2">
                  <div v-for="(item, index) of news">
                    <span>클릭수: {{ item.click_count }}</span>
                    <br>
                    <span>제목 : {{ item.title }}</span>
                    <br>
                    <span>링크주소 : {{ item.link_url }}</span>
                    <br>
                    <img :src="item.thumbnail_url" width="140" height="140">
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
        title: this.newsTitle,
        thumbnail_url: this.thumbNailUrl,
        link_url: this.newsLink
      }
      this.$http.post('/news/create', param)
        .then(result => {
          this.news.push(this.news)
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteImage (item, index) {
      if (this.news.length === 1) {
        window.alert('배너가 1개 미만일 수 없습니다.')
      } else {
        this.$http.delete(`/news/delete/${item.news_key}`)
        .then(_ => { this.news.splice(index, 1) })
      }
    },
    fetchData () {
      this.$http.get('/news')
      .then(r => {
        this.news = r.data.data
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
