<template>
  <div>
    <van-cell
      title="性别"
      :value="usergender === 0 ? '男' : '女'"
      @click="showPopup"
    >
      <template #right-icon> <van-icon name="arrow" /> </template
    ></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '47%' }">
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      columns: ['男', '女']
    }
  },
  props: {
    usergender: {
      type: Number
    }
  },
  methods: {
    showPopup () {
      this.show = true
    },
    onCancel () {
      this.show = false
    },
    onConfirm (val) {
      this.show = false
      const sex = val === '男' ? 0 : 1
      this.$emit('changeUserGender', sex, 'gender')
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
