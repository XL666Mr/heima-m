<template>
  <div>
    <div class="title">
      <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="article_h2">
      <h5>{{ articleDetailList.title }}</h5>
    </div>
    <div class="article_cell">
      <van-cell-group :border="false">
        <van-cell
          :title="articleDetailList.aut_name"
          :label="articleDesc"
          :icon="articleDetailList.aut_photo"
        >
          <template>
            <van-button round icon="plus">关注</van-button>
          </template></van-cell
        >
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getArticleDetails } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      articleDetailList: {}
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getArticleDetails () {
      const res = await getArticleDetails('252')
      console.log(res)
      this.articleDetailList = res.data.data
    }
  },
  computed: {
    articleId () {
      return this.$store.state.articleId
    },
    articleDesc () {
      const info = this.articleDetailList
      const relativeTime = dayjs(info.pubdate).fromNow()
      return relativeTime
    }
  },
  created () {
    this.getArticleDetails()
  }
}
</script>

<style lang="less" scoped>
.title {
  :deep(.van-nav-bar) {
    background-color: #3296fa;
    position: fixed;
    top: 0;
    width: 100%;
    height: 92px;
    z-index: 999;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
.article_h2 {
  margin-top: 92px;
  height: 152px;
  line-height: 152px;
  //   text-align: center;
  padding-left: 30px;
  //   background-color: red;
}
.article_cell {
  :deep(.van-icon__image) {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
  :deep(.van-button){
    background-color: #3296fa;
    color: #fff;
    width: 170px;
    height: 58px;
  }
}
</style>
