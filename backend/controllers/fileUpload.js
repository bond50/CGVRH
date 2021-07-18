const MultipleFile = require('../models/multiplefile');
const SingleFile = require('../models/singleFile');
const fs = require("fs");
const slugify = require('slugify');

const {
    cloudinaryUpload,
    cloudinaryRetrieve,
} = require("../helpers/cloudinary");


exports.singleFileUpload = async (req, res) => {
    try {
        if (typeof (req.file) == "undefined") {
            return res.status(400).json({
                error: "Please select a file",
            });
        }

        if (!req.body.title || !req.body.title.length) {
            return res.status(400).json({
                error: "Tag /file name is required",
            });
        }

        const {file} = req
        const {title} = req.body;
        const {folder} = req.body

        const {path, originalname, mimetype, size} = file;

        const result = await cloudinaryUpload(path, slugify(title).toLowerCase(), folder);

        let singleF = new SingleFile({
            title: title,
            filePath: result.filePath,
            cloudinary_id: result.public_id,
            fileName: originalname,
            fileType: mimetype,
            fileSize: fileSizeFormatter(size, 2)
        });

        await singleF.save();

        await fs.unlink(path, (err) => {
            if (err) throw  err
            console.log('File deleted from disk')
            fs.rmdirSync('uploads', {recursive: true});
            console.log('uploads folder remove from disk')

        });

        res.json({data: singleF, message: "Uploaded to cloudinary storage"});

    } catch (err) {
        console.log(err);

    }

}


exports.multipleFileUpload = async (req, res) => {

    try {
        const files = req.files;
        const {title} = req.body;
        const {folder} = req.body

        if (!title || !title.length) {
            return res.status(400).json({
                error: "Tag /file name is required",
            });
        }
        let filesArray = []
        for (const file of files) {
            const {path, originalname, mimetype, size} = file;
            const result = await cloudinaryUpload(path, slugify(title).toLowerCase(), folder);
            filesArray.push({
                filePath: result.filePath,
                cloudinary_id: result.public_id,
                fileName: originalname,
                fileType: mimetype,
                fileSize: fileSizeFormatter(size, 2)
            })

        }
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            files: filesArray
        });
        await multipleFiles.save();
        await fs.rmdirSync('uploads', {recursive: true});
        res.status(201).send('Files Uploaded Successfully');

    } catch (err) {
        console.log(err);
    }

    //
    // try {
    //     let filesArray = [];
    //
    //     req.files.forEach(({mimetype, originalname, path, public_id, size}) => {
    //         const file = {
    //             fileName: originalname,
    //             filePath: path,
    //             fileType: mimetype,
    //             cloudinary_id: public_id,
    //             fileSize: fileSizeFormatter(size, 2)
    //         }
    //         filesArray.push(file);
    //     });
    //
    //     const result = await cloudinaryUpload(path, slugify(title).toLowerCase(), folder);
    //     const multipleFiles = new MultipleFile({
    //         title: req.body.title,
    //         files: filesArray
    //     });
    //
    //     await multipleFiles.save();
    //     res.status(201).send('Files Uploaded Successfully');
    // } catch (error) {
    //     res.status(400).send(error.message);
    // }

}


exports.getAllMultipleFiles = async (req, res, next) => {
    try {
        const files = await MultipleFile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getAllSingleFiles = async (req, res, next) => {
    try {
        const files = await SingleFile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.fileRetrieveFromCloud = async (req, res) => {
    console.log(req.folder)
    let folder = req.folder ? req.folder : 'Gallery';

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

