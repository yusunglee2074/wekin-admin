<template>
  <div>
    <div class="header">
      <h1>한국 관광공사 무료 api 이미지 검색</h1>
    </div>
    <div>
      <label for="searchWord">검색어</label><input type="text" id="searchWord" v-model="searchWord"><button @click="fetchData(searchWord)">검색</button>
    </div>
    <div class="container" v-if="images.length">
      <h3>검색 결과</h3>
      <div v-for="i in images">
        <img :src="i.galWebImageUrl" alt="" style="width: 70%;height:70%;">
        <p>제목 : {{ i.galTitle }}</p>
        <p>위치 : {{ i.galPhotographyLocation }}</p>
        
      </div>
      
      
    </div>
    <div v-else>
      <h3>검색 결과가 없습니다.</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      searchWord: null,
      images: []
    }
  },
  mounted () {
  },
  methods: {
    fetchData (searchWord) {
      this.$http.get('/util/imageApi/' + searchWord)
      .then(r => {
        this.images = JSON.parse(r.data.response.body).response.body.items.item ? JSON.parse(r.data.response.body).response.body.items.item : []
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
