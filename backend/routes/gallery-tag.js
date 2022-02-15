const express = require('express');
const router = express.Router();

// controllers
const {requireSignin, adminMiddleware} = require('../controllers/auth');
const {create, list, remove, read} = require('../controllers/gallery-tag');

// validators
const {runValidation} = require('../validators');
const {createTagValidator} = require('../validators/tag');


// only difference is methods not name 'get' | 'post' | 'delete'
router.post('/gallery-tag', createTagValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/gallery-tags', list);
router.get('/gallery-tag/:slug', read);
router.delete('/gallery-tag/:slug', requireSignin, adminMiddleware, remove);
module.exports = router;