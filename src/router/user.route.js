const Router = require('@koa/router')
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const { register, login, changePassword } = require('../controller/user.controller')
const captchapng = require('../captchapng-master/lib/captchapng.js');



const router = new Router({ prefix: '/api/v1' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello use1111rs'
    console.log('666')
})

//注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)

//登录接口
router.post('/auth/login', userValidator, verifyLogin, cryptPassword, login)

//获取登录用户信息
router.get('/users/me', (ctx) => {
    ctx.body = {
        code: "00000",
        data: {
            userId: 2,
            nickname: "系统管理员",
            avatar:
                "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
            roles: ["ADMIN"],
            perms: [
                "sys:menu:delete",
                "sys:dept:edit",
                "sys:dict_type:add",
                "sys:dict:edit",
                "sys:dict:delete",
                "sys:dict_type:edit",
                "sys:menu:add",
                "sys:user:add",
                "sys:role:edit",
                "sys:dept:delete",
                "sys:user:edit",
                "sys:user:delete",
                "sys:user:reset_pwd",
                "sys:dept:add",
                "sys:role:delete",
                "sys:dict_type:delete",
                "sys:menu:edit",
                "sys:dict:add",
                "sys:role:add",
            ],
        },
        msg: "一切ok",
    }
})
router.get('/menus/routes', (ctx) => {
    ctx.body = {
        code: "00000",
        data: [
            {
                path: "/system",
                component: "Layout",
                redirect: "/system/user",
                meta: {
                    title: "系统管理",
                    icon: "system",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "user",
                        component: "system/user/index",
                        name: "User",
                        meta: {
                            title: "用户管理",
                            icon: "user",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "role",
                        component: "system/role/index",
                        name: "Role",
                        meta: {
                            title: "角色管理",
                            icon: "role",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "menu",
                        component: "system/menu/index",
                        name: "Menu",
                        meta: {
                            title: "菜单管理",
                            icon: "menu",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "dept",
                        component: "system/dept/index",
                        name: "Dept",
                        meta: {
                            title: "部门管理",
                            icon: "tree",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "dict",
                        component: "system/dict/index",
                        name: "DictType",
                        meta: {
                            title: "字典管理",
                            icon: "dict",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },

            {
                path: "/api",
                component: "Layout",
                meta: {
                    title: "接口",
                    icon: "api",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "apidoc",
                        component: "demo/api-doc",
                        name: "Apidoc",
                        meta: {
                            title: "接口文档",
                            icon: "api",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: false,
                        },
                    },
                ],
            },
            {
                path: "/external-link",
                component: "Layout",
                redirect: "noredirect",
                meta: {
                    title: "外部链接",
                    icon: "link",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "https://juejin.cn/post/7228990409909108793",
                        meta: {
                            title: "document",
                            icon: "document",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
            {
                path: "/multi-level",
                component: "Layout",
                redirect: "/multi-level/multi-level1",
                meta: {
                    title: "多级菜单",
                    icon: "multi_level",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "multi-level1",
                        component: "demo/multi-level/level1",
                        redirect: "/multi-level/multi-level2",
                        meta: {
                            title: "菜单一级",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                        children: [
                            {
                                path: "multi-level2",
                                component: "demo/multi-level/children/level2",
                                redirect: "/multi-level/multi-level2/multi-level3-1",
                                meta: {
                                    title: "菜单二级",
                                    icon: "",
                                    hidden: false,
                                    roles: ["ADMIN"],
                                    keepAlive: true,
                                },
                                children: [
                                    {
                                        path: "multi-level3-1",
                                        component: "demo/multi-level/children/children/level3-1",
                                        name: "MultiLevel31",
                                        meta: {
                                            title: "菜单三级-1",
                                            icon: "",
                                            hidden: false,
                                            roles: ["ADMIN"],
                                            keepAlive: true,
                                        },
                                    },
                                    {
                                        path: "multi-level3-2",
                                        component: "demo/multi-level/children/children/level3-2",
                                        name: "MultiLevel32",
                                        meta: {
                                            title: "菜单三级-2",
                                            icon: "",
                                            hidden: false,
                                            roles: ["ADMIN"],
                                            keepAlive: true,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: "/component",
                component: "Layout",
                meta: {
                    title: "组件封装",
                    icon: "menu",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "wang-editor",
                        component: "demo/wang-editor",
                        name: "wang-editor",
                        meta: {
                            title: "富文本编辑器",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "upload",
                        component: "demo/upload",
                        name: "upload",
                        meta: {
                            title: "图片上传",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "icon-selector",
                        component: "demo/icon-selector",
                        name: "icon-selector",
                        meta: {
                            title: "图标选择器",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "dict-demo",
                        component: "demo/dict",
                        name: "DictDemo",
                        meta: {
                            title: "字典组件",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "taginput",
                        component: "demo/taginput",
                        name: "taginput",
                        meta: {
                            title: "标签输入框",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "signature",
                        component: "demo/signature",
                        name: "signature",
                        meta: {
                            title: "签名",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "table",
                        component: "demo/table",
                        name: "Table",
                        meta: {
                            title: "表格",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
            {
                path: "/table",
                component: "Layout",
                meta: {
                    title: "Table",
                    icon: "table",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "dynamic-table",
                        component: "demo/table/dynamic-table/index",
                        name: "DynamicTable",
                        meta: {
                            title: "动态Table",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "drag-table",
                        component: "demo/table/drag-table",
                        name: "DragTable",
                        meta: {
                            title: "拖拽Table",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "complex-table",
                        component: "demo/table/complex-table",
                        name: "ComplexTable",
                        meta: {
                            title: "综合Table",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
            {
                path: "/function",
                component: "Layout",
                meta: {
                    title: "功能演示",
                    icon: "menu",
                    hidden: false,
                    roles: ["ADMIN"],
                    keepAlive: true,
                },
                children: [
                    {
                        path: "permission",
                        component: "demo/permission/page",
                        name: "Permission",
                        meta: {
                            title: "Permission",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "icon-demo",
                        component: "demo/icons",
                        name: "Icons",
                        meta: {
                            title: "图标",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "websocket",
                        component: "demo/websocket",
                        name: "Websocket",
                        meta: {
                            title: "Websocket",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                    {
                        path: "other",
                        component: "demo/other",
                        meta: {
                            title: "敬请期待...",
                            icon: "",
                            hidden: false,
                            roles: ["ADMIN"],
                            keepAlive: true,
                        },
                    },
                ],
            },
        ],
        msg: "一切ok",
    }
})
router.get('/auth/captcha', (ctx) => {
    dispNumber = parseInt(Math.random() * 9000 + 1000)
    var p = new captchapng(80, 30, dispNumber); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    ctx.session.verifyCodeKey = dispNumber
    //console.log(ctx.session.verifyCodeKey)
    var img = p.getBase64();
    //var imgbase64 = new Buffer(img, 'base64');
    ctx.body = {
        code: "00000",
        data: {
            verifyCodeKey: dispNumber,
            verifyCodeBase64:
                "data:image/png;base64," + img,
        },
        msg: "一切ok",
    }

    //captcha
})
router.get('/dept/options', (ctx) => {
    ctx.body = {
        code: "00000",
        data: [
            {
                value: 1,
                label: "有来技术",
                children: [
                    {
                        value: 2,
                        label: "研发部门",
                    },
                    {
                        value: 3,
                        label: "测试部门",
                    },
                ],
            },
        ],
        msg: "一切ok",
    }
})
router.get('/roles/options', (ctx) => {
    ctx.body = {
        code: "00000",
        data: [
            {
                value: 2,
                label: "系统管理员",
            },
            {
                value: 4,
                label: "系统管理员1",
            },
            {
                value: 5,
                label: "系统管理员2",
            },
            {
                value: 6,
                label: "系统管理员3",
            },
            {
                value: 7,
                label: "系统管理员4",
            },
            {
                value: 8,
                label: "系统管理员5",
            },
            {
                value: 9,
                label: "系统管理员6",
            },
            {
                value: 10,
                label: "系统管理员7",
            },
            {
                value: 11,
                label: "系统管理员8",
            },
            {
                value: 12,
                label: "系统管理员9",
            },
            {
                value: 3,
                label: "访问游客",
            },
        ],
        msg: "一切ok",
    }
})
router.get('/users/page', (ctx) => {
    ctx.body = {
        code: "00000",
        data: {
            list: [
                {
                    id: 2,
                    username: "admin",
                    nickname: "系统管理员",
                    mobile: "17621210366",
                    genderLabel: "男",
                    avatar:
                        "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
                    email: null,
                    status: 1,
                    deptName: "有来技术",
                    roleNames: "系统管理员",
                    createTime: "2019-10-10",
                },
                {
                    id: 3,
                    username: "test",
                    nickname: "测试小用户",
                    mobile: "17621210366",
                    genderLabel: "男",
                    avatar:
                        "https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif",
                    email: null,
                    status: 1,
                    deptName: "测试部门",
                    roleNames: "访问游客",
                    createTime: "2021-06-04",
                },
            ],
            total: 2,
        },
        msg: "一切ok",
    }
})
router.get('/dept', (ctx) => {
    ctx.body = {
        code: "00000",
        data: [
            {
                value: 1,
                label: "技术",
                children: [
                    {
                        value: 2,
                        label: "研发部门",
                    },
                    {
                        value: 3,
                        label: "测试部门",
                    },
                ],
            },
        ],
        msg: "一切ok",
    };
})
router.delete('/auth/logout', (ctx) => {
    ctx.body = {
        code: "00000",
        data: {},
        msg: "string",
    }
})
module.exports = router