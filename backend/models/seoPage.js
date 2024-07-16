// models/Page.js
const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
}, {timestamps: true});

module.exports = mongoose.model('SEOPage', PageSchema);
