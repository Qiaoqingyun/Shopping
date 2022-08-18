<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的位置 -->
    <router-view></router-view>
    <!-- 在Home、Search显示，在登录、注册、隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>

</template>



<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    //通知Vuex发请求，获取数据，存储于仓库中
    //获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  },

}
</script>


<style>
</style>