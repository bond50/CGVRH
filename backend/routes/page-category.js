const express = require('express')
const {requireSignin, adminMiddleware,} = require('../controllers/auth')
const {create, list, read,readCatNames, remove} = require('../controllers/page-category')
const router = express.Router()

//validators
const {runValidation} = require('../validators')
const {categoryCreateValidator} = require('../validators/category')


router.post('/page-cat', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create)
router.get('/page-cats', list);
router.get('/page-cat/:slug', read);
router.get('/page-cat-name/:slug', readCatNames);
router.delete('/page-cat/:slug', requireSignin, adminMiddleware, remove);

module.exports = router
