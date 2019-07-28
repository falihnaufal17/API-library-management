const connection = require('../configs/db');

module.exports = {

    getBookByStatus: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM book WHERE statusid = 2', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    getBooks: (limit, page) => {
        let offset = (limit * page) - limit
        return new Promise((resolve, reject) => {
            connection.query('SELECT book.bookid, book.title, book.writer, book.image, book.description, location.location, category.category, status.status, book.created_at, book.updated_at FROM book INNER JOIN location ON book.locationid = location.locationid INNER JOIN category ON book.categoryid = category.categoryid INNER JOIN status ON book.statusid = status.statusid LIMIT ? OFFSET ?', [limit, offset], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })

    },

    findBooks: (search, limit, page) => {
        let offset = (limit * page) - limit
        return new Promise((resolve, reject) => {
            const cari = `%${search}%`
            connection.query('SELECT book.bookid, book.title, book.writer, book.image, book.description, location.location, category.category, status.status, book.created_at, book.updated_at FROM book INNER JOIN location ON book.locationid = location.locationid INNER JOIN category ON book.categoryid = category.categoryid INNER JOIN status ON book.statusid = status.statusid WHERE category LIKE ? OR title LIKE ? OR location LIKE ? LIMIT ? OFFSET ?', [cari, cari, cari, limit, offset], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    bookDetail: (bookid) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT book.bookid, book.title, book.writer, book.image, book.description, book.locationid, book.categoryid, book.statusid, location.location, category.category, status.status, book.created_at, book.updated_at FROM book INNER JOIN location ON book.locationid = location.locationid INNER JOIN category ON book.categoryid = category.categoryid INNER JOIN status ON book.statusid = status.statusid WHERE bookid = ?', bookid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err));
                }
            })
        })
    },

    addBook: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO book SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    deleteBook: (bookid) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM book WHERE bookid = ?', bookid, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },

    updateBook: (bookid, data) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE book SET ? WHERE bookid = ?', [data, bookid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}