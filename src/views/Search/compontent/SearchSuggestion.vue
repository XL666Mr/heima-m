<template>
  <div>
    <van-cell
      :title="item"
      v-for="(item, index) in highlightData"
      :key="index"
      @click="changeval(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  data () {
    return {
      list: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion () {
      const res = await getSearchSuggestion(this.keywords)
      this.list = res.data.data.options.filter(Boolean)
      console.log(this.list)
    },
    changeval (index) {
      console.log(this.list[index])
      this.$store.commit('sethistoryItem', this.list[index])
      this.$emit('changevals', this.list[index])
    }
  },
  computed: {
    highlightData () {
      // 将搜索建议每一项处理
      const reg = new RegExp(this.keywords, 'ig')
      return this.list.map((str) =>
        str.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
