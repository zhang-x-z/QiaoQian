<template>
  <!--  -->
  <div class="img-proc">
    <el-header>
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-back" @click="back"></i>
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
        <!-- <el-image id="image" :src="userImg" fit="scale-down"></el-image> -->
        <img id="image" :src="userImg">
        <!-- <cropper-demo id="cropper-cpn" :imgUrl="testImg"></cropper-demo> -->
      </div>
    </el-main>
    <el-footer class="tabs">
      <!-- TODO:横向滚动 -->
      <el-tabs tab-position="bottom">
        <template v-for="item in modules">
          <el-tab-pane>
            <template v-slot:label>
              <process-item :itemName="item.name" @item-click="handleClick">
                <template v-slot:icon>
                  <img :src="item.icon">
                </template>
                <template v-slot:text>
                  <span>{{item.name}}</span>
                </template>
              </process-item>
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
  import zhinengImg from 'img/zhineng.svg';
  import Cropper from 'components/process/Cropper.vue';
  export default {
    name: "ImgProc",//
    components: {
      NavBar,
      ProcessItem,
    },
    data() {
      return {
        modules: [
          { name: '智能美化'},
        ],
        currentModule: '',
        userImg:'',
        initImg:''//备份一个初始图片副本
      };
    },
    mounted() {
      // 初始化的modules不能读取data的图片url，挂载以后读取
      this.modules[0].icon = this.zhinengImg;
      this.modules[1].icon = this.bianjiImg;
      this.currentModule = '图片美化';
      this.userImg=this.$store.state.editedImg;
      this.initImg=this.$store.state.editedImg;
    },
    methods: {
      back() {
        // 直接返回上层
        this.$router.back();
        console.log('取消操作');
      },
      finish() {
        // TODO：保存图片效果到store
        console.log('保存图片');
        this.$router.back();
      },
      handleClick(name) {
        // 之后优化为单页面富应用，现阶段直接切换页面
        this.currentModule = name;
        console.log('点击底部的 ' + name);
      }
    }
  }
</script>
<style lang="css" scoped>
  .img-proc{
    /* 默认值居然不是100%高度 */
    height: 100%;
  }
  .el-header {
    padding: 0;
  }

  .el-main {
    min-height: calc(90vh - 120px)
  }

  .img-container {
    height: 70vh;
    object-fit: scale-down;
    text-align: center;
  }

  .el-image {
    height: 70vh;
  }

  #image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-height: 100%;
    /* object-fit: scale-down; */
    margin:0 auto;
  }
  #cropper-cpn{
    max-height: 100%;
    object-fit: scale-down;
  }
  .el-footer{
    position: absolute;
    bottom: 0;
    max-width: 100%;
  }
</style>