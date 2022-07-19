<template>
  <div>
    <!-- 渲染无图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
    ></van-cell>
    <!-- 渲染1张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
    >
      <van-image width="3rem" height="2rem" :src="articleInfo.cover.images[0]">
      </van-image
    ></van-cell>

    <!-- 渲染第三张图片 -->

    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <van-image
          v-for="item in articleInfo.cover.images"
          :key="item"
          width="3rem"
          height="2rem"
          :src="item"
        />

        <!-- 文章描述 -->
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const info = this.articleInfo
      const relativeTime = dayjs(info.pubdate).fromNow()
      return `${info.aut_name} ${info.comm_count}评论 ${relativeTime}`
    }
  },
  created () {
    console.log(this.articleInfo)
  }
}
</script>

<style></style>
