const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');

/* Routes for Categories */
router.get('/:categoryid', controller.getCategoryId)

router.get('/', controller.getAllCategory)

router.post('/', controller.addCategory)

router.patch('/:categoryid', controller.updateCategory)

module.exports = router;
