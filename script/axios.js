import Axios from "axios";
import { Loading } from "element-ui";

import Config from "../config/default";
const { apiUrl } = Config;

let loading;

function startLoading() {
  loading = Loading.service({
    fullscreen: true,
    background: "rgba(0, 0, 0, 0.5)",
    spinner: 'el-icon-loading',
    text: "加载中..."
  });
}
function endLoading() {
  loading.close();
}

//Axios全局配置
Axios.defaults.baseURL = apiUrl;
// 添加请求拦截器
Axios.interceptors.request.use(
  //添加token
  config => {
    // 读取缓存token
    // const userToken = localStorage.getItem("Token");
    // if (userToken) {
    //   // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    // config.headers.Authorization = `Bearer ${userToken}`;
    // }
    config.headers.Authorization = `Bearer`;
    startLoading();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器;
Axios.interceptors.response.use(
  response => {
    // 如果 http 状态码正常, 则直接返回数据
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 304
    ) {
      // 这里, 如果不需要除 data 外的其他数据, 可以直接 return response.data,
      setTimeout(() => {
        endLoading();
      }, 500);
      return response;
    }
  },
  error => {
    // 对响应错误做点什么
    const { response = {} } = error;
    const { data = {} } = response;
    const { code = {} } = data;
    setTimeout(() => {
      endLoading();
    }, 500);
    return response;
  }
);

// export default Axios;
export default {
    install(Vue){
        Object.defineProperty(Vue.prototype,"$Axios",{
            value:Axios
        });
    }
}
