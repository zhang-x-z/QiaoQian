<template>
  <div class="login-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <div slot="left" @click="Back()">
          <i class="el-icon-caret-left"></i>
        </div>
        <div slot="center">登&nbsp;录</div>
      </nav-bar>
    </div>
    <div class="login-content-wapper">
      <div class="title">
        巧<br/>倩
      </div>
      <el-form class="login-content" :model="loginInfo" :rules="rules" ref="loginform">
        <el-form-item class="usermail-item" prop="usermail">
          <el-input
            prefix-icon="el-icon-message"
            class="input-usermail"
            placeholder="请输入您的邮箱"
            v-model="loginInfo.usermail"
          ></el-input>
        </el-form-item>
        <el-form-item class="password-item" prop="password">
          <el-input
            prefix-icon="el-icon-key"
            class="input-password"
            placeholder="请输入您的密码"
            type="password"
            v-model="loginInfo.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="login-buttons">
        <el-button plain class="login-btn" type="primary" size="medium" plain @click="submitForm()">登录</el-button>
        <el-button plain class="register-btn" type="text" @click="toRegisterPage()">没有帐户？马上注册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/common/Mobile/NavBar'
import MD5 from 'crypto-js/md5'
import qs from 'qs'
import axios from 'axios'
import { baseurl } from '@/utils.js'
//TODO: need to change
axios.defaults.baseURL = baseurl()

export default {
  name: 'login-mobile',
  data () {
    return {
      loginInfo: {
        usermail: '',
        password: ''
      },
      rules: {
        usermail: [
          {
            required: true,
            trigger: 'blur',
            validator: function (rule, value, callback) {
              if (!value) {
                callback(new Error('请输入您的邮箱'))
              } else {
                var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                if (!reg.test(value)) {
                  callback(new Error('请您输入正确的邮箱'))
                } else {
                  callback()
                }
              }
            }
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入您的密码'
          }
        ]
      }
    }
  },
  components: {
    NavBar
  },
  methods: {
    submitForm () {
      this.$refs.loginform.validate(vaild => {
        if (vaild) {
          // TODO: axios requests, change host
          axios({
            method: 'post',
            url: '/user/login/',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({
              user_mail: this.loginInfo.usermail,
              user_password: MD5(this.loginInfo.password).toString()
            }),
            timeout: 5000
          }).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              let newInfo = res.data.user_data
              // console.log(newInfo)
              this.$store.commit('setUserInfo', newInfo)
              this.$message.success('登录成功!')
              //TODO: for test
              this.$router.push('/')
              //this.$router.push('/')
            } else if (error_code === 1001) {
              this.$message.error('您还未注册，请您先进行注册')
            } else if (error_code === 1002) {
              this.$message.error('密码错误！')
            } else if (error_code === 1006) {
              this.$message.error('呀，出错了！请您稍后再试~')
            }
          }).catch(error => {
            console.log(error)
            this.$message.error('登录失败，请您检查您的网络连接~')
          })
        } else {
          this.$message.error('您输入的信息有误!')
          return false
        }
      })
    },
    toRegisterPage () {
      //TODO: router to regist page
      this.$router.push('/register')
      // console.log('register')
    },
    Back () {
      // TODO: judge length of history
      // console.log(window.history.length)
      if (window.history.length == 1)
        this.$router.push('/')
      else
        this.$router.back(-1)
      // console.log('back')
    }
  },
}
</script>

<style scoped>
@font-face {
  font-family: HYshangwei;
  src: url(../../assets/fonts/HYshangweishoushuW.ttf);
}

.login-wapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/theme4.jpg);
}

.navbar-wapper {
  position: relative;
  z-index: 100;
  color: black;
  background-color: rgba(250, 251, 252, 224);
  font-size: 22px;
}

.login-content-wapper {
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -45%);
  width: 74%;
  overflow: hidden;
}

.title {
  font-size: 65px;
  line-height: 60px;
  margin-bottom: 40px;
  text-align: center;
  font-family: HYshangwei;
  color: white;
}

.login-buttons {
  text-align: center;
}

.login-btn {
  text-align: center;
  /*margin: 8px 2.4cm 25px 0;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  font-size: 20px;
  width: 100%;
}

.register-btn {
  color: white;
  font-size: 15px;
}

.register-btn :hover {
  color: #555555;
}

.login-btn:hover {
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.2);
}
</style>