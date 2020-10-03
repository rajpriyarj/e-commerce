var express = require('express');
var router = express.Router();
var Category = require('../controllers/c_category')

router.get('/', Category.getCategories);

router.get('/:category_id', Category.getCategories);

router.get('/inProduct/:product_id', Category.getCategories);

router.post('/', Category.postCategory);

module.exports = router;
