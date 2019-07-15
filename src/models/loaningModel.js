const connection = require('../configs/db')

module.exports = {
    getloaning: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT loaning.loaningid, book.title, loaning.id_card, loaning.name, loaning.expired_date, loaning.created_at, loaning.updated_at FROM loaning INNER JOIN book ON loaning.bookid = book.bookid', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    detailLoaning: (loaningid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT loaning.loaningid, loaning.name, book.title, loaning.id_card, loaning.name, loaning.expired_date, loaning.created_at, loaning.updated_at FROM loaning INNER JOIN book ON loaning.bookid = book.bookid WHERE loaningid = ?', loaningid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    addLoaning: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO loaning SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deleteLoaning: (loaningid) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM loaning WHERE loaningid = ?', loaningid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateLoaning: (loaningid, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE loaning SET ? WHERE loaningid = ?', [data, loaningid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}