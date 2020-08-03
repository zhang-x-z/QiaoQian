<template>
  <div class="register-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <div slot="left" @click="Back()">
          <i class="el-icon-caret-left"></i>
        </div>
        <div slot="center">注&nbsp;册</div>
      </nav-bar>
    </div>
    <div class="register-content-wapper">
      <div class="title">巧 倩</div>
      <el-form class="register-content" :model="registerInfo" :rules="rules" ref="registerForm">
        <!--usermail-->
        <el-form-item class="usermail-item" prop="usermail">
          <el-input placeholder="请输入您的邮箱" v-model="registerInfo.usermail">
            <svg slot="prefix" t="1594948942260" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="4991" width="16" height="16">
              <path
                d="M999.253333 177.706667H21.333333v706.773333h977.92V490.666667l-85.333333 31.36v277.333333H106.666667V432.853333L512 576l458.24-163.84 28.373333-10.88zM512 485.76L106.666667 341.333333v-78.293333h807.253333V341.333333z"
                fill="#707070" p-id="4992" />
            </svg>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input maxlength="15" placeholder="请输入您的用户名" v-model="registerInfo.username">
            <svg slot="prefix" t="1595406738623" class="icon" viewBox="0 0 1027 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="3395" width="16" height="16">
              <path
                d="M608.176278 506.350592a195.445801 195.445801 0 1 0-189.106372 0C292.560414 546.44715 200.911139 664.730002 200.911139 804.436671h39.086502c0-151.096377 122.522429-273.618806 273.618806-273.618806S787.235253 653.340294 787.235253 804.436671h39.086502c0-139.706668-91.649276-257.989521-218.145477-298.086079z m-250.91913-170.978528A156.359299 156.359299 0 1 1 513.616447 491.731363a156.385879 156.385879 0 0 1-156.359299-156.359299z"
                fill="#707070" p-id="3396" />
              <path
                d="M983.850592 313.390059A511.938819 511.938819 0 1 0 1023.96044 512.052091a508.616266 508.616266 0 0 0-40.109848-198.662032zM513.616447 969.235252C261.527778 969.235252 56.433286 764.140759 56.433286 512.052091S261.527778 54.86893 513.616447 54.86893s457.183161 205.094492 457.183161 457.183161-205.094492 457.183161-457.183161 457.183161z"
                fill="#707070" p-id="3397" />
            </svg>
          </el-input>
        </el-form-item>
        <!--password-->
        <el-form-item class="password-item" prop="password">
          <el-input placeholder="请输入您的密码" type="password" v-model="registerInfo.password">
            <svg slot="prefix" t="1594952836664" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="6058" width="16" height="16">
              <path
                d="M211.542593 1023.855019c-27.401388 0-52.918024-10.583605-72.055501-30.011043C120.204634 974.99646 109.331068 948.609939 109.331068 921.208552V514.537166c0-26.966445 10.728586-52.483081 30.011043-71.765539 0.434943-0.434943 0.869885-1.014866 1.304828-1.59479 19.137477-18.847515 44.21917-29.141158 70.895654-29.141158h8.118929c4.784369 0 8.698853-3.914484 8.698853-8.698853v-120.044174c0-37.840011 7.539006-74.810137 22.327057-109.895512 14.208127-33.635566 34.505451-63.79159 60.312049-89.598188l2.609655-1.884751c0.434943-0.289962 0.724904-0.579924 1.159848-0.869886C366.962103 29.576101 438.58266 0 511.653027 0c75.24508 0 146.285714 29.576101 199.928642 83.219029 53.93289 53.207985 83.653971 124.24862 83.653972 200.073623v120.044174c0 4.784369 3.914484 8.698853 8.698853 8.698853h7.828968c27.256407 0 53.063004 10.728586 72.635424 30.301005 19.427439 20.442305 30.156024 46.103922 30.156024 72.200482v406.816366c0 26.531502-10.873566 52.918024-29.866062 72.345463 0 0-3.044599 2.754637-3.18958 2.899617-18.847515 17.687668-43.639247 27.401388-69.735806 27.401388h-600.220869zM183.27132 941.070933c4.784369 4.92935 12.033414 7.828968 19.7174 7.828968h617.183633c6.52414 0 12.758318-1.884752 17.97763-5.509274 0.434943-0.289962 0.724904-0.579924 1.014866-0.869885l1.304828-1.304828 0.289962-0.289962c5.074331-5.509274 7.973949-12.613337 7.973949-19.57242V514.537166c0-6.52414-2.609656-12.903299-7.683987-18.847516l-0.869885-0.869885c-5.944216-5.219312-13.04828-8.11893-20.007363-8.11893H202.98872c-6.52414 0-14.063146 3.189579-19.427439 8.11893-5.944216 4.92935-8.988815 11.743452-8.988814 19.862381v406.816367c0 7.539006 3.044599 14.498089 8.698853 19.57242zM351.594129 136.282033c-42.334419 39.144839-66.691208 92.642786-66.691208 146.865638v120.044174c0 4.784369 4.204446 8.698853 9.423758 8.698853h434.362735c5.219312 0 9.423758-3.914484 9.423758-8.698853v-120.044174c0-54.802775-24.066827-108.445703-66.256265-147.1556-43.204304-39.724763-100.036812-61.616877-160.348861-61.616876-58.137335 0-115.549766 21.602152-157.594223 59.297182l-0.434943 0.434943-1.884751 2.174713z m160.058898 724.034546c-10.148662 0-18.702534-8.553872-18.702534-18.702534v-56.832507c0-4.059465-2.754637-7.539006-6.52414-8.408892a99.74685 99.74685 0 0 1-46.828826-26.676483l-0.144981-0.144981c-19.427439-18.847515-30.011043-44.509132-30.011044-71.910519 0-27.401388 10.583605-53.063004 30.011044-72.055501 19.282458-19.282458 44.944075-29.721082 72.200481-29.721082 27.401388 0 53.352966 10.583605 72.780405 29.721082 19.427439 19.717401 30.011043 45.234037 30.011044 72.055501 0 26.821464-10.728586 52.3381-30.156025 72.0555-13.773184 13.483222-29.576101 22.472037-47.118788 26.676483-3.914484 1.014866-6.669121 4.494407-6.669121 8.408892v56.832507c0.144981 10.583605-8.263911 18.702534-18.847515 18.702534z m-45.234036-137.006937c11.598471 11.598471 27.546368 18.412573 43.784227 18.847515h2.899618c16.527821-0.289962 32.185757-6.959083 44.364151-18.702534 12.033414-12.178394 18.992496-28.706215 18.992496-45.66898 0-16.527821-6.814102-33.200623-18.702534-45.523998l-0.289962-0.289962c-13.04828-12.178394-28.851196-18.702534-45.668979-18.702534-16.817783 0-33.345604 6.814102-45.379017 18.847515-12.178394 12.033414-18.847515 28.271273-18.847516 45.523999-0.144981 17.397706 6.814102 33.925527 18.847516 45.668979z"
                fill="#707070" p-id="6059" />
            </svg>
          </el-input>
        </el-form-item>
        <!--input again-->
        <el-form-item class="confirm-item" prop="confirmPwd">
          <el-input placeholder="请确认您的密码" type="password" v-model="registerInfo.confirmPwd">
            <svg slot="prefix" t="1594948809110" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="4213" width="16" height="16">
              <path
                d="M792.833083 398.326031l-25.03007 0 0-61.025888c0.385786-5.694699 0.580215-11.373025 0.580215-16.884552 0-66.646909-26.010397-129.304971-73.240071-176.433338-47.226604-47.128367-110.024859-73.081459-176.810938-73.081459-66.792219 0-129.590474 25.953092-176.814008 73.081459-47.226604 47.128367-73.237001 109.786429-73.237001 176.433338l0 77.911464-24.454972 0c-67.586304 0-122.57571 54.865585-122.57571 122.31579l0 303.868729c0 67.447135 54.989405 122.31272 122.57571 122.31272l549.008892 0c67.589374 0 122.57571-54.865585 122.57571-122.31272L915.410839 520.636704C915.408793 453.192639 860.422458 398.326031 792.833083 398.326031zM324.574307 320.41559c0-106.60497 86.916559-193.335287 193.756889-193.335287 106.835214 0 193.750749 86.730317 193.750749 193.335287 0 4.517897-0.172939 9.212826-0.506537 13.930267l-0.068562 0.991584 0 62.989613-386.93254 0L324.574307 320.41559zM859.113649 824.51055l-0.005117 0c0 36.46654-29.729092 66.13014-66.274426 66.13014L243.824191 890.64069c-36.546358 0-66.277496-29.662577-66.277496-66.13014L177.546695 520.636704c0-36.46654 29.731138-66.13014 66.277496-66.13014l24.449855 0 499.527944 0 25.03007 0c36.546358 0 66.280566 29.662577 66.280566 66.13014L859.112626 824.51055z"
                p-id="4214" fill="#707070" />
              <path
                d="M688.358637 543.271214 472.15962 752.948701l-95.306646-98.270141c-10.527774-10.853186-27.861558-11.121292-38.717813-0.591471-10.853186 10.524704-11.119245 27.858488-0.591471 38.717813L451.91453 810.727639c10.527774 10.853186 27.861558 11.119245 38.717813 0.594541l235.849566-228.744751c10.853186-10.527774 11.119245-27.861558 0.591471-38.714743C716.545606 533.00643 699.211822 532.74037 688.358637 543.271214z"
                p-id="4215" fill="#707070" />
            </svg>
          </el-input>
        </el-form-item>
        <!--verify-->
        <el-form-item class="verify-item" prop="verifyCode">
          <el-input placeholder="请输入验证码" v-model="registerInfo.verifyCode">
            <svg slot="prefix" t="1594948079402" class="icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="2895" width="16" height="16">
              <path
                d="M534.734149 1004.926435a41.85588 41.85588 0 0 1-35.040452 0C201.1635 866.883913 25.913076 556.215992 25.913076 243.308373c0-6.526435 0-15.412982 0.553904-27.863782 0.264911-10.090687 0.505738-19.507056 1.083726-27.093133a39.303104 39.303104 0 0 1 35.353527-37.063405c49.923612-6.020696 89.106303-46.865099 89.106303-95.295579v-1.637629c0-20.542615 17.845343-37.352399 40.146002-37.352399H842.29539c22.011665 0 39.519849 16.809784 39.51985 37.352399 0 49.562371 38.0508 90.912512 89.202634 96.95729 18.615992 2.119285 33.836312 17.002446 34.992286 35.71477 0.529821 7.850988 0.842897 17.267357 1.059642 28.417686 0.313076 12.4508 0.553904 21.36143 0.553904 27.863782 0 312.90762-174.985513 623.069802-472.889557 761.618062z m215.348259-689.080715a40.627658 40.627658 0 0 1 56.401882 0 36.822578 36.822578 0 0 1 0 53.776858l-287.548448 275.820131c-15.268485 15.148071-40.65174 15.148071-56.47413 0l-157.164252-150.758231a36.967074 36.967074 0 0 1 0-53.849106c15.533396-14.594167 40.627658-14.594167 56.73904 0l128.60207 123.689181 259.443838-248.678833z m-232.856444 612.449294c261.009219-129.661712 410.876388-407.336218 410.876388-684.986641l-0.313076-23.288053c-60.664534-18.712324-106.927563-67.672625-121.304986-126.96444H227.63048c-14.040263 59.291816-60.953528 108.252117-121.834807 126.96444v23.288053c0 277.650423 149.819003 555.324929 411.430291 684.986641z"
                fill="#7C7C7C" p-id="2896" />
            </svg>
            <el-button class="verification-btn" slot="suffix" :disabled="show" type="text" @click="getVerifyCode()">
              {{get_verify_code}}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="register-buttons">
        <el-button plain class="register-btn" type="primary" size="medium" plain @click="submitForm()">注册</el-button>
        <el-button plain class="login-btn" type="text" @click="toLoginPage()">已有账户？马上登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import navBar from '../../components/common/Mobile/NavBar'
  import MD5 from 'crypto-js/md5'
  import qs from 'qs'
  import axios from 'axios'
  import { baseurl } from '@/utils.js'
  //TODO: need to change
  axios.defaults.baseURL = baseurl()

  export default {
    data() {
      return {
        show: false,
        times: 60,
        registerInfo: {
          usermail: '',
          password: '',
          confirmPwd: '',
          verifyCode: '',
          username: ''
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
          ],
          confirmPwd: [
            {
              required: true,
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请再次输入密码'))
                } else {
                  let pwd = this.registerInfo.password
                  if (pwd !== value) {
                    callback(new Error('两次输入密码不一致'))
                  } else {
                    callback()
                  }
                }
              }
            }
          ],
          verifyCode: [{
            required: true,
            trigger: 'blur',
            message: '请输入验证码'
          }],
          username: [{
            required: true,
            trigger: 'blur',
            message: '请输入用户名'
          }
          ]
        }
      }
    },
    components: {
      navBar
    },
    computed: {
      get_verify_code() {
        if (this.show)
          return this.times + 's后重新获取'
        else
          return '获取验证码'
      }
    },
    methods: {
      submitForm() {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            // TODO: submit form to serve
            axios({
              method: 'post',
              url: '/user/register/',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: qs.stringify({
                user_mail: this.registerInfo.usermail,
                user_name: this.registerInfo.username,
                user_password: MD5(this.registerInfo.password).toString(),
                verify_code: this.registerInfo.verifyCode
              }),
              timeout: 5000
            }).then(res => {
              let error_code = res.data.error_code
              switch (error_code) {
                case 0:
                  this.$message.success('注册成功! 3秒后将返回登录页面')
                  setTimeout(() => {
                    this.$router.push('/login')
                  }, 3000)
                  break
                case 1003:
                  this.$message.error('验证码错误！')
                  break
                case 1006:
                  this.$message.error('呀出错了！请稍后再试~')
                  break
                case 1007:
                  this.$message.error('您的验证码已过期')
                  break
                default:
                  break
              }
            }).catch(err => {
              console.log(err)
              this.$message.error('注册失败，请检查您的网络连接')
            })
          } else {
            this.$message.error('您输入的信息有误!')
            return false
          }
        })
      },
      toLoginPage() {
        this.$router.push('/login')
      },
      Back() {
        // TODO: judge length of history
        if (window.history.length == 1)
          this.$router.push('/')
        else
          this.$router.back(-1)
      },
      getVerifyCode() {
        var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (!this.registerInfo.usermail) {
          this.$message.error('请输入邮箱！')
        } else if (!reg.test(this.registerInfo.usermail)) {
          this.$message.error('请输入正确的邮箱！')
        } else {
          this.show = true
          this.timer = setInterval(() => {
            this.times--
            if (this.times === 0) {
              this.show = false
              this.times = 60
              clearInterval(this.timer)
            }
          }, 1000)
          axios({
            method: 'get',
            url: '/user/register/',
            params: {
              user_mail: this.registerInfo.usermail,
            },
            timeout: 5000
          }).then(res => {
            let error_code = res.data.error_code
            switch (error_code) {
              case 0:
                this.$message.success('发送成功！')
                break
              case 1004:
                this.$message.error('该邮箱已被注册，请您直接登录')
                break
              case 1005:
                this.$message.error('呀发送出错了，请您稍后再试~')
                break
              default:
                break
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('获取失败, 请检查您的网络连接')
          })
        }
      }
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: HYshangwei;
    src: url(../../assets/fonts/HYshangweishoushuW.ttf);
  }

  .register-wapper {
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

  .register-content-wapper {
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

  .register-buttons {
    text-align: center;
  }

  .register-btn {
    text-align: center;
    /*margin: 8px 2.4cm 25px 0;*/
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    font-size: 20px;
    width: 100%;
  }

  .login-btn {
    color: white;
    font-size: 15px;
  }

  .login-btn :hover {
    color: #555555;
  }

  .register-btn :hover {
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.2);
  }

  .verification-btn {
    height: 100%;
    width: auto;
    overflow: hidden;
    white-space: nowrap;
  }

  .el-input {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
  }
</style>