const express = require('express')
const {upload, remove} = require('../controllers/cloudinary')
const router = express.Router()

// //validators
// const {runValidation} = require('../validators')
// const {categoryCreateValidator} = require('../validators/category')
const {requireSignin, adminMiddleware} = require('../controllers/auth');


router.post('/upload-images', requireSignin, requireSignin, adminMiddleware, upload)
router.post('/remove-image', requireSignin, requireSignin, adminMiddleware, remove);


module.exports = router
