<template>
  <div>
    <van-nav-bar
      :title="list[i].reply_count ? list[i].reply_count + '条回复' : '暂无回复'"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="comment">
      <van-cell-group>
        <van-cell :title="list.aut_name" :icon="list[i].aut_photo">
          <template #title>
            <span class="custom-title">{{ list[i].aut_name }}</span
            ><br />
            <span class="custom-title">{{ list[i].content }}</span
            ><br />
            <span class="custom-title">{{ timeGuoLv(list[i]) }}</span>
            <van-button round size="mini"
              >回复{{ list[i].reply_count }}</van-button
            >
          </template>
          <span><van-icon name="good-job-o">赞</van-icon></span>
        </van-cell>
      </van-cell-group>
    </div>
    <div>
      <van-pull-refresh v-model="refreshing">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="comment">
            <van-cell
            title="全部回复"
            />
            <van-cell-group>
              <van-cell
                :title="item.aut_name"
                :icon="item.aut_photo"
                v-for="(item, index) in replylist"
                :key="index"
              >
                <template #title>
                  <span class="custom-title">{{ item.aut_name }}</span
                  ><br />
                  <span class="custom-title">{{ item.content }}</span
                  ><br />
                  <span class="custom-title">{{ timeGuoLv(item) }}</span>
                  <van-button round size="mini"
                    >回复{{ item.reply_count }}</van-button
                  >
                </template>
                <span><van-icon name="good-job-o">赞</van-icon></span>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <van-button round type="info" @click="changeShow">评论</van-button>
      <van-popup v-model="show" position="bottom" :style="{ height: '18%' }"
        ><van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <div class="release" @click="commentFn">发布</div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getCommentReply, setCommentReply } from '@/api'
export default {
  data () {
    return {
      loading: false,
      finished: true,
      show: false,
      message: '',
      replylist: [],
      refreshing: false,
      commentNum: ''
    }
  },
  props: {
    list: []
  },
  methods: {
    timeGuoLv (info) {
      return dayjs(info.pubdate).fromNow()
    },
    onLoad () {
      console.log(1111111)
    },
    async commentFn () {
      const res = await setCommentReply(
        this.list[this.i].com_id,
        this.message,
        this.$route.params.id
      )
      console.log(res)

      this.getCommentReply()
      this.show = false
      this.$emit('change1')
    },
    changeShow () {
      this.show = true
    },
    async getCommentReply () {
      console.log(this.list)
      console.log(this.i)
      const res = await getCommentReply(this.list[this.i].com_id)
      this.replylist = res.data.data.results
      console.log(this.replylist.length)
      if (this.replylist.length < 10) {
        this.finished = true
      }
    },
    onClickLeft () {
      this.$emit('isShowPage')
    }
  },
  computed: {
    i () {
      return this.$store.state.idArray
    }
  },
  created () {
    this.getCommentReply()
  },
  watch: {
    i: {
      handler (val) {
        console.log(val)
        this.getCommentReply()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #ff69b4;
  :deep(.van-button) {
    width: 80% !important;
    height: 80% !important;
    margin-top: 13px;
    background-color: #fff;
    text-align: center;
    border: 0;
  }

  div {
    display: flex;
    align-items: center;
    :deep(.van-cell) {
      margin-left: 40px;
      width: 80%;
      background-color: #f5f7f9;
    }
    .release {
      font-size: 30px;
      width: 128px;
      text-align: center;
      margin-left: 45px;
      color: #74a8dd;
    }
  }
}
</style>
