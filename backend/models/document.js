const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const document = new Schema(
        {
            title: {
                type: String,
                required: true
            },
            filePath: {
                type: String,
                required: true
            },
            cloudinaryFolder: {
                type: String,
                required: true
            },
            tags: [{type: ObjectId, ref: 'DocumentTag', required: true}],


            publicId: {
                type: String,
                required: true
            },
            fileName: {
                type: String,
                required: true
            },

            fileType: {
                type: String,
                required: true
            },
            fileSize: {
                type: String,
                required: true
            },
            uploadedBy: {
                type: ObjectId,
                ref: 'User'
            },
        },
        {timestamps: true}
    )
;

module.exports = model('Document', document);

