// 当前的模块：所有的api接口统一管理
import requests from "./request";

import mockRequests from "./mockAjax";

// 三级联动接口
// /api/product/getBaseCategoryList  get 无参数

export const reqCategoryList = () => {
  //发请求:axios发请求返回结果是Promise对象
  return requests({ url: "/product/getBaseCategoryList", method: "get" });
};

//获取banner(轮播图的接口)
export const reqGetBannerList = () => {
  return mockRequests.get("/banner");
};

//获取floor数据
export const reqFloorList = () => {
  return mockRequests.get("/floor");
};

//获取搜索(search)模块的数据 地址：/api/list 请求方式:post 需带参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => {
  return requests({ url: "/list", method: "post", data: params });
};

//获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: "get" });
};

//产品添加到购物车的接口 或者更新某一个产品的接口
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

//获取购物车列表数据接口
//api/cart/cartList Get请求
export const reqCartList = () => {
  return requests({ url: `/cart/cartList`, method: "get" });
};

//删除购物产品接口
// /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => {
  return requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
};

//修改商品选中的状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

//获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

//用户注册
// /api/user/passport/register   参数： phone  password code
export const reqUserRegister = (data) => {
  return requests({ url: `/user/passport/register`, data, method: "post" });
};

//用户登录
// /api/user/passport/login
export const reqUserLogin = (data) => {
  return requests({ url: "/user/passport/login", data, method: "post" });
};

//获取用户的信息(带着用户的token向服务器要)
// api/user/passport/auth/getUserInfo
export const reqUserInfo = () => {
  return requests({
    url: `/user/passport/auth/getUserInfo`,
    method: "get",
  });
};

//退出登录
export const reqLogout = () => {
  return requests({ url: `/user/passport/logout`, method: "get" });
};

//获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => {
  return requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};

//获取商品清单
// /api/order/auth/trade
export const reqOrderInfo = () => {
  return requests({ url: "/order/auth/trade", method: "get" });
};

// 提交订单的接口
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post",
  });
};

// /获取支付信息
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

//获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    metnod: "get",
  });
};

//获取个人中心的数据
// /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => {
  return requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
};
