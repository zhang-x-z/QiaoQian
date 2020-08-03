<template>
  <!-- 用户剪裁图片 -->
  <div class="my-cropper">
    <img v-show="isReady" id="image" :src="currentImg" ref="myimg">
  </div>
</template>
<script>
  import defaultImg from 'img/theme1.jpg';
  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs';
  export default {
    name: "MyCropper",
    props: {
      width: '',
      height: ''
    },
    components: {
    },
    data() {
      return {
        cropper: {},
        savedImg: '',
        isReady:false,// cropper未初始化完成之前图片不加载，避免出现样式未加载情况
      };
    },
    computed: {
      currentImg() {
        return this.$store.state.editedImg;
      }
    },
    methods: {
      // 指定container和画布的宽高
      init() {
        let cropper = new Cropper(this.$refs.myimg, {
          viewMode: 1,
          dragMode: 'none',
          initialAspectRatio: 9 / 16,
          background: false,
          autoCropArea: 0.6,
          center: false,
          minContainerWidth: this.width,
          minCanvasrWidth: this.width,
          minContainerHeight: this.height,
          minCanvasHeight: this.height,
          rotatable: false,
          ready(){
            this.isReady=true;
          }
        })
        this.cropper = cropper;
      },
      initRotate() {
        let cropper = new Cropper(this.$refs.myimg, {
          viewMode: 0,
          dragMode: 'none',
          background: false,
          modal: false,
          center: false,
          autoCropArea: 1,
          minContainerWidth: this.width,
          minContainerHeight: this.height,
          minCanvasrWidth: this.width,
          minCanvasHeight: this.height,
          minCropBoxWidth: this.width,
          minCropBoxHeight: this.height,
          // cropper的建立是异步方式，需要监听ready()钩子函数后清除剪裁框
          ready() {
            this.cropper.clear();
            this.isReady=true;
          }
        }
        )

        this.cropper = cropper;
        // console.log("Successfully init rotate!");
      },
      handleReady() {
        // console.log('ready');
      },
      save() {
        // 默认保存为jpg格式，需要指定背景颜色，否则默认为黑色
        // console.log(this.height);
        this.savedImg = this.cropper.getCroppedCanvas({
          imageSmoothingQuality: 'high',
          fillColor: 'white'
        }).toDataURL();// 不加参数默认保存为base64


        this.$store.commit('saveImg', this.savedImg);
        // console.log('保存成功');
      },
      destroy() {
        this.cropper.destroy && this.cropper.destroy();
        this.isReady=false;
        // console.log('destroy');
      },
      clear() {
        this.cropper.clear();
      },
      rotate(degree) {
        this.cropper.rotate(degree);
      },
      rotateTo(degree) {
        this.cropper.rotateTo(degree);
      },
      getCanvasData() {
        return this.cropper.getCanvasData();
      },
      reset() {
        this.cropper.reset();
      },
      setAspectRatio(ratio) {
        this.cropper.setAspectRatio(ratio);
      }
    },
    mounted() {
      // 如果当前cropper存在，再次初始化时无效。需要先销毁后进行初始化。
      // 但是在父组件激活时设置进行重置，则子组件无需先初始化，否则会初始化无效
      // this.init();

    },
  }
</script>
<style lang="css" scoped>
  /* Ensure the size of the image fit the container perfectly */
  img {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }

  .my-cropper {
    display: flex;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: scale-down;

  }
</style>