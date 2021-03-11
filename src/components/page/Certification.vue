<style scoped>
.g-main{
    background: white;
    padding: 20px 10px;
    border-radius:3px;
}
</style>
<template>
    <div class="g-main">
        <el-table  :data="userlist" label-position="left" label-width="170px" >
                    
            <el-table-column prop="name" label="单位名称" align="center" width="100"></el-table-column>
            <el-table-column prop="representName" label="法人代表姓名" align="center" width="100"></el-table-column>
            <el-table-column prop="representPhone" label="法人代表电话" align="center" width="110"></el-table-column>
            <el-table-column prop="representIdcard" label="法人代表身份证号码" align="center" width="160"></el-table-column>
            <el-table-column prop="representImage" label="法人身份证复印件" align="center" width="160">
                <!-- <template slot-scope="scope">
                    <el-image :src="scope.row.e" :preview-src-list="srcList"></el-image>
                </template> -->
                <template slot-scope="scope">
                        <el-image
                                style="width: 70px; height: 70px"
                                class="table-td-thumb"
                                :src="scope.row.chargeImage"
                                
                        ></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="chargeName" label="负责人姓名" align="center" width="100"></el-table-column>
            <el-table-column prop="chargePhone" label="负责人电话" align="center" width="100"></el-table-column>
            <!-- <el-table-column prop="h" label="负责人授权书" align="center" width="160">
                <template v-slot="scope">
                    <el-image :src="scope.row.h" :preview-src-list="srcList"></el-image>
                </template>
            </el-table-column> -->
            <!-- <el-table-column prop="i" label="负责人身份证号码" align="center" width="160"></el-table-column>-->
            <el-table-column prop="chargeImage" label="负责人身份证复印件" align="center" width="160">
                <template slot-scope="scope">
                        <el-image
                                style="width: 70px; height: 70px"
                                class="table-td-thumb"
                                :src="scope.row.representImage"
                                
                        ></el-image>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="k" label="常用联系人姓名" align="center" width="110"></el-table-column>
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
            <el-table-column prop="o" label="对外显示简称" align="center" width="110"></el-table-column>-->
            <el-table-column prop="licenseImage" label="营业执照副本复印件" align="center" width="160">
                <template slot-scope="scope">
                        <el-image
                                style="width: 70px; height: 70px"
                                class="table-td-thumb"
                                :src="scope.row.licenseImage"
                                
                        ></el-image>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作"  align="center" width="130">
                <!-- <el-button type="text" v-model="scope.row.state" @change="handleCert" size="small" >审核</el-button> -->
                    <template slot-scope="scope"><!--数据模板-->
                        <!-- <el-button  type="text" v-model="scope.row.state" @change="handleCert" size="small">已审核</el-button> -->
                        <el-button v-if="scope.row.state == 1" disabled type="text" style="color:#909399" icon="el-icon-s-release" >已审核</el-button>
                        <el-button v-else  type="text" style="color:#67C23A" icon="el-icon-s-release" @click="qualifyState(scope.row.representIdcard)">审核</el-button>
                        <!-- <el-button v-if="scope.row.state == 0" type="text" style="color:#67C23A" icon="el-icon-edit" @change="handleCert">待审核</el-button>
                        <el-button v-else  type="text" style="color:#909399" icon="el-icon-s-release">待审核</el-button> -->

                    </template> 
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));// 获取供应商信息
        this.getQualification();

    },
    data: function () {
        return {
            userlist:[],
            query:{
                name:'',
                representName:'',
                representPhone:'',
                representIdcard:'',
                representImage:'',
                chargeName:'',
                chargePhone:'',
                licenseImage:'',
                state:'',
            }
        
        };
    },
    // created() {
    //     this.userInfo = JSON.parse(localStorage.getItem('userInfo'));// 获取供应商信息
    //     this.uploadImgUrl = this.base_api_url + 'qualify/upload';
    //     this.getQualification();
    // },
    methods:{
        // 获取供应商审核材料
        getQualification() {
            this.api.getQualification().then(res => {
                console.log(res)
                if(res.code=="200") {
                    this.$message.success("成功获取材料")
                    this.userlist = res.data
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        // 审核处理
        qualifyState(id){
            var msg = '确认审核?';
            //var tp = '接单提醒';
            this.$confirm(msg,  {
                distinguishCancelAndClose: true,
                type: 'warning',
                confirmButtonText: '确认',
                cancelButtonText: '取消'
            }).then(() => {
                this.api.update({representIdcard:id,state:"1"}).then(res => {
                    console.log(res)
                    if(res.code=="200"){
                        this.$message.success("审核成功")
                        this.getQualification();
                    }else{
                        this.$message.error(res.message)
                    }
                })
            })
        },
        // handleCert(){
        //     this.$confirm('是否审核通过', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //         }).then(() => {
        //         this.$message({
        //             type: 'success',
        //             message: '审核成功!'
        //         });
        //         }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '审核不通过'
        //         });          
        //     });
        // },
        // //获取所有用户
        // async getUserList(){
        //     const {data:res} = await this.$http.get("get");
        //     this.userlist = res.data;

        // },
    }
}
</script>