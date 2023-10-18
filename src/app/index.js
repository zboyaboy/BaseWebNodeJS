const Koa = require('koa');
const { koaBody } = require('koa-body')
const userRouter = require('../router/user.route')
const demoRouter = require('../router/demo.route')
const app = new Koa();
const ErrorHandler = require('./errorHandler')

app.use(koaBody())
    .use(userRouter.routes())
    .use(demoRouter.routes())
    .use(userRouter.allowedMethods());

app.on('error', ErrorHandler)

module.exports = app;