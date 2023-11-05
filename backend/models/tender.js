const {Schema, model} = require('mongoose');
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const tender = new Schema(
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
            openDate: Date,

            tenderNumber: {
                type: String,
                required: true,
            },

            closeDate: {
                type: Date,
                required: true,
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
            isOpen: {
                type: Boolean,
                default: false
            },
            isHidden: {
                type: Boolean,
                default: true
            },

            isArchived: {
                type: Boolean,
                default: false
            },
            isAwarded: {
                type: Boolean,
                default: false
            },

            isClosed: {
                type: Boolean,
                default: false
            },

            uploadedBy: {
                type: ObjectId,
                ref: 'User'
            },
        },
        {timestamps: true}
    )
;

module.exports = model('Tender', tender);

