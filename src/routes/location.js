const express = require('express')
const Route = express.Router()

const locationController = require('../controllers/location')

Route
    .get('/', locationController.getLocation)
    .get('/:locationid', locationController.getLocationById)
    .post('/', locationController.addLocation)
    .delete('/:locationid', locationController.deleteLocation)
    .patch('/:locationid', locationController.updateLocation)

module.exports = Route