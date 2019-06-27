const connection = require('../configs/db');

module.exports = {
    getBooks: (callback) => {
        connection.query('SELECT book.bookid, book.name, book.writer, book.location, category.category, book.created_at, book.updated_at FROM book INNER JOIN category ON book.categoryid = category.categoryid', (err, result) => {
            if (err) console.error(err)

            callback(err, result);
        })
    },

    findBooks: (search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT book.bookid, book.name, book.writer, book.location, category.category, book.created_at, book.updated_at FROM book INNER JOIN category ON book.categoryid = category.categoryid WHERE category LIKE '%${search}%' OR name LIKE '%${search}%'`, (err, result) => {
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
            connection.query('SELECT book.bookid, book.name, book.writer, book.location, category.category, book.created_at, book.updated_at FROM book INNER JOIN category ON book.categoryid = category.categoryid WHERE bookid = ?', bookid, (err, result) => {
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