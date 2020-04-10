const express = require('express')
const Route = express.Router()
const multer = require('multer')
const path = require('path')

const bookController = require('../controllers/book')
const Auth = require('../helpers/auth')

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads/images/')
    },

    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage, limits: { fileSize: 100000000 } })

Route
    .all('/*')
    .get('/', bookController.findBooks, bookController.getBooks)
    .get('/bookstatus', bookController.getBookByStatus)
    .get('/:bookid', bookController.bookDetail)
    .post('/', upload.single('image'), bookController.addBook)
    .delete('/:bookid', bookController.deleteBook)
    .patch('/:bookid', bookController.updateBook)

module.exports = Route;