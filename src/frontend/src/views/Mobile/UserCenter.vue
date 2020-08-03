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

    <!--add change password dialog-->
    <el-dialog title="更改密码" :visible.sync="passwordFormVisible" width="75%">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordDialog">
        <el-form-item label="原密码" :label-width="'100px'" prop="old_password">
          <el-input v-model="passwordForm.old_password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="'100px'" prop="new_password">
          <el-input v-model="passwordForm.new_password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="'100px'" prop="confirm">
          <el-input v-model="passwordForm.confirm" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="passwordFormVisible = false">取 消</el-button>
        <el-button plain type="primary" @click="updatePassword()">确 定</el-button>
      </div>
    </el-dialog>

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
        action="https://jsonplaceholder.typicode.com/posts/"
        class="avatar-uploader"
        ref="upload"
        style="text-align:center"
        :show-file-list="true"
        :file-list="selectList"
        :on-change="uploadFileChange"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
        :on-remove="fileRemove"
        :http-request="uploadAvatar"
        :limit="1"
        accept=".jpg, .png"
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

    <div
      v-loading="fullscreenLoading"
      element-loading-text="处理中..."
      element-loading-background="rgba(0, 0, 0, 0.6)"
      style="height:90vh;"
    >
      <div class="content-wapper">
        <el-card class="user-info">
          <div style="text-align:center; margin-bottom:10px;">
            <el-avatar :size="60" :src="user.avatarUrl"></el-avatar>
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
          <div @click="changePassword()">
            <span>更改密码</span>
            <i class="el-icon-key"></i>
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
  </div>
</template>

<script>
import NavBar from '@/components/common/Mobile/NavBar'
import PhotoWall from '@/components/common/Mobile/PhotoWall'
import MD5 from 'crypto-js/md5'
import axios from 'axios'
import { baseurl } from '@/utils.js'
//TODO: need to change
axios.defaults.baseURL = baseurl()

export default {
  data () {
    return {
      user: {},
      dialogFormVisible: false,
      nameFormVisible: false,
      passwordFormVisible: false,
      selectImageUrl: '',
      disSelect: false,
      disUpload: true,
      fullscreenLoading: false,
      selectList: [],
      formData: {
        userName: ''
      },
      rules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空!' }]
      },
      passwordForm: {
        old_password: '',
        new_password: '',
        confirm: ''
      },
      passwordRules: {
        old_password: [{ required: true, trigger: 'blur', message: '原密码不能为空' }],
        new_password: [{ required: true, trigger: 'blur', message: '新密码不能为空' }],
        confirm: [{
          required: true, trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请再次输入密码'))
            } else {
              let pwd = this.passwordForm.new_password
              if (pwd !== value) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            }
          }
        }]
      }
    }
  },
  computed: {
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
    uploadAvatar (params) {
      //TODO: axios request
      if (params.file.size / 1024.0 >= 500.0) {
        this.disUpload = false
        params.onError()
        this.selectImageUrl = this.user.avatarUrl
        this.$message.error('您选择的图片大小大于500KB')
      } else {
        this.fullscreenLoading = true
        let data = new FormData()
        data.append('new_avatar', params.file, params.file.name)
        data.append('user_id', this.user.userID)
        axios({
          method: 'post',
          url: 'user/change-avatar/',
          data: data,
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 2000
        }).then(res => {
          let error_code = res.data.error_code
          if (error_code === 0) {
            this.$store.commit('updateUserAvatar', res.data.user_new_data.user_new_avatar_url)
            this.handleAvatarSuccess()
          } else if (error_code === 1006) {
            this.handleAvatarError()
          }
        }).catch(err => {
          console.log(err)
          this.handleAvatarError()
        })
      }
    },
    Back () {
      // TODO: judge length of history
      this.$router.back(-1)
      // console.log('back')
    },
    changeAvatar () {
      //TODO: chagne avatar
      // console.log('avatar')
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
    //割掉贴纸功能
    // myMaterial () {
    //   this.$router.push('/user-stickers')
    // },
    changePassword () {
      this.passwordForm.old_password = ''
      this.passwordForm.new_password = ''
      this.passwordForm.confirm = ''
      this.passwordFormVisible = true
    },
    updatePassword () {
      this.$refs.passwordDialog.validate(valid => {
        if (valid) {
          let form = new FormData()
          form.append('user_id', this.$store.state.user.userID)
          form.append('old_password', MD5(this.passwordForm.old_password).toString())
          form.append('new_password', MD5(this.passwordForm.new_password).toString())
          axios.post('user/change-password/', form, {
            timeout: 5000
          }).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              this.$message.success('修改成功！')
              this.passwordFormVisible = false
            } else if (error_code === 1002) {
              this.$message.error('原密码错误！')
            } else if (error_code === 1006) {
              this.$message.error('出错啦，请稍后再试')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('出错啦，请检查您的网络连接')
          })
        } else {
          this.$message.error('您输入的信息有误！')
        }
      })
    },
    myAlbum () {
      this.$router.push('/albums')
    },
    handleAvatarSuccess () {
      // TODO: handle upload success
      this.fullscreenLoading = false
      this.selectList = []
      this.dialogFormVisible = false
      this.$message.success('更新成功！')
    },
    handleAvatarError () {
      // TODO: handle upload failed
      this.fullscreenLoading = false
      this.selectList = []
      this.selectImageUrl = this.user.avatarUrl
      this.disSelect = false
      this.disUpload = true
      this.$message.error("上传失败!")
    },
    beforeAvatarUpload (file) {
      // TODO: limit upload file
      // console.log('before avatar upload')
    },
    submitUpload () {
      this.disUpload = true
      this.$refs.upload.submit()
    },
    uploadFileChange (file, fileList) {
      // console.log(file)
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
    fileRemove () {
      this.disSelect = false
      this.disUpload = true
      this.selectImageUrl = this.user.avatarUrl
    },
    changeUserName () {
      //TODO: axios request
      this.$refs.nameForm.validate(valid => {
        if (valid) {
          let form = new FormData()
          form.append('user_id', this.user.userID)
          form.append('user_new_name', this.formData.userName)
          axios.post('user/change-user-name/', form, {
            timeout: 2000
          }).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              this.$store.commit('updateUserName', res.data.user_new_data.user_new_name)
              this.$message.success("更改成功!")
              this.nameFormVisible = false
            } else if (error_code === 1006) {
              this.$message.error('呀出错了，请您稍后再试~')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('更改失败，请检查您的网络连接')
          })
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
  margin-bottom: 5px;
  font-size: 17px;
}

.operation i {
  float: right;
  font-size: 27px;
}
</style>