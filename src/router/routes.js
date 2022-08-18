//引入一级路由组件
import Login from "@/pages/Login";
import Reginster from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
//引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";

// ----------------------------------
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效
// -----------------------------------

//路由配置的信息
export default [
  {
    path: "/center",
    component: Center,
    meta: { show: true },
    //二级路由
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "groupOrder",
        component: GroupOrder,
      },
      //路由重定向 只要一访问center就定向到center/myorder 避免白屏
      { path: "/center", redirect: "/center/myorder" },
    ],
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },
  },
  {
    path: "/pay",
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      // 去支付页面必须是从提交订单而来
      if (from.path == "/trade") {
        next();
      } else {
        // 其他的路由而来，停留在当前路由
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: Trade,
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面必须是从购物车而来
      if (from.path == "/shopcart") {
        next();
      } else {
        // 其他的路由而来，停留在当前路由
        next(false);
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { show: true },
  },
  {
    path: "/home",
    //路由懒加载
    component: () => import("@/pages/Home"),
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    name: "search",
  },
  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },
  {
    path: "/register",
    component: Reginster,
    meta: { show: false },
  },
  //重定向 在项目跑起来时 立马让他定向到首页
  {
    path: "*",
    redirect: "/home",
  },
];
