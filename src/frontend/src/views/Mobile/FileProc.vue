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

    <!--添加一个弹框，显示OCR识别结果-->
    <el-dialog title="识别结果" :visible.sync="dialogVisiable" width="75%">
      <!-- <p>{{ocrResult}}</p> -->
      <p v-for="i in ocrResult.words_result_num" :key="i">{{ocrResult.words_result[i - 1].words}}</p>
    </el-dialog>

    <el-main v-loading="fullScreenLoading" element-loading-text="处理中..."
      element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="img-container">
        <el-image :src="userImg" fit="scale-down"></el-image>
      </div>
    </el-main>
    <el-footer class="tabs">
      <el-tabs>
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
  import ocrImg from 'img/ocr.svg';
  import ocrActiveImg from 'img/ocr-active.svg';
  import saomiaojianImg from 'img/saomiaojian.svg';
  import saomiaojianActiveImg from 'img/saomiaojian-active.svg';
  import txtImg from 'img/txt.svg';
  import txtActiveImg from 'img/txt-active.svg';
  import testImg from 'img/theme2.jpg';
  import axios from 'axios'
  import { baseurl } from '@/utils.js'
  //TODO: need to change
  axios.defaults.baseURL = baseurl()

  export default {
    name: "FileProc",
    components: {
      NavBar,
      ProcessItem
    },
    data() {
      return {
        modules: [
          { name: 'OCR', icon: ocrImg, iconActive: ocrActiveImg, isActive: false },
          { name: '扫描件', icon: saomiaojianImg, iconActive: saomiaojianActiveImg, isActive: false },
          { name: '保存txt', icon: txtImg, iconActive: txtActiveImg, isActive: false },
        ],
        currentModule: '文档处理',
        // 全屏加载
        fullScreenLoading: false,
        // 弹窗
        dialogVisiable: false,
        // 存储OCR结果
        ocrResult: '',
        previousIndex: 0
      };
    },
    computed: {
      userImg() {
        return this.$store.state.editedImg;
      }
    },
    activated() {
      this.init();
    },
    methods: {
      init() {
        this.currentModule = '文档处理';
      },
      back() {
        // 撤销图片效果
        this.$router.back();
        // console.log('返回上级');
      },
      finish() {
        // 保存图片效果
        // 下载功能
        let time = new Date()
        const element = document.createElement('a')
        element.href = this.$store.state.editedImg
        element.setAttribute('download', '扫描结果-' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + time.getMinutes() + time.getSeconds() + '.jpg')
        element.click()
        // console.log('保存图片');
      },
      handleClick(name) {
        // console.log('点击底部 ' + name);
        let index = this.$store.state.findIndex(this.modules, name, 'name');
        this.modules[index].isActive = true;
        this.modules[this.previousIndex].isActive = false;
        this.previousIndex = index;
        this.currentModule = name;
        // 向后端请求服务
        let form = new FormData()
        switch (name) {
          case 'OCR':
            this.fullScreenLoading = true
            form.append('editedImg', this.$store.state.editedImg)
            axios.post('imgProc/ocr-proc/', form).then(res => {
              let error_code = res.data.error_code
              if (error_code === 1008) {
                this.fullScreenLoading = false
                this.$message.error('识别失败，请稍后再试')
              } else if (error_code === 0) {
                this.ocrResult = res.data.ocr_result
                // console.log(this.ocrResult)
                this.fullScreenLoading = false
                this.$message.success('识别成功!')
                this.dialogVisiable = true
              }
            }).catch(err => {
              console.log(err)
              this.fullScreenLoading = false
              this.$message.error('识别失败，请检查您的网络连接')
            })
            break;
          case '扫描件':
            this.fullScreenLoading = true
            form.append('editedImg', this.$store.state.editedImg)
            axios.post('imgProc/picScanner/', form).then(res => {
              let error_code = res.data.error_code
              if (error_code === 0) {
                this.$store.commit('saveImg', res.data.img_proc_result)
                this.$message.success('处理成功！')
              } else if (error_code === 1008) {
                this.$message.error('处理失败，请稍后再试')
              }
              this.fullScreenLoading = false
            }).catch(err => {
              console.log(err)
              this.$message.error('处理失败，请检查您的网络连接')
              this.fullScreenLoading = false
            })
            break
          case '保存txt':
            let time = new Date()
            let res = ''
            for (let i = 0; i < this.ocrResult.words_result_num; i++) {
              res += (this.ocrResult.words_result[i].words + '\n')
            }
            const element = document.createElement('a')
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + res)
            element.setAttribute('download', '识别结果-' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + time.getMinutes() + time.getSeconds())
            element.click()
            break

          default:
            break;
        }
      }
    }
  }
</script>
<style lang="css" scoped>
  .file-proc {
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    height: 80%;
  }

  .img-container {
    height: 100%;
    width: 100%;

    margin: 0;
  }

  .el-image {
    height: 100%;
  }
</style>