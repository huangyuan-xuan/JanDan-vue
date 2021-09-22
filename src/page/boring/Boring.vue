<template>
  <var-list
      loading-text="正在努力输出"
      finished-text="一滴都没有了"
      error-text="出错了出错了"
      :finished="hasMore"
      v-model:loading="loading"
      @load="loadMore">
    <var-cell v-for="item in boringList" class="boring-item" :key="item.id">
      <BoringItem :item="item"></BoringItem>
    </var-cell>
  </var-list>

</template>

<script>

import BoringItem from "./BoringItem";
import BoringService from '../../service/boring'

export default {
  name: "Boring",
  components: {BoringItem},
  data() {
    return {
      boringList: [],
      loading: false,
      startID: 0,
      hasMore: true
    }
  },
  mounted() {
    this.loadPopularity(false)
  },
  methods: {
    async loadPopularity(isLoadMore) {

      this.loading = true
      let result = []
      if (isLoadMore) {
        result = await BoringService.getBoringWithStartId(this.startID)
        const tempPopularityList = result.data || [];
        this.boringList.push(...tempPopularityList)
        this.startID = this.boringList[this.boringList.length - 1].id
        console.log("加载更多",result.data)
      } else {
        result = await BoringService.getBoringDefault()
        this.boringList = result.data
        console.log("初始加载",result.data)
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
.boring-item img {
  width: 100%;
}
</style>