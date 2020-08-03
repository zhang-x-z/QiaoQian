<template>
  <div class="albumpage-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <div slot="left" @click="Back()">
          <i class="el-icon-caret-left"></i>
        </div>
        <div slot="center" class="title">{{this.$store.state.currentAlbumInfo.name}}</div>
        <div slot="right">
          <i class="el-icon-upload" @click="uploadPhoto()"></i>
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

    <photo-wall :imageInfo="imageInfo" :canEdit="'true'"></photo-wall>
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
  name: 'album-page',
  data () {
    return {
      imageInfo: [],
      dialogFormVisible: false,
      rules: {
        name: [{ required: true, message: '相册名不能为空！', trigger: 'blur' }]
      }
    }
  },
  watch: {
    //XXX: test
  },
  mounted () {
    if (this.$store.state.currentAlbumInfo === null) {
      this.$router.push('/')
      return
    }
    if (!this.$store.state.isLogin) {
      this.$router.push('/')
      return
    }
    // TODO: axios request image information
    // console.log('album page mounted')
    axios.get('user/getImagesInfo/', {
      params: {
        user_id: this.$store.state.user.userID,
        album_id: this.$store.state.currentAlbumInfo.id
      },
      timeout: 5000
    }).then(res => res.data).then(data => {
      let error_code = data.error_code
      if (error_code === 0) {
        this.imageInfo = data.ImagesInfo
      } else if (error_code === 1006) {
        this.$message.error('加载失败，请稍后再试~')
      }
    }).catch(err => {
      console.log(err)
      this.$message.error('加载失败，请检查您的网络连接')
    })
  },
  components: {
    NavBar,
    PhotoWall
  },
  methods: {
    uploadImageRequest (params) {
      // console.log('uploading...')
      if (params.file.size / 1024 / 1024 > 10.0) {
        this.$message.error('您上传的图片太大啦，请选择不超过10M的图片')
        params.onError()
      } else {
        let form = new FormData()
        form.append('user_id', this.$store.state.user.userID)
        form.append('album_id', this.$store.state.currentAlbumInfo.id)
        form.append('image', params.file, params.file.name)
        axios.post('user/add-image/', form, {
          timeout: 5000
        }).then(res => res.data).then(data => {
          let error_code = data.error_code
          if (error_code === 0) {
            this.imageInfo.unshift(data.imageInfo)
            this.$store.commit('updateAlbum', {
              num: 1,
              url: data.imageInfo.url
            })
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
      this.$router.back(-1)
      // console.log('back')
    },
    uploadPhoto () {
      // TODO: select photo from user mobile phone
      this.dialogFormVisible = true
    },
    handleSuccess () {
      //TODO: handle on upload success
      this.$message.success("上传成功!")
    },
    handleError () {
      //TODO: handle on upload failed 
      this.$message.error("上传失败!")
    }
  }
}
</script>

<style scoped>
.albumpage-wapper {
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

.title {
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
  text-overflow: ellipsis;
}
</style>