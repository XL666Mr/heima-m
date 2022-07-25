<template>
  <div>
    <van-cell title="昵称" :value="username" @click="showPopup">
      <template #right-icon> <van-icon name="arrow" /> </template
    ></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      ></van-nav-bar>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },
  props: {
    username: {
      type: String
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    onClickLeft () {
      this.show = false
    },
    onClickRight () {
      if (this.message.length === 0) return this.$toast.fail('请输入新昵称')
      this.$emit('changeUserName', this.message, 'name')
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-icon) {
  padding: 10px 0 0 5px;
  font-size: 30px;
}
</style>
