<template>
  <var-sticky :offset-top="0">
  <var-app-bar title="评论" color="#000000">
    <template #left>
      <var-button
          round
          text
          color="transparent"
          text-color="#ffffff"
          @click="goBack"
      >
        <var-icon name="chevron-left" :size="32"/>
      </var-button>
    </template>

  </var-app-bar>
  </var-sticky>
  <div class="container">


    <div class="hot-comment">热门评论</div>
    <CommentItem v-for="(item,index) in hotestCommentList" :key="item.id" :isFirstHotComment="index===0"
                 :commentItem="item"></CommentItem>
    <div class="lasted-comment">最新评论</div>
    <CommentItem v-for="(item,index) in lastedCommentList" :key="item.id" :isLastComment="index===0"
                 :commentItem="item"></CommentItem>

  </div>

</template>

<script>

import {useRouter, useRoute} from 'vue-router'
import {onMounted, ref} from "vue";

import NewsService from '../../service/news'
import CommentItem from "./CommentItem";

export default {
  name: "CommentList",
  components: {
    CommentItem
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const lastedCommentList = ref([])
    const hotestCommentList = ref([])
    const newsId = route.params.newsId
    console.log("加载CommentList")


    onMounted(async () => {
      console.log("onBeforeMount", newsId)
      const result = await NewsService.getNewsCommentList(newsId)
      console.log(result)
      lastedCommentList.value = result.post.comments.reverse()
      const tempHotCommentList = result.post.comments.filter(function (item) {
        return item.vote_positive > 0;
      });
      const compare = (item1, item2) => {
        if (item1.vote_positive > item2.vote_positive) {
          return -1;
        } else if (item1.vote_positive === item2.vote_positive) {
          return 0;
        } else {
          return 1
        }
      }
      hotestCommentList.value = tempHotCommentList.sort(compare)
    })

    const goBack = () => {
      router.back()
    }


    return {
      goBack,
      lastedCommentList,
      hotestCommentList,

    }
  }
}
</script>

<style scoped>
.hot-comment {
  color: orangered;
  font-size: 16px;
}

.lasted-comment {
  color: orangered;
  font-size: 16px;
}
.container{
  padding: 10px 10px;
}
</style>