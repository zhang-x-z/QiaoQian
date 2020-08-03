<template>
  <div class="home-item" @click="itemClick">
    <div class="item-icon">
      <slot name="icon"></slot>
    </div>
    <div class="item-text">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "HomeItem",
    data() {
      return {
      };
    },
    props: {
      itemName: String //按钮的名字
    },
    methods: {
      itemClick() {
        // 向home组件emit事件，由home组件处理事件
        // console.log(this.itemName);
        let name=this.itemName
        this.$emit('item-click',name);
      }
    }
  }
</script>
<style lang="css" scoped>
  .home-item {
    /* 纵向居中排列 */
    flex-direction: row;
    text-align: center;
    height: 90px;
  }

  .home-item img {
    width: 100%;
    height: 70px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>