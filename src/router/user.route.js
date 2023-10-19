const Router = require('@koa/router')

const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

//GET /users/
router.get('/', (ctx, next) => {
    ctx.body = 'hello users'
})

//注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)

//登录接口
router.post('/login', userValidator, verifyLogin, login)

module.exports = router