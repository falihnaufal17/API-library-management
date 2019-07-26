const express = require('express')
const Route = express.Router()

const bookController = require('../controllers/book')

Route

    .get('/bookstatus', bookController.getBookByStatus)
    .get('/:bookid', bookController.bookDetail)
    .get('/', bookController.findBooks, bookController.getBooks)
    .post('/', bookController.addBook)
    .delete('/:bookid', bookController.deleteBook)
    .patch('/:bookid', bookController.updateBook)

module.exports = Route;