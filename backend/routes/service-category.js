const express = require('express')
const {requireSignin, adminMiddleware,} = require('../controllers/auth')
const {create, list, read, remove} = require('../controllers/service-category')
const router = express.Router()

//validators
const {runValidation} = require('../validators')
const {categoryCreateValidator} = require('../validators/category')


router.post('/service-category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create)
router.get('/service-categories', list);
router.get('/service-category/:slug', read);
router.delete('/service-category/:slug', requireSignin, adminMiddleware, remove);

module.exports = router
