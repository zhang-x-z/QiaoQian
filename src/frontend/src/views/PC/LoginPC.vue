<template>
  <div class="login-view-wapper">
    <div class="login-wapper">
      <div class="login-title">巧 倩</div>
      <el-form class="login-content" :model="loginInfo" :rules="rules" ref="loginform">
        <el-form-item prop="usermail">
          <el-input class="login-usermail" v-model="loginInfo.usermail" placeholder="请输入邮箱">
            <i slot="prefix" class="fas fa-envelope" style="font-size:20px"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="login-password"
            type="password"
            v-model="loginInfo.password"
            placeholder="请输入密码"
          >
            <i slot="prefix" class="fas fa-key" style="font-size:20px"></i>
          </el-input>
        </el-form-item>
        <div class="login-buttons">
          <el-button plain class="login-btn" type="primary" size="medium" @click="submitForm()" plain>登录</el-button>
          <el-button plain class="register-btn" type="text" @click="toRegisterPage()">没有账户？马上注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
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
            message: '请您输入密码'
          }
        ]
      }
    }
  },
  components: {
  },
  methods: {
    submitForm () {
      this.$refs.loginform.validate(vaild => {
        if (vaild) {
          // TODO: axios requests
          this.$message.success('登录成功')
        } else {
          // console.log('wrong')
          return false
        }
      })
    },
    toRegisterPage () {
      //TODO: router to regist page
      // console.log('regist')
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: HYshangwei;
  src: url(../../assets/fonts/HYshangweishoushuW.ttf);
}
.login-view-wapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}

.login-wapper {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  overflow: hidden;
  padding: 5px;
}

.login-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 75px;
  margin: 60px 0 60px 0;
  font-family: HYshangwei;
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
  color: black;
  font-size: 15px;
}
.register-btn :hover {
  color: #555555;
}
/*
.register-btn {
  text-align: center;
  margin: 8px 0 25px 2.4cm;
  font-size: 20px;
}
*/

.login-btn:hover {
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.2);
}
</style>