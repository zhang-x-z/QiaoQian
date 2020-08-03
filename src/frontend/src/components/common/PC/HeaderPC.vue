<template>
  <div class="header">
    <div class="header-title">巧倩</div>
    <div class="header-right">
      <div class="header-user-cont">
        <div class="user-center-btn">
          <el-tooltip effect="dark" :content="'用户中心'" :placement="button">
            <i class="fas fa-users"></i>
          </el-tooltip>
        </div>
        <div class="user-avator">
          <!--/* TODO: receive user avator form serve*/-->
          <img src="../../assets/test/test-avator.jpg" />
        </div>
        <el-dropdown class="user-name" trigger="click">
          <span class="el-dropdown-link">
            <!--/*TODO: use user information from serve*/-->
            TestName
            <i class="fas fa-chevron-circle-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header-pc'
}
</script>

<style scoped>
@font-face {
  font-family: HYshangwei;
  src: url(../../assets/fonts/HYshangweishoushuW.ttf);
}

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

.header-title {
  height: 45px;
  float: left;
  width: 250px;
  line-height: 45px;
  color: black;
  font-size: 28px;
  font-family: HYshangwei;
  margin-left: 40px;
}

.header-right {
  float: right;
  height: 45px;
  padding-right: 30px;
}

.header-user-cont {
  display: flex;
  height: 45px;
  align-items: center;
}

.user-center-btn {
  cursor: pointer;
}
/*
.user-center-btn {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
*/

.user-name {
  margin-left: 10px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>