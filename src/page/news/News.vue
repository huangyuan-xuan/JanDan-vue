<template>
  <div id="news"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10">
    <div class="news-item">
      <NewsItem v-for="(item,index) in news" :last-one="index===news.length-1" :news="item" :key="index"></NewsItem>
    </div>

  </div>
</template>

<script>


import NewsItem from "./NewsItem";
import {ElMessage} from 'element-plus'
import NewsService from '../../service/news'

export default {
  name: "News",
  components: {NewsItem},

  data() {
    return {
      pageNumber: 1,
      news: [],
      loading: false
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
        this.showError('请求出错')
      }
      this.loading = false
    },
    showError(messge) {
      ElMessage.error(messge)
    },
    loadMore() {
      this.loadNewsList(true)
    }
  }


}
</script>

<style>


</style>