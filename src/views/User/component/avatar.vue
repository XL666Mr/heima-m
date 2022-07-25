<template>
  <div>
    <input type="file" hidden ref="photo" @change="onChange" />
    <van-cell title="头像" value="内容" @click="$refs.photo.click()">
      <template>
        <van-image width="30" height="30" :src="userphoto" round />
      </template>
      <template #right-icon>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <userphotoVue
        v-if="show"
        :userphotos="value"
        @close="closeFn"
        @changeUserPhoto="changeUserPhotoFns"
      ></userphotoVue>
    </van-popup>
  </div>
</template>

<script>
import userphotoVue from './userphoto.vue'

export default {
  data () {
    return {
      value: '',
      show: false
    }
  },
  props: {
    userphoto: String
  },
  components: {
    userphotoVue
  },
  methods: {
    closeFn () {
      this.show = false
    },
    onChange (e) {
      if (e.target.value === '') return
      this.show = true
      this.value = URL.createObjectURL(e.target.files[0])
      e.target.value = ''
    },
    changeUserPhotoFns (val) {
      this.$emit('changeUserPhoto', val)
    }
  },
  watch: {}
}
</script>

<style lang="less" scoped>
:deep(.van-icon) {
  padding: 10px 0 0 5px;
  font-size: 30px;
}
</style>
