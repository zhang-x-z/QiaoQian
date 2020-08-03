<template>
  <div class="user-stickers-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <div slot="left" @click="Back()">
          <i class="el-icon-caret-left"></i>
        </div>
        <div slot="center">我的素材</div>
        <div slot="right">
          <i class="el-icon-upload" @click="upload()"></i>
        </div>
      </nav-bar>
    </div>

    <!--add upload dialog-->
    <el-dialog title="上传照片" :visible.sync="dialogFormVisible" width="70%">
      <el-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture card"
        accept=".jpg,.png"
        :http-request="uploadImageRequest"
        :show-file-list="false"
        :on-success="handleSuccess"
        :on-error="handleError"
        style="text-align:center;"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-dialog>

    <photo-wall :imageInfo="materialInfo" :canEdit="canEdit"></photo-wall>
  </div>
</template>

<script>
import NavBar from '@/components/common/Mobile/NavBar'
import PhotoWall from '@/components/common/Mobile/PhotoWall'
import axios from 'axios'
import { baseurl } from '@/utils.js'
//TODO: need to change
axios.defaults.baseURL = baseurl()

export default {
  data () {
    return {
      materialInfo: [],
      canEdit: false,
      dialogFormVisible: false
    }
  },
  mounted () {
    axios.get('user/getAllStickersInfo/', {
      params: {
        user_id: this.$store.state.user.userID
      },
      timeout: 5000
    }).then(res => res.data).then(data => {
      let error_code = data.error_code
      if (error_code === 0) {
        this.materialInfo = data.StickersInfo
      } else if (error_code === 1006) {
        this.$message.error('数据获取失败，请您稍后再试')
      }
    }).catch(err => {
      console.log(err)
      this.$message.error('数据获取失败，请检查您的网络连接')
    })
  },
  components: {
    NavBar,
    PhotoWall
  },
  methods: {
    uploadImageRequest(params) {
      console.log('uploading...')
      if (params.file.size / 1024 / 1024 > 1) {
        this.$message.error('您上传的贴纸太大啦，请选择不超过1M的贴纸')
        params.onError()
      } else {
        let form = new FormData()
        form.append('user_id', this.$store.state.user.userID)
        form.append('image', params.file, params.file.name)
        axios.post('user/add-sticker/', form, {
          timeout: 5000
        }).then(res => res.data).then(data => {
          let error_code = data.error_code
          if (error_code === 0) {
            this.materialInfo.unshift(data.stickerInfo)
            params.onSuccess()
          } else if (error_code === 1006) {
            params.onError()
          }
        }).catch(err => {
          console.log(err)
          params.onError()
        })
      }
    },
    Back () {
      // TODO: judge length of history
      console.log(window.history.length)
      this.$router.back(-1)
      console.log('back')
    },
    upload () {
      // TODO: upload image to serve
      this.dialogFormVisible = true
    },
    handleSuccess (response, file, fileList) {
      //TODO: handle on upload success
      this.$message.success("上传成功!")
      console.log(response)
    },
    handleError (err, file, fileList) {
      //TODO: handle on upload failed 
      this.$message.error("上传失败!")
      console.log(err)
    }
  }
}
</script>

<style scoped>
.user-stickers-wapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #eeeeee;
}

.navbar-wapper {
  background-color: rgba(250, 251, 252, 224);
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 100;
  font-size: 22px;
}
</style>