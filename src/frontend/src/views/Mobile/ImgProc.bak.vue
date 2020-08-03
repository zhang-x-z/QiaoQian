<template>
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
        <el-image :src="testImg" fit="scale-down"></el-image>
      </div>
    </el-main>
    <el-footer class="tabs">
      <!-- TODO:横向滚动 -->
      <el-tabs>
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
  import bianjiImg from 'img/bianji.svg';
  import secaiImg from 'img/secai.svg';
  import renxiangImg from 'img/renxiang.svg';
  import lvjingImg from 'img/lvjing.svg';
  import masaikeImg from 'img/masaike.svg';
  import tuyaImg from 'img/tuya.svg';
  import tiezhiImg from 'img/tiezhi.svg';
  import testImg from 'img/theme5.jpg';
  export default {
    name: "ImgProc",
    components: {
      NavBar,
      ProcessItem
    },
    data() {
      return {
        modules: [
          { name: '智能美化' },
          { name: '图片编辑' },
          { name: '色彩风格' },
          { name: '人像美化' },
          { name: '滤镜' },
          { name: '涂鸦笔' },
          { name: '马赛克' },
          { name: '贴纸' }
        ],
        currentModule: {},
        zhinengImg, bianjiImg, secaiImg, renxiangImg, lvjingImg, tuyaImg, masaikeImg, tiezhiImg,
        testImg
      };
    },
    mounted() {
      // 初始化的modules不能读取data的图片url，挂载以后读取
      this.modules[0].icon = this.zhinengImg;
      this.modules[1].icon = this.bianjiImg;
      this.modules[2].icon = this.secaiImg;
      this.modules[3].icon = this.renxiangImg;
      this.modules[4].icon = this.lvjingImg;
      this.modules[5].icon = this.tuyaImg;
      this.modules[6].icon = this.masaikeImg;
      this.modules[7].icon = this.tiezhiImg;
      this.currentModule = '图片美化';
    },
    methods: {
      back() {
        // 撤销图片效果
        this.$router.back();
        console.log('返回上级');
      },
      finish() {
        // 保存图片效果
        console.log('保存图片');
      },
      handleClick(name) {
        console.log('点击底部的 '+name);
        this.currentModule=name;
      }
    }
  }
</script>
<style lang="css" scoped>
  .el-header {
    padding: 0;
  }

  .el-main {
    min-height: calc(90vh - 120px)
  }

  .img-container {
    max-height: 100%;

    margin: 0;
  }

  .el-image {
    height: 70vh;
  }
</style>