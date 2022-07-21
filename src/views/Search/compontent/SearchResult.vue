<template>
  <div>
    <van-cell
      :title="item.title"
      v-for="item in list"
      :key="item.art_id"
      @click="articleInfo(item.art_id)"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchResult, getArticleDetails } from '@/api'
export default {
  data () {
    return {
      list: []
    }
  },
  props: {
    searchResultVal: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSearchResults () {
      try {
        console.log(this.searchResultVal)
        const res = await getSearchResult(this.searchResultVal)
        console.log(res)
        this.list = res.data.data.results
      } catch (error) {
        console.log(error)
      }
    },
    async articleInfo (id) {
      console.log(id)
      const res = await getArticleDetails(id)
      console.log(res)
      this.$store.commit('setArticleId', id)
      this.$router.push('/detail')
    }
  },
  created () {
    this.getSearchResults()
  }
}
</script>

<style></style>
