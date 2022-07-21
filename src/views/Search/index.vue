<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <component
      :is="componentName"
      :keywords="value"
      @changevals="changevalsFn"
      :searchResultVal="value"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './compontent/SearchHistory'
import SearchSuggestion from './compontent/SearchSuggestion'
import SearchResult from './compontent/SearchResult'
export default {
  data () {
    return {
      value: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    onSearch () {
      this.isShowSearchResult = true
    },
    visibleSearchSuggestion () {
      this.isShowSearchResult = false
    },
    changevalsFn (val) {
      this.value = val
      this.isShowSearchResult = true
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  computed: {
    componentName () {
      if (this.value.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style></style>
