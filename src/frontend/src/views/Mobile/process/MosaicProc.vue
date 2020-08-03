<template>
  <div class="mosaic-proc">
    <el-header>
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-close" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>马赛克</span>
        </template>
        <template v-slot:right>
          <i class="el-icon-check" @click="finish"></i>
        </template>
      </nav-bar>
    </el-header>
    <el-main>
      <div class="img-container" ref="imgContainer">
        <!-- 移动端手指移动事件 -->
        <canvas :width="width" :height="height" ref="canvas" @touchstart="handleDrawBegin"
          @touchmove="handleDrawMove"></canvas>
      </div>
    </el-main>
    <div class="range-container">
      <!-- 加入滑动输入条 -->
      <div class="range-bar">
        <mt-range v-model="rangeValue" :min="1" :max="10" :step="1">
          <div class="range-bar" slot="start">1</div>
          <div class="range-bar" slot="end">10</div>
        </mt-range>
      </div>
      <div class="range-value">
        <span>画笔大小：{{rangeValue}}</span>
      </div>
    </div>
    <el-footer class="tabs">
      <div class="button-group">
        <el-button plain @click="handleCancel" icon="el-icon-back"></el-button>
        <el-button plain @click="handleRedo" icon="el-icon-right"></el-button>
        <el-button plain @click="handleClear" icon="el-icon-refresh-right"></el-button>
      </div>
    </el-footer>
  </div>
</template>
<script>
  import NavBar from 'components/common/Mobile/NavBar.vue'
  import { debounce } from '@/utils.js';
  export default {
    name: "MosaicProc",
    components: {
      NavBar,
    },
    data() {
      return {
        savedImg: '',
        userImg: '',
        width: 0,// 画布宽度
        height: 0,// 画布高度
        canvas: null,
        context: null,
        imgWidth: 0,//保存图片时用此参数清除画布多余部分
        imgHeight: 0,
        imgX: 0,
        imgY: 0,
        rangeValue: 3, // 马赛克的大小
        mosaicNum: 12, // 一次操作包含马赛克的个数
        lastImgArr: [],// 图片缓存，用于撤销操作
        redoImgArr: [], // 用于重做操作
        imgObj: {},// 存储图片对象
        dx: 0, // 保存用户手指坐标
        dy: 0,

      };
    },
    methods: {
      init() {
        this.rangeValue = 3;
        this.userImg = this.$store.state.editedImg;
        this.width = this.$refs.imgContainer.offsetWidth;
        this.height = this.$refs.imgContainer.offsetHeight;
        this.canvas = this.$refs.canvas;
        this.context = this.canvas.getContext('2d');
        // 清空画布，避免上次的图片还保存在画布上
        this.context.clearRect(0, 0, this.width, this.height);
        this.imgObj = new Image();
        this.imgObj.crossOrigin = 'anonymous';// 解决跨域问题，是否有用未知
        this.imgObj.src = this.userImg;
        this.imgObj.onload = () => {
          // 计算出图片自适应画布大小的宽高和起始位置，然后绘制图片
          [this.imgWidth, this.imgHeight, this.imgX, this.imgY] = this.resize(this.imgObj.width, this.imgObj.height);
          this.context.drawImage(this.imgObj, this.imgX, this.imgY, this.imgWidth, this.imgHeight)// //第一个参数不能写this，而是要写imgObj，这里的this返回的是vue组件
        };
        // 清空历史操作
        this.lastImgArr = [];
        this.redoImgArr = [];
      },
      resize(imgWidth, imgHeight) {
        let resizeWidth, resizeHeight, x, y; //x,y为画布绘制图片的左上角坐标
        // 图片宽高小于画布时不做任何缩放
        if (imgWidth <= this.width && imgHeight <= this.height) {
          resizeWidth = imgWidth;
          resizeHeight = imgHeight;
          x = (this.width - resizeWidth) / 2;
          y = (this.height - resizeHeight) / 2;
        }
        else {
          if (imgWidth / imgHeight >= this.width / this.height) { // 原图宽高比大于画布宽高比
            resizeWidth = this.width; // 以画布宽度为标准
            resizeHeight = this.width * (imgHeight / imgWidth);
            x = 0;
            y = (this.height - resizeHeight) / 2;
          }
          else {
            resizeHeight = this.height; // 以画布高度为标准
            resizeWidth = this.height * (imgWidth / imgHeight);
            x = (this.width - resizeWidth) / 2;
            y = 0;
          }
        }
        return [resizeWidth, resizeHeight, x, y];
      },
      back() {
        // 直接返回上层
        this.$router.back();
        // console.log('取消操作');
      },
      finish() {
        // console.log('保存图片!!');
        // 截取原图片像素信息到等宽高的画布上，然后保存为图片
        const imgData = this.context.getImageData(this.imgX, this.imgY, this.imgWidth, this.imgHeight);
        // console.log(this.imgX, this.imgY, this.imgWidth, this.imgHeight);
        let savedCanvas = document.createElement('canvas');
        // canvas一定要手动设置宽高，否则默认为300x150
        savedCanvas.width = this.imgWidth;
        savedCanvas.height = this.imgHeight;
        let savedContext = savedCanvas.getContext('2d');
        savedContext.putImageData(imgData, 0, 0, 0, 0, this.imgWidth, this.imgHeight);
        this.savedImg = savedCanvas.toDataURL();// 保存为base64格式
        this.$store.commit('saveImg', this.savedImg);
        this.$router.back();
      },

      // 马赛克方法
      // 按下鼠标
      handleDrawBegin(event) {
        // console.log('按下鼠标');
        // 每次下笔前先保存
        this.lastImgArr.push(this.context.getImageData(0, 0, this.width, this.height));
        let e = event.targetTouches[0]
        let dx = e.pageX.toFixed(0) - this.canvas.offsetLeft;
        let dy = e.pageY.toFixed(0) - this.canvas.offsetTop;
        this.dx = dx;
        this.dy = dy;
        this.drawLine(dx, dy);
      },

      // 移动鼠标
      handleDrawMove(event) {
        // console.log('移动手机端鼠标');
        let e = event.targetTouches[0];
        // console.log('moveX', e.pageX);
        let mx = e.pageX.toFixed(0) - this.canvas.offsetLeft;
        let my = e.pageY.toFixed(0) - this.canvas.offsetTop;
        if (Math.pow(this.dx - mx, 2) + Math.pow(this.dy - my, 2) >= Math.pow(this.rangeValue * this.mosaicNum, 2) / 3) { //(马赛克大小*马赛克个数*2)的平方
          this.drawLine(mx, my);
          this.dx = mx;
          this.dy = my;
        }
      },
      // 撤销修改
      handleCancel() {
        if (this.lastImgArr.length) {
          let tempImg = this.context.getImageData(0, 0, this.width, this.height);
          this.context.putImageData(this.lastImgArr.pop(), 0, 0);
          this.redoImgArr.push(tempImg);
        }
        // console.log('撤销');
      },
      //重做
      handleRedo() {
        // console.log('重做');
        if (this.redoImgArr.length) {
          let tempImg = this.context.getImageData(0, 0, this.width, this.height);
          this.context.putImageData(this.redoImgArr.pop(), 0, 0);
          this.lastImgArr.push(tempImg)
        }
      },
      // 清空
      handleClear() {
        // 拿到lastImgArr的栈底元素即可
        if (this.lastImgArr.length) {
          let tempImg = this.lastImgArr.shift();
          this.context.putImageData(tempImg, 0, 0);
          this.lastImgArr = [];
          this.redoImgArr = [];
        }
      },
      // 绘制马赛克
      drawLine(dx, dy) {
        //原始图像
        let originalImgData = this.context.getImageData(0, 0, this.width, this.height);
        let originalPxData = originalImgData.data;

        //用于循环修改
        let modifyImgData = this.context.getImageData(0, 0, this.width, this.height);
        let modifyPxData = modifyImgData.data;

        const quan = this.rangeValue;
        const num = this.mosaicNum;
        for (let i = dx - quan * num; i < dx + quan * num; i = i + 2 * quan + 1) {
          for (let j = dy - quan * num; j < dy + quan * num; j = j + 2 * quan + 1) { //中心点(dx,dy) //
            if (Math.pow(i - dx, 2) + Math.pow(j - dy, 2) <= Math.pow(quan * num / 2, 2)) {
              if (!((i == dx - quan * num && j == dy - quan * num) || (i == dx - quan * num && j == dy - quan * num + 2 * quan + 1) ||
                (i == dx - quan * num && j == dy - quan * num + 4 * quan + 2) || (i == dx - quan * num && j == dy - quan * num + 12 * quan + 6) ||
                (i == dx - quan * num && j == dy - quan * num + 14 * quan + 7) || (i == dx - quan * num && j == dy - quan * num + 16 * quan + 8) ||
                (i == dx - quan * num + 16 * quan + 8 && j == dy - quan * num) || (i == dx - quan * num + 16 * quan + 8 && j == dy - quan * num + 2 * quan + 1) ||
                (i == dx - quan * num + 16 * quan + 8 && j == dy - quan * num + 4 * quan + 2) || (i == dx - quan * num + 16 * quan + 8 && j == dy - quan * num + 12 * quan + 6) ||
                (i == dx - quan * num + 16 * quan + 8 && j == dy - quan * num + 14 * quan + 7) || (i == dx - quan * num + 16 * quan + 8 && j == dy - quan * num + 16 * quan + 8) ||
                (i == dx - quan * num + 2 * quan + 1 && j == dy - quan * num) || (i == dx - quan * num + 4 * quan + 2 && j == dy - quan * num) ||
                (i == dx - quan * num + 12 * quan + 6 && j == dy - quan * num) || (i == dx - quan * num + 14 * quan + 7 && j == dy - quan * num) ||
                (i == dx - quan * num + 2 * quan + 1 && j == dy - quan * num + 16 * quan + 8) || (i == dx - quan * num + 4 * quan + 2 && j == dy - quan * num + 16 * quan + 8) ||
                (i == dx - quan * num + 12 * quan + 6 && j == dy - quan * num + 16 * quan + 8) || (i == dx - quan * num + 14 * quan + 7 && j == dy - quan * num + 16 * quan + 8))) {
                let sumR = 0; let sumG = 0; let sumB = 0; //找他周围的元素
                for (let x = -quan; x <= quan; x++) {
                  for (let y = -quan; y <= quan; y++) {
                    let xx = i + x; let yy = j + y; let pp = yy * this.width + xx; //周围的元素。
                    sumR += originalPxData[pp * 4 + 0];
                    sumG += originalPxData[pp * 4 + 1];
                    sumB += originalPxData[pp * 4 + 2];
                  }
                }
                let total = (2 * quan + 1) * (2 * quan + 1);
                let avgR = sumR / total; let avgG = sumG / total; let avgB = sumB / total;
                for (let x = -quan; x <= quan; x++) {
                  for (let y = -quan; y <= quan; y++) {
                    let xx = i + x;
                    let yy = j + y;
                    let pp = yy * this.width + xx; //周围的元素。
                    modifyPxData[pp * 4 + 0] = avgR; modifyPxData[pp * 4 + 1] = avgG; modifyPxData[pp * 4 + 2] = avgB;
                  }
                }
              }
            }
          }
          this.context.putImageData(modifyImgData, 0, 0, 0, 0, this.width, this.height);
        }
      }

    },
    activated() {
      this.init();
      // console.log('激活init？');
    }

  }
</script>
<style lang="css" scoped>
  .mosaic-proc {
    /* 默认值居然不是100%高度 */
    height: 100%;
  }

  .el-header {
    padding: 0;
  }

  .el-main {
    height: 72%;
    display: flex;
    align-items: center;
  }

  .img-container {
    display: flex;
    align-items: center;
    object-fit: scale-down;
    height: 100%;
    width: 100%;
    margin: 0 auto;
  }

  #image {
    max-height: 100%;
    max-width: 100%;
  }

  .el-footer {
    /* position: absolute;
    bottom: -10.2px; */
    max-width: 100%;
    display: flex;
    align-items: center;

  }

  .range-container {
    position: relative;
    /* display:flex; */
    margin: 0px 10px 10px 10px;
    /* align-items: center; */

  }

  .range-bar {
    margin: 0 10px;
  }

  .mt-range {
    width: 60vw;
  }

  .range-value {
    position: absolute;
    right: 20px;
    bottom: 5px;
    color: dimgray;
  }

  .button-group {
    position: absolute;
    left: 30px;
    bottom: 20px;
  }

  .el-button--small {
    padding: 2px;
    width: 25px;
    height: 25px;
    font-size: 20px;
  }
</style>