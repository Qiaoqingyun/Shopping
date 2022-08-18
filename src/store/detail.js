import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份的UUID ---> 生成唯一字符串
import { getUUID } from "@/utils/uuid_token";
const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //获取产品信息的active
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  //将产品添加到购物车
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    //当前这个函数如果执行返回的是一个promise 要么成功 or 失败
    if (result.code == 200) {
      //代表加入购物车成功
      return "ok";
    } else {
      //代表加入购物车失败
      return Promise.reject(new Error("faile"));
    }
  },
};
//简化数据而生
const getters = {
  //路径导航简化的数据
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
