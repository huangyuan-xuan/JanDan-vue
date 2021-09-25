<template>
  <var-image-preview
      closeable
      :images="previewImageList"
      v-model:show="showPreview"
      @close="handleCloseEvent"
  />
</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: "PreviewImageList",
  data() {
    return {
      showPreview: false,
      previewImageList: []
    }
  },
  mounted() {
    const route = useRoute()
    this.previewImageList = route.params.imageList
    this.showPreview = true
  },

  methods: {

    handleCloseEvent: function () {
      // const router = useRouter()
      this.$router.back()

    }
  }
}
</script>

<style scoped>

</style>