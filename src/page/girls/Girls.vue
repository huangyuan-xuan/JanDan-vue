<template>
  <var-pull-refresh v-model="isRefresh" @refresh="refresh">
    <var-list
        loading-text="正在加载"
        finished-text="已经没有了"
        error-text="出错了"
        :finished="hasMore"
        :loading="loading"
        @load="loadMore">
      <var-cell v-for="item in girlsList" class="boring-item" :key="item.id">
        <GirlsItem :item="item"></GirlsItem>
      </var-cell>

    </var-list>
</var-pull-refresh>
</template>

<script>

import GirlsItem from "./GirlsItem";
import GirlsService from "../../service/girls"

export default {
  name: "Girls",
  components: {
    GirlsItem
  },
  data() {
    return {
      girlsList: [],
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
    async loadGirlsPic(isLoadMore) {

      this.loading = true
      let result = []
      if (isLoadMore) {
        result = await GirlsService.getGirlsWithStartId(this.startID)
        const tempGirlsList = result.data || [];
        this.girlsList.push(...tempGirlsList)
        this.startID = this.girlsList[this.girlsList.length - 1].id
      } else {
        result = await GirlsService.getGirlsDefault()
        this.girlsList = result.data
      }
      this.loading = false
      this.isRefresh = false
      this.hasMore = (this.girlsList < result.count_total)

    },
    loadMore() {
      this.loadGirlsPic(true)
    },
    refresh(){
      this.loadGirlsPic(false)
    }
  }

}
</script>

<style>
#girls {
  width: 100%;
  height: 100%;
}
</style>