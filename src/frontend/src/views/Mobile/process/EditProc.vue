<template>
  <div class="edit-proc">
    <el-header>
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-close" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>{{currentModule}}</span>
        </template>
        <template v-slot:right>
          <i class="el-icon-check" @click="finish"></i>
        </template>
      </nav-bar>
    </el-header>
    <el-main>
      <div class="img-container">
        <my-cropper id="cropper-cpn" :width="containerWidth" :height="containerHeight" ref="cropper">
        </my-cropper>
      </div>
    </el-main>
    <el-footer class="tabs">
      <el-tabs tab-position="bottom" @tab-click="handleClick" v-model="currentModule">
        <template v-for="(item,index) in modules">
          <el-tab-pane :label="item.name" :name="item.name">
            <template>
              <el-radio-group class="sub-modules" v-model="currentSubModule" @change=handleSubClick>
                <template v-for="subitem in modules[index].subModules">
                  <el-radio-button :label="subitem" size="mini">{{subitem}}</el-radio-button>
                </template>
              </el-radio-group>
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-footer>
  </div>
</template>
<script>
  import NavBar from 'components/common/Mobile/NavBar.vue'
  import ProcessItem from 'components/process/ProcessItem.vue'
  import MyCropper from 'components/process/Cropper.vue';
  export default {
    name: "EditProc",
    components: {
      NavBar,
      ProcessItem,
      MyCropper
    },
    data() {
      return {
        modules: [
          { name: '剪裁', subModules: ['重置', '自由', '1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9'] },
          { name: '旋转', subModules: ['重置', '+30°', '-30°', '+45°', '-45°', '+90°', '-90°'] }
        ],
        currentModule: '剪裁',
        currentSubModule: '自由',
        subModules: [[-1, 0, 1, 2 / 3, 3 / 2, 3 / 4, 4 / 3, 9 / 16, 16 / 9], [-1, 30, -30, 45, -45, 90, -90]]
      };
    },
    computed: {
      containerWidth() {
        let container = document.getElementsByClassName('img-container');
        return window.getComputedStyle(container[0]).width;
      },
      containerHeight() {
        let container = document.getElementsByClassName('img-container');
        return window.getComputedStyle(container[0]).height;
      },
    },
    methods: {
      back() {
        // 直接返回上层
        this.$router.back();
        // console.log('取消操作');
      },
      finish() {
        // TODO：保存图片效果到store
        this.$refs.cropper.save();
        // console.log('保存图片成功');
        this.$router.back();
      },
      handleClick(tab) {
        // 响应父栏点击
        // 之后优化为单页面富应用，现阶段直接切换页面
        // console.log('点击底部的 ' + tab.label);
        this.$refs.cropper.destroy();
        // console.log(this.currentModule);
        if (this.currentModule == '剪裁') {
          this.$refs.cropper.init();
          // console.log(this.$refs.cropper.getCanvasData());
          this.currentSubModule = '自由';
        }
        else {
          this.$refs.cropper.initRotate();
        }
      },
      handleSubClick(label) {
        // console.log('currentSubModule:' + this.currentSubModule);
        if (this.currentModule == '剪裁') {
          // console.log(label);
          let index = this.modules[0].subModules.findIndex(value => value == label);
          // console.log('index:' + index);
          if (index == 0) { //重置
            this.$refs.cropper.reset();
            this.$refs.cropper.setAspectRatio(0);
            this.currentSubModule = '自由';
          }
          else {
            this.$refs.cropper.setAspectRatio(this.subModules[0][index]);
          }
        }
        else {
          let index = this.modules[1].subModules.findIndex(value => value == label);
          // console.log('index=' + index);
          if (index == 0) {
            this.$refs.cropper.reset();
          }
          else {
            this.$refs.cropper.rotate(this.subModules[1][index]);
          }
          this.currentSubModule = '';
        }

      }
    },
    beforeRouteLeave(to, from, next) {
      this.$refs.cropper.destroy();
      next()
    },
    activated() {
      this.$refs.cropper.init();

      this.currentModule = '剪裁';
      this.currentSubModule = '自由';
      // console.log('activated');
    },
  }
</script>
<style lang="css" scoped>
  .edit-proc {
    /* 默认值居然不是100%高度 */
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    height: 78%;
  }

  .img-container {
    display: flex;
    align-items: center;
    height: 100%;
    object-fit: scale-down;
    margin: 0 auto;
  }


  #image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-height: 100%;
    /* object-fit: scale-down; */
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }

  #cropper-cpn {
    max-height: 100%;
    object-fit: scale-down;
  }

  .el-footer {
    position: absolute;
    bottom: 21px;
    max-width: 100%;

  }

  .sub-modules {
    display: flex;
    overflow: hidden;
    overflow-x: scroll;

  }
</style>