const express = require('express')
const Route = express.Router()

const bookController = require('../controllers/bookController')

Route
    .get('/', bookController.getBooks)
    .get('/:bookid', bookController.bookDetail)
    .post('/', bookController.addBook)
    .delete('/:bookid', bookController.deleteBook)
    .patch('/:bookid', bookController.updateBook)

module.exports = Route;