<template>
  <var-list
      loading-text="正在努力输出"
      finished-text="一滴都没有了"
      error-text="出错了出错了"
      :finished="hasMore"
      v-model:loading="loading"
      @load="loadMore">

    <var-cell v-for="(item,index) in news" :key="index">
      <NewsItem :news="item" :key="index" :last-one="index===news.length-1"></NewsItem>
    </var-cell>

  </var-list>


</template>

<script>


import NewsItem from "./NewsItem";
import NewsService from '../../service/news'
export default {
  name: "News",
  components: {
    NewsItem
  },

  data() {
    return {
      pageNumber: 1,
      news: [],
      loading: false,
      hasMore:true,

    }
  },
  mounted() {
    this.loadNewsList(false)
  },

  methods: {
    async loadNewsList(isLoadMore) {

      this.loading = true
      if (isLoadMore) {
        this.pageNumber += 1;
      } else {
        this.pageNumber = 1;
      }
      const res = await NewsService.getNewsList(this.pageNumber)


      if (res.status === 'ok') {
        if (this.pageNumber === 1) {
          this.news = res.posts
        } else {
          const tempNews = res.posts || [];
          this.news.push(...tempNews)
        }
      } else {
       console.log("加载出错")
      }
      this.loading = false
    },
    loadMore() {
      this.loadNewsList(true)
    }
  }


}
</script>

<style>


</style>