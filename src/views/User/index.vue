<template>
  <div>
    <div class="User_bar">
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    </div>
    <div>
      <van-cell-group>
        <avatarVue
          :userphoto="userObj?.photo"
          @changeUserPhoto="userObj.photo = $event"
        ></avatarVue>
        <nameVue
          :username="userObj?.name"
          @changeUserName="changeUserProfileFn"
        ></nameVue>
        <genderVue
          :usergender="userObj?.gender"
          @changeUserGender="changeUserProfileFn"
        ></genderVue>
        <birthdayVue
          :userbirthday="userObj?.birthday"
          @changeUserBirthday="changeUserProfileFn"
        ></birthdayVue>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import avatarVue from './component/avatar.vue'
import nameVue from './component/name.vue'
import genderVue from './component/gender.vue'
import birthdayVue from './component/birthday.vue'
import { getUserProfile, setUserProfile } from '@/api'
export default {
  data () {
    return {
      userObj: {}
    }
  },
  components: {
    avatarVue,
    nameVue,
    genderVue,
    birthdayVue
  },
  methods: {
    async getUserProfile () {
      try {
        const {
          data: { data }
        } = await getUserProfile()
        this.userObj = data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    async changeUserProfileFn (val, valType) {
      try {
        for (const key in this.userObj) {
          if (key === valType) {
            console.log(key)
            this.userObj[key] = val
          }
        }
        const res = await setUserProfile(
          this.userObj.name,
          this.userObj.gender,
          this.userObj.birthday,
          this.userObj.intro
        )
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style scoped lang="less">
.User_bar {
  :deep(.van-nav-bar) {
    background: #3296fa;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
