<template>
  <div class="tab-bar-item" @click="clickTabItem">
    <div v-if="!isSelected" >
      <slot  name="item-icon"></slot>
    </div>
   <div v-else>

     <slot  name="item-icon-selected"></slot>
   </div>
    <div :class="{selected: isSelected}">

      <slot name="item-title"></slot>
    </div>

  </div>
</template>

<script>
import {useRouter,useRoute} from 'vue-router'
import {computed} from "vue";

export default {
  name: "TabBarItem",
  props:{
    path:String
  },
  setup(props) {
    const router = useRouter();


    const clickTabItem = () => {

      router.replace(props.path)
    }
    const route = useRoute();
    const isSelected = computed(()=>{
      return route.path.includes(props.path)
    })



    return {
      clickTabItem,
      isSelected
    }
  }
}
</script>

<style>
.tab-bar-item {
  margin-top: 6px;
  margin-bottom: 6px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tab-bar-item img {
  width: 16px;
  height: 16px;
}
.selected{
  color: #1b91e0;
}

</style>