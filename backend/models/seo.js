const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const SEOSchema = new mongoose.Schema({
    page: {
        type: ObjectId,
        ref: 'SEOPage',
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    twitterHandle: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    structuredData: {
        type: Object,
        default: {}
    },
    locale: {
        type: String,
        default: 'en_US'
    },
    themeColor: {
        type: String,
        default: '#ffffff'
    }
}, { timestamps: true });

module.exports = mongoose.model('SEO', SEOSchema);
