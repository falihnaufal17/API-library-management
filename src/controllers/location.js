const locationModel = require('../models/location')
const miscHelper = require('../helpers/helpers')

module.exports = {
    getLocation: (req, res) => {
        locationModel.getLocation()
            .then((resultLocation) => {
                const result = resultLocation

                if (result) {
                    miscHelper.response(res, result, 200)
                } else {
                    miscHelper.response(res, 'null', 404, 'Server Mati')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },

    getLocationById: (req, res) => {
        const locationid = req.params.locationid
        locationModel.getLocationById(locationid)
            .then((resultLocation) => {
                if (resultLocation[0]) {
                    const result = resultLocation[0]
                    miscHelper.response(res, result, 200)
                } else {
                    miscHelper.response(res, 'null', 404, 'data not found')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },

    addLocation: (req, res) => {
        const data = {
            location: req.body.location,
            created_at: new Date(),
            updated_at: new Date(),
        }

        locationModel.addLocation(data)
            .then(() => {
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    deleteLocation: (req, res) => {
        const locationid = req.params.locationid

        locationModel.deleteLocation(locationid)
            .then((resultLocation) => {
                const result = resultLocation
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    updateLocation: (req, res) => {
        const locationid = req.params.locationid
        const data = {
            location: req.body.location,
            updated_at: new Date()
        }

        locationModel.updateLocation(locationid, data)
            .then(() => {
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}