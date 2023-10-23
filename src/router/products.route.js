const Router = require('@koa/router')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/products.middleware')
const { upload, create, update, remove } = require('../controller/products.controller')


const router = new Router({ prefix: '/products' })

//商品图片上传接口
router.post('/upload', auth, hadAdminPermission, upload)

//发布商品接口
router.post('/', auth, hadAdminPermission, validator, create)

//修改商品接口
router.put('/:id', auth, hadAdminPermission, validator, update)

//硬删除接口
router.delete('/:id', auth, hadAdminPermission, remove)

module.exports = router