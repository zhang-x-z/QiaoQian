<template>
  <div class="face-proc">
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
    <el-main
      v-loading="fullScreenLoading"
      element-loading-text="处理中..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <div class="img-container">
        <img :src="userImg" id="image" ref="image" />
      </div>
    </el-main>
    <el-footer class="tabs">
      <el-tabs tab-position="bottom" @tab-click="handleClick" v-model="currentModule">
        <template v-for="item in modules">
          <el-tab-pane :label="item" :name="item">
            <template>
              <el-radio-group
                class="sub-modules"
                v-model="currentSubModule"
                @change="handleSubClick"
              >
                <div v-if="currentModule!=='瘦脸'">
                  <template v-for="subitem in subModules">
                    <el-radio-button :label="subitem" size="mini" :key="subitem">{{subitem}}</el-radio-button>
                  </template>
                </div>
                <div v-else>
                  <template>
                    <el-radio-button :label="'重置'" size="mini">重置</el-radio-button>
                  </template>
                </div>
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
import axios from 'axios'
import { baseurl } from '@/utils.js'
//TODO: need to change
axios.defaults.baseURL = baseurl()

export default {
  name: "FaceProc",
  components: {
    NavBar
  },
  data () {
    return {
      fullScreenLoading: false,
      modules: ['磨皮', '美白', '瘦脸'],
      subModules: ['重置', '1级', '2级', '3级', '4级', '5级'],
      currentModule: '瘦脸',
      currentSubModule: '',
      userImg: '',
      savedImg: '',
      // degreeList数组用来存degree参数，和上面的数组下标对应，-1代表重置
      degreeList: [[-1, 1, 2, 3, 4, 5], [-1, 5, 10, 15, 20, 25], [-1, 1, 2, 3, 4, 5]]
    }
  },
  mounted () {
    this.currentModule = '磨皮'
    this.reset()
  },
  methods: {
    back () {
      // 直接返回上层
      this.$router.back()
      // console.log('取消操作')
    },
    finish () {
      // TODO：保存图片效果到store
      this.$store.commit('saveImg', this.userImg)
      // console.log('保存图片成功')
      this.$router.back()
    },
    reset () {
      this.userImg = this.$store.state.editedImg
      this.savedImg = this.$store.state.editedImg
      this.currentSubModule = ''
    },
    handleClick (tab) {
      // 响应父栏点击,每次切换功能都需要重置美颜效果
      this.currentSubModule = ''
      this.savedImg = this.userImg
      // console.log('点击底部的 ' + tab.label)
      if (this.currentModule === '瘦脸') {
        this.fullScreenLoading = true
        let form = new FormData()
        form.append('editedImg', this.savedImg)
        axios.post('imgProc/face_thin/', form).then(res => {
          let error_code = res.data.error_code
          if (error_code === 0) {
            this.userImg = res.data.img_proc_result
            this.savedImg = this.userImg
          } else if (error_code === 1008) {
            this.$message.error('出错啦，没有检测到人脸')
          }
          this.fullScreenLoading = false
        }).catch(err => {
          console.log(err)
          this.$message.error('出错啦，请检查您的网络连接')
          this.fullScreenLoading = false
        })
      }
    },
    handleSubClick (label) {
      let index = this.subModules.findIndex(value => value == this.currentSubModule)
      if (index <= 0) { // 重置
        this.reset()
        // console.log('重置')
      }
      else {
        if (this.currentModule == '磨皮') {
          // TODO:调用后端接口
          this.fullScreenLoading = true
          let form = new FormData()
          form.append('buffer_degree', this.degreeList[0][index])
          form.append('editedImg', this.savedImg)
          axios.post('imgProc/beautify_buffering/', form).then(res => {
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
          // console.log('磨皮参数：', this.degreeList[0][index])
        }
        else if (this.currentModule == '美白') {
          // TODO:调用后端接口
          this.fullScreenLoading = true
          let form = new FormData()
          form.append('white_degree', this.degreeList[1][index])
          form.append('editedImg', this.savedImg)
          axios.post('imgProc/beautify_white/', form).then(res => {
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
          // console.log('美白参数：', this.degreeList[1][index])
        }
      }
    }
  },
  activated () {
    this.currentModule = '磨皮'
    this.reset()
    // console.log('activated')
  },
}
</script>
<style lang="css" scoped>
.face-proc {
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
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
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