<template>
  <div>
    <!-- 头部 -->
    <div>
      <van-nav-bar class="navbar">
        <template #title>
          <van-button round to="/serch">
            <van-icon name="search">搜索</van-icon></van-button
          >
        </template>
      </van-nav-bar>
    </div>
    <!-- 标签页 -->
    <div>
      <van-tabs v-model="active" swipeable>
        <van-tab :title="item.name" v-for="item in list" :key="item.id">
          <ArticleList :id="item.id"></ArticleList>
        </van-tab>

        <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
      </van-tabs>
    </div>
    <EditChannelPopup
      ref="popup"
      :myChannels="list"
      @delItemFn="delItem"
      @change="changeFn"
      @addItems="addItemsFn"
    ></EditChannelPopup>
  </div>
</template>

<script>
import {
  getMyChannels,
  delChannels,
  addChannels,
  getChannel,
  setChannel
} from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditChannelPopup from './component/EditChannelPopup.vue'
export default {
  data () {
    return {
      active: 0,
      list: [],
      show: false
    }
  },
  methods: {
    async getMyChannels () {
      try {
        if (!this.isLogin) {
          const myList = getChannel()
          if (myList) {
            this.list = myList
          } else {
            const { data } = await getMyChannels()
            this.list = data.data.channels
          }
        } else {
          const { data } = await getMyChannels()
          this.list = data.data.channels
        }
      } catch (error) {}
    },
    showPopup () {
      this.$refs.popup.show = true
    },
    async delItem (id) {
      this.list = this.list.filter((ele) => ele.id !== id)
      if (!this.isLogin) {
        setChannel(this.list)
      } else {
        try {
          const res = await delChannels(id)
          console.log(res)
        } catch (error) {
          return this.$toast.fail('删除失败')
        }
        this.$toast.success('删除成功')
      }
    },
    changeFn (id) {
      this.active = id
    },
    async addItemsFn (val) {
      this.list.push(val)
      if (!this.isLogin) {
        setChannel(this.list)
      } else {
        try {
          const res = await addChannels(val.id, this.list.length)
          console.log(res)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
        this.$toast.success('添加频道成功')
      }
    }
  },
  created () {
    this.getMyChannels()
  },
  components: {
    ArticleList,
    EditChannelPopup
  },
  computed: {
    isLogin () {
      return !!this.$store.state.token.token
    }
  }
}
</script>

<style lang="less" scoped>
// 头部
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
