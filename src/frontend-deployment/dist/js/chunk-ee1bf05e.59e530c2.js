(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ee1bf05e"],{"1dde":function(t,e,n){var a=n("d039"),r=n("b622"),i=n("2d00"),s=r("species");t.exports=function(t){return i>=51||!a((function(){var e=[],n=e.constructor={};return n[s]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},3348:function(t,e,n){},"53e1":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"color-proc"},[n("el-header",[n("nav-bar",{scopedSlots:t._u([{key:"left",fn:function(){return[n("i",{staticClass:"el-icon-close",on:{click:t.back}})]},proxy:!0},{key:"center",fn:function(){return[n("span",[t._v(t._s(t.currentModule))])]},proxy:!0},{key:"right",fn:function(){return[n("i",{staticClass:"el-icon-check",on:{click:t.finish}})]},proxy:!0}])})],1),n("el-main",[n("div",{staticClass:"img-container"},[n("img",{ref:"image",attrs:{src:t.userImg,id:"image"}})])]),n("div",{staticClass:"range-container"},[n("div",{staticClass:"range-bar"},[n("mt-range",{attrs:{min:0,max:100,step:1},on:{change:t.handleChange},model:{value:t.rangeValue,callback:function(e){t.rangeValue=e},expression:"rangeValue"}},[n("div",{staticClass:"range-bar",attrs:{slot:"start"},slot:"start"},[t._v("0")]),n("div",{staticClass:"range-bar",attrs:{slot:"end"},slot:"end"},[t._v("100")])])],1),n("div",{staticClass:"range-value"},[n("span",[t._v(t._s(t.rangeValue))])])]),n("el-footer",{staticClass:"tabs"},[n("el-tabs",{staticClass:"modules",attrs:{"tab-position":"bottom"},on:{"tab-click":t.handleClick},model:{value:t.currentModule,callback:function(e){t.currentModule=e},expression:"currentModule"}},[t._l(t.modules,(function(t){return[n("el-tab-pane",{attrs:{label:t,name:t}})]}))],2)],1)],1)},r=[],i=(n("99af"),n("c740"),n("6259")),s=n("8288"),c=n.n(s),o={name:"ColorProc",components:{NavBar:i["a"]},data:function(){return{modules:["亮度","饱和度","对比度","灰度","透明度"],range:[50,50,50,0,100],rangeValue:50,currentModule:"亮度",currentIndex:0,savedImg:""}},computed:{userImg:function(){return this.$store.state.editedImg}},methods:{init:function(){this.rangeValue=50,this.range[0]=this.range[1]=this.range[2]=50,this.range[3]=0,this.range[4]=100,this.currentModule="亮度",this.$refs.image.style.WebkitFilter="\n      brightness(".concat(.02*this.range[0],") saturate(").concat(.02*this.range[1],") contrast(").concat(.02*this.range[2],") \n      grayscale(").concat(.02*this.range[3],") opacity(").concat(.01*this.range[4],")\n      ")},back:function(){this.$router.back()},finish:function(){var t=this,e=(this.$refs.image.offsetWidth,this.$refs.image.offsetHeight,this.$refs.image);c()(e).then((function(e){t.savedImg=e,t.$store.commit("saveImg",t.savedImg)})),this.$router.back()},handleClick:function(){var t=this,e=this.modules.findIndex((function(e){return e==t.currentModule}));this.currentIndex=e,-1!==e&&(this.rangeValue=this.range[e])},handleChange:function(){this.range[this.currentIndex]=this.rangeValue,this.$refs.image.style.WebkitFilter="\n      brightness(".concat(.02*this.range[0],") saturate(").concat(.02*this.range[1],") contrast(").concat(.02*this.range[2],") \n      grayscale(").concat(.02*this.range[3],") opacity(").concat(.01*this.range[4],")\n      ")}},activated:function(){this.init()}},u=o,l=(n("e603"),n("2877")),d=Object(l["a"])(u,a,r,!1,null,"bf0a89ac",null);e["default"]=d.exports},6259:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"navbar"},[n("div",{staticClass:"left"},[t._t("left")],2),n("div",{staticClass:"center"},[t._t("center")],2),n("div",{staticClass:"right"},[t._t("right")],2)])},r=[],i={name:"NavBar"},s=i,c=(n("9a55"),n("2877")),o=Object(c["a"])(s,a,r,!1,null,"88a04806",null);e["a"]=o.exports},8288:function(t,e,n){"use strict";function a(t,e){var n=document.createElement("a");n.href=t,n.style.display="none",n.setAttribute("download",e),document.body.appendChild(n),n.click(),document.body.removeChild(n)}function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"png",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.97,r=document.createElement("canvas");r.width=t.width,r.height=t.height;var i=r.getContext("2d");i.filter=getComputedStyle(t).filter,t.setAttribute("crossOrigin","anonymous"),i.drawImage(t,0,0,r.width,r.height);var s=r.toDataURL("image/"+e,n);return{url:s,then:function(t){t(s)},download:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"image";a(s,t+"."+e)}}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r,e.download=a},8418:function(t,e,n){"use strict";var a=n("c04e"),r=n("9bf2"),i=n("5c6c");t.exports=function(t,e,n){var s=a(e);s in t?r.f(t,s,i(0,n)):t[s]=n}},"99af":function(t,e,n){"use strict";var a=n("23e7"),r=n("d039"),i=n("e8b5"),s=n("861d"),c=n("7b0b"),o=n("50c4"),u=n("8418"),l=n("65f0"),d=n("1dde"),f=n("b622"),h=n("2d00"),g=f("isConcatSpreadable"),v=9007199254740991,m="Maximum allowed index exceeded",b=h>=51||!r((function(){var t=[];return t[g]=!1,t.concat()[0]!==t})),p=d("concat"),C=function(t){if(!s(t))return!1;var e=t[g];return void 0!==e?!!e:i(t)},y=!b||!p;a({target:"Array",proto:!0,forced:y},{concat:function(t){var e,n,a,r,i,s=c(this),d=l(s,0),f=0;for(e=-1,a=arguments.length;e<a;e++)if(i=-1===e?s:arguments[e],C(i)){if(r=o(i.length),f+r>v)throw TypeError(m);for(n=0;n<r;n++,f++)n in i&&u(d,f,i[n])}else{if(f>=v)throw TypeError(m);u(d,f++,i)}return d.length=f,d}})},"9a55":function(t,e,n){"use strict";var a=n("f28b"),r=n.n(a);r.a},e603:function(t,e,n){"use strict";var a=n("3348"),r=n.n(a);r.a},f28b:function(t,e,n){}}]);
//# sourceMappingURL=chunk-ee1bf05e.59e530c2.js.map