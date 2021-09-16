<template>

  <el-row :gutter="20">
    <el-col :span="16">
      <div>
        <label class="title">{{ newsObject.title }}</label>
      </div>
      <div class="sub-info">
        <div class="author"><div class="author-child">{{ newsObject.author.name }}</div></div>
        <div class="commont"> <div class="commont-child">{{ newsObject.comment_count }}评论</div></div>
        <div class="time"> <div class="time-child">{{ timeStr }}</div></div>
      </div>
    </el-col>
    <el-col :span="8">
      <el-image class="news-image" :src="newsObject.custom_fields.thumb_c[0]" ></el-image>
    </el-col>
  </el-row>
  <el-divider  v-show="!lastOne"></el-divider>


</template>

<script>
import {computed, reactive} from "vue";

export default {
  name: "NewsItem",
  props: {
    news: Object,
    lastOne:Boolean
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

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;

  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: large;
  color: #333333;
}

.author {
  flex:1;
  font-size: medium;
  color: #666666;
  position: relative;
}
.author-child{
  position: absolute;
  bottom: 8px;
  left: 0;
}

.commont {
  flex: 2;
  font-size: medium;
  color: #666666;
  margin-left: 10px;
  position: relative;
}
.commont-child{
  position: absolute;
  bottom: 8px;
  left: 0;

}


.time {
  flex: 3;
  font-size: medium;
  color: #666666;
  margin-left: 10px;
  position: relative;

}
.time-child{
  position: absolute;
  bottom: 8px;
  right: 16px;
}

.news-image {
  width: 160px;
  height: 90px;
  vertical-align: center;
  margin-top: 10px;
}

.sub-info {
  height: 100%;
  position: relative;
  display: flex;

}
</style>