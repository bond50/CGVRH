const express = require('express');
const router = express.Router();

// controllers
const {requireSignin, adminMiddleware} = require('../controllers/auth');
const {create, list, remove, read} = require('../controllers/service-tag');


const {runValidation} = require('../validators');
const {createTagValidator} = require('../validators/tag');


// only difference is methods not name 'get' | 'post' | 'delete'
router.post('/service-tag', createTagValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/service-tags', list);
router.get('/service-tag/:slug', read);
router.delete('/service-tag/:slug', requireSignin, adminMiddleware, remove);


module.exports = router;