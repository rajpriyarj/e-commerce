var express = require('express');
var router = express.Router();

var Attributes = require('../controllers/c_attributes')


router.get('/', Attributes.getAttributes);

router.get('/:attribute_id', Attributes.getAttributes);

router.get('/inProduct/:product_id', Attributes.getAttributes);

router.post('/', Attributes.postAttribute);

module.exports = router;
