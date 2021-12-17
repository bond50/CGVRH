const express = require('express');
const {documentCreate,list, listAllDocumentsTags} = require("../controllers/document");
const {multipleUploadCtrl} = require("../helpers/multer.js");


const router = express.Router();

router.post('/document-create', multipleUploadCtrl, documentCreate);
router.get('/documents', list);
router.get('/documents-tags', listAllDocumentsTags);


// router.post('/files-retrieve-from-cloud', fileRetrieveFromCloud);
// router.post('/get-all-multiple-files', getAllMultipleFiles);


module.exports = router
