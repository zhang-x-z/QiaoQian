<template>
  <div class="markview-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-back" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>水印</span>
        </template>
        <template v-slot:right>
          <i class="el-icon-check" @click="finish"></i>
        </template>
      </nav-bar>
    </div>
    <div v-loading="fullScreenLoading" element-loading-text="处理中..." element-loading-background="rgba(0, 0, 0, 0.6)">
      <div class="content-wapper">
        <img :src="userImg" class="image" />
      </div>
    </div>
    <div class="input-wapper">
      <el-card shadow="always">
        <div slot="header">
          <span>输入水印文字</span>
          <el-button plain style="float: right; padding: 3px 0;" size="medium" @click="trans" type="text">开始转换</el-button>
        </div>
        <el-input maxlength="20" show-word-limit placeholder="请输入水印内容" v-model="markInput"></el-input>
      </el-card>
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
    data() {
      return {
        markInput: '',
        userImg: '',
        saveImg: '',
        fullScreenLoading: false
      }
    },
    components: {
      NavBar
    },
    mounted() {
      this.init()
    },
    activated() {
      this.init()
    },
    methods: {
      init() {
        this.userImg = this.$store.state.editedImg
        this.saveImg = this.$store.state.editedImg
        this.markInput = ''
      },
      back() {
        this.$router.back()
      },
      finish() {
        this.$store.commit('saveImg', this.userImg)
        this.$router.back()
      },
      trans() {
        if (!this.markInput) {
          this.$message.error('请输入水印内容')
        } else {
          this.fullScreenLoading = true
          let form = new FormData()
          form.append('text', this.markInput)
          form.append('editedImg', this.saveImg)
          axios.post('imgProc/waterMark/', form).then(res => {
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
          })
        }
      },
    }
  }
</script>

<style scoped>
  .markview-wapper {
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
    margin: 2vh 2vw 2vh 2vw;
    width: 96vw;
    height: 68vh;
  }

  .image {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    object-fit: scale-down;
  }

  .input-wapper {
    margin-left: 2vw;
    margin-right: 2vw;
    margin-bottom: 3vh;
    height: 18vh;
    width: 96vw;
  }
</style>