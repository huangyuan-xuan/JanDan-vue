<template>
<el-card>
  <label>{{getContent}}</label>
  <el-image class="news-img" :src="item.images[0].url" lazy> <template #error><img src="../../assets/images/image_load_fail.svg"></template></el-image>

</el-card>
</template>

<script>


export default {
  name: "BoringItem",
  props:{
    item:Object
  },
  computed:{
      getContent:function (){
        return this.item.content.replaceAll("#img#","")
      }
  }

}
</script>

<style scoped>

</style>