const express = require('express');
const router = express.Router();
const controller = require('../controllers/book');

/* Routes for Books */

router.get('/:bookid', controller.findBookId);

// Cari buku berdasarkan category and location
router.get('/', controller.findBook);

router.post('/', controller.addBook);

router.patch('/:bookid', controller.updateBook);

router.delete('/:bookid', controller.deleteBook);

module.exports = router;