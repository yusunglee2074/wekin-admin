<template>
  <nav v-if="item">
    <ul class="pagination">
      <li :class="{ disabled: item.first }"><a href="#"><span>«</span></a></li>
      <li v-for="n in item.totalPages" :class="{ active: item.number == n }">
        <a href="#" @click="movePage(n)">{{n}}</a>
      </li>
      <li :class="{ disabled: item.last }"><a href="#"><span>»</span></a></li>
    </ul>
  </nav>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      item: null
    }
  },
  watch: {
    'page': 'items'
  },
  props: {
    page: null
  },
  methods: {
    items () {
      this.item = this.page
    },
    movePage (n) {
      let thisQuery = Vue.util.extend({}, this.$route.query)
      Object.assign(thisQuery, {page: n})
      this.$router.push({query: thisQuery})
    }
  },
  mounted () {
    this.items()
  }
}
</script>
