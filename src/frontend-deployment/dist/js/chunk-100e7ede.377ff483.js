(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-100e7ede"],{"9b1c":function(e,t,a){"use strict";var s=a("ec14"),i=a.n(s);i.a},a893:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"swapview-wapper"},[a("div",{staticClass:"navbar-wapper"},[a("nav-bar",{scopedSlots:e._u([{key:"left",fn:function(){return[a("i",{staticClass:"el-icon-back",on:{click:e.back}})]},proxy:!0},{key:"center",fn:function(){return[a("span",[e._v("换脸")])]},proxy:!0},{key:"right",fn:function(){return[a("i",{staticClass:"el-icon-check",on:{click:e.finish}})]},proxy:!0}])})],1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.fullScreenLoading,expression:"fullScreenLoading"}],attrs:{"element-loading-text":"处理中...","element-loading-background":"rgba(0, 0, 0, 0.6)"}},[a("div",{staticClass:"content-wapper"},[e.hasRes?a("div",[a("div",{staticClass:"image-result"},[a("img",{staticClass:"face",attrs:{src:e.userImg}})])]):a("div",[a("div",{staticClass:"image-one"},[a("img",{staticClass:"face",attrs:{src:e.userImg}})]),a("div",{staticClass:"image-two"},[e.canProc?a("img",{staticClass:"face",attrs:{src:e.otherImg}}):e._e()])])])]),a("div",{staticClass:"buttons-wapper"},[a("el-upload",{staticClass:"upload",attrs:{action:"#",limit:1,"on-change":e.handleChange,"on-exceed":e.handleExceed,"auto-upload":!1,"show-file-list":!1,"file-list":e.files}},[a("el-button",{staticStyle:{height:"7vh",width:"48vw","font-size":"20px"},attrs:{slot:"trigger",plain:""},slot:"trigger"},[e._v("上传图片")])],1),a("el-button",{staticStyle:{height:"7vh",width:"48vw","font-size":"20px"},attrs:{plain:""},on:{click:e.swap}},[e._v("开始转换")])],1)])},i=[],n=a("6259"),r=a("bc3a"),c=a.n(r),o=a("025e");c.a.defaults.baseURL=Object(o["a"])();var l={data:function(){return{userImg:"",otherImg:"",files:[],fullScreenLoading:!1,canProc:!1,hasRes:!1}},mounted:function(){this.init()},activated:function(){this.init()},methods:{init:function(){this.userImg=this.$store.state.editedImg,this.otherImg="",this.canProc=!1,this.fullScreenLoading=!1,this.files=[]},back:function(){this.$router.back()},finish:function(){this.$store.commit("saveImg",this.userImg),this.$router.back()},handleExceed:function(){this.$message.error("不能再上传啦")},handleChange:function(e,t){var a=this;this.hasRes&&(this.hasRes=!1);var s=new FileReader;s.readAsDataURL(e.raw),s.onload=function(e){var t=e.target.result;a.otherImg=t,a.canProc=!0}},swap:function(){var e=this;if(this.canProc){this.fullScreenLoading=!0;var t=new FormData;t.append("headImg",this.userImg),t.append("faceImg",this.otherImg),c.a.post("imgProc/faceswap/",t).then((function(t){var a=t.data.error_code;0===a?(e.userImg=t.data.img_proc_result,e.canProc=!1,e.hasRes=!0,e.files=[],e.otherImg=""):1008===a&&e.$message.error("出错啦，请检查图片里面是否只有一张脸"),e.fullScreenLoading=!1})).catch((function(t){console.log(t),e.$message.error("出错啦，请检查您的网络连接"),e.fullScreenLoading=!1}))}else this.$message.error("请再上传一张照片")}},components:{NavBar:n["a"]}},u=l,h=(a("9b1c"),a("2877")),d=Object(h["a"])(u,s,i,!1,null,"5ab4ea16",null);t["default"]=d.exports},ec14:function(e,t,a){}}]);
//# sourceMappingURL=chunk-100e7ede.377ff483.js.map