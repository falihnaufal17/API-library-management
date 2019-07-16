const statusModel = require('../models/statusModel')
const miscHelper = require('../helpers/helpers')

module.exports = {
    getStatus: (req, res) => {
        statusModel.getStatus()
            .then((resultStatus) => {
                const result = resultStatus
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    detailStatus: (req, res) => {
        const statusid = req.params.statusid
        statusModel.detailStatus(statusid)
            .then((resultStatus) => {
                const result = resultStatus

                if (result[0]) {
                    miscHelper.response(res, result, 200)
                } else {
                    miscHelper.response(res, 'null', 404, 'data not found')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}