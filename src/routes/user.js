const express = require('express')
const Route = express.Router()

const userController = require('../controllers/user')
const Auth = require('../helpers/auth')

Route
    .all('/*', Auth.authInfo)
    .get('/', Auth.accessToken, userController.getUsers)
    .get('/:iduser', Auth.accessToken, userController.userDetail)
    .post('/register', userController.register)
    .post('/login', userController.login)
    .patch('/logout/:iduser', userController.logout)
    .patch('/verify/:iduser', Auth.accessToken, userController.verifyUser)

module.exports = Route