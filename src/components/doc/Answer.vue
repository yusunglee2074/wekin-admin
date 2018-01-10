<template>
  <div id="answer">
    <p>질문 내용 <div style="border: 1px solid;">{{ questionText }}</div></p>
    <p>답변자 명: {{ name }}</p> 
    <textarea id="" name="" cols="30" rows="10" v-model.trim="text"></textarea>
    <div>
      <button class="btn btn-success button" @click="postAnswer()">완료</button>
      <button class="btn btn-danger button" @click="emitCancel()">취소</button>
    </div>
  </div>
</template>

<script>
import global from './../../global.js'

export default {
  name: 'Answer',
  props: ['questionText', 'docKey'],
  data () {
    return {
      name: '위킨(WE:KIN)',
      text: null
    }
  },
  mounted () {
  },
  methods: {
    postAnswer () {
      global.setAccessTokenOnLocalStorageAndHttpHeader(this.$http.defaults)
        .then(result => {
          return this.$http.post(`/qna/${this.docKey}/reply`, { answer: this.text })
        })
        .then(result => console.log(result, '하핫'))
        .catch(error => window.alert(error, '유성이에게....', new Date()))
    },
    emitCancel () {
      this.$emit('cancel')
    }
  },
  updated () {
  }
}
</script>

<style>
.button {
  width: 100px;
}
#answer {
  width: 300px;
  margin: 30px auto;
  padding: 20px 20px;
}
</style>

