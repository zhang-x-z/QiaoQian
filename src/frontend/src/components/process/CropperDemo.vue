<template>
  <div class="demo">
    <p>预览</p>
    <div class="before"></div>
    <button style="margin: 30px auto;" type="error" @click="sureSava">裁剪</button>
    <button @click="startRotate">开始旋转</button>
    <button @click="rotate">旋转测试</button>
    <div class="container">
      <div class="img-container">
        <img :src="defaultImg" ref="image" alt="">
      </div>
      <div class="afterCropper">
        <img :src="afterImg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.css';
  import defaultImg from 'img/theme5.jpg';

  export default {
    name: 'CropperDemo',
    data() {
      return {
        myCropper: null,
        afterImg: '',
        width:0,
        height:0,
        defaultImg
      }
    },
    mounted() {
      this.init();
      // this.myCropper.setAspectRatio(0);
    },
    methods: {
      init() {
        this.myCropper = new Cropper(this.$refs.image, {
          viewMode: 1,
          dragMode: 'none',
          initialAspectRatio: 1,
          // aspectRatio: 16/9,
          preview: '.before',//预览可以不要
          background: false,
          autoCropArea: 0.6,
          zoomOnWheel: true,
          center:false,
        })
      },
      sureSava() {
        let canvasData=this.myCropper.getCanvasData();
        // console.log('height:'+canvasData.height);
        // jpg格式输出需要指定背景颜色，否则默认为黑色
        this.afterImg = this.myCropper.getCroppedCanvas({
          imageSmoothingQuality: 'high',fillColor:"white",
          width:353,
          height:400
        }).toDataURL('image/jpeg')
      },
      startRotate(){
                // 销毁并重新创建一个cropper
        // this.myCropper.reset();
        // this.myCropper.clear();
        // this.myCropper.destroy();
        // this.myCropper = new Cropper(this.$refs.image, {
        //   viewMode: 1,
        //   dragMode: 'none',
        //   // initialAspectRatio: 1,
        //   // aspectRatio: 16/9,
        //   preview: '.before',//预览可以不要
        //   background: false,
        //   autoCropArea: 1,
        //   zoomOnWheel: true,
        //   center:false,
        //   modal:false,
        //   guides:false,
        //   highlicht:false
        // })
      },
      rotate(){
        this.myCropper.clear();
        let initCanvasData=this.myCropper.getCanvasData();
        // console.log(initCanvasData.height);
        // console.log(initCanvasData.naturalHeight);

        // console.log(this.myCropper);
        this.myCropper.rotate(30);
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    display: flex;
  }

  .before {
    width: 100px;
    height: 100px;
    overflow: hidden;
    /* 这个属性可以得到想要的效果 */
  }

  .img-container {
    height: 400px;
    overflow: hidden;
  }

  .afterCropper {
    flex: 1;
    margin-left: 20px;
    border: 1px solid salmon;
    text-align: center;
  }

  .afterCropper img {
    width: 150px;
    margin-top: 30px;
  }
</style>