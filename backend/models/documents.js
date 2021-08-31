const {Schema, model} = require('mongoose');

const documents = new Schema(
        {
            title: {
                type: String,
                required: true
            },
            filePath: {
                type: String,
                required: true
            },
            tag: {
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
        }
    )
;

module.exports = model('documents', documents);

