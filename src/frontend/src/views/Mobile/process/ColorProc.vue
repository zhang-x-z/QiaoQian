<template>
  <div class="color-proc">
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
    <el-main>
      <div class="img-container">
        <img :src="userImg" id="image" ref="image">
      </div>
    </el-main>
    <div class="range-container">
      <!-- 加入滑动输入条 -->
      <div class="range-bar">
        <mt-range v-model="rangeValue" :min="0" :max="100" :step="1" @change=handleChange>
          <div class="range-bar" slot="start">0</div>
          <div class="range-bar" slot="end">100</div>
        </mt-range>
      </div>
      <div class="range-value">
        <span>{{rangeValue}}</span>
      </div>
    </div>
    <el-footer class="tabs">
      <el-tabs class="modules" tab-position="bottom" @tab-click="handleClick" v-model="currentModule">
        <template v-for="item in modules">
          <el-tab-pane :label="item" :name="item">
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-footer>
  </div>
</template>
<script>
  import NavBar from 'components/common/Mobile/NavBar.vue'
  import screenshot from 'image-screenshot'
  export default {
    name: "ColorProc",
    components: {
      NavBar,
    },
    data() {
      return {
        modules: ['亮度', '饱和度', '对比度', '灰度', '透明度'],
        range: [50, 50, 50, 0, 100],
        rangeValue: 50,
        currentModule: '亮度',
        currentIndex: 0,
        savedImg: '',
      };
    },
    computed: {
      userImg() {
        return this.$store.state.editedImg;
      }
    },
    methods: {
      init() {
        this.rangeValue = 50;
        this.range[0] = this.range[1] = this.range[2] = 50;
        this.range[3] = 0;
        this.range[4] = 100;
        this.currentModule = '亮度';
        this.$refs.image.style.WebkitFilter = `
        brightness(${this.range[0] * 0.02}) saturate(${this.range[1] * 0.02}) contrast(${this.range[2] * 0.02}) 
        grayscale(${this.range[3] * 0.02}) opacity(${this.range[4] * 0.01})
        `;
      },
      back() {
        // 直接返回上层
        this.$router.back();
        // console.log('取消操作');
      },
      finish() {
        // console.log('保存图片!!');
        let width = this.$refs.image.offsetWidth
        let height = this.$refs.image.offsetHeight
        let refImg = this.$refs.image;
        screenshot(refImg).then((url) => {
          this.savedImg = url;
          // console.log('screenshot 保存成功');
          this.$store.commit('saveImg', this.savedImg);
          // console.log('savedImg:', this.savedImg);
        })
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
        if (index !== -1) {
          this.rangeValue = this.range[index];
        }
      },
      handleChange() {
        // console.log('change');
        // 保存当前色彩设置
        this.range[this.currentIndex] = this.rangeValue;
        this.$refs.image.style.WebkitFilter = `
        brightness(${this.range[0] * 0.02}) saturate(${this.range[1] * 0.02}) contrast(${this.range[2] * 0.02}) 
        grayscale(${this.range[3] * 0.02}) opacity(${this.range[4] * 0.01})
        `;
      },
    },
    activated() {
      this.init();
      // console.log('激活init？');
    }
  }
</script>
<style lang="css" scoped>
  .color-proc {
    /* 默认值居然不是100%高度 */
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    height: 78%;
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
    margin: 0px 12px;
  }

  .mt-range {
    width: 75vw;
  }

  .range-value {
    position: absolute;
    right: 22px;
    bottom: 5px;
    color: dimgray;

  }

  .modules {
    display: flex;
    overflow: hidden;
    overflow-x: scroll;
  }
</style>