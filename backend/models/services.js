const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        body: {
            type: {},
            required: true,
            min: 200,
            max: 2000000
        },
        excerpt: {
            type: String,
            max: 1000
        },
        metaTitle: {
            type: String
        },
        metaDesc: {
            type: String
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        isFeatured: {type: Boolean},
        categories: [{type: ObjectId, ref: 'ServiceCategory', required: true}],
        tags: [{type: ObjectId, ref: 'ServiceTag', required: true}],
        postedBy: {
            type: ObjectId,
            ref: 'User'
        }
    },

    {timestamps: true}
);

module.exports = mongoose.model('Services', serviceSchema);