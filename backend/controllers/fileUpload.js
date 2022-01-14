const Files = require('../models/file');
const fs = require("fs");
const {
    cloudinaryUpload,
    cloudinaryRetrieve,
} = require("../helpers/cloudinary");
const {errorHandler} = require("../helpers/dbErrorHandler");
const {fileSizeFormatter} = require("../helpers/fileSizeFormatter");


exports.multipleFileUpload = async (req, res) => {
    const files = req.files;
    const {title} = req.body;
    const {folder} = req.body

    if (!title || !title.length) {
        return res.status(400).json({
            error: "File name/title is required",
        });
    }

    if (!folder || !folder.length) {
        return res.status(400).json({
            error: "folder must be provided.Select from the dropdown below according to file type ",
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
        const result = await cloudinaryUpload(path, folder);
        filesArray.push({
            filePath: result.filePath,
            title: title,
            cloudinaryFolder: folder,
            publicId: result.publicId,
            fileName: originalname,
            fileType: mimetype,
            fileSize: fileSizeFormatter(size, 2),
            createdAt:result.createdAt
        })
    }

    Files.collection.insertMany(filesArray, function (err, docs) {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.status(201).send({
            message: `Files Uploaded to ${folder} directory in cloudinary servers`,
            data: docs.ops
        })
    });

    await fs.rmdirSync('uploads', {recursive: true});
}


exports.getAllMultipleFiles = async (req, res) => {
    try {
        const files = await Files.find();
        res.status(200).send({data: files});

    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getDownloads = async (req, res) => {
    try {
        const files = await Files
            .find({cloudinaryFolder: 'documents'}).sort({createdAt: -1});
        res.status(200).send({files: files});

    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.fileRetrieveFromCloud = async (req, res) => {
    let folder = 'gallery'
    if (req.body.folder) {
        folder = req.body.folder
    }

    try {
        const {resources} = await cloudinaryRetrieve(folder);
        res.send(resources);
    } catch (e) {
        return res.status(422).send({message: e.message});
    }
};


