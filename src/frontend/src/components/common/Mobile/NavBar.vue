<template>
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar {
  display: flex;
  height: 7vh;
  line-height: 7vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
}

.left,
.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>