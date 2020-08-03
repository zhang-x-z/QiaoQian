<template>
  <div class="process-item" @click="itemClick">
    <div v-if="!isActive" class="item-icon">
      <slot name="icon"></slot>
    </div>
    <div v-else class="item-icon">
      <slot name="icon-active"></slot>
    </div>
    <div class="item-text">
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProcessItem",
    data() {
      return {
      };
    },
    props: {
      itemName: String, //按钮的名字
      isActive: Boolean,
    },
    methods: {
      itemClick() {
        // 向外部组件emit事件，由外部组件处理事件
        // console.log(this.itemName);
        let name = this.itemName;
        this.$emit('item-click', name);
      }
    }
  }
</script>
<style lang="css" scoped>
  .process-item {
    /* 纵向居中排列 */
    flex-direction: row;
    text-align: center;
    height: 50px;
    font-size: 10px;
    margin: 3px auto;
  }

  .process-item img {
    width: 28px;
    height: 28px;
    vertical-align: middle;
  }

  .item-icon {
    height: 23px;
  }
</style>