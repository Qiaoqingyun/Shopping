import { reqGetSearchInfo } from "@/api";
//search模块的小仓库
const state = {
  //仓库初始状态
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  //获取search模块数据
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
const getters = {
  //计算属性 简化数据而生
  //可以把我们将来在组件中用的数据简一下
  // 这里形参state是当前仓库中的state，并非大仓库的state
  // 没有网就返回空数组
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
