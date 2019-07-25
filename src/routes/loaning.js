const express = require('express')
const Route = express.Router()
const loaningController = require('../controllers/loaning')

Route
    .get('/', loaningController.getLoaning)
    .post('/', loaningController.addLoaning)
    .get('/:loaningid', loaningController.detailLoaning)
    .get('/users/:iduser', loaningController.getLoanByUser)
    .delete('/:loaningid', loaningController.deleteLoaning)
    .patch('/:loaningid', loaningController.updateLoaning)

module.exports = Route