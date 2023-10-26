const { getUserInfo } = require('../service/user.service')
const { userFormateError, userAlreadyExisted, userRegisterError, userLoginError, invalidPasswordError, userDoesNotExisted, jsonWebTokenError, hasAdminPermission } = require('../constant/error.type')
const bcrypt = require('bcryptjs');

const userValidator = async (ctx, next) => {
    const { username, password } = ctx.request.body
    //验证
    if (!username || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }
    await next();
}

const verifyUser = async (ctx, next) => {
    const { username } = ctx.request.body
    try {
        const res = await getUserInfo({ username })
        if (res) {
            console.log(res)
            console.error('error:用户名已经存在', { username })
            ctx.app.emit('error', userAlreadyExisted, ctx)
            return
        }

    } catch (err) {
        console.error('error:用户注册异常', err)
        ctx.app.emit('error', userRegisterError, ctx)
    }
    await next();
}

const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hashPassword
    await next();
}

const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (ctx.session.verifyCodeKey != ctx.request.body.verifyCodeKey) {

        ctx.body = {
            code: '00001',
            data: {},
            msg: '验证码校验信息验证失败'
        }
        return
    }
    else {
        if (ctx.session.verifyCodeKey != ctx.request.body.verifyCode) {

            ctx.body = {
                code: '00002',
                data: {},
                msg: '验证码输入不正确'
            }
            return
        }

    }

    try {
        const res = await getUserInfo({ username })
        //判断登录用户名是否存在
        if (!res) {
            console.error('error:用户名不存在', { username })
            ctx.app.emit('error', userDoesNotExisted, ctx)
            return
        }
        //判断登录用户密码是否正确
        if (!bcrypt.compareSync(password, res.password)) {
            console.error('error:密码错误', { username })
            ctx.app.emit('error', invalidPasswordError, ctx)
            return
        }
    } catch (err) {
        console.error('error:用户登录异常', err)
        ctx.app.emit('error', userLoginError, ctx)
        return
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}