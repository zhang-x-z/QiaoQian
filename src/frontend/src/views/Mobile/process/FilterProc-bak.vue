<template>
  <div class="filter-proc" v-loading.fullscreen.lock="fullScreenLoading">
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
      <div class="img-container" v-loading="loading">
        <img :src="userImg" id="image" ref="image" />
      </div>
    </el-main>
    <el-footer class="tabs">
      <!-- <el-tabs tab-position="bottom" @tab-click="handleClick" v-model="currentModule"> -->
      <el-tabs tab-position="bottom" @tab-click="handleClick" v-model="currentModule">
        <template v-for="(item,index) in modules">
          <el-tab-pane :label="item">
            <div class="sub-modules">
              <template v-for="(subitem,subIndex) in subModules[index]">
                <div class="card-container" @click="handleSubClick" :id="subIndex">
                  <el-card shadow="never" :body-style="{ 
                  padding: '0',width:'100%', display:'flex',
                  'flex-direction': 'column',
                  'justify-content': 'center',
                  'align-items': 'center'}">
                    <span>{{subitem}}</span>
                    <img class="card-img" :src="subSamples[index][subIndex]" />
                  </el-card>
                </div>
              </template>
            </div>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-footer>
  </div>
</template>
<script>
  import NavBar from 'components/common/Mobile/NavBar.vue'
  import testImg from 'img/testImg.png'
  import axios from 'axios'
  import { baseurl } from '@/utils.js'
  //TODO: need to change
  axios.defaults.baseURL = baseurl()

  //XXX: add
  const dict = { '褪色': 2, '去雾': 3, '毛玻璃': 0, '怀旧': 5, '锐化': 9, '儿童蜡笔画': 1, '调和浮雕': 4, '素描': 6, '中国剪纸': 7, '浮雕': 8 }

  export default {
    name: "filterProc",
    components: {
      NavBar,
    },
    data() {
      // TODO:卡片宽度增大、增加选中的阴影样式
      return {
        modules: ['朴素', '质感'],
        subModules: [['褪色', '去雾', '毛玻璃', '怀旧', '锐化'], ['儿童蜡笔画', '调和浮雕', '素描', '中国剪纸', '浮雕']],
        // 保存效果图
        subSamples: [[testImg, testImg, testImg, testImg, testImg], [testImg, testImg, testImg, testImg, testImg]],
        // 存储上一个选中的元素下标，用来清除阴影样式
        previousIndex: 0,
        currentModule: '',
        currentSubModule: '',
        userImg: '',
        savedImg: '',
        loading: false,// 用于加载交互动画
        //XXX: add
        fullScreenLoading: false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        // 给每个滤镜分组都加上原图选项
        for (let i in this.subModules) {
          this.subModules[i].unshift('原图')
          this.subSamples[i].unshift(testImg)
          console.log('subModule', this.subModules[i])
        }
        this.userImg = this.$store.state.editedImg
        this.savedImg = this.$store.state.editedImg
        this.currentModule = '朴素'
        console.log(testImg)
      },
      //XXX: add
      reset() {
        this.userImg = this.$store.state.editedImg
        this.savedImg = this.$store.state.editedImg
      },
      back() {
        // 直接返回上层
        this.$router.back()
        console.log('取消操作')
      },
      finish() {
        //XXX: add
        this.$store.commit('saveImg', this.userImg)
        console.log('保存图片!!')
        // html2canvas(refImg,{
        //   allowTaint:true,
        //   width:width,
        //   height:height
        // }).then((canvas)=>{
        //   this.savedImg=canvas.toDataURL('image/jpeg');
        //   console.log('http2canvas 保存成功');
        //   this.$store.commit('saveImg',this.savedImg);
        //   console.log('savedImg:',this.savedImg);

        // })
        this.$router.back()
      },
      handleClick(tab) {
        console.log('点击底部的 ' + tab.label)
        this.currentModule = tab.label
      },
      handleSubClick(e) {
        console.log('subClick')
        console.log(e.currentTarget.id)
        let dom = document.getElementsByClassName('card-container')
        // 清除前一个卡片的阴影效果
        dom[this.previousIndex].shadow = 'never'
        let index = this.modules.findIndex(value => value == this.currentModule)
        let subIndex = e.currentTarget.id
        this.previousIndex = subIndex
        // 当前卡片增加选中效果
        console.log('dom[subIndex]', dom[subIndex].childNodes)
        dom[subIndex].childNodes[0].shadow = 'always'
        this.currentSubModule = this.subModules[index][subIndex]
        console.log('选择的滤镜是：', this.currentSubModule)
        //XXX: add
        if (this.currentSubModule === '原图') {
          this.reset()
        } else if (this.currentSubModule === '锐化') {

        } else {
          this.fullScreenLoading = true
          let opt_code = dict[this.currentSubModule]
          let form = new FormData()
          form.append('operation', opt_code);
          form.append('editedImg', this.savedImg);
          // 切出加载动画
          this.loading = true;
          axios.post('imgProc/filter/', form).then(res => {
            this.loading = false;
            let error_code = res.data.error_code
            if (error_code === 0) {
              this.userImg = res.data.img_proc_result
            } else if (error_code === 1008) {
              this.$message.error('出错啦，请稍后再试')
            }
            this.fullScreenLoading = false
          }).catch(err => {
            this.loading = false;
            console.log(err)
            this.$message.error('出错啦，请检查您的网络连接')
            this.fullScreenLoading = false
          })
        }
      },
    },
    activated() {
      this.userImg = this.$store.state.editedImg
      console.log('激活init？')
    }
  }
</script>
<style lang="css" scoped>
  .filter-proc {
    /* 默认值居然不是100%高度 */
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    height: calc(90vh - 80px);
    display: flex;
    align-items: center;
  }

  .img-container {
    display: flex;
    align-items: center;
    object-fit: scale-down;
    height: 100%;
    margin: 0 auto;
  }

  #image {
    max-height: 100%;
    max-width: 100%;
  }

  .el-footer {
    position: absolute;
    bottom: 65px;
    max-width: 100%;
  }

  .modules {
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
  }

  .sub-modules {
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
    flex-direction: row;
  }

  .card-img {
    max-width: 100%;
    max-height: 100%;
  }

  .el-card {
    margin: 0 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }

  .card-container {
    width: 60px;
  }
</style>