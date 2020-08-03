import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Mobile/Home.vue')
const Login = () => import('@/views/Mobile/Login.vue')
const ImgProc = () => import('@/views/Mobile/ImgProc.vue')
const FileProc = () => import('@/views/Mobile/FileProc.vue')
const UserCenter = () => import('@/views/Mobile/UserCenter.vue')
const Register = () => import('@/views/Mobile/Register.vue')
const Albums = () => import('@/views/Mobile/UserAlbum.vue')
const AlbumPage = () => import('@/views/Mobile/AlbumPage.vue')
// 割掉贴纸功能
//const UserStickers = () => import('@/views/Mobile/UserStickers.vue')
const SpliceView = () => import('@/views/Mobile/SpliceView.vue')

// 图片美化子页面
const EditProc = () => import("@/views/Mobile/process/EditProc.vue");
const ColorProc = () => import("@/views/Mobile/process/ColorProc.vue");
const StickerProc = () => import("@/views/Mobile/process/StickerProc.vue");
const FaceProc = () => import("@/views/Mobile/process/FaceProc.vue");
const FilterProc = () => import("@/views/Mobile/process/FilterProc.vue");
const MosaicProc = () => import("@/views/Mobile/process/MosaicProc.vue");
const MarkProc = () => import("@/views/Mobile/process/MarkProc.vue");
const WaterMarkProc = () => import('@/views/Mobile/process/WaterMarkProc.vue')
const SwapProc = () => import('@/views/Mobile/process/SwapView.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user-center',
    name: 'UserCenter',
    component: UserCenter
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/albums',
    name: 'Albums',
    component: Albums
  },
  {
    path: '/imgProc',
    name: 'ImgProc',
    component: ImgProc
  },
  {
    path: '/fileProc',
    name: 'FileProc',
    component: FileProc
  },
  {
    path: '/album-page',
    name: 'AlbumPage',
    component: AlbumPage
  },
  // 割掉贴纸功能
  // {
  //   path: '/user-stickers',
  //   name: 'UserStickers',
  //   component: UserStickers
  // },
  // 图片美化页面子页面
  // {
  //   path: '/AIProc',
  //   name:'AIProc',
  //   component:AIProc
  // },
  {
    path: '/editProc',
    name: 'editProc',
    component: EditProc
  },
  {
    path: '/colorProc',
    name: 'colorProc',
    component: ColorProc
  },
  {
    path: '/splice',
    name: 'spliceview',
    component: SpliceView
  },
  {
    path: '/faceProc',
    name: 'faceProc',
    component: FaceProc
  },
  {
    path: '/markProc',
    name: 'markProc',
    component: MarkProc
  },
  {
    path: '/swapProc',
    name: 'swapProc',
    component: SwapProc
  },
  {
    path: '/filterProc',
    name: 'filterProc',
    component: FilterProc
  },
  {
    path: '/mosaicProc',
    name: 'mosaicProc',
    component: MosaicProc
  },
  // {
  //   path: '/stickerProc',
  //   name: 'stickerProc',
  //   component: StickerProc
  // },
  {
    path: '/waterMarkProc',
    name: 'waterMarkProc',
    component: WaterMarkProc
  }
]

const router = new VueRouter({
  // history模式，隐藏页面的/#/
  mode: 'history',
  routes
})

export default router
