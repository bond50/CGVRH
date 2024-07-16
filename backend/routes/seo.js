// routes/seo.js
const express = require('express');
const router = express.Router();
const {requireSignin, adminMiddleware} = require('../controllers/auth');
const {getSEO, getAllSEOs, createSEO, updateSEO, deleteSEO, getSEOById} = require('../controllers/seo');

router.post('/seo', requireSignin, adminMiddleware, createSEO);
router.put('/seo/:pageId', requireSignin, adminMiddleware, updateSEO);
router.get('/seo/:pageId', getSEO);
router.get('/seos', getAllSEOs);
router.delete('/seo/:id', requireSignin, adminMiddleware, deleteSEO);
router.get('/seo-by-id/:id', getSEOById); // New route to get SEO by ID

module.exports = router;


