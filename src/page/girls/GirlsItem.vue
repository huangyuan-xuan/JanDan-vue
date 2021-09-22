<template>
  <var-card
      :subtitle="getContent"
      :src="item.images[0].url">
    <template #extra>
      <div class="footer-row">
        <div>OO{{item.vote_positive}}</div>
        <div>XX{{item.vote_negative}}</div>
        <div>吐槽{{item.sub_comment_count}}</div>
        <div>...</div>
      </div>
    </template>
  </var-card>
</template>

<script>
export default {
  name: "GirlsItem",
  props: {
    item: Object
  },
  computed: {
    getContent: function () {
      return this.item.content.replaceAll("#img#", "")
    }
  }
}
</script>

<style scoped>
.footer-row{
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>