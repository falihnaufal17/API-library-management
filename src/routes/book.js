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
    .all('/*', Auth.authInfo)
    .get('/', bookController.findBooks, bookController.getBooks)
    .get('/bookstatus', bookController.getBookByStatus)
    .get('/:bookid', bookController.bookDetail)
    .post('/', upload.single('image'), bookController.addBook)
    .delete('/:bookid', Auth.accessToken, bookController.deleteBook)
    .patch('/:bookid', Auth.accessToken, bookController.updateBook)

module.exports = Route;