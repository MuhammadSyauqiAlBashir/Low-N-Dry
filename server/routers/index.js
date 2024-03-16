const express = require('express')
const Controller = require('../controllers/controller')
const {middleware, upload} = require('../middlewares/middleware')
const router = express.Router()


router.post('/login', Controller.login)
router.post('/register', Controller.register)
router.post('/googleLogin', Controller.googleLogin)
router.get('/province', Controller.getProvince)

router.use(middleware.authentication)
router.patch('/updatePhoto',upload.single('photo'), Controller.changeUserPicture)
router.get('/order', Controller.getListOrder)
router.post('/order', Controller.initiateMidtrans)
router.patch('/order/:OrderId', Controller.donePayment)
router.delete('/order/:OrderId', Controller.deleteOrder)
router.post('/createNotif', Controller.createNotification)
router.get('/listNotif', Controller.getNotification)
router.get('/listProduct', Controller.listProduct)
router.get('/profile', Controller.getProfile)


router.use(middleware.errorHandler)

module.exports = router