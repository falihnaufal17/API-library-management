const express = require('express')
const Route = express.Router()
const statusController = require('../controllers/statusController')

Route
    .get('/', statusController.getStatus)
    .get('/:statusid', statusController.detailStatus)
module.exports = Route