const Gallery = require('../models/gallery');
const Documents = require('../models/document');
const fs = require("fs");
const slugify = require('slugify');


const {
    cloudinaryUpload,
    cloudinaryRetrieve,
} = require("../helpers/cloudinary");
const {errorHandler} = require("../helpers/dbErrorHandler");



exports.multipleFileUpload = async (req, res) => {

    const files = req.files;
    const {title} = req.body;
    const {folder} = req.body

    if (!title || !title.length) {
        return res.status(400).json({
            error: "BlogTag /file name is required",
        });
    }
    if (files.length <= 0) {
        return res.status(400).json({
            error: "Select at least one file",
        });
    }


    const filesArray = []
    for (const file of files) {
        const {path, originalname, mimetype, size} = file;
        const result = await cloudinaryUpload(path, slugify(title).toLowerCase(), folder);
        const tag = {...result.tags}
        filesArray.push({
            filePath: result.filePath,
            title:title,
            tag: tag[0],
            publicId: result.publicId,
            fileName: originalname,
            fileType: mimetype,
            fileSize: fileSizeFormatter(size, 2)
        })
    }

    if (folder === 'gallery') {
        Gallery.collection.insertMany(filesArray, function (err, docs) {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.status(201).send({message: 'Files Uploaded to gallery collection'})
        });
    }

    if (folder === 'documents') {
        Documents.collection.insertMany(filesArray, function (err, docs) {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.status(201).send({message: 'Files Uploaded to documents collection'})
        });
    }

    await fs.rmdirSync('uploads', {recursive: true});

}


exports.getAllMultipleFiles = async (req, res, next) => {
    let folder = req.body.folder ? req.body.folder : 'gallery';

    if (folder === 'gallery') {
        try {
            const files = await Gallery.find().select('_id tag filePath');
            res.status(200).send(files);
            return
        } catch (error) {
            res.status(400).send(error.message);
            return
        }
    }

    if (folder === 'documents') {
        try {
            const files = await Documents.find();
            res.status(200).send(files);

        } catch (error) {
            res.status(400).send(error.message);

        }
    }
}


exports.fileRetrieveFromCloud = async (req, res) => {

    let folder = req.body.folder.toLowerCase() ? req.body.folder : 'gallery';

    let data = [];
    try {
        const {resources} = await cloudinaryRetrieve(folder);
        resources.map((res) => {
            const tag = {...res.tags}
            for (let t in tag) {
                data.push({publicId: res.public_id, secureUrl: res.secure_url, tag: tag[0]});
            }
        });
        res.send(data);
    } catch (e) {
        return res.status(422).send({message: e.message});
    }
};

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

