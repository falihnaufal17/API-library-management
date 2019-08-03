const bookModel = require('../models/book')
const miscHelper = require('../helpers/helpers')

const multer = require('multer')
const path = require('path')
// let storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads')
//         console.log("masuk 2");
//     },

//     filename: function (req, file, callback) {
//         console.log("masuk 1");
//         callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })
// let upload = multer({ storage: storage, limits: { fileSize: 100000000 } });

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

    addBook: async (req, res) => {
        let filename = "/images/" + req.file.filename
        console.log("FILENYA: ", filename)

        const data = {
            title: req.body.title,
            writer: req.body.writer,
            image: filename,
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
                console.log(res)
                console.log(data)
            })
            .catch((error) => {
                miscHelper.response(res, 'judul buku sudah ada!', 403, 'forbidden')
                console.log(res)
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
