<template>
  <div>
    <dropzone id="myVueDropzone" url="https://httpbin.org/post" v-on:vdropzone-success="showSuccess">
        <!-- Optional parameters if any! -->
        <input type="hidden" name="token" value="xxx">
    </dropzone>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone'
import firebase from 'firebase'

export default {
  components: {
    Dropzone
  },
  name: 'DocList',
  data () {
    return {
    }
  },
  mounted () {
    let ref = firebase.database().ref('naver')
    ref.set({
      NAVER: 'ysuuwefjiowefjiowe f wejiofwej iofj weiofj weiofj iowefj iowefj iowefj weiofj weiofj wioefj weiof jweiof wejiofw ej\n weiofjweiofjiowejfiowejfiowejfiowejfiowejfiowefj weiofj weiofj weiofjweiong'
    })
  },
  methods: {
  },
  updated () {
  }
}
</script>

<style>
</style>
