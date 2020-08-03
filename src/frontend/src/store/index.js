import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import testImg from 'img/theme3.png'

// 1.安装插件
Vue.use(Vuex)
// // 2.创建对象
// export default new Vuex.Store({
// 	// 定义全局方法
// 	mutations,
// 	getters,
// 	actions,
// 	modules: {
// 		a
// 	},
// 	// 调用系统相机，返回图片
// 	// 调用系统相册，选择图片
// 	uploadImg(){

// 	}

// });

// 3.跳转到main.js

export default new Vuex.Store({
  state: {
    currentAlbumInfo: {},
    // TODO: default should be false
    isLogin: false,
    user: {
      userID: '',
      userName: '',
      userMail: '',
      //XXX: test avator
      avatarUrl: '',
    },
    originImg: testImg,
    editedImg: testImg,
    // 通过属性值查找对象数组的索引
    findIndex (arr, data, attribute) {
      return arr.findIndex(res => res[attribute] == data)
    },
    // 防抖函数，防止短时间大量触发同一事件，例如鼠标移动
    debounce (fn, delay) {
      const timer = null;
      return () => {
        if (timer) {
          clearTimeout(timer);// 间隔过短，进行防抖
        }
        timer = setTimeout(fn, delay);
      }
    }
  },
  mutations,
  actions,
  getters,
  modules: {}
})
