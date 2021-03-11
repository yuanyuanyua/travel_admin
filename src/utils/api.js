import req from './request';

let api_base_url = req.api_base_url;
let fetch = req.fetch;
export default {

    api_base_url,

    login(params) {
        return fetch(`admin/login`, params, 'post');
    },//登入
    loginlog(params) {
        return fetch(`admin/insert`, params, 'post', true);
    },//添加登录日志

    lastLogin(params) {
        return fetch(`admin/lastLogin`, params, 'post');
    },// 写入上次登录时间
    
    getQualification(params){
        return fetch(`qualify/get`, params, 'get');
    },//资质认证

    getSupplier(params){
        return fetch(`qualify/supplier`, params, 'get');
    },//供应商管理

    // getData(params){
    //     return fetch(`goods/all`, params, 'get');
    // },//产品管理
    getListByQuery(params){
        return fetch(`goods/all`, params, 'get');
    },//产品管理
    getCount(params) {
        return fetch(`goods/getCount`, params, 'post')
    },// 根据商品类型获取商品总量

    // getTableData(params){
    //     return fetch(`orders/all`, params, 'get');
    // },//订单管理
    getOrderList(params){
        return fetch(`order/get`, params, 'get');
    },//订单管理
    getOrderCount(params) {
        return fetch(`order/count`, params, 'get')
    },// 订单数量

    getSupplierCount(params) {
        return fetch(`supplier/count`, params, 'post')
    },// 供应商总量
    stateChanged(params) {
        return fetch(`qualify/state`, params, 'get')
    },// 更新供应商状态
    update(params) {
        return fetch(`qualify/update`, params, 'post')
    },// 更新审核状态
    deleteGoods(params) {
        return fetch(`goods/delete`, params, 'get')
    },// 删除商品

    getPassenger(params) {
        return fetch(`passenger/get`, params, 'get')
    },// 根据旅客ID获取旅客信息

    out_login(params) {
        return fetch(`web/out_login`, params, 'post');
    },//登出

    addTP(params) {
        return fetch('web/addTP', params, 'post', true);
    },//新增产品

    updateTP(params) {
        return fetch('web/updateTP', params, 'post', true);
    },//更新产品

    deleteTP(params) {
        return fetch('web/deleteTP', params, 'post');
    },//删除产品

    deleteTPs(params) {
        return fetch('web/deleteTPs', params, 'post');
    },//删除产品

    uploadImg(params) {
        return fetch('web/uploadImg', params, 'post');
    },//上传图片

    getTravelProducts(params) {
        return fetch('web/getTravelProducts', params, 'get');
    },//获取产品列表

    getCategorys(params) {
        return fetch('web/getCategorys', params, 'get');
    },//获取常量类型列表

    getCategoryCons(params) {
        return fetch('web/getCategoryCons', params, 'get');
    },//获取常量内容列表

    addCategoryCons(params) {
        return fetch('web/addCategoryCons', params, 'post', true);
    },//添加常量内容列表

    updateCategoryCons(params) {
        return fetch('web/updateCategoryCons', params, 'post', true);
    },//更新常量内容列表

    deleteCategoryCons(params) {
        return fetch('web/deleteCategoryCons', params, 'post', true);
    },//更新常量内容列表
    searchSpecificCategoryCons(params) {
        return fetch('web/searchSpecificCategoryCons', params, 'post');
    },
    // getAllCities(params) {
    //     return fetch('getAllCities', params, 'get');
    // },//获取城市列表

    getUserInfo(params) {
        return fetch('web/getUserInfo', params, 'post');
    },

    upAvatar(params) {
        return fetch(`web/upAvatar`, params, 'post');
    },

    getStus(params) {
        return fetch(`rest/students`, params, 'get');
    },

    // getTableData(params) {
    //     return fetch(`table.json`, params, 'get');
    // },
    getTravelNotes(params) {
        return fetch('getTravelNotes', params, 'post');
    },// 获取游记信息
    deleteTravelNote(params) {
        return fetch('deleteTravelNote', params, 'post');
    },// 删除指定游记
    searchSpecificTravelNote(params) {
        return fetch('searchSpecificTravelNote', params, 'post');
    },//搜索指定游记
    getFeedBacks(params) {
        return fetch('web/getFeedBacks', params, 'post');
    },//获取反馈
    searchSpecifiedFeedBacks(params) {
        return fetch('web/searchSpecifiedFeedBacks', params, 'post');
    },//搜索指定反馈
    // getOrderList(params) {
    //     return fetch('getOrderList', params, 'post');
    // },//获取反馈
    searchSpecifiedOrder(params) {
        return fetch('searchSpecifiedOrder', params, 'post');
    },//搜索指定反馈
};
