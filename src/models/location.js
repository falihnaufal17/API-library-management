const connection = require('../configs/db')

module.exports = {
    getLocation: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM location', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getLocationById: (locationid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM location WHERE locationid = ?', locationid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    addLocation: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO location SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deleteLocation: (locationid) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM location WHERE locationid = ?', locationid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateLocation: (locationid, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE location SET ? WHERE locationid = ?', [data, locationid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}