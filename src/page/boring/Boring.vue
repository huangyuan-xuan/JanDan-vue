<template>
  <var-pull-refresh v-model="isRefresh" @refresh="refresh">
  <var-list
      loading-text="正在加载"
      finished-text="已经没有了"
      error-text="出错了"
      :finished="hasMore"
      :loading="loading"
      @load="loadMore">
    <var-cell v-for="item in boringList" class="boring-item" :key="item.id">
      <BoringItem :item="item"></BoringItem>
    </var-cell>
  </var-list>
  </var-pull-refresh>

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
      hasMore: true,
      isRefresh:false
    }
  },
  mounted() {
    this.refresh()
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
      this.isRefresh = false
      this.hasMore = (this.boringList < result.count_total)

    },
    loadMore() {
      this.loadPopularity(true)
    },
    refresh(){
      this.loadPopularity(false)
    }
  }
}
</script>

<style>
.boring-item img {
  width: 100%;
}
</style>