<template>
  <div class="album-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <div slot="left" @click="Back()">
          <i class="el-icon-caret-left"></i>
        </div>
        <div slot="center">我的相册</div>
        <div slot="right">
          <i class="el-icon-circle-plus" @click="dialogFormVisible = true"></i>
        </div>
      </nav-bar>
    </div>
    <!--add album dialog-->
    <el-dialog title="添加相册" :visible.sync="dialogFormVisible" width="70%">
      <el-form :model="formData" :rules="rules" ref="nameForm">
        <el-form-item label="相册名称" :label-width="'80px'" prop="albumName">
          <el-input v-model="formData.albumName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="dialogFormVisible = false">取 消</el-button>
        <el-button plain type="primary" @click="addAlbum()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="album-content" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <!--<li v-for="i in count" :key="i">{{i}}</li>-->
      <el-row v-for="i in count" :key="i" style="margin-bottom: 20px;">
        <el-col>
          <album-card>
            <el-image
              :fit="'cover'"
              :src="albumInfo[i - 1].url"
              slot="image"
              class="image"
              lazy
              @click="toAlbumMore(albumInfo[i - 1])"
            ></el-image>
            <span slot="title">{{albumInfo[i - 1].name}}</span>
            <span slot="describe" class="date">{{albumInfo[i - 1].date + '创建'}}</span>
            <el-popconfirm
              confirmButtonText="确认"
              cancelButtonText="手抖了"
              icon="el-icon-warning"
              iconColor="red"
              title="确定删除该相册吗？"
              slot="button"
            >
              <i slot="reference" class="el-icon-remove more-btn"></i>
            </el-popconfirm>
            <!--<i slot="button" class="el-icon-more more-btn" @click="toAlbumMore(albumInfo[i - 1])"></i>-->
          </album-card>
        </el-col>
      </el-row>
      <div v-if="loading" class="load-more">
        <i class="el-icon-loading"></i>
        <span>加载中...</span>
      </div>
      <p v-if="noMore" class="no-more">没有更多了</p>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/Mobile/NavBar'
import AlbumCard from '@/components/album/AlbumCard'
export default {
  data () {
    return {
      count: 0,
      loading: false,
      albumInfo: [],
      dialogFormVisible: false,
      formData: {
        albumName: ''
      },
      rules: {
        albumName: [
          {
            required: true,
            trggier: 'blur',
            message: '相册名不能为空!'
          }
        ]
      }
    }
  },
  mounted () {
    // console.log('in')
    // console.log(this.count)
    this.albumInfo = this.$store.state.user.albumInfo
  },
  components: {
    NavBar,
    AlbumCard
  },
  computed: {
    noMore () {
      return this.count >= this.albumInfo.length
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      if (this.count + 5 >= this.albumInfo.length)
        this.count = this.albumInfo.length
      else
        this.count += 5
      this.loading = false
    },
    addAlbum () {
      this.$refs.nameForm.validate(valid => {
        if (valid) {
          // TODO: axios request via vuex
          let today = new Date()
          this.$store.state.user.albumInfo.unshift({
            id: '4',
            name: this.formData.albumName,
            date: today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
            url: 'http://a0.att.hudong.com/08/30/300001378954132857309232007.jpg'
          })
          this.dialogFormVisible = false
        } else {
          this.$message.error('您输入的信息有误!')
        }
      })
    },
    Back () {
      // TODO: judge length of history
      console.log(window.history.length)
      this.$router.back(-1)
      console.log('back')
    },
    toAlbumMore (info) {
      console.log(this.count)
      console.log(info)
      console.log(this.albumInfo.length)
      // TODO: need to fix
      this.$store.commit('changeCurrentAlbum', info.id)
      this.$router.push('/album-page')
    }
  }
}
</script>

<style lang="css" scoped>
.album-wapper {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #eeeeee;
}

.album-content {
  padding-top: 5%;
  padding-left: 3%;
  padding-right: 3%;
}

.navbar-wapper {
  background-color: rgba(250, 251, 252, 224);
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  z-index: 100;
  font-size: 22px;
}

.load-more {
  text-align: center;
  font-size: 13px;
  padding-bottom: 7px;
}

.no-more {
  padding-bottom: 7px;
  text-align: center;
  font-size: 13px;
}

.image {
  width: 100%;
  display: block;
}

.date {
  font-size: 13px;
  color: #999;
}

.more-btn {
  float: right;
}
</style>