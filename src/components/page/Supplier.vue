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
            <el-table-column prop="name" label="单位名称" align="center"></el-table-column>
            <el-table-column prop="representName" label="法人代表姓名" align="center" ></el-table-column>
            <el-table-column prop="representPhone" label="法人代表电话" align="center" width="110"></el-table-column>
            <el-table-column prop="representIdcard" label="法人代表身份证号码" align="center" width="230"></el-table-column>
            <el-table-column label="法人身份证复印件" prop="chargeImage" align="center" width="160">
                <template slot-scope="scope">
                        <el-image
                                style="width: 70px; height: 70px"
                                class="table-td-thumb"
                                :src="scope.row.chargeImage"
                                
                        ></el-image>
                </template>
            </el-table-column>
            <el-table-column  prop="state" fixed="right" label="账号状态" align="center" width="180">
                <!-- <el-switch v-model="value1" active-text="正常" inactive-text="已禁用"></el-switch> -->
                <template slot-scope="scope"><!--数据模板-->
                    <el-switch v-model="scope.row.state"  @change="stateChanged(scope.row)" active-text="正常" inactive-text="禁用"></el-switch>
                </template> 
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //value1:false,
            //srcList:[require('../../assets/img/test1.jpg'),require('../../assets/img/test2.png'),require('../../assets/img/test4.png'),require('../../assets/img/test3.png')],
            tableData:[],
        }
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));// 获取供应商信息
        this.getSupplier();
    },
    methods:{
        
        getSupplier() {
            this.api.getSupplier().then(res => {
                console.log(res)
                if(res.code=="200") {
                    this.$message.success("成功获取供应商")
                    this.tableData = res.data
                }else{
                    this.$message.error(res.message)
                }
            })
        },
        stateChanged(row){
            this.api.stateChanged({representIdcard:row.representIdcard,state:row.state}).then(res => {
                        console.log(res)
                        if(res.code!="200"){
                            tableData.representIdcard != tableData.representIdcard;
                            this.$message.error(res.message);
                            
                            //this.tableData = res.data
                        }else{
                            this.$message.success('成功修改状态');
                        }
                    })
        },
        //     // this.api.stateChanged().then(res => {
        //     //             console.log(res)
        //     //             // var formData = new FormData();
        //     //             // formData.append('state', tableData.state);
        //     //             if(res.code=="200"){
                            
        //     //                 this.$message.success('操作成功');
        //     //                 // this.load_over=true;
        //     //                 // this.tableData = res.data.records;
        //     //                 // this.pageTotal = res.data.total;
        //     //             }else{
        //     //                 this.$message.error(res.message);
        //     //             }
        //     //         })
        //     // var formData = new FormData();
        //     // // formData.append('id', userInfo.id);
        //     // formData.append('state', tableData.state);
        //     // const{data:res}= await this.$http.put('/userState', formData);
        //     //     if(res!="success"){
        //     //         userInfo.id = !userInfo.id;
        //     //         return this.$message.error("操作失败");
        //     //     }
        //     //     this.$message.success("操作成功");
        // },
    }
}
</script>