// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";

// 使用插件
Vue.use(VueRouter);

//引入
import routes from "./routes";

//引入Store
import store from "@/store";

// 先把VueRouter原型对象的push & replace,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写Push | replace 方法
// 1.第一个参数: 告诉原来的push方法,你往哪里跳
// 2.第二个参数：成功的回调
// 3.第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
let router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 };
  },
  //routes:routes kv一致省略v
});

//全局守卫：前置守卫 (在路由跳转之前进行判断)
router.beforeEach(async (to, form, next) => {
  //  to:   可以获取到你要跳转到哪个路由的信息
  //  form：可以获取到你从哪个路由而来的信息
  //  next: 放行函数 next(path)放行到指定路由 next(false)
  let token = store.state.user.token;
  //用户信息
  let name = store.state.user.userInfo.name;
  if (token) {
    //用户已经登录
    if (to.path == "login") {
      //登录后还想去login路由 -- > 不行！
      next("/home"); //首页
    } else {
      //登录了 ，但没有去login路由 去的可能是home|search|等等其他路由
      if (name) {
        //如果有用户信息直接放行
        next();
      } else {
        //如果没有用户信息 派发action让仓库存储用户信息再跳转
        try {
          //获取用户信息成功
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效了获取不到用户信息
          // 清除token
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    //未登录
    // 不能去交易、支付相关、个人中心
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      // 把未登录的时候想去而没有去成的信息存储于地址栏中
      next("/login?redirect=" + toPath);
    } else {
      //去的不是上面的路由 -- > 放行
      next();
    }
  }
});
export default router;
