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
        <template>
          <van-icon
            name="good-job-o"
            v-if="!item.is_liking"
            @click="isLikeFn(index) && ++item.like_count"
            >赞</van-icon
          >
          <van-icon name="good-job" v-else @click="isLikeFn(index)"></van-icon>
          <van-badge :content="item.like_count" v-show="item.is_liking" />
        </template>
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
import { setCommentlikings, delCommentlikings } from '@/api'
export default {
  data () {
    return {
      isShow: false,
      isLike: true
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
    },
    async isLikeFn (val) {
      console.log(this.list[val].is_liking)
      try {
        if (this.list[val].is_liking) {
          const res = await delCommentlikings(this.list[val].com_id)
          console.log(res)
          return this.$emit('changeIslike')
        } else {
          const res1 = await setCommentlikings(this.list[val].com_id)
          console.log(res1)
          return this.$emit('changeIslike')
        }
      } catch (error) {}
    }
  },
  computed: {
    list () {
      return this.$store.state.urlphoto
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
  :deep(.van-cell__value) {
    overflow: unset;
  }
}
</style>
