<template>
  <div>
    <div>
      <img :src="userphotos" ref="img" class="img" id="image" />
    </div>
    <van-nav-bar
      left-text="取消"
      right-text="保存"
      @click-right="confirmFn"
      @click-left="onClickLeft"
    ></van-nav-bar>
  </div>
</template>

<script>
import { setUserPhoto } from '@/api'

// Cropper
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  data () {
    return {}
  },
  props: {
    userphotos: {
      type: String,
      required: true
    }
  },
  mounted () {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {})
    console.log(this.myCropper)
  },
  methods: {
    confirmFn () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 3000
      })
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        const fm = new FormData()
        fm.append('photo', blob)
        try {
          const {
            data: { data }
          } = await setUserPhoto(fm)
          this.$toast.success('上传头像成功')
          this.$emit('close')
          this.$emit('changeUserPhoto', data.photo)
        } catch (error) {
          this.$toast.fail('加载失败')
        }
      })
    },
    onClickLeft () {
      this.$emit('close')
    }
  },
  watch: {
    userphotos: {
      handler (val) {
        console.log(val)
      }
    }
  }
}
</script>

<style scoped lang="less">
div {
  position: relative;
  top: 50%;
  margin-top: -50%;
}
.img {
  width: 100%;
  height: 217 * 2px;
}
:deep(.van-nav-bar) {
  position: relative;
  bottom: -870px;
  width: 100%;
  height: 100px;
}
</style>
