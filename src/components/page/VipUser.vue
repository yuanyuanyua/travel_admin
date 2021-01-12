/**
* @Description: 订单显示
* @Author: TankNee
* @Date: 2/24/2020 7:45 PM
**/
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb>
                <el-breadcrumb-item>
                    <i class="el-icon-files"></i> 常量列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="show_state" placeholder="显示全部" class="handle-select mr10" @change="getShowState">
                    <el-option key="0" label="正常" value="0"></el-option>
                    <el-option key="1" label="已禁用" value="1"></el-option>
                </el-select>
                <el-input style="margin-left: 30px" placeholder="请输入内容" v-model="search_key_word"
                          class="input-with-select" clearable>
                    <el-select style="width: 110px;" v-model="searchType" slot="prepend"
                               placeholder="会员名称" @change="getSearchType">
                        <el-option label="会员名称" value="0"></el-option>
                        <el-option label="会员手机号" value="1"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="getSearchResult"></el-button>
                </el-input>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        v-loading="isLoading"
                        border
                       
                        ref="multipleTable"
                        @select="handleSelection"
                        @select-all="handleSelection"
                >
                    <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
                    <el-table-column prop="user_nickname" label="用户名" width="100" align="center"></el-table-column>
                    <el-table-column prop="title" label="手机号" width="100" align="center">
                        <template>
                            13474654877
                        </template>
                    </el-table-column>
                    <el-table-column prop="adult_num" label="一级会员总量"  align="center">
                        <template>
                            13
                        </template>
                    </el-table-column>
                    <el-table-column prop="child_num" label="二级会员总量"  align="center">
                        <template>
                            56
                        </template>
                    </el-table-column>
                    <el-table-column prop="child_num" label="已完成订单总量" width="130" align="center">
                        <template>
                            25
                        </template>
                    </el-table-column>
                    <el-table-column prop="child_num" label="赚取佣金总量"  align="center">
                        <template>
                            ￥348.9
                        </template>
                    </el-table-column>
                    <el-table-column prop="child_num" label="注册时间" width="160"  align="center">
                        <template>
                            2020-02-03 12:23:33
                        </template>
                    </el-table-column>
                    <el-table-column prop="child_num" label="最近登录时间" width="160" align="center">
                         <template>
                            2020-06-03 12:23:33
                        </template>                       
                    </el-table-column>
                    <el-table-column prop="child_num" label="最近登录地址"  align="center">
                        <template>
                            127.0.0.1
                        </template>
                    </el-table-column>
                    <el-table-column prop="child_num" label="账号状态" width="180" align="center">
                        <template>
                            <el-switch v-model="value1" active-text="正常" inactive-text="已禁用"></el-switch>
                            </template>
                    </el-table-column>
                    
                </el-table>
                <div class="pagination">
                    <el-pagination
                            background
                            layout="total, prev, pager, next"
                            :current-page="query.pageIndex"
                            :page-size="query.pageSize"
                            :total="pageTotal"
                            @current-change="handlePageChange"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '../../utils/api';

    export default {
        name: 'OrderList',
        data() {
            return {
                value1: true,
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                show_state: '',
                tableData: [],
                pageTotal: 10,
                isLoading: false,
                categoryList: [],
                categoryIdMap: {},
                handleTitle: '',
                form: {},
                searchType: '',
                search_key_word: '',
                showType: 'normalData',
                cityList: [],
                stateList: ['待付款', '待出行', '交易成功（待评价）', '交易成功（已点评）', '交易失败（已取消）', '待退款', '退款成功']
            };
        },
        methods: {
            handleSensitive(number) {
                return number.replace(number.substring(3, 7), '****');
            },
            handleTags(data) {
                return this.stateList[data.state - 1];
            },
            handleRefund(data) {
                if (data.state !== 6) {
                    return;
                }
                this.$confirm('是否接受退款申请', '提示', {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '接受',
                    cancelButtonText: '拒绝'
                })
                    .then(() => {

                    })
                    .catch(action => {
                        this.$message({
                            type: 'info',
                            message: action === 'cancel'
                                ? '拒绝退款'
                                : '关闭页面'
                        })
                    });
            },
            getShowState(e) {
                if (parseInt(e) === 0) {
                    this.isLoading = true;
                    this.getTableData();
                    this.isLoading = false;
                } else {
                    api.searchSpecifiedOrder({
                        attrName: 'state',
                        attrValue: e,
                        pageNum: this.query.pageIndex,
                        pageSize: this.query.pageSize
                    }).then(res => {
                        this.tableData = res.data.orders;
                        this.pageTotal = res.data.total;
                        this.isLoading = false;
                    });
                }

            },
            getTableData() {
                this.isLoading = true;
                var that = this;
                api.getOrderList({
                    pageNum: that.query.pageIndex,
                    pageSize: that.query.pageSize
                }).then(res0 => {
                    this.tableData = res0.data.orders;
                    this.tableData = this.tableData.concat(this.tableData)
                    this.pageTotal = res0.data.total;
                    this.isLoading = false;
                    console.log(this.form);
                }).catch(err => {
                    console.log(err);
                });
            },
            handleSelection(e) {
                console.log(e);
            },
            handlePageChange(val, e) {
                this.$set(this.query, 'pageIndex', val);
                if (this.showType === 'normalData') {
                    this.getTableData();
                } else {
                    this.getSearchResult(e, val);
                }

            },
            getSearchType(e) {

            },
            getSearchResult(e, pageNum = this.query.pageIndex) {
                this.isLoading = true;
                var list = ['user_nickname', 'title', 'order_time', 'deal_time', 'linkMan', 'passenger'];
                var that = this;
                this.query.pageIndex = 1;
                if (this.search_key_word) {
                    this.showType = 'searching';
                    api.searchSpecifiedOrder({
                        attrName: list[this.searchType] || 'user_nickname',
                        attrValue: this.search_key_word,
                        pageNum: pageNum,
                        pageSize: that.query.pageSize
                    }).then(res => {
                        this.tableData = res.data.orders;
                        this.pageTotal = res.data.total;
                        this.isLoading = false;
                    });

                } else {
                    this.showType = 'normal';
                    this.$message.error('请输入搜索内容');
                    this.query.pageIndex = 1;
                    this.getTableData();
                    this.isLoading = false;
                }
                console.log(this.showType);

            },
            //数组去重
            uniArr(arr) {
                var obj = {};
                var new_arr = arr.reduce(function(prev, element) {
                    if (!prev.find(el => el.category_con_id == element.category_con_id)) {
                        prev.push(element);
                    }
                    return prev;
                }, []);
                return new_arr;
            },
            //初始化城市列表
            initCity(cityList) {
                var cl = [];
                cityList.forEach(c => {
                    var t = {
                        value: c.id,
                        label: c.city
                    };
                    cl.push(t);
                });
                return cl;
            },
            pageInit() {
                api.getAllCities().then(res => {
                    if (res.code === 200) {
                        this.cityList = this.initCity(res.data);
                        localStorage.setItem('cityList', JSON.stringify(this.cityList));
                    }
                }).catch(err => {
                    console.log(err);
                }).then(res => {
                    this.getTableData();
                });
            }
        },
        created() {
            this.pageInit();
        }
    };
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
        display: flex;
    }

    .dialog-footer {
        right: 30px;
    }
</style>
