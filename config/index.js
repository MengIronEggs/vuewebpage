/**
 * 项目配置信息
 */
const isPublish = () => {
    return window.location.host.indexOf("guoanfamily.com") !== -1;
};

const isTest = () => {
    return window.location.host.indexOf("rtest.guoanfamily.com") !== -1 || window.location.host.indexOf("rt.guoanfamily.com") !== -1;
};

let def = {
    SCANCODE: "//act.guoanfamily.com/common/",
    FACE_SWF_FILE_PATH: '//act.guoanfamily.com/staticWeb/agenthouse/web/jscam_canvas_only.swf',
    COMMON_INTERFACE: '//act.guoanfamily.com/common/',
    IMAGE_PATH: "//img.guoanfamily.com/",
};

let dev = {
    // INTERFACE: "http://127.0.0.1:8082/agenthouseWeb/",
    INTERFACE: "http://rtest.guoanfamily.com/agenthouseWeb/",
    UPLOAD_IMAGE: `http://127.0.0.1:8082/agenthouseWeb/CommonController/uploadFile`,
};

let test = {
    INTERFACE: "//rtest.guoanfamily.com/agenthouseWeb/",
    UPLOAD_IMAGE: `//rtest.guoanfamily.com/agenthouseWeb/CommonController/uploadFile`,
    UPLOAD_FILE: `//rtest.guoanfamily.com/agenthouseWeb/CommonController/uploadFileDoc`,
};
let prod = {
    INTERFACE: "//act.guoanfamily.com/agenthouseWeb/",
    UPLOAD_IMAGE: `//act.guoanfamily.com/agenthouseWeb/CommonController/uploadFile`,
    UPLOAD_FILE: `//act.guoanfamily.com/agenthouseWeb/CommonController/uploadFileDoc`,
};

let config = dev;

if (isTest()) {
    config = test;
} else if (isPublish()) {
    config = prod;
}

config = Object.assign(config, def);
export { config }