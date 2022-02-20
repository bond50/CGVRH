const express = require('express');
const {
    multipleFileUpload,
    getAllMultipleFiles,
    fileRetrieveFromCloud,
    getDownloads,
    getGallery, galleryCreate
} = require("../controllers/fileUpload");
const {requireSignin, adminMiddleware, authMiddleware} = require("../controllers/auth");
const {multipleFilesUploadCtrl, multipleImagesUploadCtrl} = require("../helpers/multer");

const router = express.Router();

router.post('/files-upload', requireSignin, adminMiddleware, multipleFilesUploadCtrl, multipleFileUpload);
router.post('/gallery-create', requireSignin, adminMiddleware, multipleImagesUploadCtrl, galleryCreate);
router.post('/files-retrieve-from-cloud', fileRetrieveFromCloud);
router.post('/get-all-multiple-files', getAllMultipleFiles);
router.get('/get-downloads', getDownloads);
router.get('/get-gallery', getGallery);

//user routes
router.post('/user/files-upload', requireSignin, authMiddleware, multipleFilesUploadCtrl, multipleFileUpload);
router.post('/user/gallery-create', requireSignin, authMiddleware, multipleImagesUploadCtrl, galleryCreate);


module.exports = router
