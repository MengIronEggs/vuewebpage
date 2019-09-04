import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

import Axios from '../script/axios';
Vue.use(Axios);

//安装自定义组件
import GaPlugin from '../script/GaPlugin';
Vue.use(new GaPlugin());
import Common from '../script/common';
Vue.use(new Common());
//应用全局样式
import './styles/public.less';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
