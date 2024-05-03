// routes/certificateRoutes.js
const express = require('express');
const router = express.Router();

// Controllers
const { create, list, read, remove, verify, canModifyOrDeleteCert,update,listByUser, downloadPDF} = require('../controllers/certificate');
const { requireSignin, adminMiddleware, authMiddleware} = require('../controllers/auth');

// Routes for certificates

router.post('/certificate', requireSignin, adminMiddleware, create);
router.get('/certificates', list);
router.get('/certificate/:id', read);
router.delete('/certificate/:id', requireSignin, authMiddleware, adminMiddleware, remove);
router.put('/certificate/:id', requireSignin, authMiddleware, adminMiddleware, update);
router.get('/certificate/:id/pdf', downloadPDF);
router.get('/certificates/verify/:id', verify);

//user routes
router.post('/user/certificate', requireSignin, authMiddleware, create);
router.get('/user/certificates', listByUser);
router.get('/user/certificate/:id', read);
router.delete('/user/certificate/:id', requireSignin, authMiddleware, canModifyOrDeleteCert, remove);
router.put('/user/certificate/:id', requireSignin, authMiddleware, canModifyOrDeleteCert, update);



module.exports = router;
