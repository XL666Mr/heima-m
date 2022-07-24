<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      loading-text="加载中..."
      finished-text="没有更多了"
      @load="onLoad"
      offset="100"
    >
      <van-cell
        :title="item.title"
        v-for="(item, index) in list"
        :key="index"
        @click="articleInfo(item.art_id)"
      >
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult, getArticleDetails } from '@/api'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1
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
        const res = await getSearchResult(this.searchResultVal)
        this.list = res.data.data.results
        this.page = res.data.data.page
      } catch (error) {
        console.log(error)
      }
    },
    async articleInfo (id) {
      console.log(id)
      const res = await getArticleDetails(id)
      console.log(res)
      this.$router.push('/detail/' + id)
    },
    async onLoad () {
      try {
        const res = await getSearchResult(this.searchResultVal, ++this.page)
        this.loading = false
        if (res.data.data.results.length < 10) {
          this.finished = true
        }
        this.list.push(...res.data.data.results)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getSearchResults()
  }
}
</script>

<style></style>
