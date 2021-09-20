<template>
  <div id="boring"
       v-infinite-scroll="loadMore"
       class="popularity"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="10">

    <p v-for="item in boringList" class="boring-item" :key="item.id">
      <BoringItem :item="item"></BoringItem>
    </p>

  </div>
</template>

<script>

import BoringItem from "./BoringItem";
import BoringService from '../../service/boring'
export default {
  name: "Boring",
  components:{BoringItem},
  data(){
    return {
      boringList:[],
      loading:false,
      startID:0
    }
  },
  mounted() {
  },
  methods:{
    async loadPopularity(isLoadMore) {

      this.loading = true
      let result = []
      if (isLoadMore) {
        result = await BoringService.getBoringWithStartId(this.startID)
        const tempPopularityList = result.data || [];
        this.boringList.push(...tempPopularityList)
        this.startID = this.boringList[this.boringList.length - 1].id
      } else {
        result = await BoringService.getBoringDefault()
        this.boringList = result.data
      }
      this.loading = false

    },
    loadMore() {
      this.loadPopularity(true)
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