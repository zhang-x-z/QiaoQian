<template>
  <!-- TODO:图片加圆框并替换 -->
  <!-- TODO:菜单最小宽度固定 -->
  <!-- TODO:用v-for优化代码 -->

  <!-- TODO:logo封装成一个组件 -->
  <div id="home">
    <div class="logo">
      <div class="title">
        巧<br />倩
      </div>
    </div>

    <!-- TODO:检测用户是否登录 -->
    <home-item v-if="!$store.state.isLogin" id="login-item" item-name="login" @item-click="itemClick">
      <template v-slot:icon>
        <el-avatar :src="loginImg" :size="75"></el-avatar>
       <!-- <img :src="loginImg" /> -->
      </template>
      <template v-slot:text>
        <div>登录</div>
      </template>
    </home-item>
    <home-item v-else id="login-item" item-name="user" @item-click="itemClick">
      <template v-slot:icon>
        <!-- 获取用户头像 -->
        <!-- <img :src="$store.state.user.avatarUrl" /> -->
        <el-avatar :src="$store.state.user.avatarUrl" :size="75"></el-avatar>
      </template>
      <template v-slot:text>
        <!-- 获取用户名 -->
        <div>{{$store.state.user.userName}}</div>
      </template>
    </home-item>

    <!-- 主页六个功能菜单 -->
    <div class="menu">
      <el-row class="sub-menu">
        <el-col :span="8">
          <input
            type="file"
            id="camera"
            @change="handleCamera"
            accept="image/*"
            capture="camera"
            style="display: none;"
          />
          <label for="camera">
            <home-item item-name="camera" @item-click="itemClick">
              <template v-slot:icon>
                <img :src="cameraImg" />
              </template>
              <template v-slot:text>
                <div>相机</div>
              </template>
            </home-item>
          </label>
        </el-col>

        <el-col :span="8">
          <input
            type="file"
            id="picture"
            @change="handleCamera"
            accept="image/*"
            style="display: none;"
          />
          <label for="picture">
            <home-item item-name="picture" @item-click="itemClick">
              <template v-slot:icon>
                <img :src="cameraImg" />
              </template>
              <template v-slot:text>
                <div>图片美化</div>
              </template>
            </home-item>
          </label>
        </el-col>

        <el-col :span="8">
          <input
            type="file"
            id="file"
            @change="handleCamera"
            accept="image/*"
            style="display: none;"
          />
          <label for="file">
            <home-item item-name="file" @item-click="itemClick">
              <template v-slot:icon>
                <img :src="cameraImg" />
              </template>
              <template v-slot:text>
                <div>文档处理</div>
              </template>
            </home-item>
          </label>
        </el-col>
      </el-row>
      <el-row class="sub-menu">
        <el-col :span="8">
          <home-item item-name="splice" @item-click="itemClick">
            <template v-slot:icon>
              <img :src="cameraImg" />
            </template>
            <template v-slot:text>
              <div>全景拼接</div>
            </template>
          </home-item>
        </el-col>
        <el-col :span="8">
          <home-item item-name="album" @item-click="itemClick">
            <template v-slot:icon>
              <img :src="cameraImg" />
            </template>
            <template v-slot:text>
              <div>云相册</div>
            </template>
          </home-item>
        </el-col>
        <el-col :span="8">
          <home-item item-name="sticker" @item-click="itemClick">
            <template v-slot:icon>
              <img :src="cameraImg" />
            </template>
            <template v-slot:text>
              <div>贴纸库</div>
            </template>
          </home-item>
        </el-col>
      </el-row>
    </div>

    <!-- <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>-->
  </div>
</template>
<script>
import HomeItem from 'components/home/HomeItem.vue'
import cameraImg from 'img/camera.svg'
import pictureImg from 'img/picture.svg'
import fileImg from 'img/file.svg'
import spliceImg from 'img/splice.svg'
import albumImg from 'img/album.svg'
import stickerImg from 'img/sticker.svg'
import loginImg from 'img/login.svg'

export default {
  name: "Home",
  components: {
    HomeItem,
  },
  // activated () {
  // },picture
  data () {
    return {
      cameraImg,
      pictureImg,
      fileImg,
      spliceImg,
      albumImg,
      stickerImg,
      loginImg,
      // actions: [{
      //   name: '拍照',
      //   method: () => {
      //     console.log('调用相机');
      //     this.$router.push(this.jumpRouter);
      //   },
      //   module: undefined
      // },
      // {
      //   name: '从相册中选择',
      //   method: () => {
      //     console.log('从相册中选择');
      //     this.$router.push(this.jumpRouter);
      //   }
      // },
      // ],
      jumpRouter: 'home',
    }
  },
  methods: {
    itemClick (name) {
      // 跳转到相应的页面
      // return this.$router.push(this.link);
      // TODO：vuex判断用户是否登录
      if (!this.$store.state.isLogin) {
        console.log('is not login')
        // 用户点击登录或需要登录才能使用的功能，跳转登录
        if (name == 'login' || name == 'album' || name == 'sticker') {
          this.$router.push('login')
        }
        else if (name == 'camera') {
          console.log('camera')
          this.jumpRouter = 'imgProc'
        }
        else if (name == 'picture') {
          console.log('picture')
          this.jumpRouter = 'imgProc'
        }
        else if (name == 'file') {
          console.log('file')
          this.jumpRouter = 'fileProc'
        }
        else if (name == 'splice') {
          console.log('splice')
          this.$router.push('/splice')
        }
      }
      // 用户已登录
      else {
        console.log('is login')
        if (name == 'user') {
          console.log('user')
          this.$router.push('/user-center')
        }
        else if (name == 'album') {
          console.log('album')
          this.$router.push('/albums')
        }
        else if (name == 'sticker') {
          console.log('sticker')
          this.$router.push('/user-stickers')
        }
        else if (name == 'camera') {
          // this.$router.push('camera');
          console.log('camera')
          this.jumpRouter = 'imgProc'
        }
        else if (name == 'picture') {
          console.log('picture')
          this.jumpRouter = 'imgProc'
        }
        else if (name == 'file') {
          console.log('picture')
          this.jumpRouter = 'fileProc'
        }
        else if (name == 'splice') {
          console.log('splice')
          this.$router.push('/splice')
        }
      }
    },

    handleCamera (e) {
      let files = e.target.files
      if (files && files.length > 0) {
        let picture = files[0]
        let reader = new FileReader()
        reader.readAsDataURL(picture)
        reader.onload = (event) => {
          let imgUrl = event.target.result
          this.$store.commit('saveImg', imgUrl)
          this.$router.push(this.jumpRouter)
        }
      }
      else {
        console.log('用户取消操作')
      }
    },

  },

}
</script>
<style lang="css" scoped>
#home {
  background-image: url(../../assets/img/theme4.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
  overflow: hidden;
}

.menu {
  margin: 20px 5vh;
  color: white;
}

.sub-menu {
  margin: 10px auto;
}

.el-col {
  min-width: 100px;
}

#login-item {
  color: white;
  margin: 0 auto;
  width: 100px;
}

#login-item img {
  width: 60px;
  margin: 0;
}

/* 临时样式，封装logo组件后删除 */
@font-face {
  font-family: HYshangwei;
  src: url(../../assets/fonts/HYshangweishoushuW.ttf);
}

.logo {
  margin: 30px;
}

.title {
  font-size: 65px;
  line-height: 60px;
  text-align: center;
  font-family: HYshangwei;
  color: rgb(255, 255, 255);
}
</style>