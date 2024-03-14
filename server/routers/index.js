const express = require('express')
const Controller = require('../controllers/controller')
const {middleware, upload} = require('../middlewares/middleware')
const router = express.Router()


router.post('/login', Controller.login)
router.post('/register', Controller.register)

router.use(middleware.authentication)
router.post('/create-order', Controller.initiateMidtrans)
router.get('/list-order', Controller.getListOrder)
router.patch('/update-status/:OrderId', Controller.updateStatusOrder)
router.post('/createNotif', Controller.createNotification)
router.get('/listNotif', Controller.getNotification)
router.get('/listProduct', Controller.listProduct)
router.get('/province', Controller.getProvince)
// router.post('/createOrder', Controller.addOrder)


router.use(middleware.errorHandler)

module.exports = router