<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style>

.tab-bar{
  width: 100%;
  background: #e6e6e6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #cccccc;
  z-index: 999;
  display: flex;
}


</style>