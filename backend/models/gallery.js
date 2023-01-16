const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema;

const gallery = new Schema(
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
            width: {
                type: Number,
            },
            height: {
                type: Number,
            },

            tags: [{type: ObjectId, ref: 'GalleryTag', required: true}],

            publicId: {
                type: String,
                required: true
            },
            fileName: {
                type: String,

            },

            fileType: {
                type: String,
                required: true
            },
            fileSize: {
                type: String,
            },
            uploadedBy: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
        },
        {timestamps: true}
    )
;

module.exports = model('Gallery', gallery);

