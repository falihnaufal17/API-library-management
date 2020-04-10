const express = require('express')
const Route = express.Router()
const loaningController = require('../controllers/loaning')
const Auth = require('../helpers/auth')
Route
    .all('/*')
    .get('/', loaningController.getLoaning)
    .post('/', loaningController.addLoaning)
    .get('/:loaningid', loaningController.detailLoaning)

    //history user loan
    .get('/users/:iduser', loaningController.getLoanByUser)

    //manipulation loan
    .delete('/:loaningid', loaningController.deleteLoaning)
    .patch('/:loaningid', loaningController.updateLoaning)

module.exports = Route