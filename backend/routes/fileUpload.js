const express = require('express');
const {
    multipleFileUpload,
    getAllMultipleFiles,
    fileRetrieveFromCloud,
    getDownloads,
    getGallery, galleryCreate
} = require("../controllers/fileUpload");
const {requireSignin, adminMiddleware} = require("../controllers/auth");
const {multipleFilesUploadCtrl, multipleImagesUploadCtrl} = require("../helpers/multer");

const router = express.Router();

router.post('/files-upload', requireSignin, adminMiddleware, multipleFilesUploadCtrl, multipleFileUpload);
router.post('/gallery-create', requireSignin, adminMiddleware, multipleImagesUploadCtrl, galleryCreate);
router.post('/files-retrieve-from-cloud', fileRetrieveFromCloud);
router.post('/get-all-multiple-files', getAllMultipleFiles);
router.get('/get-downloads', getDownloads);
router.get('/get-gallery', getGallery);


module.exports = router
