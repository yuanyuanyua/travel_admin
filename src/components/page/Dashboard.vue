<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-row :gutter="24" class="mgb20">
                    <el-col :span="10">
                        <el-card shadow="hover" class="mgb20" style="height:500px;">
                            <div class="user-info">
                                <!-- <img  class="user-avator" alt /> -->
                                <img :src="iconUrl" class="user-avator" alt />
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">
                                上次登录时间：
                            </div>
                            <div class="user-info-list">
                                {{new Date(userInfo.lastLoginTime).toLocaleString()}}
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="7">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-bottom:15px" >
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{supplierCount}}</div>
                                    <div>供应商总量</div>
                                </div>
                            </div>
                        </el-card>
                        
                    </el-col>
                    <el-col :span="7">
                        <el-card shadow="hover" :body-style="{padding: '0px'}" style="margin-bottom:15px">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-s-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{orderCount}}</div>
                                    <div>订单总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="7">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{count}}</div>
                                    <div>商品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="7">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-shop grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{total}}</div>
                                    <div>成交总量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                </el-row>
            </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col> -->
        <!-- </el-row> -->
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            userInfo : '',
            name: '',
            count:0,
            role: '您好,管理员',
            orderCount:0,
            supplierCount:0,
            total:0,
            iconUrl: '',
            // data: [
                // {
                //     name: '2018/09/04',
                //     value: 1083
                // },
                // {
                //     name: '2018/09/05',
                //     value: 941
                // },
                // {
                //     name: '2018/09/06',
                //     value: 1139
                // },
                // {
                //     name: '2018/09/07',
                //     value: 816
                // },
                // {
                //     name: '2018/09/08',
                //     value: 327
                // },
                // {
                //     name: '2018/09/09',
                //     value: 228
                // },
                // {
                //     name: '2018/09/10',
                //     value: 1065
                // }
            // ],
            options: {
                type: 'bar',
                title: {
                    text: '最近一周各行类程交易量统计图'
                },
                xRorate: 25,
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '国内游',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '境外游',
                        data: [164, 178, 190, 135, 160]
                    },
                    {
                        label: '周边游',
                        data: [144, 198, 150, 235, 120]
                    },
                    {
                        label: '团建亲子',
                        data: [144, 198, 150, 235, 120]
                    }
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '各类行程交易量月统计图'
                },
                labels: ['6月', '7月', '8月', '9月', '10月'],
                datasets: [
                    {
                        label: '国内游',
                        data: [234, 278, 270, 190, 230]
                    },
                    {
                        label: '境外游',
                        data: [164, 178, 150, 135, 160]
                    },
                    {
                        label: '周边游',
                        data: [74, 118, 200, 235, 90]
                    },
                    {
                        label: '团建亲子',
                        data: [124, 158, 190, 225, 60]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },
    created(){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        this.iconUrl =  this.userInfo.iconUrl
        this.name = this.userInfo.name
        this.getCount() //获取商品数量
        this.getOrderCount() // 获取订单数量
        this.getSupplierCount()//获取供应商总量
        this.getTotalPrice()//成交总量
        // this.getChartDay() // 获取一周各商品销量
        // this.getChartMonth() // 获取几月各商品销量
        // if(localStorage.getItem('userInfo')){

        // }
        // else
        //     this.$router.push('/login');
    },
    // computed: {
    //     role() {
    //         return this.name === 'admin' ? '超级管理员' : '普通用户';
    //     }
    // },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        getCount() {
            var that = this
            this.api.getCount().then(res => {
                console.log(res)
                if(res.code=="200"){
                    this.count = res.data
                    // this.numInland = res.data[0]
                    // this.numRim = res.data[1]
                    // this.numOut = res.data[2]
                    // this.numSpecial = res.data[3]
                }else{
                    that.$message.error("商品数量获取失败")
                }
            })
        },
        // 获取订单总量
        getOrderCount() {
            var that = this
            this.api.getOrderCount().then(res => {
                console.log(res)
                if(res.code=="200"){
                    that.orderCount = res.data
                }else{
                    that.$message.error("订单数量获取失败")
                }
            })
        },
        getTotalPrice() {
            var that = this
            this.api.getTotalPrice().then(res => {
                console.log(res)
                if(res.code=="200"){
                    that.total = res.data
                }else{
                    that.$message.error("成交总量获取失败")
                }
            })
        },
        // 获取供应商总量
        getSupplierCount() {
            var that = this
            this.api.getSupplierCount().then(res => {
                console.log(res)
                if(res.code=="200"){
                    that.supplierCount = res.data
                }else{
                    that.$message.error("供应商总量获取失败")
                }
            })
        },
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // },

        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
