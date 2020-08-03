<template>
  <div class="filter-proc">
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
      <div class="img-container" v-loading="fullScreenLoading" element-loading-text="处理中..."
        element-loading-background="rgba(0, 0, 0, 0.6)">
        <img :src="userImg" id="image" ref="image" />
      </div>
    </el-main>
    <el-footer class="tabs">
      <!-- <el-tabs tab-position="bottom" @tab-click="handleClick" v-model="currentModule"> -->
      <el-tabs tab-position="bottom" @tab-click="handleClick" v-model="滤镜">
        <template v-for="(item,index) in modules">
          <el-tab-pane :label="item">
            <div class="sub-modules">
              <template v-for="(subitem,subIndex) in subModules[index]">
                <div class="card-container" @click="handleSubClick" :id="subIndex">
                  <el-card :shadow="isShadow[index][subIndex]" :body-style="{ 
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
  // 原图
  import img0 from 'img/filter_image/img0.jpg'
  // 第一组
  import img1_0 from 'img/filter_image/褪色.jpg'
  import img1_1 from 'img/filter_image/去雾.jpg'
  import img1_2 from 'img/filter_image/蜡笔.jpg'
  import img1_3 from 'img/filter_image/怀旧.jpg'
  import img1_4 from 'img/filter_image/锐化.jpg';
  // 第二组
  import img2_0 from 'img/filter_image/像素风.jpg'
  import img2_1 from 'img/filter_image/调和浮雕.jpg'
  import img2_2 from 'img/filter_image/素描.jpg'
  import img2_3 from 'img/filter_image/中国剪纸.jpg'
  import img2_4 from 'img/filter_image/浮雕.jpg'
  // 第三组
  import style0 from 'img/filter_image/style0.jpg'
  import style1 from 'img/filter_image/style1.jpg'
  import style2 from 'img/filter_image/style2.jpg'
  import style3 from 'img/filter_image/style3.jpg'
  import style4 from 'img/filter_image/style4.jpg'
  import style5 from 'img/filter_image/style5.jpg'
  import style6 from 'img/filter_image/style6.jpg'
  import style7 from 'img/filter_image/style7.jpg'
  import style8 from 'img/filter_image/style8.jpg'
  //添加axios请求
  import axios from 'axios'
  import { baseurl } from '@/utils.js'
  //TODO: need to change
  axios.defaults.baseURL = baseurl()
  // 添加操作码映射
  const dict = { '褪色': 2, '去雾': 3, '蜡笔': 0, '怀旧': 5, '锐化': 9, '像素风': 1, '调和浮雕': 4, '素描': 6, '中国剪纸': 7, '浮雕': 8, '卡通画': 0, '铅笔画': 1, '彩色铅笔': 2, '彩糖油画': 3, '神奈川油画': 4, '薰衣草油画': 5, '奇异油画': 6, '呐喊油画': 7, '哥特油画': 8 }
  export default {
    name: "ColorProc",
    components: {
      NavBar,
    },
    data() {
      // TODO:卡片宽度增大、增加选中的阴影样式
      return {
        modules: ['朴素', '质感', '艺术'],
        subModules: [['褪色', '去雾', '蜡笔', '怀旧', '锐化'], ['像素风', '调和浮雕', '素描', '中国剪纸', '浮雕'], ['卡通画', '铅笔画', '彩色铅笔', '彩糖油画', '神奈川油画', '薰衣草油画', '奇异油画', '呐喊油画', '哥特油画']],
        // 保存效果图
        // TODO:锐化加到第一组里面
        subSamples: [[img1_0, img1_1, img1_2, img1_3, img1_4], [img2_0, img2_1, img2_2, img2_3, img2_4], [style0, style1, style2, style3, style4, style5, style6, style7, style8]],
        isShadow: [['never', 'never', 'never', 'never', 'never'], ['never', 'never', 'never', 'never', 'never'], ['never', 'never', 'never', 'never', 'never', 'never', 'never', 'never', 'never']],
        // 存储上一个选中的元素下标，用来清除阴影样式
        previousIndex: 0,
        currentModule: '',
        currentSubModule: '',
        userImg: '',
        savedImg: '',
        //全屏加载
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
          this.subSamples[i].unshift(img0)
          this.isShadow[i].unshift('never')
          // console.log('subModule', this.subModules[i])
        }
        this.userImg = this.$store.state.editedImg
        //保证不会在一个滤镜效果的基础上增加另一个滤镜
        this.savedImg = this.$store.state.editedImg
        this.currentModule = '朴素'
        // console.log(testImg)
      },
      //增加重置操作
      reset() {
        this.userImg = this.$store.state.editedImg
        this.savedImg = this.$store.state.editedImg
      },
      back() {
        // 直接返回上层
        this.$router.back()
        // console.log('取消操作')
      },
      finish() {
        //保存结果
        this.$store.commit('saveImg', this.userImg)
        // console.log('保存图片!!');
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
        // console.log('点击底部的 ' + tab.label)
        this.currentModule = tab.label
      },
      handleSubClick(e) {
        // console.log('subClick')
        // console.log(e.currentTarget.id);
        // let dom=document.getElementsByClassName('card-container')
        // dom[this.previousIndex].shadow='never';
        let index = this.modules.findIndex(value => value == this.currentModule)
        let subIndex = e.currentTarget.id
        // 清除前一个卡片的阴影效果
        this.isShadow[index][this.previousIndex] = 'never'
        this.previousIndex = subIndex
        // 当前卡片增加选中效果
        this.isShadow[index][subIndex] = 'always'
        this.currentSubModule = this.subModules[index][subIndex]
        // console.log('选择的滤镜是：', this.currentSubModule)
        //增加请求
        if (this.currentSubModule === '原图') {
          this.reset()
          // TODO:点击原图的样式bug如果请求成功不知道会不会自动修复
        } else if (this.currentSubModule === '锐化') {
          this.fullScreenLoading = true
          let form = new FormData()
          form.append('editedImg', this.savedImg)
          axios.post('imgProc/changeSharp/', form).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              this.userImg = res.data.img_proc_result
            } else if (error_code === 1008) {
              this.$message.error('出错啦，请稍后再试')
            }
            this.fullScreenLoading = false
          }).catch(err => {
            this.$message.error('出错啦，请检查您的网络连接')
            this.fullScreenLoading = false
          })
        } else if (this.subModules[2].includes(this.currentSubModule)) {
          this.fullScreenLoading = true
          let opt_code = dict[this.currentSubModule]
          let form = new FormData()
          form.append('style_num', opt_code)
          form.append('editedImg', this.savedImg)
          axios.post('imgProc/styleTransform/', form).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              this.userImg = res.data.img_proc_result
            } else if (error_code === 1008) {
              this.$message.error('出错啦，请稍后再试')
            }
            this.fullScreenLoading = false
          }).catch(err => {
            console.log(err)
            this.$message.error('出错啦，请检查您的网络连接')
            this.fullScreenLoading = false
          })
        } else {
          this.fullScreenLoading = true
          let opt_code = dict[this.currentSubModule]
          let form = new FormData()
          form.append('operation', opt_code)
          form.append('editedImg', this.savedImg)
          axios.post('imgProc/filter/', form).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              this.userImg = res.data.img_proc_result
            } else if (error_code === 1008) {
              this.$message.error('出错啦，请稍后再试')
            }
            this.fullScreenLoading = false
          }).catch(err => {
            console.log(err)
            this.$message.error('出错啦，请检查您的网络连接')
            this.fullScreenLoading = false
          })
        }
      },
    },
    activated() {
      this.userImg = this.$store.state.editedImg
      this.savedImg = this.$store.state.editedImg
      // console.log('激活init？')
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
    height: 65%;
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
    margin: 0 auto;
  }

  .el-footer {
    position: absolute;
    bottom: 96px;
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

  .sub-modules {
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
    flex-direction: row;
    height: 106px;
  }

  .card-img {
    max-width: 80%;
    max-height: 90%;
  }

  .el-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    width: 85px;
  }

  .el-card__body {
    width: 100%;
  }

  .el-card.is-always-shadow {
    box-shadow: 0 2px 5px 0 #409eff;
    border-color: rgba(64, 158, 255, 0.6);
  }

  .card-container {
    width: 86px;
    margin: 5px;
  }
</style>