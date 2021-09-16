<template>
<div id="popularity">
  <p v-for="item in data" class="popularity-item">
    <label>{{item.content}}</label>
  </p>

</div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";

export default {
  name: "Popularity",
  setup(){

    let data = ref([])
    onMounted(()=>{
      let url = "/jiandan/api/v1/comment/list/102312"
      axios.get(url)
      .then((response)=>{
        console.log("树洞列表：",response.data)
        data.value = response.data.data
      })
      .catch((error)=>{
        console.log(error)
      })
    })
    return {
      data
    }



  }
}
</script>

<style >
#popularity{
  width: 100%;
  height: 100%;

}
.popularity-item label {
  width: 100%;
  white-space: pre-wrap;
}
</style>