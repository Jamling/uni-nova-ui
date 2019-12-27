import Vue from 'vue'
import App from './App'
//接口文件
import request from './common/j-request/request.js'
import utils from './common/utils.js'
Vue.prototype.$utils = utils
console.log(request);
var baseUrl = '';// 线上接口地址
// #ifdef H5
baseUrl = '/api'
baseUrl = '/test';//测试接口地址
// #endif
request.setConfig({
    baseUrl: baseUrl,
    contentType: 'form',
    debug: true
})
// 请求拦截
request.interceptor.request = (config => {
    // 给data添加全局请求参数uid
    if (config.data.hasOwnProperty('loadindTip')) {
        config.loadingTip = config.data.loadingTip
        delete config.data.loadingTip
    }
    if (config.data.hasOwnProperty('business')) {
        config.business = config.data.business
        delete config.data.business
    }
    // 给header添加全局请求参数token
    if (!config.header.Authorization) {
        config.header.Authorization = global.token
    }
    // 添加一个自定义的参数，默认异常请求都弹出一个toast提示
    if (config.toastError === undefined) {
        config.toastError = true
    }
    return config;
})
// 全局的业务拦截
request.interceptor.response = ((res, config) => {
    if (res.code === '10001' || res.status === '10001') {
        res.success = true;
    } else if (res.code === 1001) {
        // token失效，需要重新登录
        uni.navigateTo({
            url: '/pages/loign/login'
        })
    }
    return res;
})

// 全局的错误异常处理
request.interceptor.fail = ((res, config) => {
    let ret = res;
    let msg = ''
    if (res.statusCode === 200) { // 业务错误
        msg = res.data.msg
        ret = res.data
    } else if (res.statusCode > 0) { // HTTP错误
        msg = '服务器异常[' + res.statusCode + ']'
    } else { // 其它错误
        msg = res.errMsg
    }
    if (config.toastError) {
        uni.showToast({
            title: msg,
            duration: 2000,
            icon: 'none'
        })
    }
    return ret;
})
Vue.config.productionTip = false

global.devEnv = process.env.NODE_ENV === 'development'
global.request = request
Vue.prototype.$global = global
Vue.prototype.$request = request
Vue.prototype.$toast = function(msg) {
    uni.showToast({
        title: msg,
        duration: 2000,
        icon: 'none'
    })
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
