import axios from 'axios';
// import router from '../src/router.js'
// import { Loading } from 'element-ui';
// let loading
// function startLoading() {
//     loading = Loading.service({
//         fullscreen: true,
//         background: 'rgba(0,0,0,0.2)'
//     })
// }
// function endLoading() {
//     loading.close()
// }

const Axios = axios.create({
    baseURL: 'https://mt.guoanfamily.com/zhgd',
    // timeout: 10000,
})

Axios.interceptors.request.use(config => {
    // if (config.url != "/GetLogin" && localStorage.token != undefined) {
    //         config.headers.Authorization = 'Bearer:' + localStorage.token;
    //     }
    // startLoading();
    return config;
},
    error => {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    res => {
        // setTimeout(() => {
        //     endLoading();
        // }, 500)
        return Promise.resolve(res.data);
    },
    error => {
        // setTimeout(() => {
        //     endLoading();
        // }, 500)
        return Promise.reject(error);
    }
);
// 将 Axios 实例添加到Vue的原型对象上
export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$Axios', {
            value: Axios
        });
    }
};