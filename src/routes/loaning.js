const express = require('express')
const Route = express.Router()
const loaningController = require('../controllers/loaning')
const Auth = require('../helpers/auth')
Route
    .all('/*', Auth.authInfo)
    .get('/', Auth.accessToken, loaningController.getLoaning)
    .post('/', Auth.accessToken, loaningController.addLoaning)
    .get('/:loaningid', loaningController.detailLoaning)

    //history user loan
    .get('/users/:iduser', Auth.accessToken, loaningController.getLoanByUser)

    //manipulation loan
    .delete('/:loaningid', Auth.accessToken, loaningController.deleteLoaning)
    .patch('/:loaningid', Auth.accessToken, loaningController.updateLoaning)

module.exports = Route