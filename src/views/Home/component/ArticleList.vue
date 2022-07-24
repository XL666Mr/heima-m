<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="loadNextpage" success-text="刷新成功">
      <van-list
        @load="loadNextpage"
        offset="0"
        :immediate-check="false"
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finish"
        finished-text="没有更多了~~~"
      >
        <ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      pre_timetamp: '',
      loading: false,
      finish: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async getArticleList () {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.pre_timetamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        if (error.response.status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async loadNextpage () {
      try {
        const { data } = await getArticleList(this.id, this.pre_timetamp)
        if (!data.data.pre_timestamp) {
          this.finish = true
        }
        if (this.refreshing) {
          this.articles.unshift(...data.data.results)
          this.refreshing = false
        } else {
          this.articles.push(...data.data.results)
        }
        this.pre_timetamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  },
  created () {
    this.getArticleList()
  }
}
</script>

<style></style>
