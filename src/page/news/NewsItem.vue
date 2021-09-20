<template>
  <div class="safe-area">
    <div class="news">
      <div class="main">

        <div class="title">
          {{ newsObject.title }}
        </div>

        <div class="bottom-row">
          <div class="author">{{ newsObject.author.name }}</div>

          <div class="comments-number">{{ newsObject.comment_count }}评论</div>

          <div class="post-time">
            {{ timeStr }}
          </div>
        </div>
      </div>
      <div class="image">
        <el-image class="news-img" :src="newsObject.custom_fields.thumb_c[0]" lazy> <template #error><img src="../../assets/images/image_load_fail.svg"></template></el-image>
      </div>
    </div>
  <div class="divider" v-show="!lastOne"></div>
  </div>

</template>

<script>
import {computed, reactive} from "vue";

export default {
  name: "NewsItem",
  props: {
    news: Object,
    lastOne: Boolean
  },
  setup(props) {


    const newsObject = reactive(props.news)
    const timeStr = computed(() => {
      let strTime = newsObject.date
      let date = new Date(strTime.replace(/-/g, '/'));
      let postTimeStamp = date.getTime();
      let currentTime = new Date().getTime();
      let diff = currentTime - postTimeStamp;
      let result = "";

      if (diff < 1000 * 60 * 10) {
        //10分钟之内为刚刚
        result = "刚刚"
      } else if (diff < 1000 * 60 * 60) {
        //1小时之内展示x分钟前
        result = Math.floor(diff / 1000 / 60) + "分钟前"
      } else if (diff < 1000 * 60 * 60 * 24) {
        //24小时之内展示x小时前
        result = Math.floor(diff / 1000 / 60 / 60) + "小时前"
      } else if (diff < 1000 * 60 * 60 * 24 / 7) {
        //3天之内展示x天前
        result = Math.floor(diff / 1000 / 60 / 60 / 24) + "天前"
      } else {
        //展示x月x号
        result = date.getMonth() + "月" + date.getDay() + "日"
      }
      return result

    })


    return {
      newsObject,
      timeStr
    }
  }
}
</script>

<style scoped>
.safe-area {
  display: flex;
  flex-direction: column;
}

.news {
  display: flex;
  justify-content: space-between;
  background: #fff;
}

.news-img {
  width: 120px;
  height: 90px;
}
.news-img img{
  width: 120px;
  height: 90px;
}

.title {

  font-size: 16px;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #333333;

}

.author {
  font-size: 14px;
  line-height: 15px;
  align-self: baseline;
}

.comments-number {
  display: inline-block;
  padding-right: 5px;
  font-size: 14px;
}

.post-time {
  align-self: baseline;
  max-width: 50%;
  font-size: 14px;
  padding-right: 5px;
}

.bottom-row {
  display: flex;
  justify-content: space-between;
}

.main {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  padding: 2px 0;
}
.divider{
  height: 1px;
  background: #999999;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>