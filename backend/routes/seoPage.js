const express = require('express');
const router = express.Router();
const {requireSignin, adminMiddleware} = require('../controllers/auth');
const {getAllSEOPages, createSEOPage, updateSEOPage, deleteSEOPage, getSEOPageById} = require('../controllers/seoPage');

router.get('/all-seo-pages', requireSignin, adminMiddleware, getAllSEOPages);
router.post('/seo-page', requireSignin, adminMiddleware, createSEOPage);
router.put('/seo-page/:id', requireSignin, adminMiddleware, updateSEOPage);
router.delete('/seo-page/:id', requireSignin, adminMiddleware, deleteSEOPage);
router.get('/seo-page/:id', getSEOPageById);

module.exports = router;
