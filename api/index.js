const express = require('express');
const router = express.Router();

router.use('/pets', require('./pets.js'));
router.use('/owners', require('./owners.js'));
router.use('/products', require('./products.js'));

module.exports = router;