<template>
  <div class="mark-proc">
    <el-header>
      <nav-bar>
        <template v-slot:left>
          <i class="el-icon-close" @click="back"></i>
        </template>
        <template v-slot:center>
          <span>涂鸦笔</span>
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
        <mt-range v-model="rangeValue" :min="1" :max="10" :step="1" @change="handleChange">
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
      <el-color-picker v-model="penColor" :predefine="predefineColors"></el-color-picker>
    </el-footer>
  </div>
</template>
<script>
  import NavBar from 'components/common/Mobile/NavBar.vue'
  import { debounce } from '@/utils.js';
  export default {
    name: "MarkProc",
    components: {
      NavBar,
    },
    data() {
      return {
        savedImg: '',
        userImg: '',
        width: '',// 画布宽度
        height: '',// 画布高度
        canvas: null,
        context: null,
        imgWidth: 0,//保存图片时用此参数清除画布多余部分
        imgHeight: 0,
        imgX: 0,
        imgY: 0,
        rangeValue: 2, // 画笔的大小
        penColor: 'red',// 画笔颜色
        predefineColors: ['#FF0000', '#000000', '#008000', '#FFFF00', '#0000FF', '#A020F0', '#808080', '#A52A2A', '#D2B48C', '#00FFFF'],
        lastImgArr: [],// 图片缓存，用于撤销操作
        redoImgArr: [], // 用于重做操作
        imgObj: {},// 存储图片对象
        dx: 0, // 保存用户手指坐标
        dy: 0,
        mx: 0,
        my: 0,
        timestamp: 0,// 时间戳，用来追踪用户手指滑动快慢，用来改变笔触粗细
        maxV: 10,// 限定最大和最小速度
        minV: 0.1,
        lastLineWidth: -1,//用于光滑过渡
        maxLineWidth: 3,
        minLineWidth: 0.1,// 最小线粗

      };
    },
    methods: {
      init() {
        this.rangeValue = 2;
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

      // 按下鼠标
      handleDrawBegin(event) {
        // console.log('按下鼠标');
        // 每次下笔前先保存
        this.lastImgArr.push(this.context.getImageData(0, 0, this.width, this.height));
        let e = event.targetTouches[0]
        // console.log('pageX', e.pageX);
        this.dx = e.pageX.toFixed(0) - this.canvas.offsetLeft;
        this.dy = e.pageY.toFixed(0) - this.canvas.offsetTop;
        this.timestamp = new Date().getTime();
      },

      // 移动鼠标
      handleDrawMove(event) {
        // console.log('移动手机端鼠标');
        let e = event.targetTouches[0];
        // console.log('moveX', e.pageX);
        this.mx = e.pageX.toFixed(0) - this.canvas.offsetLeft;
        this.my = e.pageY.toFixed(0) - this.canvas.offsetTop;
        let currentTimestamp = new Date().getTime();
        let s = this.calcDistance();// 计算两点间距离
        let t = currentTimestamp - this.timestamp;// 计算两点间时间差
        this.lastLineWidth = this.calcLineWidth(s, t);
        this.drawLine();
        this.dx = this.mx;
        this.dy = this.my;
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
      handleChange() {
        // 每次改变画笔大小同时更新lineWidth
        this.lastLineWidth = this.rangeValue;
      },
      calcLineWidth(s, t) {
        const v = s / t; //获取速度
        let result;
        if (v <= this.minV) {// 速度越小，画笔越粗
          result = this.maxLineWidth;
        } else if (v >= this.maxV) {
          result = this.minLineWidth;
        } else {
          result = this.maxLineWidth - (v - this.minV) / (this.maxV - this.minV) * (this.maxLineWidth - this.minLineWidth);
        }

        if (this.lastLineWidth == -1) {// 开始画图
          // TODO:找到调节画笔比较合适的计算方法
          return result * this.rangeValue;
        } else {
          return (result * this.rangeValue) * 2 / 3 + this.lastLineWidth * 1 / 3;// lastLineWidth占的比重越大越平滑
        }
      },
      // 计算连续两点之间距离
      calcDistance() {
        return Math.sqrt(Math.pow(this.mx - this.dx, 2) + Math.pow(this.my - this.dy, 2));
      },
      // 绘制涂鸦
      drawLine() {
        this.context.beginPath();
        this.context.lineTo(this.dx, this.dy);
        this.context.lineTo(this.mx, this.my);
        this.context.lineWidth = this.lastLineWidth;
        this.context.lineCap = 'round';
        this.context.lineJoin = 'round';
        this.context.strokeStyle = this.penColor;
        // console.log('penColor', this.penColor);
        this.context.stroke();
      }

    },
    activated() {
      this.init();
      // console.log('激活init？');
    }

  }
</script>
<style lang="css" scoped>
  .mark-proc {
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

  .el-color-picker {
    position: absolute;
    right: 30px;
    bottom: 20px;
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