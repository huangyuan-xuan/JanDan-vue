<template>
  <var-list
      loading-text="正在努力输出"
      finished-text="一滴都没有了"
      error-text="出错了出错了"
      :finished="hasMore"
      v-model:loading="loading"
      @load="loadMore">

    <var-cell  v-for="item in popularityList" class="popularity-item" :key="item.id">
      <PopularityItem :item="item"></PopularityItem>
    </var-cell>

  </var-list>


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
        result = await PopularityService.getPopularityWithStartId(this.startID)
        const tempPopularityList = result.data || [];
        this.popularityList.push(...tempPopularityList)
        this.startID = this.popularityList[this.popularityList.length - 1].id
      } else {
        result = await PopularityService.getPopularityDefault()
        this.popularityList = result.data
      }
      this.loading = false

    },
    loadMore() {
      this.loadPopularity(true)
    }
  }

}
</script>

<style scoped>

</style>