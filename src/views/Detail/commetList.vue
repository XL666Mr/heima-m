<template>
  <div class="comment">
    <van-cell-group>
      <van-cell
        :title="item.aut_name"
        :icon="item.aut_photo"
        v-for="(item, index) in list"
        :key="index"
      >
        <template #title>
          <span class="custom-title">{{ item.aut_name }}</span
          ><br />
          <span class="custom-title">{{ item.content }}</span
          ><br />
          <span class="custom-title">{{ timeGuoLv(item) }}</span>
          <van-button round size="mini" @click="showPopup(index)"
            >回复{{ item.reply_count }}</van-button
          >
        </template>
        <span><van-icon name="good-job-o">赞</van-icon></span>
      </van-cell>
    </van-cell-group>
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      ><replyPageVue
        :list="list"
        @isShowPage="isShowPageFn"
        @change1="change1Fn"
      ></replyPageVue
    ></van-popup>
  </div>
</template>
<script>
import dayjs from '@/utils/dayjs'
import replyPageVue from './replyPage.vue'
export default {
  data () {
    return {
      isShow: false
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    timeGuoLv (info) {
      return dayjs(info.pubdate).fromNow()
    },
    showPopup (i) {
      this.$store.commit('setidArray', i)
      this.isShow = true
    },
    isShowPageFn () {
      this.isShow = false
    },
    change1Fn () {
      this.$emit('change2')
    }
  },
  components: {
    replyPageVue
  }
}
</script>

<style scoped lang="less">
.comment {
  margin-bottom: 100px;
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
  :deep(.van-icon) {
    font-size: 30px;
  }
  :deep(.van-button__text) {
    color: #000;
  }
  :deep(.van-button) {
    position: relative;
    top: -7px;
    width: 135px;
    height: 48px;
    line-height: 48px;
    background-color: #fff;
    margin-left: 20px;
  }
}
</style>
