const connection = require('../configs/db')

module.exports = {
    getCategory: (callback) => {
        connection.query('SELECT * FROM category', (err, result) => {
            if (err) console.error(err);

            callback(err, result)
        })
    },

    addCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO category SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deleteCategory: (categoryid) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM category WHERE id = ?', categoryid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    categoryById: (categoryid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM category WHERE categoryid = ?', categoryid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}