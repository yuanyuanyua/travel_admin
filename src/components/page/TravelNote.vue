/**
* @Description: 游记列表展示
* @Author: TankNee
* @Date: 2/9/2020 11:13 AM
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
                <el-button
                        type="danger"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="handleDeleteAllSelection"
                >
                    删除选中项
                </el-button>
                <el-input placeholder="请输入内容" v-model="search_key_word" class="input-with-select" clearable>
                    <el-select style="width: 110px;" v-model="searchType" slot="prepend"
                               placeholder="作者" @change="getSearchType">
                        <el-option label="作者" value="0"></el-option>
                        <el-option label="发表时间" value="1"></el-option>
                        <el-option label="游记标题" value="2"></el-option>
                        <el-option label="游记内容" value="3"></el-option>
                        <el-option label="城市" value="4"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="getSearchResult"></el-button>
                </el-input>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        v-loading="isLoading"
                        border
                        class="table"
                        ref="multipleTable"
                        @select="handleSelection"
                        @select-all="handleSelection"
                >
                    <el-table-column type="selection" width="60" align="center"></el-table-column>
                    <el-table-column prop="user_nickname" label="作者" width="100" align="center"></el-table-column>
                    <el-table-column prop="pb_time" label="发表时间" width="100" align="center"></el-table-column>
                    <el-table-column prop="title" label="游记标题" width="100" align="center"></el-table-column>
                    <el-table-column prop="city" label="城市" width="100" align="center"></el-table-column>
                    <el-table-column prop="view_num" label="浏览次数" width="100" align="center"></el-table-column>
                    <el-table-column prop="des" label="游记内容" align="center"></el-table-column>
                    <el-table-column label="游记图片" width="240" align="center">
                    <template slot-scope="scope">
                        <el-carousel :interval="4000" type="card" height="70px" indicator-position="none">
                            <el-carousel-item v-for="(img,i) in scope.row.imgUrls" :key="i">
                                <el-image
                                        style="width: 120px; height: 70px"
                                        class="table-td-thumb"
                                        :src="img"
                                ></el-image>
                            </el-carousel-item>
                        </el-carousel>
                    </template>
                </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    icon="el-icon-delete"
                                    class="red"
                                    @click="handleDelete(scope.$index, scope.row)"
                            >删除
                            </el-button>
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
        name: 'ConstantList',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                tableData: [],
                pageTotal: 10,
                isLoading: false,
                categoryList: [],
                categoryIdMap: {},
                handleTitle: '',
                form: {},
                ajaxData: {
                    id: 0,
                    category_id: 0,
                    name: '',
                    des: ''
                },
                searchType: '',
                search_key_word: '',
                showType: 'normalData',
                cityList: []
            };
        },
        methods: {
            getTableData() {
                this.isLoading = true;
                var that = this;
                api.getTravelNotes({
                    pageNum: that.query.pageIndex,
                    pageSize: that.query.pageSize
                }).then(res0 => {
                    console.log(this.cityList);
                    res0.data.travelnotes.forEach(t => {
                        console.log(t);
                        t.city = this.cityList[t.city_id - 1].label;
                        t.user_nickname = res0.data.users[t.uid];
                        t.imgUrls = t.imgUrls.map(i=>{
                            return that.base_api_url+i
                        })
                    });
                    console.log(res0.data.travelnotes);
                    this.tableData = res0.data.travelnotes;
                    this.pageTotal = res0.data.total;
                    this.isLoading = false;
                    console.log(this.form);
                }).catch(err => {
                    console.log(err);
                });
            },
            handleDeleteAllSelection() {

            },
            handleSelection(e) {
                console.log(e);
                // this.$confirm(`确定要删除${e.length}行吗`, '提示', {
                //     type: 'warning'
                // }).catch(err => {
                //     console.log(err);
                // });
            },
            handlePageChange(val, e) {
                this.$set(this.query, 'pageIndex', val);
                if (this.showType === 'normalData') {
                    this.getTableData();
                } else {
                    this.getSearchResult(e, val);
                }

            },
            handleDelete(index, row) {
                this.$confirm('确定要删除吗', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.isLoading = true;
                    this.api.deleteTravelNote({
                        id: row.id
                    }).then(res => {
                        this.isLoading = false;
                        this.$message.success(`删除成功`);
                        this.getTableData();
                    });
                });
            },
            getSearchType(e) {

            },
            getSearchResult(e, pageNum = this.query.pageIndex) {
                this.isLoading = true;
                var list = ['user_nickname', 'pb_time', 'title', 'des', 'city'];
                var that = this;
                this.query.pageIndex = 1;
                if (this.search_key_word) {
                    this.showType = 'searching';
                    api.searchSpecificTravelNote({
                        attrName: list[this.searchType] || 'user_nickname',
                        attrValue: this.search_key_word,
                        pageNum: pageNum,
                        pageSize: that.query.pageSize
                    }).then(res => {
                        res.data.travelnotes.forEach(t => {
                            t.city = this.cityList[t.city_id - 1].label;
                            t.user_nickname = res.data.users[t.uid];
                        });
                        this.tableData = res.data.travelnotes;
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

    .input-with-select {
        margin-left: 30px;
    }
</style>