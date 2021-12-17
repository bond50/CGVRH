'use strict';
const multer = require('multer');
const path = require("path");
const fs = require("fs");





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `uploads`
        fs.mkdirSync(path, {recursive: true})
        cb(null, path);
    },
    filename: (req, file, cb) => {



        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

const fileFilter = function (req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Not supported file type!'), false);
    }
}

const upload = multer({storage, fileFilter})


exports.multipleUploadCtrl = upload.array('files');

exports.singleUploadCtrl = upload.single('file');