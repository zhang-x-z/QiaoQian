<template>
  <el-card :body-style="{ padding: '0px' }" shadow="always">
    <slot name="image"></slot>
    <!--<el-image :fit="'cover'" :src="albumUrl" class="image"></el-image>-->
    <div style="padding: 14px;">
      <slot name="title"></slot>
      <!--<span>{{albumName}}</span>-->
      <div class="bottom clearfix">
      <!--<div class="bottom">-->
        <slot name="describe"></slot>
        <slot name="button"></slot>
        <!--<span class="date">{{albumDate + '创建'}}</span>-->
        <!--<i class="el-icon-more more-btn" @click="toAlbumMore()"></i>-->
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  // data () {
  //   return {
  //     store: this.$store
  //   }
  // },
  // props: {
  //   albumId: '',
  //   albumName: '',
  //   albumUrl: '',
  //   albumDate: ''
  // },
  // methods: {
  //   toAlbumMore () {
  //     //TODO: to album details
  //     console.log(this)
  //     console.log(this.albumId)
  //     this.store.commit('changeCurrentAlbum', {
  //       id: this.albumId,
  //       name: this.albumName
  //     })
  //   }
  // }
}
</script>

<style scoped>
/* .image {
  width: 100%;
  display: block;
} */

/* .date {
  font-size: 13px;
  color: #999;
} */

/* .more-btn {
  float: right;
} */

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
</style>