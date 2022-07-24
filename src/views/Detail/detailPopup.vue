<template>
  <div>
    <van-button round @click="showPopup">写评论</van-button>
    <van-popup v-model="show" position="bottom" :style="{ height: '18%' }"
      ><van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <div class="release" @click="commentFn">发布</div>
    </van-popup>
  </div>
</template>

<script>
import { setComment } from '@/api/comment'
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },
  props: {
    target: {
      type: String
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    async commentFn () {
      console.log(this.target)
      const res = await setComment(this.$route.params.id, this.message)
      console.log(res)
      this.show = false
      this.$emit('updateComment')
    }
  }
}
</script>

<style scoped lang="less">
div {
  display: flex;
  align-items: center;
  :deep(.van-cell) {
    margin-left: 40px;
    width: 80%;
    background-color: #f5f7f9;
  }
  .release {
    font-size: 30px;
    width: 128px;
    text-align: center;
    margin-left: 45px;
    color: #74a8dd;
  }
}
</style>
