<template>
  <nav>
    <ul class="pagination">
      <li :class="{ disabled: test.first }"><a href="#"><span>«</span></a></li>
      <li v-for="n in test.totalPages" :class="{ active: test.number == n }">
        <router-link :to="{query: {page: n}}">
          <a href="#">{{n}}</a>
        </router-link>
      </li>
      <li :class="{ disabled: test.last }"><a href="#"><span>»</span></a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pageable: {
      type: String,
      default: ''
    }
  },
  mounted () {
    console.log('asfdasfsa')
    console.log(this.pageable)
  }
}
</script>
