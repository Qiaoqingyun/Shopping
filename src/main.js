import Vue from "vue";
import App from "./App.vue";

//三级联动组件 -- 全局组件
import TypeNav from "@/components/TypeNav";
//轮播图组件 -- 全局组件
import Carousel from "@/components/Carousel";
// 分页器组件 -- 全局组件
import Pagination from "@/components/Pagination";
//饿了么ui
import { Button, MessageBox } from "element-ui";
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);
//饿了么-UI 注册组件时 可以挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//第一个参数是全局组件的名字 第二个参数是哪一个组件

//引入mockServe.js --- mock数据
import "@/mock/mockServe";

//引入swiper的样式
import "swiper/css/swiper.css";

// 引入路由
import router from "@/router";

//引入仓库(Vuex)
import store from "@/store";

//统一接收API文件夹里面全部请求的函数
import * as API from "@/api";

//图片懒加载的loding图片
import loading from "@/assets/loading.gif";

//引入VueLazyload(图片懒加载)
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: loading,
});

//引入表单验证插件
import "@/plugins/validate";

new Vue({
  render: (h) => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //当这里书写router的时候，组件身上都拥有$route,$router属性
  // 注册仓库(Vuex):组件实例的身上会多了一个属性$store
  store,
}).$mount("#app");
