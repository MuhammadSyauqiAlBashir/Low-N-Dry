const express = require('express')
const Controller = require('../controllers/controller')
const {middleware, upload} = require('../middlewares/middleware')
const router = express.Router()


router.post('/login', Controller.login)
router.post('/register', Controller.register)

// router.use(middleware.authentication)

// router.use(middleware.errorHandler)

module.exports = router