<template>
  <div>
    <van-tabbar v-model="active" router>
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">找房</van-tabbar-item>
      <van-tabbar-item icon="newspaper-o">资讯</van-tabbar-item>
      <van-tabbar-item to="/login">
        <template #icon>
          <van-icon name="contact" />
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style></style>
