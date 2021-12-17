const express = require('express');
const router = express.Router();
const {
    listSearch,
} = require('../controllers/search');

router.get('/search', listSearch);


module.exports = router;
