import  config  from './urlApi';
import crumbs from '../src/components/bread.vue';
export default class {

    constructor() { }

    install(Vue) {
        this.installComponent(Vue);
        this.installPrototype(Vue);
        this.installFilter(Vue);
    }
    // 添加公共方法
    installPrototype(Vue) {
        /**
         * 定义上传图片的地址
         * @type {string}
         */
        Vue.prototype.UPLOAD_IMAGE = config.UPLOAD_IMAGE;;
        Vue.prototype.UPLOAD_FILE = config.UPLOAD_FILE;
        /**
        * 封装操作的错误提示信息
        * @param msg
        */
        Vue.prototype.$showErrorTip = function (msg) {
            this.$message.error({
                message: msg,
                customClass: 'form-error',
                showClose: true,
                duration: 2000,
            });
        };
        /**
         * 封装展示弹出消息
         * @param msg
         * @param type
         */
        Vue.prototype.$showMsgTip = function (msg, type = 'success') {
            this.$message({
                message: msg,
                type: type,
                customClass: 'form-error',
                showClose: true,
                duration: 2000,
            });
        };
        /**
         * 展示确认操作提示框
         * @param msg
         * @param cb
         * @param type
         */
        Vue.prototype.$showConfirm = function (msg, cb = () => { }, type = 'warning') {
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: type
            }).then(() => {
                cb();
            }).catch(() => {
                this.$message({
                    message: "取消操作",
                    type: 'info',
                    customClass: 'form-error',
                    showClose: true,
                    duration: 2000,
                });
            });
        };
    }
    // 添加公共组件 
    installComponent(Vue){
        Vue.component("crumbs", crumbs);
    }
    // 添加vue过滤器
    installFilter(Vue) {
        Vue.filter('date-time-filter', function (time) {
            if (!time) {
                return "";
            }
            return new Date(time).Format("yyyy-MM-dd hh:mm");
        });
        Vue.filter('numFilter', function (value) {
            let realVal = parseFloat(value).toFixed(2);
            return realVal;
        })
    }
}