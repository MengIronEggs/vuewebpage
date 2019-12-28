/**
 * Created by Administrator on 2017/4/10 0010.
 */

//保存所有的广播事件
import { config } from '../config';
// import crumbs from '../components/bread.vue'

export default class {

    constructor() {
        
        this.tableArr = null;
        this.companyArr = {};
        window.EVENT_STORAGE = window.EVENT_STORAGE || {};
    }

    install(Vue) {
        this.installExtendsFunction();
        this.installComponent(Vue);
        this.installPrototype(Vue);
    }

    /*------------------安装扩展方法------------------*/
    installExtendsFunction() {
        /**
         * 扩展时间对象，增加Format方法
         */
        (function () {
            /*对Date的扩展，将 Date 转化为指定格式的String
             月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
             年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
             例子：
             (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
             (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
             支持时间格式化*/
            Date.prototype.Format = function (fmt) { //author: meizz
                let o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (let k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }());
    }
     /*------------------添加vue组件------------------*/
    installComponent() {}

    /*------------------添加vue实例方法------------------*/
    installPrototype(Vue) {
        // 数组对象排序(倒叙，由高到低)
        Vue.prototype.$ArrObjSort = (property) =>{
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value2 - value1;
            }
        };
    }
}