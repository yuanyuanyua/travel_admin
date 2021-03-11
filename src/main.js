import Vue from 'vue';
import App from './App.vue';
import router from './router';
import api from './utils/api';
import store from './store'//引入store
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
// //导入axios
// import axios from 'axios'
// //挂彩axios
// Vue.prototype.$http=axios
// //设置访问根路径
// axios.defaults.baseURL="http://120.55.55.185:8088"



// import { messages } from './components/common/i18n';
//import './assets/css/theme-green/index.css'; // 浅绿色主题

//挂载API
Vue.prototype.api = api
Vue.prototype.base_api_url = api.api_base_url

Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'small'});


//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//     var is_login = ""
//     if (to.meta.requireAuth) {
//         next('/login');
//     } else {
//         next()
//     }
//     if (to.meta.permission) {
       
//     } else {
//         // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//         if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
//             Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
//                 confirmButtonText: '确定'
//             });
//         } else {
//             next();
//         }
//     }
// });



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
