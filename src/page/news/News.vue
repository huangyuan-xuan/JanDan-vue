<template>
  <div id="news">
    <div class="news-item">
      <NewsItem v-for="(item,index) in news"  :last-one="index===news.length-1" :news="item" :key="index"></NewsItem>
    </div>

  </div>
</template>

<script>

import axios from "axios";
import {onMounted} from "vue";
import {ref} from "vue";
import NewsItem from "./NewsItem";

export default {
  name: "News",
  components: {NewsItem},
  setup() {

    let news = ref([])

    onMounted(() => {
      console.log("news onMounted")

      let url = "/news_api/?oxwlxojflwblxbsapi=get_recent_posts&include=url,date,tags,author,title,excerpt,comment_count,comment_status,custom_fields&custom_fields=thumb_c,views&dev=1"
      axios.get(url)
          .then((response) => {
            console.log("新鲜事列表：",response.data)
            news.value = response.data.posts
          })
          .catch((error) => {
            console.log(error)
          })

    })
    return {
      news,
      NewsItem
    }


  }


}
</script>

<style>
#news {
  width: 100%;
  height: 100%;
}

.pic-item img {
  width: 100%;
}

</style>