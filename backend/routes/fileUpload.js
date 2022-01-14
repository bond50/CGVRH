const express = require('express');
const {multipleFileUpload, getAllMultipleFiles, fileRetrieveFromCloud, getDownloads} = require("../controllers/fileUpload");
const {multipleUploadCtrl} = require("../helpers/multer.js");

const router = express.Router();

router.post('/files-upload', multipleUploadCtrl, multipleFileUpload);
router.post('/files-retrieve-from-cloud', fileRetrieveFromCloud);
router.post('/get-all-multiple-files', getAllMultipleFiles);
router.get('/get-downloads', getDownloads );


module.exports = router
