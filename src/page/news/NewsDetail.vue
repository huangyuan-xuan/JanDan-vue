<template>
  <var-image :src="imgUrl" alt="顶部图片"></var-image>
  <var-divider :description="excerpt"/>
  <v-html>{{detail}}</v-html>
</template>

<script>
import {useRoute} from "vue-router";
import NewsService from '../../service/news'
export default {
  name: "NewsDetail",

  data() {
    return {
      imgUrl:"",
      excerpt:"",
      detailUrl:"",
      detail:""
    }
  },
  mounted() {
    const route = useRoute()
    this.imgUrl = route.params.imgUrl
    this.excerpt = route.params.excerpt
    this.detailUrl = route.params.detailUrl
    console.log(this.imgUrl,this.excerpt,this.detailUrl)
    this.getNewsDetail()
  },
  methods:{
    async getNewsDetail(){
      const result = await NewsService.getNewsDetail(this.detail)
      this.detail = result
      console.log(result)
    }
  }
}
</script>

<style scoped>

</style>