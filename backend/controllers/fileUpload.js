const Document = require('../models/document');
const Gallery = require('../models/gallery');
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
    const {tags} = req.body

    if (!title || !title.length) {
        return res.status(400).json({
            error: "File name/title is required",
        });
    }

    if (!folder || !folder.length) {
        return res.status(400).json({
            error: "Folder must be provided",
        });
    }

    if (files.length <= 0) {
        return res.status(400).json({
            error: "Select at least one file",
        });
    }
    if (!tags || tags.length === 0) {
        return res.status(400).json({
            error: 'At least one tag is required'
        });
    }

    let arrayOfTags = tags && tags.split(',');
    files.map(async file => {
        const {path, originalname, mimetype, size} = file;
        const result = await cloudinaryUpload(path, folder);
        let doc = new Document()
        doc.filePath = result.filePath
        doc.title = title
        doc.cloudinaryFolder = folder
        doc.publicId = result.publicId
        doc.fileName = originalname
        doc.fileType = mimetype
        doc.fileSize = fileSizeFormatter(size, 2)
        doc.createdAt = result.createdAt
        doc.uploadedBy = req.auth._id
        await doc.save(async (err, doc) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            await Document.findByIdAndUpdate(doc._id, {$push: {tags: arrayOfTags}}, {new: true}).exec(
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });

                    } else
                        res.json({
                            data: result,
                            message: `Files Uploaded to ${folder} directory in cloudinary servers`,
                        });
                }
            );

        })
        await fs.rm('uploads', {recursive: true});
    })
}


exports.getAllMultipleFiles = async (req, res) => {

    try {
        const files = await Gallery.find();
        res.status(200).send({data: files});

    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getDownloads = async (req, res) => {

    try {
        const files = await Document
            .find({cloudinaryFolder: 'documents'})
            .sort({createdAt: -1});
        res.status(200).send(files);

    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getGallery = async (req, res) => {
    Gallery.find({})
        .sort({createdAt: -1})
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            console.log(data)
            res.json(data);
        });
}
exports.getGalleryFormHomePage = async (req, res) => {
    Gallery.find({})
        .select('filePath title width height publicId')
        .sort({createdAt: -1})
        .limit(32)
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            console.log(data)
            res.json(data);
        });
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


exports.galleryCreate = async (req, res,) => {


    const {title, checkedTag: tags, images} = req.body;


    if (!title || !title.length) {
        return res.status(400).json({
            error: "File name/title is required",
        });
    }

    if (images.length <= 0) {
        return res.status(400).json({
            error: "Select at least one file",
        });
    }
    if (!tags || tags.length === 0) {
        return res.status(400).json({
            error: 'At least one tag is required'
        });
    }

    let arr = []

    if (images && images.length > 0) {
        images.map(async file => {
            const gallery = {
                title: title,
                tags: tags,
                filePath: file.url,
                cloudinaryFolder: file.cloudinaryFolder,
                publicId: file.public_id,
                fileType: file.fileType,
                width: file.width,
                height: file.height,
                uploadedBy: req.auth._id
            }

            arr.push(gallery)

        })
    }


    try {
        const data = await Gallery.insertMany(arr);
        res.json({
            data,
            message: `Files Uploaded to gallery directory in cloudinary servers`,
        });
    } catch (e) {
        res.status(400).json({
            error: errorHandler(error)
        });

    }


}