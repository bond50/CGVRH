const express = require('express')
const {requireSignin, adminMiddleware,} = require('../controllers/auth')
const {create,list, read, remove} = require('../controllers/document-category')
const router = express.Router()

//validators
const {runValidation} = require('../validators')
const {categoryCreateValidator} = require('../validators/category')


router.post('/document-category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create)
router.get('/document-categories', list);
router.get('/document-category/:slug', read);
router.delete('/document-category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router
