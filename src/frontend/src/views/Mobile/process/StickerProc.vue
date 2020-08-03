<template>
  <div class="sticker-proc">
    <el-header>
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-close" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>{{currentModule}}</span>
        </template>
        <template v-slot:right>
          <i class="el-icon-check" @click="finish"></i>
        </template>
      </nav-bar>
    </el-header>




    <div class="page-wrapper" @click.self="clickOutArea">
        <ul v-clickoutside="close">
          <li v-for="(url, index) in fingerDatas">
            <Finger :imgSrc="url.imgUrl" :index="index" :isActive="url.isActive" @deleteElemet="parentDelete"
              @tapSelect="parentTapSelect" :clientTop="clientTop" :clientLeft="clientLeft"></Finger>
          </li>
        </ul>
        <div style="margin: 0 auto" @click="pop">
          <h1>弹框</h1>
        </div>
        <Pop v-model="isVisible1" position="bottom" class="mint-popup-4" @input="currentValue"
          :closeOnClickModal="true">
          <div class="control">
            <i @click="cancelImg" class="el-icon-close"></i>
            <p>选择贴纸</p>
            <i @click="addImg" class="el-icon-check" style="color: #34cf66"></i>
          </div>
          <swipe :auto="0" @swipeFinish="swipedOrClose">
            <swipe-item v-for="(item, index) in stickerList" :key="index">
              <ImgTable :imgSrcs="item" @selectIndex="addImgTouchLi" :isSwipeFinish="isSwiped"></ImgTable>
            </swipe-item>
          </swipe>
        </Pop>
      </div>




    <div @click="handlePopupClick">
      <el-main>
        <div class="img-container">
          <img :src="userImg" id="image" ref="image">
        </div>
      </el-main>
    </div>




    <el-footer class="tabs">
      <el-tabs class="modules" tab-position="bottom" @tab-click="handleClick" v-model="currentModule">
        <template v-for="item in modules">
          <el-tab-pane :label="item" :name="item">
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-footer>

    <!-- Popup -->
    <mt-popup v-model="isVisible1" position="bottom" :modal=false>
      <div class="control">
        <i @click="cancelImg" class="el-icon-close"></i>
        <span>选择贴纸</span>
        <i @click="addImg" class="el-icon-check" style="color: #34cf66"></i>
      </div>
      <span>测试</span>
      <swipe :auto="0" @swipeFinish="swipedOrClose">
        <swipe-item v-for="(item, index) in stickerList" :key="index">
          <ImgTable :imgSrcs="item" @selectIndex="addImgTouchLi" :isSwipeFinish="isSwiped"></ImgTable>
        </swipe-item>
      </swipe>
    </mt-popup>
    <mt-popup v-model="isVisible2" position="bottom" :modal=false>
      <div>
        <h1>2</h1>
        <h1>2</h1>
        <h1>2</h1>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import NavBar from 'components/common/Mobile/NavBar.vue'
  import Finger from 'components/process/photoFinger/finger.vue';
  import Pop from 'components/process/photoFinger/popup/popup.vue';
  import Swipe from 'components/process/photoFinger/swipe/swipe.vue';
  import SwipeItem from 'components/process/photoFinger/swipe/swipe-item.vue';
  import ImgTable from 'components/process/photoFinger/grid/table.vue';
  import bianji from 'assets/img/bianji.svg'//测试图片
  export default {
    name: "StickerProc",
    components: {
      NavBar,
      Finger,
      Pop,
      Swipe,
      SwipeItem,
      ImgTable
    },
    data() {
      return {
        modules: ['贴纸库', '我的贴纸'],
        stickerList: [],
        currentModule: '贴纸库',
        currentIndex: 0,
        savedImg: '',
        isVisible1: false, // 检测到贴纸移动的时候自动隐藏选择面板
        isVisible2: false,
        selectImgUrl: '',
        isVisible1: false,
        fingerData: { imgUrl: "", isActive: false },
        fingerDatas: [],
        currentSelectFinger: 0,
        isShown: true,
        isSwiped: false,
        clientTop: 0,
        clientLeft: 0,
        bianji // 测试图片
      };
    },
    computed: {
      userImg() {
        return this.$store.state.editedImg;
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        // get贴纸库图片
        // 如果用户登录，get用户自定义贴纸库图片
        //测试图片
        let imgUrls = [
          [{ imgUrl: this.bianji, select: false },
          { imgUrl: this.bianji, select: false },
          { imgUrl: this.bianji, select: false },
          { imgUrl: this.bianji, select: false },
          { imgUrl: this.bianji, select: false },
          { imgUrl: this.bianji, select: false },
          { imgUrl: this.bianji, select: false },
          { imgUrl: this.bianji, select: false }
          ],
          [{ imgUrl: this.bianji, select: false }
          ]
        ];
        this.stickerList = imgUrls;
        this.clientLeft = window.innerWidth / 2 - 30;
        this.clientTop = window.innerHeight / 3 - 30;
        console.log(this.bianji);
      },
      back() {
        // 直接返回上层
        this.$router.back();
        console.log('取消操作');
      },
      finish() {
        console.log('保存图片!!');
        // 尺寸
        let width = this.$refs.image.offsetWidth
        let height = this.$refs.image.offsetHeight
        let refImg = this.$refs.image;
        // screenshot(refImg).then((url) => {
        //   this.savedImg = url;
        //   console.log('screenshot 保存成功');
        //   this.$store.commit('saveImg', this.savedImg);
        //   console.log('savedImg:', this.savedImg);
        // })
        // html2canvas(refImg,{
        //   allowTaint:true,
        //   width:width,
        //   height:height
        // }).then((canvas)=>{
        //   this.savedImg=canvas.toDataURL('image/jpeg');
        //   console.log('http2canvas 保存成功');
        //   this.$store.commit('saveImg',this.savedImg);
        //   console.log('savedImg:',this.savedImg);

        // })
        this.$router.back();
      },
      handleClick() {
        let index = this.modules.findIndex(value => value == this.currentModule);
        this.currentIndex = index;
        if (this.currentIndex == 0) {
          this.isVisible1 = true;
          this.isVisible2 = false;
        }
        else {
          this.isVisible2 = true;
          this.isVisible1 = false;
        }
      },
      handleChange() {
        console.log('change');
      },
      handlePopupClick() {
        console.log('handlePopupClick');
        if (this.isVisible1 || this.isVisible2) {
          this.isVisible1 = this.isVisible2 = false;
        }
      },


      pop: function () {
        this.isVisible1 = !this.isVisible1;
      },
      close: function () {

      },
      currentValue: function (val) {
        this.swipedOrClose();
      },
      addImgTouchLi: function (index, url) {
        this.selectImgUrl = url;
      },
      addImg: function () {
        if (this.selectImgUrl.length > 0) {
          this.reductionFingerData();
          let data = { imgUrl: this.selectImgUrl, isActive: true };
          this.fingerDatas.push(data);
        }
        this.isVisible1 = false;
      },
      cancelImg: function () {
        this.isVisible1 = false;
      },
      parentDelete: function (isShown) {
        this.fingerDatas.splice(this.currentSelectFinger, 1);
      },
      swipedOrClose: function () {
        this.isSwiped = !this.isSwiped;
      },
      tapActive: function (index) {
        alert(index);
      },
      clickOutArea: function () {
        this.reductionFingerData();
      },
      reductionFingerData: function () {
        this.fingerDatas.forEach(function (value) {
          value.isActive = false;
        });
      },
      parentTapSelect: function (index) {
        this.reductionFingerData();
        this.currentSelectFinger = index;
        this.fingerDatas[index].isActive = true;
      }
    },
    activated() {

      console.log('激活init？');
    }
  }
</script>
<style lang="css" scoped>
  .sticker-proc {
    /* 默认值居然不是100%高度 */
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    height: calc(90vh - 80px);
    display: flex;
    align-items: center;
  }

  .img-container {
    display: flex;
    align-items: center;
    object-fit: scale-down;
    height: 100%;
    margin: 0 auto;
  }

  #image {
    max-height: 100%;
    max-width: 100%;
  }

  .el-image {
    height: 100%;
  }

  .el-footer {
    position: absolute;
    bottom: -10.2px;
    max-width: 100%;

  }

  .range-container {
    position: relative;
    /* display:flex; */
    margin: 0px 10px 10px 10px;
    /* align-items: center; */

  }

  .range-bar {
    margin: 0px 40px 0px 15px;
  }

  .range-value {
    position: absolute;
    right: 10px;
    bottom: 5px;
  }

  .modules {
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
  }

  .mint-popup {
    width: 100%;
    background: rgba(95, 194, 144, 0.37)
  }

  .mint-popup-bottom {
    bottom: 40px;
  }

  div.finger {
    position: absolute;
  }

  .page-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 20px;
    color: #26a2ff;
  }

  .mint-popup-4 {
    width: 100%;
    height: 275px;
  }

  .mint-popup-4 h1 {
    backface-visibility: hidden;
  }

  .control {
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 10px 0 10px;
  }
</style>