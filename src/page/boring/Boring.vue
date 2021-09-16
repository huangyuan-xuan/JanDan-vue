<template>
  <div id="boring">
    <p v-for="item in boringPicObj" class="boring-item">
      <img  :src="item.images[0].url">
    </p>

  </div>
</template>

<script>

import {onMounted, ref} from "vue"
import axios from "axios";

export default {
  name: "Boring",
  setup() {
    let boringPicObj = ref([])

    onMounted(() => {
      let url = "/jiandan/api/v1/comment/list/26402"
      axios.get(url)
          .then((response) => {
            console.log("无聊图列表：",response.data)
            boringPicObj.value = response.data.data
          })
          .catch((error) => {
            console.log(error);
          })
    })

    return {
      boringPicObj
    }
  }
}
</script>

<style>
#boring {
  width: 100%;
  height: 100%;

}

.boring-item img {
  width: 100%;
}
</style>