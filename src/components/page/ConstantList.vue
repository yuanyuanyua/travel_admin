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
                        type="primary"
                        icon="el-icon-lx-delete"
                        class="handle-del mr10"
                        @click="handleAdd"
                >
                    添加常量
                </el-button>
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
                               placeholder="常量名称" @change="getSearchType">
                        <el-option label="分类名称" value="0"></el-option>
                        <el-option label="常量名称" value="1"></el-option>
                        <el-option label="常量描述" value="2"></el-option>
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
                    <el-table-column prop="category_name" label="分类名称" width="120" align="center"></el-table-column>
                    <el-table-column prop="name" label="常量名称" width="120" align="center"></el-table-column>
                    <el-table-column prop="des" label="常量描述" align="left"></el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    icon="el-icon-edit"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >编辑
                            </el-button>
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
            <el-dialog width="40%" :title="handleTitle" :visible.sync="editVisible" @close="handleDialogClose">
                <el-form ref="form" :model="form" label-width="70px">
                    <el-form-item label="分类名称">
                        <!--                        <el-input v-model="form.category_id" @change="getCategory_id"></el-input>-->
                        <el-select v-model="form.category_id" filterable placeholder="请选择" @change="getCategory_id">
                            <el-option
                                    v-for="item in categoryList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="常量名称">
                        <el-input v-model="form.name" @change="getName"></el-input>
                    </el-form-item>
                    <el-form-item label="常量描述">
                        <el-input v-model="form.des" @change="getDes"></el-input>
                    </el-form-item>
                </el-form>
                <div class="el-dialog__footer">
                    <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
                </div>
            </el-dialog>
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
                editVisible: false,
                form: {},
                ajaxData: {
                    id: 0,
                    category_id: 0,
                    name: '',
                    des: ''
                },
                searchType: '',
                search_key_word: '',
                showType: 'normalData'
            };
        },
        methods: {
            getTableData() {
                this.isLoading = true;
                var that = this;
                api.getCategoryCons({
                    pageNum: that.query.pageIndex,
                    pageSize: that.query.pageSize
                }).then(res0 => {
                    console.log(res0);
                    api.getCategorys().then(res1 => {
                        console.log(res1);
                        this.categoryList = res1.data;
                        res1.data.forEach(e => {
                            this.categoryIdMap[e.name] = e.id;
                        });
                        res0.data.categorycons.forEach(c => {
                            c['category_name'] = this.categoryList[c.category_id - 1].name;
                        });
                        this.tableData = res0.data.categorycons;
                        this.isLoading = false;
                        this.pageTotal = res0.data.total;
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            },
            handleAdd() {
                this.handleTitle = '添加常量';
                this.editVisible = true;
                this.form = {};
            },
            handleDeleteAllSelection() {

            },
            handleSelection(e) {
                console.log(e);
                this.$confirm(`确定要删除${e.length}行吗`, '提示', {
                    type: 'warning'
                }).catch(err => {
                    console.log(err);
                });
            },
            handlePageChange(val, e) {
                this.$set(this.query, 'pageIndex', val);
                if (this.showType === 'normalData') {
                    this.getTableData();
                } else {
                    this.getSearchResult(e, val);
                }

            },
            handleEdit(index, row) {
                this.handleTitle = '编辑常量';
                this.form = row;
                this.ajaxData.id = row.id;
                this.ajaxData.category_id = this.form.category_id;
                this.ajaxData.name = this.form.name;
                this.ajaxData.des = this.form.des;
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.$confirm('确定要删除吗', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.isLoading = true;
                    this.api.deleteCategoryCons({
                        id: row.id
                    }).then(res => {
                        this.isLoading = false;
                        this.$message.success(`删除成功`);
                        this.getTableData();
                    });
                });
            },
            handleDialogClose(e) {
                // this.getTableData();
            },
            getCategory_id(e) {
                this.ajaxData.category_id = e;
                this.form.category_id = e;
                console.log(this.form.category_id);
            },
            getName(e) {
                console.log(e);
                this.ajaxData.name = e;
                this.form.name = e;
            },
            getDes(e) {
                console.log(e);
                this.ajaxData.des = e;
                this.form.des = e;
            },
            getSearchType(e) {

            },
            getSearchResult(e, pageNum = this.query.pageIndex) {
                this.isLoading = true;
                var list = ['category_id', 'name', 'des'];
                var that = this;
                this.query.pageIndex = 1;
                console.log(this.searchType);
                console.log(this.search_key_word);
                console.log(this.categoryList);
                console.log(this.categoryIdMap[this.search_key_word]);
                if (this.search_key_word) {
                    this.showType = 'searching';
                    console.log(this.categoryIdMap[this.search_key_word]);
                    if (this.searchType === '0' && this.categoryIdMap[this.search_key_word] === undefined) {
                        this.$message.error('请输入完整的分类名称');
                        this.query.pageIndex = 1;
                        this.getTableData();
                        this.isLoading = false;
                    } else {
                        var categoryTemp = undefined;
                        if (this.searchType === '0') {
                            console.log(this.categoryIdMap);
                            categoryTemp = this.categoryIdMap[this.search_key_word];
                        }
                        this.api.searchSpecificCategoryCons({
                            attrName: list[this.searchType] || 'name',
                            attrValue: categoryTemp || this.search_key_word,
                            pageNum: pageNum,
                            pageSize: that.query.pageSize
                        }).then(res => {
                            res.data.categorycons.forEach(c => {
                                c['category_name'] = this.categoryList[c.category_id - 1].name;
                            });
                            this.tableData = res.data.categorycons;
                            this.isLoading = false;
                            this.pageTotal = res.data.total;
                        });
                    }

                } else {
                    this.showType = 'normal';
                    this.$message.error('请输入搜索内容');
                    this.query.pageIndex = 1;
                    this.getTableData();
                    this.isLoading = false;
                }
                console.log(this.showType);

            },
            saveEdit() {
                if (this.handleTitle === '添加常量') {
                    this.api.addCategoryCons(this.ajaxData).then(res => {
                        console.log(res);
                        this.getTableData();
                        this.$message.success('添加常量成功');
                    }).catch(err => {
                        this.$message.error('添加失败');
                    });
                } else {
                    this.api.updateCategoryCons(this.ajaxData).then(res => {
                        console.log(res);
                        this.getTableData();
                        this.$message.success('更新常量成功');
                    }).catch(err => {
                        this.$message.error('更新失败');
                    });
                }
                this.editVisible = false;
                console.log(this.ajaxData);
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
            }
        },
        created() {
            this.getTableData();
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