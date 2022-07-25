<template>
  <div>
    <van-cell title="生日" :value="userbirthday" @click="showPopup">
      <template #right-icon>
        <van-icon name="arrow" /> </template
    ></van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '47%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      show: false,
      minDate: new Date(1970, 1, 1),
      maxDate: new Date(2050, 12, 31),
      currentDate: new Date()
    }
  },
  props: {
    userbirthday: {
      type: String
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
      const formatTime = dayjs(val).format('YYYY-MM-DD')
      this.$emit('changeUserBirthday', formatTime, 'birthday')
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
