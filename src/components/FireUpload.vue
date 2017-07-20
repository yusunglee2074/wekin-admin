<template>
  <div>
    <input type="file" v-on:change="fireStorage" />
  </div>
</template>

<script>
/**
 *  <FireUpload :imageUrl="myValue" @update:imageUrl="val => myValue = val" @progress="myEvent"></FireUpload>
 */
import fireHelper from '../util/google/firebase/storage'

export default {
  props: ['imageUrl'],
  data () {
    return {
      progress: 0,
      item: ''
    }
  },
  mounted () {
  },
  methods: {
    fireStorage (event) {
      let file = event.target.files[0]
      fireHelper.imageUpload(file,
        (task) => {
          let url = task.snapshot.downloadURL
          let tmp = url.substring(0, url.indexOf('token') - 1)
          this.$emit('update:imageUrl', tmp)
        },
        (progress) => {
          this.progress = progress / 5
          this.$emit('progress', progress)
        }
      )
    }
  }
}
</script>
