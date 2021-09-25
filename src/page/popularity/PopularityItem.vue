<template>
  <div class="safe-area">
    <div class="var-elevation--3">
      <div>
        {{ item.content }}
      </div>

      <div class="footer-row">
        <div>OO{{ item.vote_positive }}</div>
        <div>XX{{ item.vote_negative }}</div>
        <div>吐槽{{ item.sub_comment_count }}</div>
        <div>...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularityItem",
  props: {
    item: Object
  },
  computed: {}
}
</script>

<style scoped>
.safe-area {

}
.var-elevation--3{
  padding: 10px;
  margin: 6px;
}

.footer-row {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>