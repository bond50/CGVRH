const express = require('express');
const {
    createTenders,
    fetchTenders,
    fetchSingleTender,
    updateTenders,
    deleteTenders, fetchPublicTenders
} = require("../controllers/tender");
const {requireSignin, adminMiddleware} = require("../controllers/auth");
const {singleUploadCtrl} = require("../helpers/multer");

const router = express.Router();


router.post('/tender-create', requireSignin, adminMiddleware, singleUploadCtrl,createTenders);
router.get('/tenders', requireSignin, adminMiddleware,fetchTenders);
router.get('/all-tenders', fetchPublicTenders);
router.put('/tenders/:tenderId', requireSignin, adminMiddleware, singleUploadCtrl, updateTenders);
router.get('/tenders/:tenderId', fetchSingleTender);
router.delete('/tenders/:tenderId', requireSignin, adminMiddleware, deleteTenders);

module.exports = router;
