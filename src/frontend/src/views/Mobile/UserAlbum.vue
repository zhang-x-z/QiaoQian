<template>
  <div class="album-wapper">
    <div class="navbar-wapper">
      <nav-bar>
        <div slot="left" @click="Back()">
          <i class="el-icon-caret-left"></i>
        </div>
        <div slot="center">我的相册</div>
        <div slot="right">
          <i class="el-icon-circle-plus" @click="showAddAlbum()"></i>
        </div>
      </nav-bar>
    </div>
    <!--add album dialog-->
    <el-dialog title="添加相册" :visible.sync="dialogFormVisible" width="70%">
      <el-form :model="formData" :rules="rules" ref="nameForm">
        <el-form-item label="相册名称" :label-width="'80px'" prop="albumName">
          <el-input maxlength="30" v-model="formData.albumName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain @click="dialogFormVisible = false">取 消</el-button>
        <el-button plain type="primary" @click="addAlbum()">确 定</el-button>
      </div>
    </el-dialog>

    <!--add album dialog-->
    <el-dialog title="相册信息" :visible.sync="albumDialogVisible" width="70%">
      <el-form :model="albumForm" :rules="albumRules" ref="albumForm">
        <el-form-item label="相册名称" :label-width="'80px'" prop="name">
          <el-input maxlength="30" v-model="albumForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <p style="margin-bottom: 10px;">照片数量：{{albumForm.size}}</p>
      <p>创建时间：{{albumForm.date}}</p>
      <div slot="footer" class="dialog-footer">
        <el-popconfirm
          confirmButtonText="确认"
          cancelButtonText="手抖了"
          icon="el-icon-warning"
          iconColor="red"
          title="确定删除该相册吗？"
          slot="button"
          @onConfirm="deleteAlbum()"
        >
          <el-button plain slot="reference" style="margin-right:3vh;" type="danger">删 除</el-button>
        </el-popconfirm>
        <el-button plain type="primary" @click="changeName()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="album-content">
      <div class="scroll-wapper" ref="scroll">
        <div class="scroll-content">
          <!-- <el-image v-for="item in albumInfo" :key="item.id" :src="item.url"></el-image> -->
          <album-card v-for="item in albumInfo" :key="item.id" style="margin-bottom:16px;">
            <el-image
              :fit="'cover'"
              :src="item.url"
              @load="onLoadSuccess"
              @error="onLoadError"
              slot="image"
              class="image"
              @click="toAlbumMore(item)"
            ></el-image>
            <span slot="title">{{item.name}}</span>
            <span slot="describe" class="date">{{item.date + '创建'}}</span>
            <i slot="button" class="el-icon-more more-btn" @click="showAlbumDialog(item)"></i>
          </album-card>
        </div>
      </div>
    </div>
    <!-- <div class="album-content" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
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
          </album-card>
        </el-col>
      </el-row>
      <div v-if="loading" class="load-more">
        <i class="el-icon-loading"></i>
        <span>加载中...</span>
      </div>
      <p v-if="noMore" class="no-more">没有更多了</p>
    </div>-->
  </div>
</template>

<script>
import NavBar from '@/components/common/Mobile/NavBar'
import AlbumCard from '@/components/album/AlbumCard'
import BScroll from 'better-scroll'
import axios from 'axios'
import { baseurl } from '@/utils.js'
//TODO: need to change
axios.defaults.baseURL = baseurl()

const options = {
  click: true,
  scrollbar: {
    fade: true,
    interactive: true
  }
}

export default {
  name: 'user-album',
  data () {
    return {
      albumInfo: [],
      dialogFormVisible: false,
      albumDialogVisible: false,
      formData: {
        albumName: ''
      },
      albumForm: {
        id: '',
        name: '',
        size: '',
        date: ''
      },
      albumRules: {
        name: [{
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('相册名不能为空！'))
            } else {
              //XXX: test
              let curr_id = this.albumForm.id
              let ans = this.albumInfo.filter(item => { return (item.name === value) && (item.id !== curr_id) }).length
              if (ans !== 0) {
                callback(new Error('您已经有该名称的相册啦'))
              } else {
                callback()
              }
            }
          }
        }]
      },
      rules: {
        albumName: [
          {
            required: true,
            trggier: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('相册名不能为空！'))
              } else {
                if (this.albumInfo.filter(item => { return item.name === value }).length !== 0) {
                  callback(new Error('您已经有该名称的相册啦'))
                } else {
                  callback()
                }
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    albumInfo () {
      setTimeout(() => {
        // console.log('refresh')
        this.bs.refresh()
      }, 20)
    }
  },
  activated () {
    if (this.bs) {
      setTimeout(() => {
        this.bs.refresh()
      }, 20)
    }
  },
  mounted () {
    //XXX: test
    // console.log('user album mounted')
    if (!this.$store.state.isLogin) {
      this.$router.push('/')
      return
    }
    //TODO: axios request
    axios.get('user/getAllAlbumsInfo/', {
      params: {
        user_id: this.$store.state.user.userID
      },
      timeout: 5000
    }).then(res => res.data).then(data => {
      let error_code = data.error_code
      if (error_code === 0) {
        this.albumInfo = data.AlbumsInfo
      } else if (error_code === 1006) {
        this.$message.error('数据获取失败，请稍后再试')
      }
    }).catch(err => {
      console.log(err)
      this.$message.error('数据获取失败，请检查您的网络连接')
    })
    setTimeout(() => {
      this.bs = new BScroll(this.$refs.scroll, options)
      // console.log(this.bs)
    }, 20)
  },
  components: {
    NavBar,
    AlbumCard
  },
  computed: {
  },
  methods: {
    showAddAlbum () {
      this.formData.albumName = ''
      this.dialogFormVisible = true
    },
    onLoadSuccess (e) {
      // console.log('load success')
      setTimeout(() => {
        // console.log('refresh')
        this.bs.refresh()
      }, 20)
    },
    onLoadError (e) {
      // console.log('load error')
      setTimeout(() => {
        // console.log('refresh')
        this.bs.refresh()
      }, 20)
    },
    addAlbum () {
      this.$refs.nameForm.validate(valid => {
        if (valid) {
          // TODO: add
          // console.log('add album')
          let form = new FormData()
          form.append('album_name', this.formData.albumName)
          form.append('user_id', this.$store.state.user.userID)
          axios.post('user/add-album/', form, {
            timeout: 2000
          }).then(res => {
            let error_code = res.data.error_code
            if (error_code === 0) {
              let new_info = res.data.album_info
              this.bs.scrollTo(0, 0, 100)
              // console.log(new_info)
              this.albumInfo.unshift(new_info)
              this.$message.success('添加成功!')
              this.dialogFormVisible = false
            } else if (error_code === 1006) {
              this.$message.error('添加失败，请您稍后再试~')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('添加失败，请您检查您的网络连接')
          })
        } else {
          this.$message.error('您输入的信息有误!')
        }
      })
    },
    Back () {
      // TODO: judge length of history
      this.$router.back(-1)
      // console.log('back')
    },
    toAlbumMore (info) {
      // TODO: need to fix
      this.$store.commit('changeCurrentAlbum', info)
      this.$router.push('/album-page')
    },
    changeName () {
      this.$refs.albumForm.validate(valid => {
        if (valid) {
          if (this.albumForm.name === this.selectedAlbum.name) {
            this.dialogFormVisible = false
            return
          }

          // TODO: change album name via vuex (axios)
          let form = new FormData()
          form.append('user_id', this.$store.state.user.userID)
          form.append('album_id', this.albumForm.id)
          form.append('album_name', this.selectedAlbum.name)
          form.append('album_new_name', this.albumForm.name)
          axios.post('user/change-album-name/', form, {
            timeout: 2000
          }).then(res => res.data).then(data => {
            let error_code = data.error_code
            if (error_code === 0) {
              this.selectedAlbum.name = this.albumForm.name
              this.albumDialogVisible = false
              this.$message.success('修改成功!')
            } else if (error_code === 1006) {
              this.$message.error('修改失败，请您稍后再试')
            }
          }).catch(err => {
            console.log(err)
            this.$message.error('修改失败，请检查您的网络连接')
          })
        } else {
          this.$message.error('您输入的信息有误!')
        }
      })
    },
    showAlbumDialog (item) {
      // console.log(item)
      this.albumForm.name = item.name
      this.albumForm.id = item.id
      this.albumForm.size = item.size
      this.albumForm.date = item.date
      this.selectedAlbum = item
      this.albumDialogVisible = true
    },
    deleteAlbum () {
      // TODO: axios requests
      // console.log(this.albumInfo)
      let index = 0
      for (let i = 0; i < this.albumInfo.length; i++) {
        if (this.selectedAlbum.id === this.albumInfo[i].id) {
          index = i
          break
        }
      }

      let form = new FormData()
      form.append('user_id', this.$store.state.user.userID)
      form.append('album_name', this.selectedAlbum.name)
      axios.post('user/delete-album/', form, {
        timeout: 2000
      }).then(res => {
        let error_code = res.data.error_code
        if (error_code === 0) {
          this.$message.success('删除成功!')
          this.albumInfo.splice(index, 1)
          this.albumDialogVisible = false
        } else if (error_code === 1006) {
          this.$message.error('删除失败，请稍后再试')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败，请检查您的网络连接')
      })
    }
  }
}
</script>

<style lang="css" scoped>
.album-wapper {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #eeeeee;
}

.album-content {
  height: 93vh;
}

.scroll-wapper {
  height: 93vh;
  overflow: hidden;
}

.scroll-content {
  padding: 3vh 3vh 3vh 3vh;
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