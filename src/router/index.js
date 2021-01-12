import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页', requireAuth: true }
                },
                {
                    path: '/certification',
                    component: () => import('../components/page/Certification.vue'),
                    meta: { title: '审核认证', requireAuth: true }
                },
                {
                    path: '/supplier',
                    component: () => import('../components/page/Supplier.vue'),
                    meta: { title: '供应商管理', requireAuth: true }
                },
                {
                    path: '/vip',
                    component: () => import('../components/page/VipUser.vue'),
                    meta: { title: '会员管理', requireAuth: true }
                },
                {
                    path: '/travelProducts',
                    component: () => import('../components/page/TravelProducts.vue'),
                    meta: { title: '产品列表', requireAuth: true }
                },
                {
                    path: '/constantList',
                    component: () => import('../components/page/ConstantList.vue'),
                    meta: { title: '常量列表', requireAuth: true }
                },
                {
                    path: '/travelNote',
                    component: () => import('../components/page/TravelNote.vue'),
                    meta: { title: '游记列表', requireAuth: true }
                },
                {
                    path: '/feedback',
                    component: () => import('../components/page/FeedBack.vue'),
                    meta: { title: '用户反馈', requireAuth: true }
                },
                {
                    path: '/orderList',
                    component: () => import('../components/page/OrderList.vue'),
                    meta: { title: '订单显示', requireAuth: true }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标', requireAuth: true }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格', requireAuth: true }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡', requireAuth: true }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单', requireAuth: true }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器', requireAuth: true }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器', requireAuth: true }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传', requireAuth: true }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表', requireAuth: true }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表', requireAuth: true }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框', requireAuth: true }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true, requireAuth: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/per',
                    component: () => import('../components/page/adminInfo.vue'),
                    meta: { title: '个人中心', requireAuth: true }
                },
                {
                    path: '/adminList',
                    component: () => import('../components/page/adminList.vue'),
                    meta: { title: '管理员列表', requireAuth: true }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
