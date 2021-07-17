const express = require('express');
const {singleFileUpload,multipleFileUpload, getAllMultipleFiles, fileRetrieveFromCloud} = require("../controllers/fileUpload");
const {multipleUploadCtrl, singleUploadCtrl} = require("../helpers/multer.js");

const router = express.Router();

router.post('/files-upload', multipleUploadCtrl, multipleFileUpload);
router.post('/single-file-upload', singleUploadCtrl,singleFileUpload);
router.get('/files-retrieve-from-cloud', fileRetrieveFromCloud);
router.get('/get-all-multiple-files', getAllMultipleFiles);

module.exports = router
