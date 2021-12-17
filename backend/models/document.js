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
            categories: [{type: ObjectId, ref: 'DocumentCategory', required: true}],
            tags: [{type: ObjectId, ref: 'DocumentTag', required: true}],
        },
        {timestamps: true}
    )
;

module.exports = model('Document', document);

