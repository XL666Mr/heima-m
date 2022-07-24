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
    <div class="article_content" v-html="articleDetailList.content"></div>
    <div>
      <van-divider>正文</van-divider>
      <van-cell value="没有更多了" class="noMore" />
    </div>
    <div class="footer">
      <detailPopup
        :target="articleId"
        @updateComment="getCommentLists"
      ></detailPopup>
      <div class="footer_icon">
        <van-badge :content="commentNum">
          <van-icon name="comment-o"/>
        </van-badge>
        <van-badge>
          <van-icon name="star-o" />
        </van-badge>
        <van-badge>
          <van-icon name="good-job-o" />
        </van-badge>
        <van-badge>
          <van-icon name="share" />
        </van-badge>
      </div>
    </div>
    <div>
      <commetList :list="commitLists" @change2="change2Fn"></commetList>
    </div>
  </div>
</template>

<script>
import { getArticleDetails, getCommentList } from '@/api'
import commetList from './commetList.vue'
import dayjs from '@/utils/dayjs'
import detailPopup from './detailPopup'
export default {
  data () {
    return {
      articleDetailList: {},
      commitLists: [],
      commentNum: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async getArticleDetails () {
      const res = await getArticleDetails(this.$route.params.id)
      console.log(res)
      this.articleDetailList = res.data.data
    },
    async getCommentLists () {
      const res = await getCommentList(this.$route.params.id)
      console.log(res)
      this.commitLists = res.data.data.results
      this.commentNum = res.data.data.results.length
    },
    change2Fn () {
      this.getCommentLists()
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
    this.getCommentLists()
  },
  components: {
    detailPopup,
    commetList
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
  padding-left: 30px;
}
.article_cell {
  :deep(.van-icon__image) {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
  :deep(.van-button) {
    background-color: #3296fa;
    color: #fff;
    width: 170px;
    height: 58px;
  }
}
.article_content {
  font-size: 18px;
  padding: 20px 20px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  :deep(pre) {
    background-color: #f6f8fa;
    width: 100%;
    line-height: 1.45;
    padding: 8px;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  :deep(code) {
    background-color: #f6f8fa;
    width: 100%;
    line-height: 1.45;
    padding: 8px;
    word-wrap: break-word;
    overflow: auto;
  }
  :deep(p) {
    text-align: justify;
    word-wrap: break-word;
  }
  :deep(img) {
    max-width: 100%;
  }
  :deep(table) {
    font-size: 24px;
    display: block;
    width: 100%;
    overflow: auto;
    border-spacing: 0;
    margin-top: 0;
    margin-bottom: 0.21333rem;
    border-collapse: collapse;
  }
  :deep(th) {
    padding: 0.12rem 0.17333rem;
    border: 0.01333rem solid #dfe2e5;
  }
  :deep(td) {
    padding: 0.12rem 0.17333rem;
    border: 0.01333rem solid #dfe2e5;
  }
  :deep(.even) {
    background-color: #f6f8fa;
  }
  :deep(h3) {
    font-size: 24px;
    margin: 0 0 15px;
    padding: 0 0 7px;
    border-bottom: 1px solid #d8d8d8;
  }
  :deep(h4) {
    font-size: 24px;
    margin: 0 0 15px;
    padding: 0 0 7px;
    border-bottom: 1px solid #d8d8d8;
  }
  :deep(blockquote) {
    color: #6a737d;
    padding: 0 15px;
    margin: 0;
    border-left: 1px solid #d8d8d8;
  }
  :deep(ol) {
    margin-left: 20px;
    padding-bottom: 15px;
  }
  :deep(li) {
    padding: 5px 0;
  }
  :deep(span) {
    word-wrap: break-word;
    overflow: auto;
  }
  :deep(.hljs-string) {
    width: 10px !important;
    word-wrap: break-word;
    color: red;
  }
}
.noMore {
  .van-cell__value {
    text-align: center;
    font-size: 0.37333rem;
    color: #969799;
  }
  margin-bottom: 87px;
}
.footer {
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 87px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :deep(.van-button) {
    width: 282px;
    height: 45px;
    margin-left: 35px;
    color: #a7a7a7;
  }
  .footer_icon {
    flex: 1;
    display: flex;
    padding: 20px;
    justify-content: space-evenly;
    align-items: center;
  }
  :deep(.van-icon) {
    color: rgb(119, 119, 119);
    font-weight: 400;
    font-size: large;
  }
}
</style>
