const express = require('express')
const Route = express.Router()

const bookController = require('../controllers/book')
const Auth = require('../helpers/auth')

Route
    .all('/*', Auth.authInfo)
    .get('/', bookController.findBooks, bookController.getBooks)
    .get('/bookstatus', bookController.getBookByStatus)
    .get('/:bookid', bookController.bookDetail)
    .post('/', Auth.accessToken, bookController.addBook)
    .delete('/:bookid', Auth.accessToken, bookController.deleteBook)
    .patch('/:bookid', Auth.accessToken, bookController.updateBook)

module.exports = Route;