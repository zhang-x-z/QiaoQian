<template>
  <div class="photo-wall-wapper">
    <!--image information dialog-->
    <el-dialog title="详细信息" :visible.sync="dialogFormVisible" width="70%">
      <p>图片名称：{{currentImage.name}}</p>
      <p style="margin-bottom: 10px;">图片大小：{{currentImage.size}}</p>
      <p>上传时间：{{currentImage.date}}</p>
      <div slot="footer" class="dialog-footer">
        <el-popconfirm
          confirmButtonText="确认"
          cancelButtonText="手抖了"
          icon="el-icon-warning"
          iconColor="red"
          title="确定删除该图片吗？"
          slot="button"
          @onConfirm="deletePhoto()"
        >
          <el-button plain slot="reference" style="margin-right:3vh;" type="danger">删 除</el-button>
        </el-popconfirm>
        <el-button plain type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <div class="scroll-wapper" ref="scroll">
      <div class="scroll-content">
        <album-card
          v-for="item in imageInfo"
          :key="item.id"
          style="margin-bottom: 5%; margin-right: 1.3%; margin-left: 1.3%; width: 30%; height:20%"
        >
          <el-image
            :fit="'cover'"
            :src="item.url"
            @load="onLoadSuccess"
            @error="onLoadError"
            slot="image"
            class="image"
            :preview-src-list="imageUrls"
          ></el-image>
          <i slot="describe" class="el-icon-more more-btn" @click="showImageInfo(item)"></i>
          <i
            v-if="canEdit"
            slot="button"
            class="el-icon-magic-stick edit-btn"
            @click="toEdit(item)"
          ></i>
        </album-card>
      </div>
    </div>
    <!-- <div class="photo-wall" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <album-card
        v-for="i in count"
        :key="i"
        style="margin-bottom: 5%; margin-right: 1.3%; margin-left: 1.3%; width: 30%; height:20%"
      >
        <el-image
          :fit="'cover'"
          :src="imageInfo[i - 1].url"
          slot="image"
          class="image"
          :preview-src-list="imageUrls"
        ></el-image>
        <i slot="describe" class="el-icon-more more-btn" @click="showImageInfo(imageInfo[i - 1])"></i>
        <i
          v-if="canEdit"
          slot="button"
          class="el-icon-magic-stick edit-btn"
          @click="toEdit(imageInfo[i - 1])"
        ></i>
      </album-card>
    </div>
    <div class="footer">
      <div v-if="loading" class="load-more">
        <i class="el-icon-loading"></i>
        <span>加载中...</span>
      </div>
      <p v-if="noMore" class="no-more">没有更多了</p>
    </div>-->
  </div>
</template>

<script>
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
    interactive: false
  }
}

export default {
  data () {
    return {
      dialogFormVisible: false,
      currentImage: {}
    }
  },
  props: {
    imageInfo: Array,
    canEdit: false
  },
  watch: {
    imageInfo () {
      setTimeout(() => {
        this.bs.refresh()
      }, 20)
    }
  },
  computed: {
    imageUrls () {
      return this.imageInfo.map(item => item.url)
    }
  },
  mounted () {
    setTimeout(() => {
      this.bs = new BScroll(this.$refs.scroll, options)
    }, 20)
  },
  components: {
    AlbumCard
  },
  methods: {
    onLoadSuccess (e) {
      setTimeout(() => {
        this.bs.refresh()
      }, 20)
    },
    onLoadError (e) {
      setTimeout(() => {
        this.bs.refresh()
      }, 20)
    },
    toEdit (info) {
      // TODO: to edit page
      axios.get('user/get-image-base64/', {
        params: {
          image_id: info.id
        },
        timeout: 3000
      }).then(res => {
        let error_code = res.data.error_code
        if (error_code === 0) {
          let img = res.data.image
          this.$store.commit('saveImg', img)
          this.$router.push('/imgProc')
        } else if (error_code === 1006) {
          this.$message.error('获取图片失败，请稍后再试')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('获取图片失败，请检查您的网络连接')
      })
    },
    showImageInfo (info) {
      this.currentImage = info
      this.dialogFormVisible = true
    },
    deletePhoto () {
      // TODO: axios request serve
      if (this.canEdit) {
        let form = new FormData()
        form.append('user_id', this.$store.state.user.userID)
        form.append('album_id', this.$store.state.currentAlbumInfo.id)
        form.append('image_id', this.currentImage.id)
        axios.post('user/delete-image/', form, {
          timeout: 3000
        }).then((result) => {
          let error_code = result.data.error_code
          if (error_code === 0) {
            let res = -1
            for (let i = 0; i < this.imageInfo.length; i++) {
              if (this.imageInfo[i].id === this.currentImage.id) {
                res = i
                break
              }
            }

            this.imageInfo.splice(res, 1)
            this.$store.commit('updateAlbum', {
              num: -1,
              url:result.data.album_cover_url
            })
            this.$message.success('删除成功!')
            this.dialogFormVisible = false
          } else if (error_code === 1006) {
            this.$message.error('删除失败，请您稍后再试')
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error('删除失败，请检查您的网络连接')
        })
      } else {
        //XXX： test
        // console.log('delete sticker')
        let form = new FormData()
        form.append('user_id', this.$store.state.user.userID)
        form.append('sticker_id', this.currentImage.id)
        axios.post('user/delete-sticker/', form, {
          timeout: 3000
        }).then((result) => {
          let error_code = result.data.error_code
          if (error_code === 0) {
            let res = -1
            for (let i = 0; i < this.imageInfo.length; i++) {
              if (this.imageInfo[i].id === this.currentImage.id) {
                res = i
                break
              }
            }

            this.imageInfo.splice(res, 1)
            this.$message.success('删除成功!')
            this.dialogFormVisible = false
          } else if (error_code === 1006) {
            this.$message.error('删除失败，请您稍后再试')
          }
        }).catch((err) => {
          console.log(err)
          this.$message.error('删除失败，请检查您的网络连接')
        })
      }
    }
  }
}
</script>

<style scoped>
.photo-wall-wapper {
  position: relative;
  height: 93vh;
}

.scroll-wapper {
  height: 93vh;
  overflow: hidden;
}

.scroll-content {
  padding: 3vh 3vh 3vh 3vh;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

/* .photo-wall {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 5px;
} */

.image {
  display: block;
  width: 30vh;
  height: 15vh;
}

.more-btn {
  float: left;
}

.edit-btn {
  float: right;
}

/* .load-more {
  text-align: center;
  font-size: 13px;
  padding-bottom: 7px;
}

.no-more {
  padding-bottom: 7px;
  text-align: center;
  font-size: 13px;
} */
</style>