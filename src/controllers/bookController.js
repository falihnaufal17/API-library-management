const bookModel = require('../models/bookModel')
const miscHelper = require('../helpers/helpers')

module.exports = {

    getBooks: (req, res) => {
        bookModel.getBooks((err, result) => {
            if (err) console.error(err)

            miscHelper.response(res, result, 200)
        })
    },

    findBooks: (req, res) => {
        const search = req.query.search || '';
        bookModel.findBooks(search)
            .then((resultBook) => {
                const result = resultBook

                if (result[0]) {
                    miscHelper.response(res, result, 200)
                } else {
                    miscHelper.response(res, 'null', 404, 'tidak ada data yang seperti itu')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },

    bookDetail: (req, res) => {
        const bookid = req.params.bookid;

        bookModel.bookDetail(bookid)
            .then((resultBook) => {

                if (resultBook[0]) {
                    const result = resultBook[0]
                    miscHelper.response(res, result, 200)
                } else {
                    miscHelper.response(res, 'null', 404, 'no data found')
                }
            })
            .catch((error) => {
                console.log(error);
            })
    },

    addBook: (req, res) => {
        const data = {
            name: req.body.name,
            writer: req.body.writer,
            location: req.body.location,
            categoryid: req.body.categoryid,
            created_at: new Date(),
            updated_at: new Date()
        }

        bookModel.addBook(data)
            .then(() => {
                // const result = resultBook
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    deleteBook: (req, res) => {
        const bookid = req.params.bookid;

        bookModel.deleteBook(bookid)
            .then((resultBook) => {
                const result = resultBook
                miscHelper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    updateBook: (req, res) => {
        const bookid = req.params.bookid;
        const data = {
            name: req.body.name,
            writer: req.body.writer,
            location: req.body.location,
            categoryid: req.body.categoryid,
            updated_at: new Date()
        }
        bookModel.updateBook(bookid, data)
            .then(() => {
                // const result = resultBook
                miscHelper.response(res, data, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}
