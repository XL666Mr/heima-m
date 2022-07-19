<template>
  <div>
    <van-nav-bar class="navbar" title="登录" @click-left="onClickLeft">
      <template #left> <van-icon name="cross" /> </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>

      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShowCountdown"
            @finish="isShowCountdown = false"
            :time="15 * 1000"
            format="ss 秒"
          />
          <van-button
            v-else
            native-type="button"
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountdown: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    async onSubmit () {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        console.log(res.data.data)
        this.$store.commit('setToken', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
        let message = '服务器繁忙，请刷新'
        if (error.response.status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountdown = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号格式不正确')
        } else {
          const status = error.response.status
          if (status === 400 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.van-field {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  :deep(.toutiao) {
    font-size: 0.5rem;
  }
}

.code-btn {
  background-color: #eee;
  padding: 0 10px;
  color: #666;
}
</style>
