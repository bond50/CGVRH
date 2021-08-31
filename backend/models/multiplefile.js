const {Schema, model} = require('mongoose');


const multipleFileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    folder: {
        type: String,
        required: true
    },
    files: [Object]
}, {timestamps: true});

module.exports = model('MultipleFile', multipleFileSchema);