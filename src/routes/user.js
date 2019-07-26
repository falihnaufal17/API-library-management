const express = require('express')
const Route = express.Router()

const userController = require('../controllers/user')
const Auth = require('../helpers/auth')

Route
    .get('/', Auth.authInfo, Auth.accessToken, userController.getUsers)
    .get('/:iduser', Auth.authInfo, userController.userDetail)
    .post('/register', userController.register)
    .post('/login', userController.login)
    .patch('/logout/:iduser', userController.logout)
    .patch('/verify/:iduser', userController.verifyUser)

module.exports = Route