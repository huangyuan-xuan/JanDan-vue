<template>
<div id="girls">

    <div class="pic-item" v-for="(item , index) in picObj">

      <img :src="item.images[0].url">
    </div>




</div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
  name: "Girls",
  setup() {

    let content = ref("妹子图")
    let picObj = ref([])

    onMounted(()=>{
      let url = "/jiandan/api/v1/comment/list/108629"
      axios.get(url)
          .then((response)=>{
            console.log("妹子图列表：",response.data)
            content.value = response.data
            picObj.value  = response.data.data

          })
          .catch((error)=>{
            console.log(error)
          })
    })


    return {
      content,
      picObj
    }
  }
}
</script>

<style >
#girls{
  width: 100%;
  height: 100%;
}
</style>