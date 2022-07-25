<template>
  <div class="my">
    <!-- 头部 -->
    <header>
      <div class="user-info banner" v-if="isLogin">
        <van-row> </van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" align="center" justify="end" class="code-row">
              <van-button
                native-type="button"
                class="code-btn"
                size="mini"
                round
                to="/user"
                >编辑</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid :border="false" class="grid">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon> {{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon> {{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="login-register banner" v-else>
        <div class="wrap">
          <img src="../../assets/images/mobile.png" alt="" width="50px" />
          <span @click="goLogin">登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- 主体区域 -->
    <main>
      <div>
        <van-grid :column-num="2" class="grid">
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <van-button v-if="isLogin" class="login-btn" block @click="backFn"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserCode } from '@/api'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.token.token
    }
  },
  methods: {
    backFn () {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否退出该账号'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setToken', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    goLogin () {
      this.$router.push('/login')
    },
    async getUserCode () {
      if (this.isLogin) {
        const res = await getUserCode()
        const {
          data: { data }
        } = res
        this.userInfo = data
        console.log(data)
      }
    }
  },
  created () {
    this.getUserCode()
  }
}
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 400px;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
// 头部
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
    .mobile {
      font-size: 0.4rem;
      color: #fff;
    }
    .code-row {
      height: 100%;
      .code-btn {
        width: 1.53333rem;
        height: 0.42667rem;
        background: #fff;
        border-radius: 0.21333rem;
        font-size: 0.26667rem;
        color: #666;
        padding: 0;
      }
    }
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    color: #fff;
    font-size: small;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
// button
.login-btn {
  :deep(.van-button__text) {
    color: red;
  }
}
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    font-size: 30px;
    img {
      margin-bottom: 10px;
    }
  }
}
</style>
