const express = require('express')
const Route = express.Router()

const bookController = require('../controllers/bookController')

Route
    .get('/:bookid', bookController.bookDetail)
    .get('/', bookController.findBooks)
    .get('/', bookController.getBooks)
    .post('/', bookController.addBook)
    .delete('/:bookid', bookController.deleteBook)
    .patch('/:bookid', bookController.updateBook)

module.exports = Route;