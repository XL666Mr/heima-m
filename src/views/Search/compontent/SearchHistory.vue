<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #right-icon v-if="isShow">
          <van-icon
            name="delete-o"
            class="search-icon"
            @click="isShow = !isShow"
          />
        </template>
        <template #right-icon v-else>
          <span @click="delAll">全部删除</span>
          <span @click="isShow = !isShow" class="end">完成</span>
        </template>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in historyLists"
        :key="index"
        @click="changeVal(item)"
      >
        <template #right-icon v-if="!isShow">
          <van-icon
            name="close"
            class="search-icon"
            @click="delFn(item)"
          /> </template
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true
    }
  },
  computed: {
    historyLists () {
      return this.$store.state.historyItem
    }
  },
  methods: {
    delFn (historyItem) {
      this.$store.commit('delhistoryItem', historyItem)
    },
    delAll () {
      console.log(11)
      this.$store.commit('removehistoryItem')
    },
    changeVal (val) {
      if (this.isShow) {
        this.$emit('changevals', val)
      }
    }
  },
  created () {
    console.log(this.historyLists)
  }
}
</script>

<style lang="less" scoped>
.van-icon {
  padding-top: 10px;
}
.end {
  margin-left: 15px;
}
</style>
