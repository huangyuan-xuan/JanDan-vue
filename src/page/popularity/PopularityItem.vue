<template>
  <div class="safe-area">
    <div class="var-elevation--3">
      <div>
        {{ item.content }}
      </div>

      <div class="footer-row">
        <div @click="votePositive">OO[{{ getVotePositive }}]</div>
        <div @click="voteNegative">XX[{{ getVoteNegative }}]</div>
        <div @click="showPopUp = true">吐槽[{{ getCommentCount }}]</div>
        <div></div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <var-dialog v-model:show="showPopUp" @confirm="onConfirm" @closed="onClosed">
      <input type="text" placeholder="昵称" v-model="commentName">
      <input type="email" placeholder="邮箱" v-model="commentEmail">
      <input type="text" placeholder="评论" v-model="commentContent">
    </var-dialog>
  </teleport>
  <teleport to="body">
    <var-snackbar v-model:show="showSnackbar" position="center" type="info">
      {{ snackbarContent }}
    </var-snackbar>
  </teleport>
</template>

<script>


import GirlsService from "../../service/girls";

export default {
  name: "PopularityItem",
  props: {
    item: Object
  },
  data() {
    return {
      votePos: false,
      voteNeg: false,
      hasComment: false,
      showPopUp: false,
      showSnackbar: false,
      snackbarContent: "",
      commentName: "",
      commentEmail: "",
      commentContent: ""
    }
  },
  computed: {
    getVotePositive: function () {
      if (this.votePos) {
        return this.item.vote_positive + 1
      } else {
        return this.item.vote_positive;
      }

    },
    getVoteNegative: function () {
      if (this.voteNeg) {
        return this.item.vote_negative + 1
      } else {
        return this.item.vote_negative;
      }
    },
    getCommentCount: function () {
      if (this.item.sub_comment_count) {
        if (this.hasComment) {
          return this.item.sub_comment_count
        }
        return this.item.sub_comment_count
      } else {
        return 0
      }
    },
  },
  methods:{
    async votePositive() {
      const voteResult = await GirlsService.votePositive(this.item.id)
      console.log(voteResult)
      if (voteResult && voteResult.error === 0) {
        this.votePos = true
        this.showSnackbarWithContent("赞成成功")
      } else {
        this.showSnackbarWithContent(voteResult.msg)
      }
    },
    async voteNegative() {
      const voteResult = await GirlsService.votePositive(this.item.id)
      console.log(voteResult)
      if (voteResult && voteResult.error === 0) {
        this.voteNeg = true
        this.showSnackbarWithContent("反对成功")
      } else {
        this.showSnackbarWithContent(voteResult.msg)
      }
    },
    async postComment(data) {

      const commentResult = await GirlsService.postComment(data)
      console.log("吐槽结果", commentResult)
      if (commentResult && commentResult.code === 0) {
        this.voteNeg = true
        this.showSnackbarWithContent("吐槽成功")
      } else {
        this.showSnackbarWithContent(commentResult.msg)
      }
    },
    onConfirm() {
      const data = {
        author: this.commentName,
        email: this.commentEmail,
        content: this.commentContent,
        comment_id: this.item.id,
        comment_post_ID: this.item.post_id
      }

      this.postComment(data)
    },
    onClosed() {
      this.commentContent = ""
    },
    showSnackbarWithContent(content) {
      if (content && content.length > 0) {
        this.snackbarContent = content
        this.showSnackbar = true
      }
    }
  }
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