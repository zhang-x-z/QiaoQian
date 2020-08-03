<template>
  <div class="img-proc" v-loading.fullscreen.lock="fullScreenLoading">
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
    <el-main>
      <div class="img-container">
        <img id="image" :src="userImg" />
      </div>
    </el-main>
    <el-footer class="tabs">
      <el-tabs tab-position="bottom" class="modules">
        <template v-for="item in modules">
          <el-tab-pane>
            <template v-slot:label>
              <process-item :itemName="item.name" @item-click="handleClick">
                <template v-slot:icon>
                  <img :src="item.icon" />
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
import zhinengImg from 'img/zhineng.svg'
import bianjiImg from 'img/bianji.svg'
import secaiImg from 'img/secai.svg'
import renxiangImg from 'img/renxiang.svg'
import lvjingImg from 'img/lvjing.svg'
import markImg from 'img/watermark.svg'
import swapImg from 'img/swap.svg'
import tiezhiImg from 'img/tiezhi.svg'
import testImg from 'img/theme4.jpg'
import Cropper from 'components/process/Cropper.vue'
import CropperDemo from 'components/process/CropperDemo.vue'
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
  data () {
    return {
      modules: [
        { name: '智能美化', pageName: 'AIProc' },
        { name: '图片编辑', pageName: 'editProc' },
        { name: '色彩风格', pageName: 'colorProc' },
        { name: '人像美化', pageName: 'faceProc' },
        { name: '滤镜', pageName: 'filterProc' },
        { name: '换脸', pageName: 'swapProc' },
        { name: '水印', pageName: 'markProc' },
        { name: '贴纸', pageName: 'stickerProc' }
      ],
      currentModule: '',
      zhinengImg, bianjiImg, secaiImg, renxiangImg, lvjingImg, swapImg, markImg, tiezhiImg,
      testImg,
      historyImg: [],
      fullScreenLoading: false
    }
  },
  computed: {
    userImg () {
      return this.$store.state.editedImg
    }
  },
  mounted () {
    // 初始化的modules不能读取data的图片url，挂载以后读取
    this.modules[0].icon = this.zhinengImg
    this.modules[1].icon = this.bianjiImg
    this.modules[2].icon = this.secaiImg
    this.modules[3].icon = this.renxiangImg
    this.modules[4].icon = this.lvjingImg
    this.modules[5].icon = this.swapImg
    this.modules[6].icon = this.markImg
    this.modules[7].icon = this.tiezhiImg
    this.currentModule = '图片美化'
  },
  methods: {
    back () {
      // 直接返回首页
      this.$router.replace('home')
      console.log('返回上级')
    },
    finish () {
      // TODO：保存图片效果,并下载图片
      let time = new Date()
      const element = document.createElement('a')
      element.href = this.userImg
      element.setAttribute('download', '巧倩美颜-' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + time.getMinutes() + time.getSeconds() + '.jpg')
      element.click()
      console.log('保存图片')
    },
    handleClick (name) {
      // 之后优化为单页面富应用，现阶段直接切换页面
      // this.currentModule = name;
      // TODO:将当前图片放进历史图片栈
      // this.historyImg.push(this.userImg);
      let index = this.$store.state.findIndex(this.modules, name, 'name')
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
        console.log('点击底部的 ' + name)
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
  height: calc(90vh - 60px);
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
  bottom: 1px;
  max-width: 100%;
}

.modules {
  display: flex;
  overflow: hidden;
  overflow-x: scroll;
}
</style>