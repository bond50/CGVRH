const express = require('express');
const router = express.Router();
const {
    create,
    list,
} = require('../controllers/sheets');


router.post('/staff-info', create);
router.get('/staff-info', list);



module.exports = router;
