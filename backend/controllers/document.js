const {cloudinaryUpload} = require("../helpers/cloudinary");
const {errorHandler} = require("../helpers/dbErrorHandler");
const Document = require("../models/document");
const fs = require("fs");

const Tag = require("../models/document-tag");



exports.documentCreate = async (req, res) => {

    const files = req.files;

    const {title, categories, tags} = req.body;


    if (!categories || categories.length === 0) {
        return res.status(400).json({
            error: 'At least one category is required'
        });
    }

    if (!tags || tags.length === 0) {
        return res.status(400).json({
            error: 'At least one tag is required'
        });
    }

    if (!title || !title.length) {
        return res.status(400).json({
            error: "file name is required",
        });
    }


    if (files.length <= 0) {
        return res.status(400).json({
            error: "Select at least one file",
        });
    }

    // let arrayOfCategories = categories && [...categories];
    // let arrayOfTags = tags && [...tags];
    // console.log(arrayOfCategories)


    const filesArray = []
    for (const file of files) {
        const {path, originalname, mimetype, size} = file;
        const result = await cloudinaryUpload(path, tags, 'documents');
        filesArray.push({
            filePath: result.filePath,
            title: title,
            categories: categories,
            tags: result.tags,
            publicId: result.publicId,
            fileName: originalname,
            fileType: mimetype,
            fileSize: fileSizeFormatter(size, 2)
        })
    }

    Document.collection.insertMany(filesArray, function (err, result1) {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({message: 'success'})
        console.log(result1)
    });

    await fs.rmdirSync('uploads', {recursive: true});

}


const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

exports.list = (req, res) => {
    Document.find({})
        .populate('tags', '_id name slug')
        .select('_id   fileName filePath fileSize fileType publicId tags title ')
        .exec((err, data) => {
            console.log(err)
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
};


exports.listAllDocumentsTags = (req, res) => {
    let documents;
    let tags;

    Document.find({})
        .populate('tags', '_id name slug')
        .select('_id  fileName filePath fileSize fileType publicId tags title')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            documents = data;

            Tag.find({}).exec((err, t) => {
                if (err) {
                    return res.json({
                        error: errorHandler(err)
                    });
                }
                tags = t;
                // return all blogs categories tags
                res.json({documents, tags, size: documents.length});
            });
        });

};
