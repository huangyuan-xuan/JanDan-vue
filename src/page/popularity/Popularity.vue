<template>
  <var-pull-refresh v-model="isRefresh" @refresh="refresh">
  <var-list
      loading-text="正在加载"
      finished-text="已经没有了"
      error-text="出错了"
      :finished="hasMore"
      :loading="loading"
      @load="loadMore">

    <var-cell  v-for="item in popularityList" class="popularity-item" :key="item.id">
      <PopularityItem :item="item"></PopularityItem>
    </var-cell>

  </var-list>
  </var-pull-refresh>

</template>

<script>
import PopularityService from '../../service/popularity'
import PopularityItem from "./PopularityItem";

export default {
  name: "Popularity",
  components: {PopularityItem},
  data() {
    return {
      startID: 0,
      popularityList: [],
      loading: false,
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
        result = await PopularityService.getPopularityWithStartId(this.startID)
        const tempPopularityList = result.data || [];
        this.popularityList.push(...tempPopularityList)
        this.startID = this.popularityList[this.popularityList.length - 1].id
      } else {
        result = await PopularityService.getPopularityDefault()
        this.popularityList = result.data
      }
      this.loading = false
      this.isRefresh = false
      this.hasMore = (this.popularityList < result.count_total)
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

<style scoped>

</style>