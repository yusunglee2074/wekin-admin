<template>
  <div>
    <section class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="box">
              <div class="box-header">
                  <h4>메인 관리</h4>
              </div>
              <div class="box-body">
                <div class="row">
                    <div class="col-md-2">카테고리</div>
                    <div class="col-md-2">
                        <select class="form-control" id="type" v-model="docs.category[0]">
                            <option :value="option.value" v-for="option in options">{{option.text}}</option>
                        </select>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-2">제목</div>
                    <div class="col-md-8">
                        <input type="text" class="form-control" v-model="docs.title">
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-2">내용</div>
                    <div class="col-md-8">
                      <Trumbowyg :content="docs.content" @tbwchange="update"></Trumbowyg>
                    </div>
                </div>
              </div>
              <div class="box-footer">
                  <button class="btn btn-primary btn-block" @click="submit"><b>확인</b></button>
              </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Trumbowyg from '../Trumbowyg'

export default {
  name: 'FaqEdit',
  data () {
    return {
      doubleClick: true,
      sample: null,
      category: [],
      path: this.$route.params.id,
      docs: {
        category: null,
        title: null,
        content: null
      },
      options: []
    }
  },
  methods: {
    fetchData () {
      this.$http.get(`/board/faq/${this.path}`)
      .then(res => {
        this.docs = res.data
        console.log(this.docs)
      })
      this.$http.get('/env/faq/category')
      .then(res => {
        this.category = res.data
        this.options = res.data.map(value => {
          let tmp = {}
          tmp.text = value.value.name
          tmp.value = value.env_key
          tmp.color = value.value.color
          return tmp
        })
      })
      .catch(err => console.log(err))
    },
    submit () {
      if (this.doubleClick) {
        this.doubleClick = false
        this.$http.put(`/board/faq/${this.docs.board_key}`, this.docs)
        .then(_ => {
          this.$router.push('/faq')
        })
        .catch(res => console.log(res))
      }
    },
    update (content) {
      this.docs.content = content
    }
  },
  components: {
    Trumbowyg
  },
  created () {
    this.fetchData()
  }
}
</script>
