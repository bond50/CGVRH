const express = require('express');
const router = express.Router();

const {listSEOSettings} = require('../controllers/about');


router.get('/about-page-seo', listSEOSettings);


module.exports = router;


