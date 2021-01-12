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
            <el-table-column prop="a" label="单位名称" align="center" width="100"></el-table-column>
            <el-table-column prop="b" label="法人代表姓名" align="center" width="100"></el-table-column>
            <el-table-column prop="c" label="法人代表电话" align="center" width="110"></el-table-column>
            <el-table-column prop="d" label="法人代表身份证号码" align="center" width="160"></el-table-column>
            <el-table-column label="法人身份证复印件" align="center" width="160">
                <template slot-scope="scope">
                    <el-image :src="scope.row.e" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="f" label="负责人姓名" align="center" width="100"></el-table-column>
            <el-table-column prop="g" label="负责人电话" align="center" width="100"></el-table-column>
            <el-table-column prop="h" label="负责人授权书" align="center" width="160">
                <template v-slot="scope">
                    <el-image :src="scope.row.h" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="i" label="负责人身份证号码" align="center" width="160"></el-table-column>
            <el-table-column prop="j" label="负责人身份证复印件" align="center" width="160">
                <template slot-scope="scope">
                    <el-image :src="scope.row.j" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="k" label="常用联系人姓名" align="center" width="110"></el-table-column>
            <el-table-column prop="l" label="常用联系人电话" align="center" width="110"></el-table-column>
            <el-table-column prop="m" label="常用联系人授权书" align="center" width="160">
                <template v-slot="scope">
                    <el-image :src="scope.row.m" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="n" label="常用联系人身份证复印件" align="center" width="160">
                <template v-slot="scope">
                    <el-image :src="scope.row.n" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="o" label="对外显示简称" align="center" width="110"></el-table-column>
            <el-table-column prop="p" label="营业执照副本复印件" align="center" width="160">
                <template v-slot="scope">
                    <el-image :src="scope.row.p" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="100">
                 <el-button type="text" size="small" @click="handleCert">审核</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            srcList:[require('../../assets/img/test1.jpg'),require('../../assets/img/test2.png'),require('../../assets/img/test4.png'),require('../../assets/img/test3.png')],
            tableData:[
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    f:"王某某",
                    g:"15828986347",
                    h:require('../../assets/img/test2.png'),
                    i:"420117189802246237",
                    j:require('../../assets/img/test4.png'),
                    k:"马某某",
                    l:"15828986347",
                    m:require('../../assets/img/test2.png'),
                    n:require('../../assets/img/test1.jpg'),
                    o:"途牛",
                    p:require('../../assets/img/test3.png')
                },
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    f:"王某某",
                    g:"15828986347",
                    h:require('../../assets/img/test2.png'),
                    i:"420117189802246237",
                    j:require('../../assets/img/test4.png'),
                    k:"马某某",
                    l:"15828986347",
                    m:require('../../assets/img/test2.png'),
                    n:require('../../assets/img/test1.jpg'),
                    o:"途牛",
                    p:require('../../assets/img/test3.png')
                },
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    f:"王某某",
                    g:"15828986347",
                    h:require('../../assets/img/test2.png'),
                    i:"420117189802246237",
                    j:require('../../assets/img/test4.png'),
                    k:"马某某",
                    l:"15828986347",
                    m:require('../../assets/img/test2.png'),
                    n:require('../../assets/img/test1.jpg'),
                    o:"途牛",
                    p:require('../../assets/img/test3.png')
                },
                {
                    a:"去哪儿旅行社",
                    b:"李某某",
                    c:"15828986347",
                    d:"420117189802246897",
                    e:require('../../assets/img/test1.jpg'),
                    f:"王某某",
                    g:"15828986347",
                    h:require('../../assets/img/test2.png'),
                    i:"420117189802246237",
                    j:require('../../assets/img/test4.png'),
                    k:"马某某",
                    l:"15828986347",
                    m:require('../../assets/img/test2.png'),
                    n:require('../../assets/img/test1.jpg'),
                    o:"途牛",
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