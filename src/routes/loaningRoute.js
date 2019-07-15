const express = require('express')
const Route = express.Router()
const loaningController = require('../controllers/loaningController')

Route
    .get('/', loaningController.getLoaning)
    .post('/', loaningController.addLoaning)
    .get('/:loaningid', loaningController.detailLoaning)
    .delete('/:loaningid', loaningController.deleteLoaning)
    .patch('/:loaningid', loaningController.updateLoaning)

module.exports = Route