<template>
  <div id="app">
    <keep-alive exclude="album-page">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<style>
/* * {
  padding: 0;
  margin: 0;
}

html,
body,
#app,
#nav {
  width: 100%;
  height: 100%;
  overflow: hidden;
} */
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

::-webkit-scrollbar {
  /* 隐藏所有滚动条 */
  display: none;
}
</style>

<!--
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
-->
