const MultipleFile = require('../models/multiplefile');
const fs = require("fs");
const slugify = require('slugify');

const {
    cloudinaryUpload,
    cloudinaryRetrieve,
} = require("../helpers/cloudinary");


exports.multipleFileUpload = async (req, res) => {
    if (req.method === "POST") {
        const files = req.files;
        const {title} = req.body;


        if (!files || !files.length) {
            return res.status(400).json({
                error: "Please select at least one file",
            });
        }

        if (!title || !title.length) {
            return res.status(400).json({
                error: "Tag /file name is required",
            });
        }

        for (const file of files) {
            const {path, originalname, mimetype, size} = file;
            if (mimetype === 'application/pdf') {
                const multipleFile = new MultipleFile({
                    title,
                    fileName: originalname,
                    filePath: path,
                    fileType: mimetype,
                    fileSize: fileSizeFormatter(size, 2)
                })
                await multipleFile.save(async (err, result) => {
                    try {
                        await res.status(200).json({
                            message: "Uploaded to local database",
                        });

                    } catch (err) {
                        return (err);
                    }
                })

            } else {
                const uploader = async (path) => await cloudinaryUpload(path, slugify(title).toLowerCase());
                await uploader(path);
                fs.unlinkSync(path);
                res.status(200).json({
                    message: "Uploaded to cloudinary storage",
                });

            }

        }


    } else {
        res.status(405).json({
            error: `${req.method} method not allowed`,
        });
    }
}


exports.getAllMultipleFiles = async (req, res, next) => {
    try {
        const files = await MultipleFile.find();
        res.status(200).send(files);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.fileRetrieveFromCloud = async (req, res) => {
    let data = [];
    try {
        const {resources} = await cloudinaryRetrieve();
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

