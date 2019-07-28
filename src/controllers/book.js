const bookModel = require('../models/book')
const miscHelper = require('../helpers/helpers')

module.exports = {

    getBookByStatus: (req, res) => {
        bookModel.getBookByStatus()
            .then((resultBook) => {
                const result = resultBook
                if (result) {
                    miscHelper.response(res, result, 200)
                } else {
                    miscHelper.response(res, 'Tidak ada buku yang tersedia', 404, 'not found')
                }
            })
    },

    getBooks: (req, res) => {
        let limit = parseInt(req.query.limit) || 8
        let page = parseInt(req.query.page) || 1
        bookModel.getBooks(limit, page)
            .then((resultBook) => {
                const result = resultBook

                if (result) {
                    miscHelper.response(res, result, 200)
                } else {
                    miscHelper.response(res, 'null', 404, 'Server mati')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },

    findBooks: (req, res) => {
        let limit = parseInt(req.query.limit) || 8
        let page = parseInt(req.query.page) || 1
        const search = req.query.search || '';
        bookModel.findBooks(search, limit, page)
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
                    miscHelper.response(res, 'null', 404, 'data not found')
                }
            })
            .catch((error) => {
                console.log(error);
            })
    },

    addBook: (req, res) => {
        const data = {
            title: req.body.title,
            writer: req.body.writer,
            image: req.body.image,
            description: req.body.description,
            locationid: req.body.locationid,
            categoryid: req.body.categoryid,
            statusid: req.body.statusid,
            created_at: new Date(),
            updated_at: new Date()
        }

        bookModel.addBook(data)
            .then(() => {
                // const result = resultBook
                miscHelper.response(res, data, 201)
            })
            .catch((error) => {
                miscHelper.response(res, 'judul buku sudah ada!', 403, 'forbidden')
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
            title: req.body.title,
            writer: req.body.writer,
            image: req.body.image,
            description: req.body.description,
            locationid: req.body.locationid,
            categoryid: req.body.categoryid,
            statusid: req.body.statusid,
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
