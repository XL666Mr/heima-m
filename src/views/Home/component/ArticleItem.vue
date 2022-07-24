<template>
  <div>
    <!-- 渲染无图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :title="articleInfo.title"
      :label="articleDesc"
      @click="getId(articleInfo.art_id)"
    ></van-cell>
    <!-- 渲染1张图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :title="articleInfo.title"
      :label="articleDesc"
      @click="getId(articleInfo.art_id)"
    >
      <van-image width="3rem" height="2rem" :src="articleInfo.cover.images[0]">
      </van-image
    ></van-cell>

    <!-- 渲染第三张图片 -->

    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <van-image
          v-for="(item,index) in articleInfo.cover.images"
          :key="index"
          width="3rem"
          height="2rem"
          :src="item"
          @click="getId(articleInfo.art_id)"
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
  methods: {
    getId (id) {
      console.log(id)
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style></style>
