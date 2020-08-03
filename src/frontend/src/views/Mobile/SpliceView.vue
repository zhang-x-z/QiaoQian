<template>
  <div class="spliceview-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-back" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>全景拼接</span>
        </template>
        <template v-slot:right>
          <i class="el-icon-check" @click="finish"></i>
        </template>
      </nav-bar>
    </div>
    <div v-loading="fullScreenLoading" element-loading-text="处理中..." element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="result-wapper">
        <el-image v-if="hasRes" style="width:96vw;height:60vh;" fit="scale-down" :src="res_url"></el-image>
      </div>
    </div>
    <div class="scroll-wapper" ref="scroll">
      <div class="scroll-content">
        <el-image
          @load="handleLoad"
          @error="handleError"
          v-for="(item, i) in imgs"
          :key="i"
          fit="cover"
          style="height:15vh;width:15vh;margin-left:2vw;margin-right:2vw;margin-top:2vh;"
          :src="item"
        ></el-image>
      </div>
    </div>
    <div class="buttons-wapper">
      <el-upload
        action="#"
        :limit="10"
        :on-change="handleChange"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :show-file-list="false"
        class="upload"
      >
        <el-button plain slot="trigger" style="height:7vh;width:48vw;font-size:20px">上传图片</el-button>
      </el-upload>
      <el-button plain style="height:7vh;width:48vw;font-size:20px" @click="splice">开始转换</el-button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/Mobile/NavBar'
import BScroll from 'better-scroll'
import axios from 'axios'
import { baseurl } from '@/utils.js'
//TODO: need to change
axios.defaults.baseURL = baseurl()
const option = {
  scrollX: true,
  scrollY: false
}

export default {
  data () {
    return {
      imgs: [],
      fullScreenLoading: false,
      hasRes: false,
      res_url: ''
    }
  },
  computed: {
    imgs_num () {
      return this.imgs.length
    }
  },
  components: {
    NavBar
  },
  mounted () {
    setTimeout(() => {
      this.bs = new BScroll(this.$refs.scroll, option)
    }, 20)
  },
  activated () {
    this.imgs.splice(0, this.imgs.length)
    if (this.bs) {
      setTimeout(() => {
        this.bs.refresh()
      }, 20)
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    finish () {
      if (this.hasRes) {
        let time = new Date()
        const element = document.createElement('a')
        element.href = this.res_url
        element.setAttribute('download', '处理结果-' + time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + time.getMinutes() + time.getSeconds())
        element.click()
        // console.log('保存图片')
      } else {
        this.$message.error('您还没有进行处理哦')
      }
    },
    handleExceed () {
      this.$message.error('最多选择十个文件哦')
    },
    handleLoad () {
      setTimeout(() => {
        this.bs.refresh()
      }, 20)
    },
    handleError () {
      this.$message.error('上传失败!')
      setTimeout(() => {
        this.bs.refresh()
      }, 20)
    },
    handleChange (file, fileList) {
      let reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (event) => {
        let imgUrl = event.target.result
        this.imgs.push(imgUrl)
      }
    },
    splice () {
      if (this.imgs_num >= 2) {
        this.fullScreenLoading = true
        axios({
          url: 'imgProc/stitch/',
          method: 'post',
          data: JSON.stringify({
            img_num: this.imgs_num,
            editedImg: this.imgs
          })
        }).then(res => {
          let error_code = res.data.error_code
          if (error_code === 1008) {
            this.$message.error('处理失败，请稍后再试')
          } else if (error_code === 0) {
            this.res_url = res.data.img_proc_result
            this.hasRes = true
            this.imgs.splice(0, this.imgs.length)
            setTimeout(() => {
              this.bs.refresh()
            }, 20)
            this.$message.success('处理成功!')
          }
          this.fullScreenLoading = false
        }).catch(err => {
          this.$message.error('出错了，请检查您的网络连接')
          this.fullScreenLoading = false
        })
      } else {
        this.$message.error('请至少选择两张图片!')
      }
    }
  }
}
</script>

<style scoped>
.spliceview-wapper {
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

.result-wapper {
  height: 60vh;
  margin-top: 3vh;
  margin-bottom: 4vh;
  margin-left: 2vw;
  margin-right: 2vw;
}

.scroll-wapper {
  background-color: rgba(250, 251, 252, 224);
  height: 18vh;
  width: 100vw;
  margin-top: 1vh;
  margin-bottom: 1vh;
  white-space: nowrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

.scroll-content {
  line-height: 18vh;
  height: 18vh;
  display: inline-block;
}

.buttons-wapper {
  display: flex;
  justify-content: space-around;
}
</style>