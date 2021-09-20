<template>
  <router-view></router-view>

  <div>
    <div class="container">
      <News v-show="active==='news'"></News>
      <Popularity v-show="active==='popularity'"></Popularity>
      <Boring v-show="active==='boring'"></Boring>
      <Girls v-show="active==='girls'"></Girls>
    </div>
    <div class="bottom-nav">
      <div class="bottom-nav-item" @click="updateActive('news')">
        <img src="./assets/images/tab-item-icon/home_normal.svg" v-show="active!=='news'"/>
        <img src="./assets/images/tab-item-icon/home_checked.svg" v-show="active==='news'"/>
        <div>新鲜事</div>
      </div>
      <div class="bottom-nav-item" @click="updateActive('popularity')">
        <img src="./assets/images/tab-item-icon/course_normal.svg" v-show="active!=='popularity'"/>
        <img src="./assets/images/tab-item-icon/course_checked.svg" v-show="active==='popularity'"/>
        <div>树洞</div>
      </div>
      <div class="bottom-nav-item" @click="updateActive('boring')">
        <img src="./assets/images/tab-item-icon/friend_normal.svg" v-show="active!=='boring'"/>
        <img src="./assets/images/tab-item-icon/friend_checked.svg" v-show="active==='boring'"/>
        <div>无聊图</div>
      </div>
      <div class="bottom-nav-item" @click="updateActive('girls')">
        <img src="./assets/images/tab-item-icon/study_normal.svg" v-show="active!=='girls'"/>
        <img src="./assets/images/tab-item-icon/study_checked.svg" v-show="active==='girls'"/>
        <div>妹子图</div>
      </div>
    </div>

  </div>

</template>

<script>
// import TabBar from "./components/TabBar.vue";
// import TabBarItem from "./components/TabBarItem.vue";
import News from "./page/news/News";
import Boring from "./page/boring/Boring";
import Girls from "./page/girls/Girls";
import Popularity from "./page/popularity/Popularity";


export default {
  name: "App",
  components: {
    News,
    Boring,
    Girls,
    Popularity
  },
  data() {
    return {
      active: "news"
    }
  },
  methods: {
    updateActive(current) {
      this.active = current
    }
  }
}
</script>

<style>
@import "./assets/css/common.css";
.container{
  padding-bottom: 90px;
}

.bottom-nav {
  flex: 1;
  width: 100%;
  background: #aae6e6e6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #cccccc;
  z-index: 999;
  display: flex;

}

.bottom-nav-item {
  margin-top: 6px;
  margin-bottom: 6px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bottom-nav-item img {
  width: 16px;
  height: 16px;
}

</style>
