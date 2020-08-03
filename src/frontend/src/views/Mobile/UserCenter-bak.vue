<template>
  <div class="user-center-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <div slot="left" @click="Back()">
          <i class="el-icon-caret-left"></i>
        </div>
        <div slot="center">用户中心</div>
      </nav-bar>
    </div>

    <!--add user info dialog-->
    <el-dialog title="更改用户名" :visible.sync="nameFormVisible" width="70%">
      <el-form :model="formData" :rules="rules" ref="nameForm">
        <el-form-item label="用户名" :label-width="'80px'" prop="userName">
          <el-input v-model="formData.userName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="nameFormVisible = false">取 消</el-button>
        <el-button plain type="primary" @click="changeUserName()">确 定</el-button>
      </div>
    </el-dialog>

    <!--add upload dialog-->
    <el-dialog title="上传头像" :visible.sync="dialogFormVisible" width="70%">
      <div style="text-align:center;margin-bottom:15px">
        <el-avatar :size="100" v-if="selectImageUrl" :src="selectImageUrl"></el-avatar>
      </div>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        ref="upload"
        style="text-align:center"
        :show-file-list="true"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :on-change="uploadFileChange"
        :on-progress="uploadProgress"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :file-list="selectList"
        :on-remove="fileRemove"
        :limit="1"
      >
        <el-button plain :disabled="disSelect" slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button
          plain 
          :disabled="disUpload"
          style="margin-left: 10px;"
          size="small"
          type="primary"
          @click="submitUpload"
        >上传头像</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>

    <div class="content-wapper">
      <el-card class="user-info">
        <div style="text-align:center; margin-bottom:10px;">
          <el-avatar :size="100" :src="user.avatarUrl"></el-avatar>
        </div>
        <div>
          <p style="font-weight:bold;font-size:20px;margin-bottom:5px">{{user.userName}}</p>
          <p style="color:gray; font-size:15px">{{user.userMail}}</p>
        </div>
      </el-card>
      <el-card class="operation">
        <div @click="changeAvatar()">
          <span>更换头像</span>
          <i class="el-icon-picture-outline-round"></i>
        </div>
        <el-divider></el-divider>
        <div @click="changeUserInfo()">
          <span>更改用户名</span>
          <i class="el-icon-edit-outline"></i>
        </div>
        <el-divider></el-divider>
        <div @click="myMaterial()">
          <span>我的素材</span>
          <i class="el-icon-receiving"></i>
        </div>
        <el-divider></el-divider>
        <div @click="myAlbum()">
          <span>我的相册</span>
          <i class="el-icon-collection"></i>
        </div>
        <el-divider></el-divider>
      </el-card>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/Mobile/NavBar'
import PhotoWall from '@/components/common/Mobile/PhotoWall'

export default {
  data () {
    return {
      user: {},
      dialogFormVisible: false,
      nameFormVisible: false,
      selectImageUrl: '',
      disSelect: false,
      disUpload: true,
      selectList: [],
      formData: {
        userName: ''
      },
      rules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空!' }]
      }
    }
  },
  methods: {
    Back () {
      // TODO: judge length of history
      console.log(window.history.length)
      this.$router.back(-1)
      console.log('back')
    }
  },
  mounted () {
    // TODO: maybe need to fix
    if (!this.$store.state.isLogin) {
      this.$router.push('/')
    }
    this.user = this.$store.state.user
    this.selectImageUrl = this.user.avatarUrl
  },
  components: {
    NavBar,
    PhotoWall
  },
  methods: {
    changeAvatar () {
      //TODO: chagne avatar
      console.log('avatar')
      this.dialogFormVisible = true
      this.selectImageUrl = this.user.avatarUrl
      this.disSelect = false
      this.disUpload = true
      this.selectList = []
    },
    changeUserInfo () {
      //TODO: change user information
      this.formData.userName = this.user.userName
      this.nameFormVisible = true
    },
    myMaterial () {
      this.$router.push('/user-stickers')
    },
    myAlbum () {
      this.$router.push('/albums')
    },
    handleAvatarSuccess (res, file, fileList) {
      // TODO: handle upload success
      this.dialogFormVisible = false
    },
    handleAvatarError (err, file, fileList) {
      // TODO: handle upload failed
      this.selectImageUrl = this.user.avatarUrl
      this.$message.error("上传失败!")
    },
    beforeAvatarUpload (file) {
      // TODO: limit upload file
      console.log('before avatar upload')
    },
    submitUpload () {
      this.disUpload = true
      this.$refs.upload.submit()
    },
    uploadFileChange (file, fileList) {
      console.log(file)
      if (this.disSelect == false && this.disUpload == true) {
        this.disUpload = false
        this.disSelect = true
        this.selectImageUrl = window.URL.createObjectURL(file.raw)
      } else if (this.disSelect == true && this.disUpload == false) {
        this.disUpload = true
        this.disSelect = false
      } else if (this.disSelect == true && this.disUpload == true) {
        this.disUpload = true
        this.disSelect = false
      }
    },
    uploadProgress () {
      this.disSelect = true
      this.disUpload = true
    },
    fileRemove () {
      this.disSelect = false
      this.disUpload = true
      this.selectImageUrl = this.user.avatarUrl
    },
    changeUserName () {
      //TODO: axios request
      this.$refs.nameForm.validate(valid => {
        if (valid) {
          this.$store.state.user.userName = this.formData.userName
          this.$message.success("更改成功!")
          this.nameFormVisible = false
        } else {
          this.$message.error("您输入的信息有误!")
        }
      })
    }
  }
}
</script>

<style scoped>
.user-center-wapper {
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

.content-wapper {
  display: block;
  position: relative;
  height: 80%;
  width: 80%;
  margin-left: 8%;
  margin-right: 8%;
  margin-top: 3%;
  padding-bottom: 5%;
  padding-left: 2%;
  padding-right: 2%;
}

.user-info {
  margin-bottom: 3%;
}

.operation div {
  margin-bottom: 8px;
  font-size: 20px;
}

.operation i {
  float: right;
  font-size: 30px;
}
</style>