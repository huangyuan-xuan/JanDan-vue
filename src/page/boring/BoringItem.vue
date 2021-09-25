<template>

  <div class="var-elevation--3">
    <div>
      {{getContent}}
    </div>
    <var-image class="news-img" :src="item.images[0].url" :error=logo  @click="showImagePreview" fit="contain" lazy/>


      <div class="footer-row">
        <div>OO[{{item.vote_positive}}]</div>
        <div>XX[{{item.vote_negative}}]</div>
        <div>吐槽[{{getCommentCount}}]</div>
        <div v-show="showMultiImageTag">多图</div>
        <div v-show="!showMultiImageTag"></div>
      </div>

  </div>
</template>

<script>
import logo from '../../assets/images/image_load_fail.svg'

export default {
  name: "BoringItem",
  props: {
    item: Object
  },
  data(){
    return {
      logo
    }
  },
  computed: {
    getContent: function () {
      return this.item.content.replaceAll("#img#", "")
    },
    getImages:function (){
      let images = [];
      this.item.images.forEach(function(image){
        images.push(image.url)
      })
      return images
    },
    getCommentCount:function(){
      console.log("boring comment count",this.item.sub_comment_count)
      if(this.item.sub_comment_count){
        return this.item.sub_comment_count

      }else{
        return 0
      }
    },
    showMultiImageTag:function (){
      return this.item.images.length>1
    }
  },
  methods:{
    showImagePreview(){
      this.$router.push({
        name:'previewImage',
        params: { imageList: this.getImages }
      })
    }

  }

}
</script>

<style scoped>
.var-elevation--3{
  padding: 10px;
  margin: 6px;
}
.footer-row{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>