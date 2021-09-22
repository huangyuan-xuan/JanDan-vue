<template>
  <div id="girls">
    <var-list
        loading-text="正在努力输出"
        finished-text="一滴都没有了"
        error-text="出错了出错了"
        :finished="hasMore"
        v-model:loading="loading"
        @load="loadMore">

      <var-cell v-for="item in girlsList" class="boring-item" :key="item.id">
        <GirlsItem :item="item"></GirlsItem>
      </var-cell>

    </var-list>


  </div>
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
      hasMore: true
    }
  },
  mounted() {
    this.loadGirlsPic(false)
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

    },
    loadMore() {
      this.loadPopularity(true)
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