const {Schema, model} = require('mongoose');


const multipleFileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
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
    }

}, {timestamps: true});

module.exports = model('MultipleFile', multipleFileSchema);