export default {
  // 定义全局方法
  increment (state) {
    state.counter++;
  },
  decrement (state) {
    state.counter--;
  },
  // 传递参数
  incrementCount (state, count) {
    state.counter += count;
    delete state.info.test1;
  },
  alertLog () {
    alert('异步操作');
  },
  changeCurrentAlbum (state, info) {
    //XXX: test
    state.currentAlbumInfo = info
  },
  saveImg (state, newImg) {
    state.editedImg = newImg;
  },
  setUserInfo (state, newInfo) {
    //XXX: test
    state.user.userID = newInfo.id
    state.user.userName = newInfo.user_name
    state.user.userMail = newInfo.user_mail
    state.user.avatarUrl = newInfo.user_avatar_url
    state.isLogin = true
  },
  updateUserAvatar (state, new_url) {
    state.user.avatarUrl = new_url
  },
  updateUserName (state, new_name) {
    state.user.userName = new_name
  },
  updateAlbum (state, new_info) {
    state.currentAlbumInfo.size += new_info.num
    state.currentAlbumInfo.url = new_info.url
  },
  updateAlbumCover (state, url) {
    if (state.currentAlbumInfo.url !== url) {
      state.currentAlbumInfo.url = url
    }
  },
  
}
