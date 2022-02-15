const express = require('express');
const router = express.Router();

// controllers
const {requireSignin, adminMiddleware} = require('../controllers/auth');
const {create, list, remove, read} = require('../controllers/document-tag');
// validators
const {runValidation} = require('../validators');
const {createTagValidator} = require('../validators/tag');


// only difference is methods not name 'get' | 'post' | 'delete'
router.post('/document-tag', createTagValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/document-tags', list);
router.get('/document-tag/:slug', read);
router.delete('/document-tag/:slug', requireSignin, adminMiddleware, remove);
module.exports = router;