<style scoped>
.g-main{
    background: white;
    padding: 20px 10px;
    border-radius:3px;
}
</style>
<template>
    <div class="g-main">
        <el-table :data="tableData" >
            <el-table-column prop="a" label="单位名称" align="center"></el-table-column>
            <el-table-column prop="b" label="法人代表姓名" align="center" ></el-table-column>
            <el-table-column prop="c" label="法人代表电话" align="center" width="110"></el-table-column>
            <el-table-column prop="d" label="法人代表身份证号码" align="center" width="230"></el-table-column>
            <el-table-column label="法人身份证复印件" align="center" width="160">
                <template slot-scope="scope">
                    <el-image :src="scope.row.e" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="o" label="对外显示简称" align="center" width="160"></el-table-column>
            <el-table-column prop="p" label="营业执照副本复印件" align="center" width="160">
                <template v-slot="scope">
                    <el-image :src="scope.row.p" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="账号状态" align="center" width="180">
                 <el-switch v-model="value1" active-text="正常" inactive-text="已禁用"></el-switch>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value1: true,
            srcList:[require('../../assets/img/test1.jpg'),require('../../assets/img/test2.png'),require('../../assets/img/test4.png'),require('../../assets/img/test3.png')],
            tableData:[
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    o:"去哪儿",
                    p:require('../../assets/img/test3.png')
                },
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    o:"去哪儿",
                    p:require('../../assets/img/test3.png')
                },
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    o:"去哪儿",
                    p:require('../../assets/img/test3.png')
                },
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    o:"去哪儿",
                    p:require('../../assets/img/test3.png')
                }
            ]
        }
    },
    methods:{
        handleCert(){
            this.$confirm('是否审核通过', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '审核成功!'
                });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '审核不通过'
                });          
            });
        }
    }
}
</script>