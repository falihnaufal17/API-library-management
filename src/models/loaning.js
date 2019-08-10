const connection = require('../configs/db')

module.exports = {
    getloaning: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT loaning.loaningid, book.bookid, book.title, user.id_card, user.name, loaning.expired_date, loaning.forfeit, loaning.isverify, loaning.created_at, loaning.updated_at FROM loaning INNER JOIN book ON loaning.bookid = book.bookid INNER JOIN user ON loaning.id_card = user.iduser ORDER BY created_at DESC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getLoanByUser: (iduser) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT loaning.loaningid, book.bookid, book.title, book.image, user.id_card, user.name, loaning.expired_date, loaning.forfeit, loaning.isverify, loaning.created_at, loaning.updated_at FROM loaning INNER JOIN book ON loaning.bookid = book.bookid INNER JOIN user ON loaning.id_card = user.iduser WHERE loaning.id_card = ?', iduser, (err, result) => {
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
            connection.query('SELECT loaning.loaningid, book.bookid, book.title, user.id_card, user.name, loaning.expired_date, loaning.forfeit, loaning.isverify, loaning.created_at, loaning.updated_at FROM loaning INNER JOIN book ON loaning.bookid = book.bookid INNER JOIN user ON loaning.id_card = user.iduser WHERE loaningid = ?', loaningid, (err, result) => {
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
                    connection.query('UPDATE book SET statusid = 1 WHERE bookid = ?', data.bookid)
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
                    connection.query('UPDATE book SET statusid = 2 WHERE bookid = ?', data.bookid)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}