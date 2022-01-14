const {Schema, model} = require('mongoose');

const file = new Schema(
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
        },
        {timestamps: true}
    )
;

module.exports = model('File', file);

