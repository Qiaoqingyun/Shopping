<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)"
            :class="{ active: pageNo == 1 }">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <!-- 中间部分 -->
        <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start"
            @click="$emit('getPageNo', page)" :class="{ active: pageNo == page }">{{ page }}</button>

        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.start.end < totalPage" @click="$emit('getPageNo', totalPage)"
            :class="{ active: pageNo == totalPage }">{{ totalPage }}</button>

        <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    // pageNo: 当前第几个
    // pageSize: 代表每一页展示多少条数据
    // total: 代表整个分页一共要展示多少条数据 
    // continues: 代表分页连续页码个数
    // 举例子: 每一页3条数据一共91条数据 【一共是31页】 
    computed: {
        totalPage() {
            //总共多少页
            //向上取整  
            return Math.ceil(this.total / this.pageSize)
        },
        //计算出连续的页码的起始数字与结束数字
        startNumAndEndNum() {
            const { continues, pageNo, totalPage } = this
            //先定义两个变量 存储起始数字与结束数字
            let start = 0, end = 0
            //不正常现象：总页数没有连续页码多(5)
            if (continues > totalPage) {
                start = 1;
                end = totalPage;
            } else {
                //正常现象 连续页码5 但是你的页数一定是大于5的
                //起始数字
                start = pageNo - parseInt(continues / 2)
                // 结束数字
                end = pageNo + parseInt(continues / 2)
                if (start < 1) {
                    start = 1
                    end = continues
                }
                if (end > totalPage) {
                    end = totalPage
                    start = totalPage - continues + 1
                }
            }
            return { start, end }
        }
    },
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: skyblue;
            color: #fff;
        }
    }
}

</style>
