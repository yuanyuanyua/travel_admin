<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 产品列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">

            <div class="handle-box">


                <el-select v-model="goodsState" placeholder="显示全部" class="handle-select mr10" @change="getShowState">
                    <!-- <el-option key="1" label="显示全部" value="-1"></el-option>
                    <el-option key="2" label="上架中" value="1"></el-option>
                    <el-option key="3" label="已下架" value="0"></el-option> -->
                    <el-option key="1" label="显示全部" value=""></el-option>
                    <el-option key="2" label="未发布" value="1"></el-option>
                    <el-option key="3" label="已发布" value="2"></el-option>
                    <el-option key="4" label="已上架" value="3"></el-option>
                    <el-option key="5" label="已下架" value="4"></el-option>
                </el-select>

                <el-input placeholder="请输入内容" v-model="search_key_word" @input="get_key"  class="input-with-select" clearable>
                    <el-select style="width: 110px;" v-model="searchType" slot="prepend" placeholder="产品编号" @change="set_key">
                        <el-option label="产品编号" value="1"></el-option>
                        <el-option label="产品名称" value="2"></el-option>
                        <!-- <el-option label="供应商" value="3"></el-option> -->
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>


            </div>
            <el-table
                    :data="tableData"
                    v-loading="!load_over"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    
            >
                <el-table-column prop="id" label="产品编号" width="120" align="center"></el-table-column>
                <el-table-column prop="name" label="产品名称" width="160" align="center"></el-table-column>
                <el-table-column prop="sold" label="销量" width="90" align="center"></el-table-column>
                <el-table-column prop="score" label="评分" width="60" align="center"></el-table-column>
                <el-table-column label="封面图" width="120" align="center">
                    <template slot-scope="scope">
                        <el-image
                                style="width: 70px; height: 70px"
                                class="table-td-thumb"
                                :src="scope.row.coverImageUrl"
                                
                        ></el-image>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="provider" label="供应商" width="120" align="center"></el-table-column> -->
                <el-table-column label="服务保障" width="120" align="center">
                    <template slot-scope="scope">
                        {{scope.row.serviceEnsure}}
                    </template>
                </el-table-column>
                <el-table-column prop="days" label="行程天数" width="90" align="center"></el-table-column>
                <el-table-column label="详情图片" width="240" align="center">
                    <!-- <template slot-scope="scope">
                    <el-carousel :interval="4000" type="card" height="70px" indicator-position="none">
                        <el-carousel-item v-for="(img,i) in scope.row.imgList" :key="i">
                            <el-image
                                    style="width: 120px; height: 70px"
                                    class="table-td-thumb"
                                    :src="img"
                            ></el-image>
                        </el-carousel-item>
                    </el-carousel>
                </template> -->
                    <template slot-scope="scope">
                        <el-image
                            style="width: 70px; height: 70px"
                            class="table-td-thumb"
                            :src="scope.row.detailImageUrl"
                        ></el-image>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="游玩主题" width="120" align="center">
                    <template slot-scope="scope">
                        <div v-for="item in scope.row.themeList" :key="item">{{item}}</div>
                    </template>
                </el-table-column> -->
                <el-table-column prop="transport" label="交通类型" width="120" align="center">
                    <!-- <template slot-scope="scope">
                        <div v-for="item in scope.row.trafficList" :key="item">{{item}}</div>
                        {{scope.row.transport}}
                    </template> -->
                </el-table-column>
                <el-table-column  width="120" label="出发地/目的地" align="center">
                    <template slot-scope="scope">{{scope.row.beginPlace}}/{{scope.row.endPlace}}</template>
                </el-table-column>
                <el-table-column label="价格/结算价格/类型" width="180" align="center">
                    <template slot-scope="scope">
                        <div>￥{{scope.row.adultPrice}}/成人</div>
                        <div>￥{{scope.row.childPrice}}/儿童</div>
                    </template>
                </el-table-column>
                <el-table-column label="有效日期" width="120" align="center">
                    <template slot-scope="scope">
                        {{scope.row.earliestDate}}
                        <br>
                        至
                        <br>
                        {{scope.row.latestDate}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" width="120" label="状态" align="center">
                    <template slot-scope="scope">
                        <!-- <el-tag v-if="scope.row.state==3||scope.row.state==2||scope.row.state==1" type="success">上架中</el-tag>
                        <el-tag v-else-if="scope.row.state==4" type="info">已下架</el-tag> -->
                        <el-tag v-if="scope.row.state==1" >未发布</el-tag>
                        <el-tag v-else-if="scope.row.state==2" type="warning">已发布</el-tag>
                        <el-tag v-else-if="scope.row.state==3" type="success">上架中</el-tag>
                        <el-tag v-else-if="scope.row.state==4" type="info">已下架</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.state==2||scope.row.state==3" type="danger"  @click="deleteGoods(scope.row.id)" >强制下架 </el-button>
                        <el-button v-else-if="scope.row.state==1" disabled type="primary"  >上架中 </el-button>
                        <!-- <el-button v-else-if="scope.row.state==1" disabled type="primary"  >上架中 </el-button> -->

                        <!-- <el-button
                                :type="(scope.row.state==2||scope.row.state==3)?'danger':'primary'"
                                @click="deleteGoods(scope.row.id)"
                        >{{(scope.row.state==2||scope.row.state==3)?'强制下架':'上架中'}}
                        </el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.current"
                        :page-size="query.size"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data: function () {
            return {
                userInfo: {},// 用户信息
                query: {
                    // pro_number: '',
                    // provider: '',
                    // title:"",
                    // status:"",
                    goodsId: '',
                    name: '',
                    state: '',
                    current: 1,
                    size: 7
                },
                tableData: [],// 表格数据
                pageTotal: 0,//商品总数
                goodsState: '',//商品状态查询条件
                search_key_word: '',// 搜索内容
                searchType: '1',//搜索类型
                
                
                load_over: false,
                //handleName: '',
                // multipleSelection: [],
                // delList: [],
                //editVisible: false,
                // pageTotal: 0,
                //form: {},
                // idx: -1,
                // id: -1,
                // start_city: '',
                // end_city: '',
                // travelParams: {},
                // dialogImageUrl: '',
                // dialogVisible: false,
                // detailImgList: [],
                // uploadImgUrl: '',
                // imageUrl: ''
            };
        },
        created() {
            this.getListByQuery();
            //this.uploadImgUrl = this.base_api_url + 'web/uploadImg';
        },
        methods: {
            // 搜索点击按钮事件
            search() {
                this.initQuery();
                if(this.searchType == 1){
                    this.query.goodsId = this.search_key_word;
                }else if(this.searchType == 2){
                    this.query.name = this.search_key_word;
                }
                this.getListByQuery();
            },
            set_key(e) {
                console.log("搜索类型"+e);
                this.searchType = e;
            },
            initQuery() {
                this.query.goodsId = '';
                this.query.name = '';
            },
            get_key(e){
                console.log(e)
                this.search_key_word = e
            },
            // 设置商品状态查询条件
            getShowState(e) {
                this.query.state = e;
                this.getListByQuery();
            },
            deleteGoods(id){
                var that = this;
                var msg = '谨慎删除，删除后，商品信息将不会保留。';
                var tp = '删除提醒';
                this.$confirm(msg, tp, {
                    distinguishCancelAndClose: true,
                    type: 'warning',
                    confirmButtonText: '确认',
                    cancelButtonText: '取消'
                }).then(() => {
                    that.api.deleteGoods({goodsId:id}).then(res => {
                        console.log(res)
                        if(res.code=="200"){
                            that.$message.success("成功删除商品")
                            that.getListByQuery()
                        }else{
                            that.$message.error("商品删除失败")
                        }
                    })
                })
        },
            getSearchType(e){
                console.log("搜索类型"+e);
                this.searchType = e;
            },
            // setKey() {
            //     this.initQuery()
            //     var e = this.searchType || 1
            //     if(e == 1)
            //         this.query.pro_number = this.search_key_word
            //     if(e == 2)
            //         this.query.title = this.search_key_word
            //     if(e == 3)
            //         this.query.provider = this.search_key_word
            // },
            // initQuery(){
            //     this.query.pro_number = ""
            //     this.query.title = ""
            //     this.query.provider = ""
                
            // },
            // getData(){
            //     this.api.getData().then(res => {
            //     console.log(res)
            //     if(res.code=="200") {
            //         this.$message.success("成功获取商品")
            //         this.load_over=true
            //         this.tableData = res.data
            //     }else{
            //         this.$message.error(res.message)
            //     }
            // })
            // },
            // 根据查询条件查询商品列表
            getListByQuery(){
                var that = this
                console.log(this.query)
                this.api.getListByQuery(that.query).then(res => {
                            console.log(res)
                            if(res.code=="200"){
                                that.$message.success('成功获取商品列表');
                                this.load_over=true;
                                that.tableData = res.data.records;
                                that.pageTotal = res.data.total;
                            }else{
                                that.$message.error(res.message);
                            }
                        })
            },
            // getListByQuery(){
            // //var that = this
            //     this.api.getListByQuery(this.query).then(res => {
            //             console.log(res)
            //             if(res.code=="200"){
            //                 this.$message.success('成功获取商品列表');
            //                 this.load_over=true;
            //                 this.tableData = res.data.records;
            //                 this.pageTotal = res.data.total;
            //             }else{
            //                 this.$message.error(res.message);
            //             }
            //         })
            // },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'current', val);
                this.getListByQuery();
            },
            // getData() {
            //     this.setKey()
            //     var that = this;
            //     this.load_over = false;
            //     this.api.getTravelProducts({
            //         pro_number:this.query.pro_number,
            //         title:this.query.title,
            //         provider:this.query.provider,
            //         status:this.query.status,
            //         pageNum:this.query.pageIndex,
            //         pageSize:this.query.pageSize
            //     }).then(res => {
            //         if (res.code == '200') {
            //             var data = res.data;
            //             var tableData = {
            //                 list: [],
            //                 total: data.total
            //             };
            //             data.list.forEach(d => {
            //                 d.product.imgList = d.imageList;
            //                 d.product.paramsList = d.paramsList;
            //                 tableData.list.push(d.product);
            //             });

            //             tableData.list.forEach(v => {
            //                 v.avatar = that.base_api_url + v.avatar;
            //                 v.start_city = that.idTocity(v.start_city_id);
            //                 v.end_city = that.idTocity(v.end_city_id);
            //                 v.start_time = that.dateFormat(v.start_time, 'yyyy-MM-dd');
            //                 v.end_time = that.dateFormat(v.end_time, 'yyyy-MM-dd');
            //                 var arr = [];
            //                 arr.push(v.start_time);
            //                 arr.push(v.end_time);
            //                 v.dateArr = arr;
            //                 v.trip_day_id = v.trip_days;
            //                 v.trip_days = v.trip_days + '天' + (v.trip_days - 1) + '晚';
            //                 v.status = v.status == 1 ? true : false;
            //                 if (v.imgList.length > 0) {
            //                     var imgs = [];
            //                     v.imgList.forEach(img => {
            //                         imgs.push(that.base_api_url + img.url);
            //                     });
            //                     v.imgList = imgs;
            //                 }
            //                 var securityList = [];
            //                 var themeList = [];
            //                 var trafficList = [];
            //                 if (v.paramsList.length > 0) {
            //                     v.paramsList.forEach(p => {
            //                         if (p.category_id === 3)
            //                             securityList.push(that.idToName(p.category_con_id, 3));
            //                         if (p.category_id === 4)
            //                             trafficList.push(that.idToName(p.category_con_id, 4));
            //                         if (p.category_id === 5)
            //                             themeList.push(that.idToName(p.category_con_id, 5));
            //                     });
            //                 }
            //                 v.securityList = securityList;
            //                 v.trafficList = trafficList;
            //                 v.themeList = themeList;
            //             });
            //             this.tableData = tableData.list;
            //             console.log(tableData.list);
            //             this.pageTotal = tableData.total || 0;
            //             this.load_over = true;
            //         }
            //     });
            // },
            // //获取产品编号
            getProNumber(e) {
                this.ajaxData.basic.pro_number = e;
            },
            //获取产品名称
            getProTitle(e) {
                this.ajaxData.basic.title = e;
            },
            // //获取产品提供商
            getProvider(e) {
                this.ajaxData.basic.provider = e;
            },
            // //获取出发地id
            // getStartCity(e) {
            //     this.ajaxData.basic.start_city_id = e;
            // },
            // //获取目的地id
            // getEndCity(e) {
            //     this.ajaxData.basic.end_city_id = e;
            // },
            // //获取成人价格
            // getAdultPrice(e) {
            //     this.ajaxData.basic.adult_price = e;
            // },
            // //获取成人价格
            // getChildPrice(e) {
            //     this.ajaxData.basic.child_price = e;
            // },
            // //获取产品的服务保障，交通类型，游玩主题等
            // getParams() {
            //     this.ajaxData.paramList = [];
            //     var arr1 = this.securityList.map(item => {
            //         return { category_id: 3, category_con_id: this.idToName(item, 3, true) };
            //     });
            //     var arr2 = this.trafficList.map(item => {
            //         return { category_id: 4, category_con_id: this.idToName(item, 4, true) };
            //     });
            //     var arr3 = this.themeList.map(item => {
            //         return { category_id: 5, category_con_id: this.idToName(item, 5, true) };
            //     });
            //     this.ajaxData.paramList = this.ajaxData.paramList.concat(arr1, arr2, arr3);
            // },

            // //获取行程天数
            // getTripDay(e) {
            //     this.ajaxData.basic.trip_days = this.idToName(e, 6);
            // },
            // //获取有效日期
            // getDate(e) {
            //     this.ajaxData.basic.start_time = e[0];
            //     this.ajaxData.basic.end_time = e[1];
            // },
            //获取产品状态
            getStatus(e) {
                this.ajaxData.basic.status = e ? 1 : 0;
            },
            // handlePictureSuccess(response, file, fileList) {
            //     this.handleImgList(fileList);
            // },
            // handleRemove(file, fileList) {
            //     this.handleImgList(fileList);
            // },
            // handlePictureCardPreview(file) {
            //     this.dialogImageUrl = file.url;
            //     this.dialogVisible = true;
            // },
            // //图片处理
            // handleImgList(fileList) {
            //     var imgList = [];
            //     var ajaxImgList = [];
            //     fileList.forEach(i => {
            //         if (i.response.code == '200') {
            //             imgList.push(this.base_api_url + i.response.data);
            //             ajaxImgList.push({
            //                 url: i.response.data
            //             });
            //         }
            //     });
            //     this.form.imgList = imgList;
            //     this.ajaxData.imgList = ajaxImgList;
            // },
            // //参数处理
            // editParam() {
            //     this.ajaxData.basic.id = this.form.id;
            //     this.ajaxData.basic.pro_number = this.form.pro_number;
            //     this.ajaxData.basic.title = this.form.title;
            //     this.ajaxData.basic.provider = this.form.provider;
            //     this.ajaxData.basic.avatar = this.form.avatar.replace(this.base_api_url, '');
            //     this.ajaxData.basic.start_city_id = this.form.start_city_id;
            //     this.ajaxData.basic.end_city_id = this.form.end_city_id;
            //     this.ajaxData.basic.start_time = this.form.dateArr[0];
            //     this.ajaxData.basic.end_time = this.form.dateArr[1];
            //     this.ajaxData.basic.adult_price = this.form.adult_price;
            //     this.ajaxData.basic.child_price = this.form.child_price;
            //     this.ajaxData.basic.trip_days = this.form.trip_day_id > 8 ? this.idToName(this.form.trip_day_id, 6) : this.form.trip_day_id;
            //     this.ajaxData.basic.status = this.form.status ? 1 : 0;
            // },
            // //城市id转为名称
            // idTocity(city_id) {
            //     var city_name = '';
            //     var cityList = JSON.parse(localStorage.getItem('travelParams')).cityList;
            //     cityList.forEach(c => {
            //         if (c.value === city_id)
            //             city_name = c.label;
            //     });
            //     return city_name;
            // },
            // //类型转换
            // idToName(d, type, reverse = false) {
            //     var res = '';
            //     var paramsList = JSON.parse(localStorage.getItem('travelParams'));
            //     var list = [];
            //     if (type === 3)
            //         list = paramsList.SecurityList;
            //     if (type === 4)
            //         list = paramsList.TrafficList;
            //     if (type === 5)
            //         list = paramsList.ThemeList;
            //     if (type === 6)
            //         list = paramsList.TripList;

            //     list.forEach(s => {
            //         if (reverse) {
            //             if (s.label === d)
            //                 res = s.value;
            //         } else {
            //             if (s.value === d)
            //                 res = s.label;
            //         }

            //     });
            //     return res;

            // },
            // //初始化常量类型列表
            // initparams() {
            //     var that = this;
            //     this.api.getCategorys().then(res => {
            //         if (res.code == '200') {
            //             var categorys = res.data;
            //             that.api.getCategoryCons().then(v => {
            //                 if (v.code == '200') {
            //                     var categoryCons = v.data;
            //                     var params = {
            //                         cityList: [],
            //                         SecurityList: [],
            //                         securityList: [],
            //                         ThemeList: [],
            //                         themeList: [],
            //                         TrafficList: [],
            //                         trafficList: [],
            //                         TripList: [],
            //                         tripList: []
            //                     };
            //                     categorys.forEach(c => {
            //                         categoryCons.forEach(cc => {
            //                             var t = {
            //                                 value: cc.id,
            //                                 label: cc.name
            //                             };
            //                             if (c.id === 3 && c.id === cc.category_id) {
            //                                 params.SecurityList.push(t);
            //                                 params.securityList.push(cc.name);
            //                             }
            //                             if (c.id === 4 && c.id === cc.category_id) {
            //                                 params.TrafficList.push(t);
            //                                 params.trafficList.push(cc.name);
            //                             }
            //                             if (c.id === 5 && c.id === cc.category_id) {
            //                                 params.ThemeList.push(t);
            //                                 params.themeList.push(cc.name);
            //                             }
            //                             if (c.id === 6 && c.id === cc.category_id) {
            //                                 params.TripList.push(t);
            //                                 params.tripList.push(cc.name);
            //                             }
            //                         });
            //                     });
            //                     that.api.getAllCities().then(city => {
            //                         if (res.code == '200') {
            //                             params.cityList = that.initCity(city.data);
            //                             that.travelParams = params;
            //                             localStorage.setItem('travelParams', JSON.stringify(params));
            //                         }

            //                     });
            //                 }

            //             });
            //         }
            //     });

            // },
            // //初始化城市列表
            // initCity(cityList) {
            //     var cl = [];
            //     cityList.forEach(c => {
            //         var t = {
            //             value: c.id,
            //             label: c.city
            //         };
            //         cl.push(t);
            //     });
            //     return cl;
            // },
            // //日期格式转换
            // dateFormat(date, fmt) {
            //     let ret;
            //     date = new Date(date);
            //     const opt = {
            //         'y+': date.getFullYear().toString(),        // 年
            //         'M+': (date.getMonth() + 1).toString(),     // 月
            //         'd+': date.getDate().toString()            // 日
            //         // 有其他格式化字符需求可以继续添加，必须转化成字符串
            //     };
            //     for (let k in opt) {
            //         ret = new RegExp('(' + k + ')').exec(fmt);
            //         if (ret) {
            //             fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
            //         }
            //         ;
            //     }
            //     ;
            //     return fmt;
            // },
            // //数组去重
            // uniArr(arr) {
            //     var obj = {};
            //     var new_arr = arr.reduce(function(prev, element) {
            //         if (!prev.find(el => el.category_con_id == element.category_con_id)) {
            //             prev.push(element);
            //         }
            //         return prev;
            //     }, []);
            //     return new_arr;
            // },
            // //上传图像成功
            // handleAvatarSuccess(res, file) {
            //     if (res.code == '200') {
            //         this.ajaxData.basic.avatar = res.data;
            //         this.form.avatar = this.base_api_url + res.data;
            //     }
            //     //this.imageUrl = URL.createObjectURL(file.raw);
            //     //console.log(this.imageUrl)
            // },
            // //上传图像之前图片类型和大小检验
            // beforeAvatarUpload(file) {
            //     // const isJPG = file.type === 'image/jpeg';
            //     // const isLt2M = file.size / 1024 / 1024 < 2;
            //     // if (!isJPG) {
            //     // this.$message.error('上传头像图片只能是 JPG 格式!');
            //     // }
            //     // if (!isLt2M) {
            //     // this.$message.error('上传头像图片大小不能超过 2MB!');
            //     // }
            //     // return isJPG && isLt2M;
            //     return true;
            // },
            // // 触发搜索按钮
            // handleSearch() {
            //     this.$set(this.query, 'pageIndex', 1);
            //     this.getData();
            // },
            // // 删除操作
            // handleDelete(index, row) {
            //     var that = this;
            //     // 二次确认删除
            //     this.$confirm('确定要删除吗？', '提示', {
            //         type: 'warning'
            //     })
            //         .then(() => {
            //             this.load_over = false;
            //             this.api.deleteTP({ id: row.id }).then(res => {
            //                 if (res.code == '200') {
            //                     that.$message.success('删除成功');
            //                     that.tableData.splice(index, 1);
            //                     that.load_over = true;
            //                 }
            //             });
            //         })
            //         .catch(() => {
            //         });
            // },
            // 多选操作
            // handleSelectionChange(val) {
            //     var del_ids = val.map(item=>{
            //         return item.id
            //     })
            //     this.multipleSelection = del_ids.join(",")
            //     //this.multipleSelection = val;
            // },
            delAllSelection() {
                var del_ids = this.multipleSelection
                var that = this;
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        //this.load_over = false;
                        console.log(del_ids)
                        this.api.deleteTPs({ ids:del_ids }).then(res => {
                            if (res.code == '200') {
                                that.$message.success('删除成功');
                                //that.getData()
                                that.getListByQuery()
                                //that.tableData.splice(index, 1);
                                //that.load_over = true;
                            }
                        });
                    })
                    .catch(() => {
                    });
                // const length = this.multipleSelection.length;
                // let str = '';
                // this.delList = this.delList.concat(this.multipleSelection);
                // for (let i = 0; i < length; i++) {
                //     str += this.multipleSelection[i].name + ' ';
                // }
                // this.$message.error(`删除了${str}`);
                this.multipleSelection = "";
            },
            //新增
            // handleAdd() {
            //     this.handleName = '添加产品';
            //     this.form = {};
            //     this.securityList = [];
            //     this.trafficList = [];
            //     this.themeList = [];
            //     this.detailImgList = [];
            //     this.editVisible = true;
            // },
            // 编辑操作
            // handleEdit(index, row) {
            //     this.handleName = '编辑产品';
            //     this.idx = index;
            //     this.form = row;
            //     this.securityList = row.securityList;
            //     this.trafficList = row.trafficList;
            //     this.themeList = row.themeList;
            //     this.detailImgList = row.imgList.map((t, i) => {
            //         return { name: i + '.' + t.split('.')[1], url: t };
            //     });
            //     this.editVisible = true;
            // },
            // 保存编辑
            // saveEdit() {
            //     var that = this;
            //     this.editVisible = false;
            //     this.getParams();
            //     console.log(this.ajaxData);
            //     if (this.handleName == '添加产品')
            //         this.api.addTP({
            //             'product': this.ajaxData.basic,
            //             'paramsList': this.ajaxData.paramList,
            //             'imageList': this.ajaxData.imgList
            //         }).then(res => {
            //             that.getData();
            //         });
            //     else {
            //         this.editParam();
            //         //console.log(this.ajaxData)
            //         this.api.updateTP({
            //             'product': this.ajaxData.basic,
            //             'paramsList': this.ajaxData.paramList,
            //             'imageList': this.ajaxData.imgList
            //         }).then(res => {
            //             that.getData();
            //         });
            //     }
            //     //this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            //     //this.$set(this.tableData, this.idx, this.form);
            // },
            // 分页导航
            
        }
    };
</script>

<style scoped>
    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .el-input-group {
        width: 40% !important;
        margin-right: 15px !important;
    }

    .el-upload--text {
        height: 100px !important;
        width: 100px !important;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        /* width: 178px;
        height: 178px;
        line-height: 178px; */
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        /* width: 178px;
        height: 178px; */
        display: block;
    }
</style>
