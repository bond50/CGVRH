const express = require('express');
const {
    multipleFileUpload,
    getAllMultipleFiles,
    fileRetrieveFromCloud,
    getDownloads,
    getGallery, galleryCreate, getGalleryFormHomePage
} = require("../controllers/fileUpload");
const {requireSignin, adminMiddleware, authMiddleware} = require("../controllers/auth");
const {multipleFilesUploadCtrl, multipleImagesUploadCtrl} = require("../helpers/multer");

const router = express.Router();

router.post('/files-upload', requireSignin, adminMiddleware, multipleFilesUploadCtrl, multipleFileUpload);
router.post('/gallery-create', requireSignin, adminMiddleware, galleryCreate);
router.post('/files-retrieve-from-cloud', fileRetrieveFromCloud);
router.post('/get-all-multiple-files', getAllMultipleFiles);
router.get('/get-downloads', getDownloads);
router.get('/get-gallery', getGallery);
router.get('/get-gallery-for-home-page', getGalleryFormHomePage);

//user routes
router.post('/user/files-upload', requireSignin, authMiddleware, multipleFilesUploadCtrl, multipleFileUpload);
router.post('/user/gallery-create', requireSignin, authMiddleware, galleryCreate);


module.exports = router
