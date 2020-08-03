<template>
  <div class="img-proc">
    <el-header>
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-back" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>图片美化</span>
        </template>
        <template v-slot:right>
          <i class="el-icon-check" @click="finish"></i>
        </template>
      </nav-bar>
    </el-header>
    <el-main v-loading="fullScreenLoading" element-loading-text="处理中..."
      element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="img-container">
        <img id="image" :src="userImg">
      </div>
    </el-main>
    <el-footer class="tabs">
      <el-tabs tab-position="bottom" class="modules">
        <template v-for="item in modules">
          <el-tab-pane>
            <template v-slot:label>
              <process-item :itemName="item.name" @item-click="handleClick" :isActive="item.isActive">
                <template v-slot:icon>
                  <img :src="item.icon">
                </template>
                <template v-slot:icon-active>
                  <img :src="item.iconActive">
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
  import zhinengActiveImg from 'img/zhineng-active.svg';
  import bianjiImg from 'img/bianji.svg';
  import bianjiActiveImg from 'img/bianji-active.svg';
  import secaiImg from 'img/secai.svg';
  import secaiActiveImg from 'img/secai-active.svg';
  import renxiangImg from 'img/renxiang.svg';
  import renxiangActiveImg from 'img/renxiang-active.svg';
  import lvjingImg from 'img/lvjing.svg';
  import lvjingActiveImg from 'img/lvjing-active.svg';
  import masaikeImg from 'img/masaike.svg';
  import masaikeActiveImg from 'img/masaike-active.svg';
  import tuyaImg from 'img/tuya.svg';
  import tuyaActiveImg from 'img/tuya-active.svg';
  import tiezhiImg from 'img/tiezhi.svg';
  //添加水印和换脸图标
  import waterMarkImg from 'img/watermark.svg'
  import waterMarkActiveImg from 'img/watermark-active.svg'
  import swapImg from 'img/swap.svg'
  import swapActiveImg from 'img/swap-active.svg'
  import testImg from 'img/theme4.jpg';
  import Cropper from 'components/process/Cropper.vue';
  import CropperDemo from 'components/process/CropperDemo.vue';

  // axios和后端进行交互
  import axios from 'axios'
  import { baseurl } from '@/utils.js'
  //TODO: need to change
  axios.defaults.baseURL = baseurl()

  export default {
    name: "ImgProc",
    components: {
      NavBar,
      ProcessItem,
    },
    data() {
      return {
        modules: [
          { name: '智能美化', pageName: 'AIProc', icon: zhinengImg, iconActive: zhinengActiveImg, isActive: false },
          { name: '图片编辑', pageName: 'editProc', icon: bianjiImg, iconActive: bianjiActiveImg, isActive: false },
          { name: '色彩风格', pageName: 'colorProc', icon: secaiImg, iconActive: secaiActiveImg, isActive: false },
          { name: '人像美化', pageName: 'faceProc', icon: renxiangImg, iconActive: renxiangActiveImg, isActive: false },
          { name: '滤镜', pageName: 'filterProc', icon: lvjingImg, iconActive: lvjingActiveImg, isActive: false },
          { name: '涂鸦笔', pageName: 'markProc', icon: tuyaImg, iconActive: tuyaActiveImg, isActive: false },
          { name: '马赛克', pageName: 'mosaicProc', icon: masaikeImg, iconActive: masaikeActiveImg, isActive: false },
          //增加水印换脸功能
          { name: '水印', pageName: 'waterMarkProc', icon: waterMarkImg, iconActive: waterMarkActiveImg, isActive: false },
          { name: '换脸', pageName: 'swapProc', icon: swapImg, iconActive: swapActiveImg, isActive: false },
        ],
        currentModule: '',
        previousIndex: 0,
        testImg,
        historyImg: [],
        //全屏加载
        fullScreenLoading: false
      };
    },
    computed: {
      userImg() {
        return this.$store.state.editedImg;
      }
    },
    mounted() {
      this.currentModule = '图片美化';
    },
    methods: {
      back() {
        // 直接返回首页
        this.$router.replace('home');
        // console.log('返回上级');
      },
      finish() {
        // TODO：保存图片效果,并下载图片
        // 下载图片
        let time = new Date()
        const element = document.createElement('a')
        element.href = this.userImg
        element.setAttribute('download', '巧倩美颜-' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + time.getMinutes() + time.getSeconds() + '.jpg')
        element.click()
        // console.log('保存图片');
        //感觉并不需要回到主界面
        //this.$router.replace('home');
      },
      handleClick(name) {
        // 之后优化为单页面富应用，现阶段直接切换页面
        // this.currentModule = name;
        // TODO:将当前图片放进历史图片栈
        // this.historyImg.push(this.userImg);
        let index = this.$store.state.findIndex(this.modules, name, 'name');
        this.modules[index].isActive = true;
        this.modules[this.previousIndex].isActive = false;
        this.previousIndex = index;
        //智能美化直接请求后端，不需要跳转，进行判断
        if (this.modules[index].name === '智能美化') {
          this.fullScreenLoading = true
          let form = new FormData()
          form.append('editedImg', this.userImg)
          axios.post('imgProc/face_makeup/', form).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              this.$store.commit('saveImg', res.data.img_proc_result)
            } else if (error_code === 1008) {
              this.$message.error('出错啦，请稍后再试')
            }
            this.fullScreenLoading = false
          }).catch(err => {
            this.$message.error('出错啦，请检查您的网络连接')
            this.fullScreenLoading = false
          })
        } else {
          this.$router.push(this.modules[index].pageName)
          // console.log('点击底部的 ' + name)
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  .img-proc {
    /* 默认值居然不是100%高度 */
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    height: 70%;
    display: flex;
    align-items: center;
    object-fit: scale-down;
  }

  .img-container {
    display: flex;
    align-items: center;
    height: 100%;
    object-fit: scale-down;
    margin: 0 auto;
  }

  #image {
    max-height: 100%;
    max-width: 100%;
    margin: 0 auto;
  }

  .el-footer {
    position: absolute;
    bottom: 5px;
    max-width: 100%;
  }

  .modules {
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
  }
</style>