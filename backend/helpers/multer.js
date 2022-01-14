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

const ALLOWED_FORMATS = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
    "application/vnd.ms-word.document.macroEnabled.12",
    "application/vnd.ms-word.template.macroEnabled.12",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
    "application/vnd.ms-excel.sheet.macroEnabled.12",
    "application/vnd.ms-excel.template.macroEnabled.12",
    "application/vnd.ms-excel.addin.macroEnabled.12",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.openxmlformats-officedocument.presentationml.template",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "application/vnd.ms-powerpoint.addin.macroEnabled.12",
    "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
    "application/vnd.ms-powerpoint.template.macroEnabled.12",
    "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
];

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