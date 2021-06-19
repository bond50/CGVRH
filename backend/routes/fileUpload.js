const express = require('express');
const {multipleFileUpload,getAllMultipleFiles,fileRetrieveFromCloud} = require("../controllers/fileUpload");
const {multipleUploadCtrl} = require("../helpers/multer");

const router = express.Router();


router.post('/files-upload',multipleUploadCtrl, multipleFileUpload);

router.get('/files-retrieve-from-cloud',fileRetrieveFromCloud);

router.get('/get-all-multiple-files',getAllMultipleFiles);



module.exports = router
