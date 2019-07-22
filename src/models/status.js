const connection = require('../configs/db')

module.exports = {
    getStatus: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM status', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    detailStatus: (statusid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM status WHERE statusid = ?', statusid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}