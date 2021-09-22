<template>
  <var-card
      title="测试"
      :subtitle="item.content">
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
  name: "PopularityItem",
  props:{
    item:Object
  },
  computed:{
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