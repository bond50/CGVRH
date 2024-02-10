const express = require('express');
const router = express.Router();
const {
    listFeatured,

} = require('../controllers/featured');





router.get('/featured-all', listFeatured);


module.exports = router;
