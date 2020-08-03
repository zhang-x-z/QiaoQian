<template>
  <div class="swapview-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-back" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>换脸</span>
        </template>
        <template v-slot:right>
          <i class="el-icon-check" @click="finish"></i>
        </template>
      </nav-bar>
    </div>
    <div
      v-loading="fullScreenLoading"
      element-loading-text="处理中..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
    >
      <div class="content-wapper">
        <div v-if="!hasRes">
          <div class="image-one">
            <img :src="userImg" class="face" />
          </div>
          <div class="image-two">
            <img v-if="canProc" :src="otherImg" class="face" />
          </div>
        </div>
        <div v-else>
          <div class="image-result">
            <img :src="userImg" class="face" />
          </div>
        </div>
      </div>
    </div>
    <div class="buttons-wapper">
      <el-upload
        action="#"
        :limit="1"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :show-file-list="false"
        :file-list="files"
        class="upload"
      >
        <el-button plain slot="trigger" style="height:7vh;width:48vw;font-size:20px">上传图片</el-button>
      </el-upload>
      <el-button plain style="height:7vh;width:48vw;font-size:20px" @click="swap">开始转换</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/Mobile/NavBar'
import axios from 'axios'
import { baseurl } from '@/utils.js'
//TODO: need to change
axios.defaults.baseURL = baseurl()

export default {
  data () {
    return {
      userImg: '',
      otherImg: '',
      files: [],
      fullScreenLoading: false,
      canProc: false,
      hasRes: false
    }
  },
  mounted () {
    this.init()
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      this.userImg = this.$store.state.editedImg
      this.otherImg = ''
      this.canProc = false
      this.fullScreenLoading = false
      this.files = []
    },
    back () {
      this.$router.back()
    },
    finish () {
      this.$store.commit('saveImg', this.userImg)
      this.$router.back()
    },
    handleExceed () {
      this.$message.error('不能再上传啦')
    },
    handleChange (file, fileList) {
      if (this.hasRes) {
        this.hasRes = false
      }
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (event) => {
        let imgUrl = event.target.result
        this.otherImg = imgUrl
        this.canProc = true
        // console.log('in')
      }
    },
    swap () {
      if (this.canProc) {
        this.fullScreenLoading = true
        let form = new FormData()
        form.append('headImg', this.userImg)
        form.append('faceImg', this.otherImg)
        axios.post('imgProc/faceswap/', form).then(res => {
          let error_code = res.data.error_code
          if (error_code === 0) {
            this.userImg = res.data.img_proc_result
            this.canProc = false
            this.hasRes = true
            this.files = []
            this.otherImg = ''
          } else if (error_code === 1008) {
            this.$message.error('出错啦，请检查图片里面是否只有一张脸')
          }
          this.fullScreenLoading = false
        }).catch(err => {
          console.log(err)
          this.$message.error('出错啦，请检查您的网络连接')
          this.fullScreenLoading = false
        })
      } else {
        this.$message.error('请再上传一张照片')
      }
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.swapview-wapper {
  background-color: #eeeeee;
  position: relative;
  height: 100%;
  width: 100%;
}

.navbar-wapper {
  background-color: rgba(250, 251, 252, 224);
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 100;
  font-size: 22px;
}

.content-wapper {
  margin-top: 2vh;
  margin-bottom: 2vh;
  margin-left: 2vw;
  margin-right: 2vw;
  height: 81vh;
  width: 96vw;
  display: block;
}

.image-one {
  height: 39vh;
  width: 96vw;
  margin-bottom: 3vh;
}

.image-two {
  height: 39vh;
  width: 96vw;
}

.face {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  object-fit: scale-down;
}

.image-result {
  height: 81vh;
  width: 96vw;
}

.buttons-wapper {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1vh;
}
</style>