const express = require('express')
const Controller = require('../controllers/controller')
const {middleware, upload} = require('../middlewares/middleware')
const router = express.Router()


router.post('/login', Controller.login)
router.post('/register', Controller.register)

router.use(middleware.authentication)
router.get('/payment/midtrans/initiate', Controller.initiateMidtrans)
// router.post('/createOrder', Controller.addOrder)


router.use(middleware.errorHandler)

module.exports = router