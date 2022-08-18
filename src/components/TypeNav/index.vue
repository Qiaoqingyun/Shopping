<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <!-- 事件委托 -->
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex === index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                            c1.categoryName
                                    }}</a>
                                </h3>
                                <!-- 二级、三级分类 -->
                                <div class="item-list clearfix" v-show="currentIndex == index">
                                    <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{
                                                            c2.categoryName
                                                    }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>


<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
    name: 'TypeNav',
    data() {
        return {
            //存储用户鼠标移入哪一个一级分类
            currentIndex: -1,
            show: true,
        }
    },
    //组件挂载完：可以向服务器发送请求
    mounted() {
        //如果不是/home就隐藏  否则就显示 
        if (this.$route.path != '/home') {
            this.show = false
        } else {
            this.show = true
        }
    },
    computed: {
        ...mapState({
            // 
            // 注入一个参数state,其实即为大仓库中的数据
            categoryList: (state) => {
                return state.home.categoryList
            }
        })
    },
    methods: {
        changeIndex: throttle(function (index) {
            //鼠标进入修改响应式数据currentIndex属性
            //正常情况：鼠标进入，每一个一级分类h3都会触发鼠标事件
            //非正常情况：用户操作很快，只有部分h3触发了鼠标事件
            // 由于用户的行为过快，导致浏览器代码执行不过来，导致卡顿问题
            // 解决方案：防抖 节流
            this.currentIndex = index
        }, 50),
        //一级分类鼠标移出的事件回调
        leaveIndex() {
            //鼠标移出currentIndex，变为-1
            //鼠标离开，商品列表隐藏
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        goSearch(event) {
            //获取到当前触发这个事件的节点，带有data-categoryname的一定是a标签
            let element = event.target
            let { categoryname, category1id, category2id, category3id } = element.dataset
            //如果标签身上有categoryname一定是a标签
            if (categoryname) {
                //整理路由跳转的参数
                let location = { name: 'search' }
                let query = { categoryName: categoryname }
                if (category1id) {
                    query.category1Id = category1id
                }
                else if (category2id) {
                    query.category2Id = category2id
                }
                else {
                    query.category3Id = category3id
                }
                //如果路由跳转的时候带有parmas参数，也要传递过去
                if (this.$route.params) {
                    location.params = this.$route.params
                    //整理参数
                    location.query = query
                    //路由跳转
                    this.$router.push(location)
                }
            }
        },
        enterShow() {
            //鼠标移入让商品分类列表进行展示
            this.show = true
        }
    },
}
</script>


<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e33333;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #b1191a;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #c81623;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 27px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #fff;
                        }


                    }

                    .item-list {
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .cur {
                    transition: all 0.2s;
                    background-color: rgba(165, 42, 42, 1);
                }
            }

        }

        //过渡动画的样式
        //开始状态
        .sort-enter {
            height: 0px;
        }

        //结束状态
        .sort-enter-to {
            height: 461px;
        }

        .sort-enter-active {
            overflow: hidden;
            transition: all 0.3s linear;
        }
    }
}
</style>