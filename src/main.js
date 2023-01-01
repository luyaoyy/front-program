import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from "vue-router"
import './assets/iconfont/iconfont.css'
import router from './router/index'
import echarts from "echarts";
import store from "@/store";

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;
new Vue({
    render: h => h(App),
    //上面是简写
    //render:(h)=>{
    //  return h(App)
    // }
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    },
}).$mount('#app')
