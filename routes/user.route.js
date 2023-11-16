const User = require('../controllers/User.controller')
const express=require('express')
const userRoute =express.Router()
const authMiddleware = require('../middleware/auth.middleware')


userRoute.post('/createUser',User.createUser)

userRoute.post('/updateUserStatus',authMiddleware.verifyToken,User.updateUserStatus)

userRoute.post('/calculateDistance',authMiddleware.verifyToken,User.calculateDistance)

module.exports = userRoute