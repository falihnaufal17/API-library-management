const express = require('express')
const Route = express.Router()
const loaningController = require('../controllers/loaning')
const Auth = require('../helpers/auth')
Route
    .get('/', Auth.authInfo, Auth.accessToken, loaningController.getLoaning)
    .post('/', loaningController.addLoaning)
    .get('/:loaningid', Auth.authInfo, Auth.accessToken, loaningController.detailLoaning)
    .get('/users/:iduser', Auth.authInfo, Auth.accessToken, loaningController.getLoanByUser)
    .delete('/:loaningid', loaningController.deleteLoaning)
    .patch('/:loaningid', loaningController.updateLoaning)

module.exports = Route