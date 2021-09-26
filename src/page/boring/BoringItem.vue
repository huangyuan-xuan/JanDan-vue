<template>

  <div class="var-elevation--3">
    <div>
      {{ getContent }}
    </div>
    <var-image class="news-img" :src="item.images[0].url" :error=logo @click="showImagePreview" fit="contain" lazy/>
    <div class="footer-row">
      <div @click="votePositive">OO[{{ getVotePositive }}]</div>
      <div @click="voteNegative">XX[{{ getVoteNegative }}]</div>
      <div @click="showPopUp = true">吐槽[{{ getCommentCount }}]</div>
      <div v-show="showMultiImageTag">多图</div>
      <div v-show="!showMultiImageTag"></div>
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
    <var-snackbar v-model:show="showSnackbar" position="bottom">
      {{ snackbarContent }}
    </var-snackbar>
  </teleport>
</template>

<script>
import logo from '../../assets/images/image_load_fail.svg'
import BoringService from '../../service/boring'

export default {
  name: "BoringItem",
  props: {
    item: Object
  },
  data() {
    return {
      logo,
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
    getContent: function () {
      return this.item.content.replaceAll("#img#", "")
    },
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

    getImages: function () {
      let images = [];
      this.item.images.forEach(function (image) {
        images.push(image.url)
      })
      return images
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
    showMultiImageTag: function () {
      return this.item.images.length > 1
    }
  },
  methods: {
    showImagePreview() {
      this.$router.push({
        name: 'previewImage',
        params: {imageList: this.getImages}
      })
    },
    async votePositive() {
      const voteResult = await BoringService.votePositive(this.item.id)
      console.log(voteResult)
      if (voteResult && voteResult.error === 0) {
        this.votePos = true
        this.showSnackbarWithContent( "赞成成功")
      } else {
        this.showSnackbarWithContent( voteResult.msg)
      }
    },
    async voteNegative() {
      const voteResult = await BoringService.votePositive(this.item.id)
      console.log(voteResult)
      if (voteResult && voteResult.error === 0) {
        this.voteNeg = true
        this.showSnackbarWithContent( "反对成功")
      } else {
        this.showSnackbarWithContent( voteResult.msg)
      }
    },
    async postComment(data) {

      const commentResult = await BoringService.postComment(data)
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
.var-elevation--3 {
  padding: 10px;
  margin: 6px;
}

.footer-row {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>